import StatsCard from "./StatsCard";
import RecentActivity from "./RecentActivity";
import { facultyData } from "../../data";

export default function Dashboard() {
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatsCard
          title="Total Courses"
          value={facultyData.courses.length}
          icon="📚"
          color="bg-blue-100 text-blue-800"
        />
        <StatsCard
          title="Total Students"
          value={facultyData.courses.reduce((sum, course) => sum + course.students, 0)}
          icon="👨‍🎓"
          color="bg-green-100 text-green-800"
        />
        <StatsCard
          title="Upcoming Classes"
          value={facultyData.schedule.length}
          icon="⏰"
          color="bg-purple-100 text-purple-800"
        />
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Activities</h3>
        <RecentActivity activities={facultyData.recentActivities} />
      </div>
    </div>
  );
}