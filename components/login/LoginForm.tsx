"use client";

import { useState } from "react";
import Link from "next/link";

type Role = "negocio" | "admin";

export default function LoginForm() {
  const [role, setRole] = useState<Role>("negocio");
  const [isLogin, setIsLogin] = useState(true);

  const isAdmin = role === "admin";
  const heading = isAdmin ? "Acceso administrativo" : isLogin ? "Accede a tu cuenta de negocio" : "Registra tu negocio gratis";
  const subheading = isAdmin
    ? "Panel de control de Visit San Carlos."
    : isLogin
      ? "Gestiona tu perfil y tu publicidad en Visit San Carlos."
      : "Crea tu cuenta para publicar tu negocio en el directorio.";
  const ctaLabel = isAdmin ? "Entrar al panel" : isLogin ? "Iniciar sesión" : "Crear cuenta";
  const ctaHref = isAdmin ? "/admin" : "/dashboard";
  const switchPrompt = isLogin ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?";
  const switchLabel = isLogin ? "Regístrate" : "Inicia sesión";

  const inputStyle: React.CSSProperties = {
    border: "1px solid #E2ECED",
    outline: "none",
    borderRadius: 10,
    padding: "12px 14px",
    fontFamily: "inherit",
    fontSize: 14,
  };

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: 44 }}>
      <div style={{ width: "100%", maxWidth: 400, display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ display: "flex", gap: 16, fontSize: 12.5, fontWeight: 600, color: "#9DB6B8" }}>
          <button
            onClick={() => setRole("negocio")}
            style={{ border: "none", background: "none", padding: 0, cursor: "pointer", color: !isAdmin ? "#009BA4" : "#9DB6B8", borderBottom: !isAdmin ? "2px solid #009BA4" : "2px solid transparent", paddingBottom: 4 }}
          >
            Cuenta de negocio
          </button>
          <button
            onClick={() => setRole("admin")}
            style={{ border: "none", background: "none", padding: 0, cursor: "pointer", color: isAdmin ? "#009BA4" : "#9DB6B8", borderBottom: isAdmin ? "2px solid #009BA4" : "2px solid transparent", paddingBottom: 4 }}
          >
            Administrador
          </button>
        </div>

        {!isAdmin && (
          <div style={{ display: "flex", background: "#F4FAFB", borderRadius: 12, padding: 4 }}>
            <button
              onClick={() => setIsLogin(true)}
              style={{ flex: 1, border: "none", background: isLogin ? "#009BA4" : "transparent", color: isLogin ? "#ffffff" : "#3B5C61", fontWeight: 700, fontSize: 14, padding: 10, borderRadius: 9, cursor: "pointer" }}
            >
              Iniciar sesión
            </button>
            <button
              onClick={() => setIsLogin(false)}
              style={{ flex: 1, border: "none", background: !isLogin ? "#009BA4" : "transparent", color: !isLogin ? "#ffffff" : "#3B5C61", fontWeight: 700, fontSize: 14, padding: 10, borderRadius: 9, cursor: "pointer" }}
            >
              Crear cuenta
            </button>
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: "#143840" }}>{heading}</h1>
          <p style={{ margin: 0, fontSize: 13, color: "#3B5C61" }}>{subheading}</p>
        </div>

        {!isAdmin && (
          <>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <button style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, border: "1px solid #E2ECED", background: "#ffffff", borderRadius: 10, padding: 12, fontSize: 14, fontWeight: 600, color: "#143840", cursor: "pointer" }}>
                <span style={{ width: 20, height: 20, borderRadius: "50%", background: "#1877F2", color: "#ffffff", fontSize: 12, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>f</span>
                Continuar con Facebook
              </button>
              <button style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, border: "1px solid #E2ECED", background: "#ffffff", borderRadius: 10, padding: 12, fontSize: 14, fontWeight: 600, color: "#143840", cursor: "pointer" }}>
                <span style={{ width: 20, height: 20, borderRadius: "50%", background: "#F4FAFB", color: "#EB600A", fontSize: 12, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>G</span>
                Continuar con Google
              </button>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ flex: 1, height: 1, background: "#E2ECED" }} />
              <span style={{ fontSize: 12, color: "#9DB6B8" }}>o con tu correo</span>
              <span style={{ flex: 1, height: 1, background: "#E2ECED" }} />
            </div>
          </>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {!isAdmin && !isLogin && <input type="text" placeholder="Nombre del negocio" style={inputStyle} />}
          <input type="email" placeholder="Correo electrónico" style={inputStyle} />
          <input type="password" placeholder="Contraseña" style={inputStyle} />
          {(isAdmin || isLogin) && (
            <a href="#" style={{ fontSize: 12, fontWeight: 600, alignSelf: "flex-end" }}>
              ¿Olvidaste tu contraseña?
            </a>
          )}
          <Link href={ctaHref} style={{ display: "block", textAlign: "center", border: "none", background: "#EB600A", color: "#ffffff", fontWeight: 700, fontSize: 14, padding: 13, borderRadius: 10, cursor: "pointer" }}>
            {ctaLabel}
          </Link>
        </div>

        {!isAdmin && (
          <p style={{ margin: 0, textAlign: "center", fontSize: 13, color: "#5C7679" }}>
            {switchPrompt}{" "}
            <button onClick={() => setIsLogin(!isLogin)} style={{ border: "none", background: "none", color: "#009BA4", fontWeight: 700, fontSize: 13, cursor: "pointer", padding: 0 }}>
              {switchLabel}
            </button>
          </p>
        )}
      </div>
    </div>
  );
}
