import { useMemo } from 'react';
import { FiBook, FiClock, FiUsers } from 'react-icons/fi';
import { FACULTY_PROFILE } from '../../constants/faculty';
import RecentActivity from './RecentActivity';
import StatsCard from './StatsCard';

export default function Dashboard() {
  const totalStudents = useMemo(
    () => FACULTY_PROFILE.courses.reduce((sum, c) => sum + c.students, 0),
    [],
  );

  return (
    <div className="container mx-auto px-4 py-6 md:px-6">
      <h2 className="mb-6 text-2xl font-bold text-gray-800">Dashboard</h2>

      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
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
      </div>

      <section className="rounded-lg bg-white p-6 shadow-md">
        <h3 className="mb-4 text-xl font-semibold text-gray-800">Recent Activities</h3>
        <RecentActivity activities={FACULTY_PROFILE.recentActivities} />
      </section>
    </div>
  );
}
