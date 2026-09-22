import type { AdminUser } from "@/lib/adminData";

const gridCols = "1.6fr 1.8fr 0.8fr 1fr 1fr 1fr";

type UsuariosTabProps = {
  users: AdminUser[];
  onToggleSuspend: (id: string) => void;
};

export default function UsuariosTab({ users, onToggleSuspend }: UsuariosTabProps) {
  return (
    <div style={{ background: "#ffffff", borderRadius: 18, overflow: "hidden", boxShadow: "0 8px 20px rgba(0,60,66,0.06)" }}>
      <div style={{ display: "grid", gridTemplateColumns: gridCols, padding: "14px 20px", background: "#F4FAFB", fontSize: 12, fontWeight: 700, color: "#5C7679" }}>
        <span>Usuario</span>
        <span>Correo</span>
        <span>Negocios</span>
        <span>Registro</span>
        <span>Estado</span>
        <span />
      </div>
      {users.map((u) => {
        const active = u.status === "Activo";
        return (
          <div key={u.id} style={{ display: "grid", gridTemplateColumns: gridCols, alignItems: "center", padding: "14px 20px", borderTop: "1px solid #EEF3F3" }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: "#143840" }}>{u.name}</span>
            <span style={{ fontSize: 13, color: "#5C7679" }}>{u.email}</span>
            <span style={{ fontSize: 13, color: "#5C7679" }}>{u.businessCount}</span>
            <span style={{ fontSize: 13, color: "#5C7679" }}>{u.joined}</span>
            <span
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: active ? "#009BA4" : "#B94A2E",
                background: active ? "#E5F6F7" : "#FBEAE6",
                padding: "5px 12px",
                borderRadius: 999,
                width: "fit-content",
              }}
            >
              {u.status}
            </span>
            <button
              onClick={() => onToggleSuspend(u.id)}
              style={{
                border: `2px solid ${active ? "#E2ECED" : "#009BA4"}`,
                background: "#ffffff",
                color: active ? "#5C7679" : "#009BA4",
                fontWeight: 700,
                fontSize: 12,
                padding: "8px 12px",
                borderRadius: 8,
                cursor: "pointer",
                width: "fit-content",
              }}
            >
              {active ? "Suspender" : "Reactivar"}
            </button>
          </div>
        );
      })}
    </div>
  );
}
