type CuentaTabProps = {
  userNameInput: string;
  onUserNameInputChange: (v: string) => void;
  onSave: () => void;
};

export default function CuentaTab({ userNameInput, onUserNameInputChange, onSave }: CuentaTabProps) {
  return (
    <div style={{ maxWidth: 480, background: "#ffffff", borderRadius: 18, padding: 28, boxShadow: "0 8px 20px rgba(0,60,66,0.06)", display: "flex", flexDirection: "column", gap: 16 }}>
      <h2 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: "#143840" }}>Mi cuenta</h2>
      <p style={{ margin: 0, fontSize: 13, color: "#5C7679" }}>Este es tu nombre personal — puedes administrar varios negocios distintos con la misma cuenta.</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <label style={{ fontSize: 13, fontWeight: 700, color: "#143840" }}>Nombre completo</label>
        <input
          value={userNameInput}
          onChange={(e) => onUserNameInputChange(e.target.value)}
          type="text"
          style={{ border: "1px solid #E2ECED", outline: "none", borderRadius: 10, padding: "11px 14px", fontSize: 14, fontFamily: "inherit" }}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <label style={{ fontSize: 13, fontWeight: 700, color: "#143840" }}>Correo electrónico</label>
        <input type="email" defaultValue="andrea@correo.com" style={{ border: "1px solid #E2ECED", outline: "none", borderRadius: 10, padding: "11px 14px", fontSize: 14, fontFamily: "inherit" }} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <label style={{ fontSize: 13, fontWeight: 700, color: "#143840" }}>Teléfono</label>
        <input type="tel" defaultValue="622 100 2233" style={{ border: "1px solid #E2ECED", outline: "none", borderRadius: 10, padding: "11px 14px", fontSize: 14, fontFamily: "inherit" }} />
      </div>
      <button onClick={onSave} style={{ border: "none", background: "#EB600A", color: "#ffffff", fontWeight: 700, fontSize: 14, padding: "12px 22px", borderRadius: 10, cursor: "pointer", alignSelf: "flex-start" }}>
        Guardar cambios
      </button>
    </div>
  );
}
