import { FACULTY_PROFILE } from '../../constants/faculty';
import CourseCard from './CourseCard';

export default function CoursesList() {
  return (
    <div className="container mx-auto px-4 py-6 md:px-6">
      <h2 className="mb-6 text-2xl font-bold text-gray-800">My Courses</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {FACULTY_PROFILE.courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}
