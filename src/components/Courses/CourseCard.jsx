import { FiUsers } from 'react-icons/fi';

export default function CourseCard({ course }) {
  return (
    <article className="overflow-hidden rounded-lg bg-white shadow-md transition hover:shadow-lg">
      <div className="p-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
          {course.code}
        </p>
        <h3 className="mt-1 text-lg font-bold text-gray-800">{course.name}</h3>
        <div className="mt-4 flex items-center justify-between">
          <span className="inline-flex items-center gap-1 text-sm text-gray-500">
            <FiUsers aria-hidden /> {course.students} students
          </span>
          <button
            type="button"
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            View Details
          </button>
        </div>
      </div>
    </article>
  );
}
