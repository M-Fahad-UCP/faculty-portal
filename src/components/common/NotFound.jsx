import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center px-6 py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">404</p>
      <h1 className="mt-2 text-3xl font-bold text-gray-800">Page not found</h1>
      <p className="mt-2 text-gray-600">The page you’re looking for doesn’t exist.</p>
      <Link
        to="/dashboard"
        className="mt-6 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
      >
        Back to dashboard
      </Link>
    </div>
  );
}
