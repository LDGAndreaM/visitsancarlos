import { createClient } from "@/lib/supabase/client";

type ReviewRow = {
  id: string;
  business_id: string;
  author_id: string;
  rating: number;
  comment: string | null;
  created_at: string;
  updated_at: string;
};

type ReviewRowWithAuthor = ReviewRow & { profiles: { full_name: string | null; email: string; avatar_url: string | null } | null };

export type Review = {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatarUrl: string;
  rating: number;
  comment: string;
  dateLabel: string;
};

const fmtDateShort = (iso: string) => new Date(iso).toLocaleDateString("es-MX", { day: "numeric", month: "short", year: "numeric" });

function toReview(row: ReviewRowWithAuthor): Review {
  return {
    id: row.id,
    authorId: row.author_id,
    authorName: row.profiles?.full_name || row.profiles?.email || "Usuario",
    authorAvatarUrl: row.profiles?.avatar_url ?? "",
    rating: row.rating,
    comment: row.comment ?? "",
    dateLabel: fmtDateShort(row.updated_at),
  };
}

export async function fetchReviewsForBusiness(businessId: string): Promise<Review[]> {
  const supabase = createClient();
  const { data } = await supabase
    .from("reviews")
    .select("*, profiles(full_name, email, avatar_url)")
    .eq("business_id", businessId)
    .order("created_at", { ascending: false });
  return (data ?? []).map((row) => toReview(row as ReviewRowWithAuthor));
}

export async function submitReview(businessId: string, authorId: string, rating: number, comment: string): Promise<void> {
  const supabase = createClient();
  await supabase
    .from("reviews")
    .upsert(
      { business_id: businessId, author_id: authorId, rating, comment, updated_at: new Date().toISOString() },
      { onConflict: "business_id,author_id" }
    );
}

export async function deleteReview(id: string): Promise<void> {
  const supabase = createClient();
  await supabase.from("reviews").delete().eq("id", id);
}
