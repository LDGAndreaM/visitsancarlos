import type { Metadata } from "next";
import DashboardApp from "@/components/dashboard/DashboardApp";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Administra tus negocios y publicidad en Visit San Carlos.",
  robots: { index: false, follow: false },
};

export default function Dashboard() {
  return <DashboardApp />;
}
