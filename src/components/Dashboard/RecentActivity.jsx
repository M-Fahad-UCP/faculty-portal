export default function RecentActivity({ activities }) {
    return (
      <ul className="divide-y divide-gray-200">
        {activities.map((activity) => (
          <li key={activity.id} className="py-4">
            <div className="flex items-center">
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                <p className="text-sm text-gray-500">{activity.time}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    );
  }