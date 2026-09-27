"use client";

export default function MobileBottomSheet({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  if (!open) return null;

  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 70, background: "rgba(20,56,64,0.5)" }} />
      <div
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 80,
          background: "#ffffff",
          borderRadius: "24px 24px 0 0",
          padding: "10px 20px max(20px, env(safe-area-inset-bottom)) 20px",
          maxHeight: "80vh",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 18,
          boxShadow: "0 -10px 40px rgba(0,0,0,0.2)",
        }}
      >
        <span style={{ alignSelf: "center", width: 40, height: 5, borderRadius: 3, background: "#DCE6E7", flexShrink: 0 }} />
        {children}
      </div>
    </>
  );
}
