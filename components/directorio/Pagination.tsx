type PaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 8, marginTop: 36 }}>
      <button
        onClick={() => onPageChange(Math.max(1, page - 1))}
        style={{ width: 34, height: 34, borderRadius: "50%", border: "1px solid #DCEEEF", background: "#ffffff", cursor: "pointer", fontSize: 16, color: "#009BA4" }}
      >
        ‹
      </button>
      {pageNumbers.map((num) => (
        <button
          key={num}
          onClick={() => onPageChange(num)}
          style={{
            width: 34,
            height: 34,
            borderRadius: "50%",
            border: "1px solid #DCEEEF",
            background: num === page ? "#009BA4" : "#ffffff",
            color: num === page ? "#ffffff" : "#3B5C61",
            fontWeight: 700,
            fontSize: 13,
            cursor: "pointer",
          }}
        >
          {num}
        </button>
      ))}
      <button
        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        style={{ width: 34, height: 34, borderRadius: "50%", border: "1px solid #DCEEEF", background: "#ffffff", cursor: "pointer", fontSize: 16, color: "#009BA4" }}
      >
        ›
      </button>
    </div>
  );
}
