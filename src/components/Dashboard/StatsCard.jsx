const TONES = {
  blue: 'bg-blue-50 text-blue-800',
  green: 'bg-green-50 text-green-800',
  purple: 'bg-purple-50 text-purple-800',
};

export default function StatsCard({ title, value, Icon, tone = 'blue' }) {
  return (
    <div className={`${TONES[tone] ?? TONES.blue} flex items-center justify-between rounded-lg p-6 shadow-md`}>
      <div>
        <p className="text-sm font-medium opacity-80">{title}</p>
        <h3 className="text-3xl font-bold">{value}</h3>
      </div>
      {Icon && <Icon className="text-3xl opacity-80" aria-hidden />}
    </div>
  );
}
