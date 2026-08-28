import { Link } from "react-router-dom";
import BackIcon from "./svgs/BackIcon";

export default function NotFound() {
  return (
    <div className="text-center py-20">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Page Not Found</h1>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        The page you&apos;re looking for doesn&apos;t exist or may have been
        moved. Let&apos;s get you back to browsing our collection.
      </p>
      <Link to="/">
        <span className="inline-flex items-center text-amber-600 hover:text-amber-700 font-medium transition-colors">
          <BackIcon />
          Back to Products
        </span>
      </Link>
    </div>
  );
}
