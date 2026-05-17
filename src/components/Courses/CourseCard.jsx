// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { FiArrowUpRight, FiUsers } from 'react-icons/fi';

export default function CourseCard({ course }) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      className="group relative overflow-hidden rounded-2xl border border-gray-200/70 bg-white card-shadow transition-shadow hover:card-shadow-hover"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-br from-blue-50 to-transparent opacity-70"
      />
      <div className="relative p-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
          {course.code}
        </p>
        <h3 className="mt-1 text-lg font-bold tracking-tight text-gray-900">
          {course.name}
        </h3>
        <div className="mt-5 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700">
            <FiUsers aria-hidden /> {course.students} students
          </span>
          <motion.button
            type="button"
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center gap-1.5 rounded-lg bg-gray-900 px-3.5 py-2 text-xs font-semibold text-white transition group-hover:bg-blue-600"
          >
            View
            <FiArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}
