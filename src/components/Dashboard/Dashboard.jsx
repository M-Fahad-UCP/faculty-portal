import { useMemo } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { FiBook, FiClock, FiUsers } from 'react-icons/fi';
import { FACULTY_PROFILE } from '../../constants/faculty';
import RecentActivity from './RecentActivity';
import StatsCard from './StatsCard';

const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

export default function Dashboard() {
  const totalStudents = useMemo(
    () => FACULTY_PROFILE.courses.reduce((sum, c) => sum + c.students, 0),
    [],
  );

  return (
    <div className="container mx-auto px-4 py-8 md:px-6">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
          Welcome back
        </p>
        <h2 className="mt-1 text-3xl font-bold tracking-tight text-gray-900">
          {FACULTY_PROFILE.name.split(' ').slice(0, 2).join(' ')}
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Here's what's happening across your courses today.
        </p>
      </div>

      <motion.div
        variants={gridVariants}
        initial="hidden"
        animate="show"
        className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-3"
      >
        <StatsCard
          title="Total Courses"
          value={FACULTY_PROFILE.courses.length}
          Icon={FiBook}
          tone="blue"
        />
        <StatsCard
          title="Total Students"
          value={totalStudents}
          Icon={FiUsers}
          tone="green"
        />
        <StatsCard
          title="Upcoming Classes"
          value={FACULTY_PROFILE.schedule.length}
          Icon={FiClock}
          tone="purple"
        />
      </motion.div>

      <section className="rounded-2xl border border-gray-200/70 bg-white/80 p-6 card-shadow backdrop-blur-sm">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold tracking-tight text-gray-900">
            Recent Activity
          </h3>
          <span className="text-xs text-gray-400">Last 7 days</span>
        </div>
        <RecentActivity activities={FACULTY_PROFILE.recentActivities} />
      </section>
    </div>
  );
}
