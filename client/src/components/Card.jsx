export default function Card({ children }) {
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
      }}
    >
      {children}
    </div>
  );
}