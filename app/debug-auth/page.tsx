"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function DebugAuthPage() {
  const [output, setOutput] = useState("Cargando...");

  useEffect(() => {
    (async () => {
      const lines: string[] = [];
      lines.push("=== document.cookie (nombres de cookies sb-*) ===");
      const cookieNames = document.cookie
        .split(";")
        .map((c) => c.trim().split("=")[0])
        .filter((n) => n.startsWith("sb-"));
      lines.push(cookieNames.length ? cookieNames.join("\n") : "(ninguna cookie sb- visible para JavaScript)");

      const supabase = createClient();

      lines.push("\n=== getSession() ===");
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      lines.push("error: " + (sessionError ? JSON.stringify(sessionError, null, 2) : "null"));
      lines.push("session presente: " + Boolean(sessionData.session));
      if (sessionData.session) {
        lines.push("user email: " + sessionData.session.user.email);
        lines.push("expires_at: " + sessionData.session.expires_at);
      }

      lines.push("\n=== getUser() ===");
      const { data: userData, error: userError } = await supabase.auth.getUser();
      lines.push("error: " + (userError ? JSON.stringify(userError, null, 2) : "null"));
      lines.push("user presente: " + Boolean(userData.user));

      setOutput(lines.join("\n"));
    })();
  }, []);

  return (
    <pre style={{ padding: 24, fontSize: 13, whiteSpace: "pre-wrap", wordBreak: "break-all" }}>{output}</pre>
  );
}
