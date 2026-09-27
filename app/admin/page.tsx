import type { Metadata } from "next";
import AdminApp from "@/components/admin/AdminApp";

export const metadata: Metadata = {
  title: "Panel administrativo",
  description: "Administra usuarios, negocios, blog, eventos, publicidad y soporte de Visit San Carlos.",
  robots: { index: false, follow: false },
};

export default function Admin() {
  return <AdminApp />;
}
