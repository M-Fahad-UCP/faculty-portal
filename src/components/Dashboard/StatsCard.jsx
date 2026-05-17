export default function StatsCard({ title, value, icon, color }) {
    return (
      <div className={`${color} p-6 rounded-lg shadow-md`}>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm font-medium">{title}</p>
            <h3 className="text-2xl font-bold">{value}</h3>
          </div>
          <span className="text-3xl">{icon}</span>
        </div>
      </div>
    );
  }