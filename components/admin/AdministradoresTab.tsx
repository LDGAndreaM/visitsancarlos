import type { AdminAccount } from "@/lib/adminAuth";

const gridCols = "1.6fr 1.8fr 1fr 1fr 1fr";

type AdministradoresTabProps = {
  accounts: AdminAccount[];
  currentAccount: AdminAccount;
  onOpenAdd: () => void;
  onRemove: (id: string) => void;
};

export default function AdministradoresTab({ accounts, currentAccount, onOpenAdd, onRemove }: AdministradoresTabProps) {
  const isSuper = currentAccount.role === "super";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <p style={{ margin: 0, fontSize: 13, color: "#5C7679", maxWidth: 560 }}>
          Solo la cuenta principal (visit.sancarlos.son@gmail.com) puede agregar o eliminar administradores. Los administradores limitados pueden atender el chat de soporte, publicar en el blog,
          aprobar publicaciones de usuarios y ver métricas.
        </p>
        {isSuper && (
          <button onClick={onOpenAdd} style={{ border: "none", background: "#EB600A", color: "#ffffff", fontWeight: 700, fontSize: 13, padding: "10px 18px", borderRadius: 10, cursor: "pointer", flexShrink: 0 }}>
            + Agregar administrador
          </button>
        )}
      </div>

      <div style={{ background: "#ffffff", borderRadius: 18, overflow: "hidden", boxShadow: "0 8px 20px rgba(0,60,66,0.06)" }}>
        <div style={{ display: "grid", gridTemplateColumns: gridCols, padding: "14px 20px", background: "#F4FAFB", fontSize: 12, fontWeight: 700, color: "#5C7679" }}>
          <span>Nombre</span>
          <span>Correo</span>
          <span>Rol</span>
          <span>Agregado</span>
          <span />
        </div>
        {accounts.map((a) => {
          const isSelf = a.id === currentAccount.id;
          const canRemove = isSuper && a.role !== "super";
          return (
            <div key={a.id} style={{ display: "grid", gridTemplateColumns: gridCols, alignItems: "center", padding: "14px 20px", borderTop: "1px solid #EEF3F3" }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: "#143840" }}>
                {a.name}
                {isSelf && <span style={{ fontSize: 12, fontWeight: 600, color: "#7FA7AA" }}> (tú)</span>}
              </span>
              <span style={{ fontSize: 13, color: "#5C7679" }}>{a.email}</span>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: a.role === "super" ? "#EB600A" : "#009BA4",
                  background: a.role === "super" ? "#FDEEE4" : "#E5F6F7",
                  padding: "5px 12px",
                  borderRadius: 999,
                  width: "fit-content",
                }}
              >
                {a.role === "super" ? "Principal" : "Limitado"}
              </span>
              <span style={{ fontSize: 13, color: "#5C7679" }}>{a.addedAt}</span>
              {canRemove ? (
                <button
                  onClick={() => onRemove(a.id)}
                  style={{ border: "2px solid #E2ECED", background: "#ffffff", color: "#B94A2E", fontWeight: 700, fontSize: 12, padding: "8px 12px", borderRadius: 8, cursor: "pointer", width: "fit-content" }}
                >
                  Eliminar
                </button>
              ) : (
                <span />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
