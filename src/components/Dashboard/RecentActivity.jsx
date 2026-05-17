export default function RecentActivity({ activities }) {
  if (!activities?.length) {
    return <p className="text-sm text-gray-500">No recent activity.</p>;
  }

  return (
    <ul className="divide-y divide-gray-200">
      {activities.map((activity) => (
        <li key={activity.id} className="py-3">
          <p className="text-sm font-medium text-gray-900">{activity.action}</p>
          <p className="text-xs text-gray-500">{activity.time}</p>
        </li>
      ))}
    </ul>
  );
}
