export default function StockBadge({ stock, className = "" }) {
  const colorClass =
    stock > 2
      ? "bg-green-500"
      : stock > 0 && stock < 3
      ? "bg-orange-500"
      : stock === 0
      ? "bg-red-500"
      : "";

  const label =
    stock > 2
      ? `In Stock (${stock})`
      : stock > 0 && stock < 3
      ? `Only (${stock}) left`
      : stock === 0
      ? "Out of Stock"
      : "";

  return (
    <span
      className={`text-white rounded-full ${colorClass} ${className}`.trim()}
    >
      {label}
    </span>
  );
}
