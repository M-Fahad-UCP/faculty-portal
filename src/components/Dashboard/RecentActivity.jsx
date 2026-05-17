// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { FiActivity } from 'react-icons/fi';

const listVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -8 },
  show: { opacity: 1, x: 0, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
};

export default function RecentActivity({ activities }) {
  if (!activities?.length) {
    return <p className="text-sm text-gray-500">No recent activity.</p>;
  }

  return (
    <motion.ul
      variants={listVariants}
      initial="hidden"
      animate="show"
      className="space-y-3"
    >
      {activities.map((activity) => (
        <motion.li
          key={activity.id}
          variants={itemVariants}
          className="flex items-start gap-3 rounded-lg border border-gray-100 bg-white/60 p-3 transition hover:border-gray-200 hover:bg-white"
        >
          <span className="mt-0.5 grid h-8 w-8 flex-shrink-0 place-items-center rounded-full bg-blue-50 text-blue-600">
            <FiActivity className="text-sm" aria-hidden />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-gray-900">{activity.action}</p>
            <p className="text-xs text-gray-500">{activity.time}</p>
          </div>
        </motion.li>
      ))}
    </motion.ul>
  );
}
