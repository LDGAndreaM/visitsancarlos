import type { Metadata } from "next";
import LoginPanel from "@/components/login/LoginPanel";
import LoginForm from "@/components/login/LoginForm";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Inicia sesión",
  description: "Inicia sesión o registra tu negocio en Visit San Carlos.",
  path: "/login",
});

export default function Login() {
  return (
    <div style={{ maxWidth: "100%", minHeight: "100vh", overflowX: "hidden", background: "#ffffff", display: "grid", gridTemplateColumns: "1fr 1fr" }}>
      <LoginPanel />
      <LoginForm />
    </div>
  );
}
