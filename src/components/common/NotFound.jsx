// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gray-50 px-6 py-16">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(700px 400px at 20% 10%, rgba(59,130,246,0.15), transparent 60%), radial-gradient(700px 400px at 90% 90%, rgba(139,92,246,0.13), transparent 60%)',
        }}
      />
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative text-center"
      >
        <motion.p
          variants={itemVariants}
          className="bg-gradient-to-br from-blue-600 to-indigo-600 bg-clip-text text-[10rem] font-extrabold leading-none tracking-tighter text-transparent sm:text-[12rem]"
        >
          404
        </motion.p>
        <motion.h1
          variants={itemVariants}
          className="mt-2 text-3xl font-bold tracking-tight text-gray-900"
        >
          Page not found
        </motion.h1>
        <motion.p variants={itemVariants} className="mt-2 text-gray-500">
          The page you’re looking for doesn’t exist or has been moved.
        </motion.p>
        <motion.div variants={itemVariants} className="mt-8">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-600"
          >
            <FiArrowLeft />
            Back to dashboard
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
