type ChooseListingTypeModalProps = {
  onClose: () => void;
  onChooseDirectorio: () => void;
  onChooseClasificado: () => void;
  onChooseEvento: () => void;
};

const optionStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 10,
  alignItems: "flex-start",
  border: "2px solid #E2ECED",
  background: "#ffffff",
  borderRadius: 14,
  padding: 20,
  cursor: "pointer",
  textAlign: "left",
};

export default function ChooseListingTypeModal({ onClose, onChooseDirectorio, onChooseClasificado, onChooseEvento }: ChooseListingTypeModalProps) {
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(20,56,64,0.55)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ background: "#ffffff", borderRadius: 20, padding: 32, maxWidth: 720, width: "100%", display: "flex", flexDirection: "column", gap: 16, boxShadow: "0 24px 50px rgba(0,0,0,0.25)" }}
      >
        <h3 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: "#143840" }}>¿Qué quieres publicar?</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
          <button onClick={onChooseDirectorio} style={optionStyle}>
            <svg width="26" height="26" viewBox="0 0 18 18" fill="none">
              <rect x="2" y="10" width="14" height="4" stroke="#009BA4" strokeWidth="1.4" />
              <rect x="3" y="6" width="4" height="4" stroke="#009BA4" strokeWidth="1.4" />
            </svg>
            <span style={{ fontSize: 15, fontWeight: 800, color: "#143840" }}>Establecimiento</span>
            <span style={{ fontSize: 12.5, color: "#5C7679" }}>Publica tu negocio en el Directorio: hoteles, restaurantes, servicios y más.</span>
          </button>
          <button onClick={onChooseClasificado} style={optionStyle}>
            <svg width="26" height="26" viewBox="0 0 18 18" fill="none">
              <path d="M3 9l6-6h6v6l-6 6z" stroke="#EB600A" strokeWidth="1.4" fill="none" strokeLinejoin="round" />
            </svg>
            <span style={{ fontSize: 15, fontWeight: 800, color: "#143840" }}>Anuncio clasificado</span>
            <span style={{ fontSize: 12.5, color: "#5C7679" }}>Vende o renta autos, casas, propiedades y otros artículos.</span>
          </button>
          <button onClick={onChooseEvento} style={optionStyle}>
            <svg width="26" height="26" viewBox="0 0 18 18" fill="none">
              <rect x="2" y="3" width="14" height="12" rx="2" stroke="#3FA8C4" strokeWidth="1.4" />
              <line x1="2" y1="7" x2="16" y2="7" stroke="#3FA8C4" strokeWidth="1.4" />
              <line x1="6" y1="1.5" x2="6" y2="4.5" stroke="#3FA8C4" strokeWidth="1.4" strokeLinecap="round" />
              <line x1="12" y1="1.5" x2="12" y2="4.5" stroke="#3FA8C4" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            <span style={{ fontSize: 15, fontWeight: 800, color: "#143840" }}>Evento</span>
            <span style={{ fontSize: 12.5, color: "#5C7679" }}>Publica un evento en el calendario: festivales, torneos, ferias y más.</span>
          </button>
        </div>
        <button onClick={onClose} style={{ border: "none", background: "none", color: "#5C7679", fontWeight: 700, fontSize: 13, cursor: "pointer", alignSelf: "flex-end" }}>
          Cancelar
        </button>
      </div>
    </div>
  );
}
