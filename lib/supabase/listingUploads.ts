import { createClient } from "@/lib/supabase/client";

export type ListingFolder = "businesses" | "classifieds" | "events";

// Bucket compartido "listings": cada usuario sube dentro de su propia
// carpeta (<userId>/...), reforzado por RLS en storage.objects.
export async function uploadListingImage(userId: string, folder: ListingFolder, file: File): Promise<{ url: string | null; error: string | null }> {
  const supabase = createClient();
  const ext = file.name.split(".").pop() || "jpg";
  const path = `${userId}/${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const { error: uploadError } = await supabase.storage.from("listings").upload(path, file);
  if (uploadError) return { url: null, error: uploadError.message };

  const { data } = supabase.storage.from("listings").getPublicUrl(path);
  return { url: data.publicUrl, error: null };
}

// Limpieza best-effort al reemplazar o quitar una imagen ya subida — si
// falla (p. ej. la URL no es de este bucket) simplemente no hace nada.
export async function deleteListingImage(url: string): Promise<void> {
  const marker = "/object/public/listings/";
  const idx = url.indexOf(marker);
  if (idx === -1) return;
  const path = url.slice(idx + marker.length);
  const supabase = createClient();
  await supabase.storage.from("listings").remove([path]);
}
