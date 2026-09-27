"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type Role = "negocio" | "admin";

export default function LoginForm() {
  const router = useRouter();
  const [role, setRole] = useState<Role>("negocio");
  const [isLogin, setIsLogin] = useState(true);
  const [oauthError, setOauthError] = useState("");

  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailNotice, setEmailNotice] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const isAdmin = role === "admin";

  const isConfigured = () => {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      setOauthError("El inicio de sesión aún no está configurado. Vuelve a intentarlo más tarde.");
      return false;
    }
    return true;
  };

  const handleOAuth = async (provider: "google" | "facebook") => {
    setOauthError("");
    if (!isConfigured()) return;
    const supabase = createClient();
    const next = isAdmin ? "/admin" : "/dashboard";
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${window.location.origin}/auth/callback?next=${next}` },
    });
    if (error) setOauthError("No se pudo iniciar sesión. Intenta de nuevo.");
  };

  const handleEmailAuth = async () => {
    setEmailError("");
    setEmailNotice("");
    if (!email.trim() || !password) {
      setEmailError("Completa tu correo y contraseña.");
      return;
    }
    if (!isLogin && !businessName.trim()) {
      setEmailError("Ingresa el nombre de tu negocio.");
      return;
    }
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      setEmailError("El inicio de sesión aún no está configurado. Vuelve a intentarlo más tarde.");
      return;
    }

    setSubmitting(true);
    const supabase = createClient();

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
      setSubmitting(false);
      if (error) {
        setEmailError("Correo o contraseña incorrectos.");
        return;
      }
      router.push("/dashboard");
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: { full_name: businessName.trim() },
        emailRedirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
      },
    });
    setSubmitting(false);
    if (error) {
      setEmailError(error.message.includes("already registered") ? "Ya existe una cuenta con ese correo." : "No se pudo crear la cuenta. Intenta de nuevo.");
      return;
    }
    if (data.session) {
      router.push("/dashboard");
      return;
    }
    setEmailNotice("¡Listo! Revisa tu correo y confirma tu cuenta para poder iniciar sesión.");
  };

  const heading = isAdmin ? "Acceso administrativo" : isLogin ? "Accede a tu cuenta de negocio" : "Registra tu negocio gratis";
  const subheading = isAdmin
    ? "Panel de control de Visit San Carlos."
    : isLogin
      ? "Gestiona tu perfil y tu publicidad en Visit San Carlos."
      : "Crea tu cuenta para publicar tu negocio en el directorio.";
  const ctaLabel = isAdmin ? "Entrar al panel" : isLogin ? "Iniciar sesión" : "Crear cuenta";
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

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <button
            onClick={() => handleOAuth("facebook")}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, border: "1px solid #E2ECED", background: "#ffffff", borderRadius: 10, padding: 12, fontSize: 14, fontWeight: 600, color: "#143840", cursor: "pointer" }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" style={{ flexShrink: 0 }}>
              <circle cx="10" cy="10" r="10" fill="#1877F2" />
              <path d="M13.2 10.3h-2v6.2H8.7v-6.2H7.3V8.4h1.4V7.2c0-1.6.7-2.6 2.6-2.6h1.6v1.9h-1c-.7 0-.8.3-.8.8v1.1h1.8l-.2 1.9z" fill="#ffffff" />
            </svg>
            Continuar con Facebook
          </button>
          <button
            onClick={() => handleOAuth("google")}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, border: "1px solid #E2ECED", background: "#ffffff", borderRadius: 10, padding: 12, fontSize: 14, fontWeight: 600, color: "#143840", cursor: "pointer" }}
          >
            <svg width="20" height="20" viewBox="0 0 48 48" style={{ flexShrink: 0 }}>
              <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 8 3l6-6C33.8 5.5 29.2 3.5 24 3.5 12.7 3.5 3.5 12.7 3.5 24S12.7 44.5 24 44.5 44.5 35.3 44.5 24c0-1.2-.1-2.4-.3-3.5z" />
              <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 15.9 18.9 13 24 13c3.1 0 5.8 1.1 8 3l6-6C33.8 5.5 29.2 3.5 24 3.5 16.2 3.5 9.4 7.8 6.3 14.7z" />
              <path fill="#4CAF50" d="M24 44.5c5.1 0 9.7-1.9 13.1-5.1l-6.1-5.1c-1.9 1.4-4.4 2.2-7 2.2-5.2 0-9.6-3.3-11.3-8l-6.4 5C9.4 40.2 16.2 44.5 24 44.5z" />
              <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4.1 5.4l6.1 5.1C40.9 35.9 44.5 30.4 44.5 24c0-1.2-.1-2.4-.3-3.5z" />
            </svg>
            Continuar con Google
          </button>
        </div>

        {oauthError && <p style={{ margin: 0, fontSize: 12, color: "#E23E7E", fontWeight: 600 }}>{oauthError}</p>}

        {isAdmin && (
          <p style={{ margin: 0, fontSize: 12, color: "#9DB6B8" }}>
            Solo correos autorizados como administrador podrán entrar al panel.
          </p>
        )}

        {!isAdmin && (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ flex: 1, height: 1, background: "#E2ECED" }} />
              <span style={{ fontSize: 12, color: "#9DB6B8" }}>o con tu correo</span>
              <span style={{ flex: 1, height: 1, background: "#E2ECED" }} />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {!isLogin && <input value={businessName} onChange={(e) => setBusinessName(e.target.value)} type="text" placeholder="Nombre del negocio" style={inputStyle} />}
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Correo electrónico" style={inputStyle} />
              <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Contraseña" style={inputStyle} />
              {isLogin && (
                <a href="#" style={{ fontSize: 12, fontWeight: 600, alignSelf: "flex-end" }}>
                  ¿Olvidaste tu contraseña?
                </a>
              )}
              {emailError && <p style={{ margin: 0, fontSize: 12, color: "#E23E7E", fontWeight: 600 }}>{emailError}</p>}
              {emailNotice && <p style={{ margin: 0, fontSize: 12, color: "#009BA4", fontWeight: 600 }}>{emailNotice}</p>}
              <button
                onClick={handleEmailAuth}
                disabled={submitting}
                style={{ display: "block", width: "100%", textAlign: "center", border: "none", background: "#EB600A", color: "#ffffff", fontWeight: 700, fontSize: 14, padding: 13, borderRadius: 10, cursor: submitting ? "default" : "pointer", opacity: submitting ? 0.6 : 1 }}
              >
                {submitting ? "Procesando…" : ctaLabel}
              </button>
            </div>
          </>
        )}

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
