// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { FiClock, FiMapPin } from 'react-icons/fi';
import { FACULTY_PROFILE } from '../../constants/faculty';

const DAY_TONE = {
  Monday: 'bg-blue-100 text-blue-700',
  Tuesday: 'bg-violet-100 text-violet-700',
  Wednesday: 'bg-emerald-100 text-emerald-700',
  Thursday: 'bg-amber-100 text-amber-700',
  Friday: 'bg-rose-100 text-rose-700',
};

const listVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
};

const rowVariants = {
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
};

export default function ScheduleView() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
          Weekly Schedule
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          {FACULTY_PROFILE.schedule.length} sessions this week
        </p>
      </div>

      {/* Mobile: card list. md+: table. */}
      <motion.div
        variants={listVariants}
        initial="hidden"
        animate="show"
        className="space-y-3 md:hidden"
      >
        {FACULTY_PROFILE.schedule.map((item) => (
          <motion.div
            key={item.id}
            variants={rowVariants}
            className="rounded-2xl border border-gray-200/70 bg-white p-4 card-shadow"
          >
            <div className="flex items-center justify-between">
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${
                  DAY_TONE[item.day] ?? 'bg-gray-100 text-gray-700'
                }`}
              >
                {item.day}
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                <FiMapPin /> {item.room}
              </span>
            </div>
            <p className="mt-2 text-base font-semibold text-gray-900">{item.course}</p>
            <p className="mt-1 inline-flex items-center gap-1 text-xs text-gray-500">
              <FiClock /> {item.time}
            </p>
          </motion.div>
        ))}
      </motion.div>

      <div className="hidden overflow-hidden rounded-2xl border border-gray-200/70 bg-white card-shadow md:block">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50/80">
            <tr>
              {['Day', 'Time', 'Course / Activity', 'Room'].map((col) => (
                <th
                  key={col}
                  scope="col"
                  className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <motion.tbody
            variants={listVariants}
            initial="hidden"
            animate="show"
            className="divide-y divide-gray-100 bg-white"
          >
            {FACULTY_PROFILE.schedule.map((item) => (
              <motion.tr
                key={item.id}
                variants={rowVariants}
                className="transition-colors hover:bg-blue-50/40"
              >
                <td className="whitespace-nowrap px-6 py-4">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${
                      DAY_TONE[item.day] ?? 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {item.day}
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span className="inline-flex items-center gap-1.5 text-sm text-gray-700">
                    <FiClock className="text-gray-400" />
                    {item.time}
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                  {item.course}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span className="inline-flex items-center gap-1.5 text-sm text-gray-700">
                    <FiMapPin className="text-gray-400" />
                    {item.room}
                  </span>
                </td>
              </motion.tr>
            ))}
          </motion.tbody>
        </table>
      </div>
    </div>
  );
}
