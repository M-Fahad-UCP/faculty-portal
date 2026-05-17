export default function CourseCard({ course }) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-800">{course.code}</h3>
          <p className="text-gray-600 mt-1">{course.name}</p>
          <div className="mt-4 flex justify-between items-center">
            <span className="text-sm font-medium text-gray-500">
              {course.students} students
            </span>
            <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700">
              View Details
            </button>
          </div>
        </div>
      </div>
    );
  }