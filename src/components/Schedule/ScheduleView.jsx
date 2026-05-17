import { FACULTY_PROFILE } from '../../constants/faculty';

const COLUMNS = ['Day', 'Time', 'Course / Activity', 'Room'];

export default function ScheduleView() {
  return (
    <div className="container mx-auto px-4 py-6 md:px-6">
      <h2 className="mb-6 text-2xl font-bold text-gray-800">Weekly Schedule</h2>
      <div className="overflow-x-auto rounded-lg bg-white shadow-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {COLUMNS.map((col) => (
                <th
                  key={col}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {FACULTY_PROFILE.schedule.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                  {item.day}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{item.time}</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{item.course}</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{item.room}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
