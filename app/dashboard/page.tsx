import type { Metadata } from "next";
import DashboardApp from "@/components/dashboard/DashboardApp";

export const metadata: Metadata = {
  title: "Dashboard | Visit San Carlos",
  description: "Administra tus negocios y publicidad en Visit San Carlos.",
};

export default function Dashboard() {
  return <DashboardApp />;
}
