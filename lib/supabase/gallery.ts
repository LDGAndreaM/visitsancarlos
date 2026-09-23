import { createClient } from "@/lib/supabase/client";

type GalleryPhotoRow = {
  id: string;
  uploader_id: string;
  url: string;
  caption: string | null;
  category: string;
  tall: boolean;
  status: "pendiente" | "aprobado";
  created_at: string;
};

export type GalleryPhotoView = { id: string; url: string; caption: string; category: string; tall: boolean };

export function toGalleryPhotoView(row: GalleryPhotoRow): GalleryPhotoView {
  return { id: row.id, url: row.url, caption: row.caption ?? "", category: row.category, tall: row.tall };
}

export async function fetchApprovedPhotos(): Promise<GalleryPhotoView[]> {
  const supabase = createClient();
  const { data } = await supabase.from("gallery_photos").select("*").eq("status", "aprobado").order("created_at", { ascending: false });
  return (data ?? []).map(toGalleryPhotoView);
}

export async function fetchAllPhotosAdmin(): Promise<GalleryPhotoView[]> {
  const supabase = createClient();
  const { data } = await supabase.from("gallery_photos").select("*").order("created_at", { ascending: false });
  return (data ?? []).map(toGalleryPhotoView);
}

export async function uploadPhoto(uploaderId: string, file: File, values: { caption: string; category: string; tall: boolean }): Promise<{ error: string | null }> {
  const supabase = createClient();
  const ext = file.name.split(".").pop() || "jpg";
  const path = `${uploaderId}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const { error: uploadError } = await supabase.storage.from("gallery").upload(path, file);
  if (uploadError) return { error: uploadError.message };

  const { data: publicUrl } = supabase.storage.from("gallery").getPublicUrl(path);

  const { error: insertError } = await supabase
    .from("gallery_photos")
    .insert({ uploader_id: uploaderId, url: publicUrl.publicUrl, caption: values.caption, category: values.category, tall: values.tall });
  if (insertError) return { error: insertError.message };

  return { error: null };
}

export async function deletePhoto(id: string): Promise<void> {
  const supabase = createClient();
  await supabase.from("gallery_photos").delete().eq("id", id);
}
