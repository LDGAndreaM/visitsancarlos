import { createClient } from "@/lib/supabase/client";

type GalleryPhotoRow = {
  id: string;
  uploader_id: string;
  url: string;
  caption: string | null;
  category: string;
  categories: string[] | null;
  tall: boolean;
  status: "pendiente" | "aprobado";
  created_at: string;
};

export type GalleryPhotoView = { id: string; url: string; caption: string; categories: string[]; tall: boolean };

export function toGalleryPhotoView(row: GalleryPhotoRow): GalleryPhotoView {
  const categories = row.categories && row.categories.length > 0 ? row.categories : [row.category];
  return { id: row.id, url: row.url, caption: row.caption ?? "", categories, tall: row.tall };
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

export async function uploadPhoto(uploaderId: string, file: File, values: { caption: string; categories: string[]; tall: boolean }): Promise<{ error: string | null }> {
  const supabase = createClient();
  const ext = file.name.split(".").pop() || "jpg";
  const path = `${uploaderId}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const { error: uploadError } = await supabase.storage.from("gallery").upload(path, file);
  if (uploadError) return { error: uploadError.message };

  const { data: publicUrl } = supabase.storage.from("gallery").getPublicUrl(path);

  const { error: insertError } = await supabase.from("gallery_photos").insert({
    uploader_id: uploaderId,
    url: publicUrl.publicUrl,
    caption: values.caption,
    category: values.categories[0],
    categories: values.categories,
    tall: values.tall,
  });
  if (insertError) return { error: insertError.message };

  return { error: null };
}

export async function updatePhoto(id: string, values: { caption: string; categories: string[]; tall: boolean }): Promise<{ error: string | null }> {
  const supabase = createClient();
  const { error } = await supabase
    .from("gallery_photos")
    .update({ caption: values.caption, category: values.categories[0], categories: values.categories, tall: values.tall })
    .eq("id", id);
  return { error: error?.message ?? null };
}

export async function deletePhoto(id: string): Promise<void> {
  const supabase = createClient();
  await supabase.from("gallery_photos").delete().eq("id", id);
}
