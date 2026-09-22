import type { Metadata } from "next";
import AdminApp from "@/components/admin/AdminApp";

export const metadata: Metadata = {
  title: "Panel administrativo | Visit San Carlos",
  description: "Administra usuarios, negocios, blog, eventos, publicidad y soporte de Visit San Carlos.",
};

export default function Admin() {
  return <AdminApp />;
}
