// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import AnimatedNumber from '../common/AnimatedNumber';

const TONES = {
  blue: {
    surface: 'from-blue-50/80 to-white',
    icon: 'bg-blue-100 text-blue-700',
    accent: 'text-blue-700',
  },
  green: {
    surface: 'from-green-50/80 to-white',
    icon: 'bg-green-100 text-green-700',
    accent: 'text-green-700',
  },
  purple: {
    surface: 'from-violet-50/80 to-white',
    icon: 'bg-violet-100 text-violet-700',
    accent: 'text-violet-700',
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

export default function StatsCard({ title, value, Icon, tone = 'blue' }) {
  const t = TONES[tone] ?? TONES.blue;
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -3 }}
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      className={`relative overflow-hidden rounded-2xl border border-gray-200/70 bg-gradient-to-br ${t.surface} p-5 card-shadow`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            {title}
          </p>
          <h3 className={`mt-2 text-3xl font-bold tracking-tight ${t.accent}`}>
            <AnimatedNumber value={value} />
          </h3>
        </div>
        {Icon && (
          <div className={`grid h-10 w-10 place-items-center rounded-xl ${t.icon}`}>
            <Icon className="text-lg" aria-hidden />
          </div>
        )}
      </div>
    </motion.div>
  );
}
