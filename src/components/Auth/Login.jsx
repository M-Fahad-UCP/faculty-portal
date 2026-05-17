import { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, useReducedMotion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiArrowRight, FiLock, FiMail } from 'react-icons/fi';
import { useAuth } from '../../hooks/useAuth';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
};

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const reduce = useReducedMotion();
  const redirectTo = location.state?.from?.pathname ?? '/dashboard';

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const result = login({ email, password });
    if (result.ok) {
      navigate(redirectTo, { replace: true });
    } else {
      setError(result.error);
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gray-50 px-4 py-12">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(800px 400px at 20% 0%, rgba(59,130,246,0.18), transparent 60%), radial-gradient(700px 380px at 90% 100%, rgba(139,92,246,0.16), transparent 60%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [background-image:linear-gradient(rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.04)_1px,transparent_1px)] [background-size:32px_32px]"
      />

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-md"
      >
        <div className="rounded-2xl border border-white/60 bg-white/80 p-8 shadow-[0_20px_60px_-15px_rgba(15,23,42,0.20),0_8px_20px_-8px_rgba(15,23,42,0.10)] backdrop-blur-xl">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={itemVariants} className="mb-6 text-center">
              <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/25">
                <span className="text-sm font-bold tracking-wide">FP</span>
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                Welcome back
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Sign in to access your faculty portal
              </p>
            </motion.div>

            {error && (
              <motion.div
                role="alert"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
              >
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <motion.div variants={itemVariants} className="mb-4">
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-sm font-semibold text-gray-700"
                >
                  University Email
                </label>
                <div className="relative">
                  <FiMail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    id="email"
                    type="email"
                    className="w-full rounded-lg border border-gray-200 bg-white/70 py-2.5 pl-10 pr-3 text-sm transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="you@university.edu"
                    autoComplete="username"
                  />
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="mb-6">
                <label
                  htmlFor="password"
                  className="mb-1.5 block text-sm font-semibold text-gray-700"
                >
                  Password
                </label>
                <div className="relative">
                  <FiLock className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    id="password"
                    type="password"
                    className="w-full rounded-lg border border-gray-200 bg-white/70 py-2.5 pl-10 pr-3 text-sm transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    autoComplete="current-password"
                  />
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={reduce ? undefined : { scale: 1.01 }}
                  whileTap={reduce ? undefined : { scale: 0.98 }}
                  className="group flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 py-2.5 px-4 text-sm font-semibold text-white shadow-md shadow-blue-600/25 transition hover:shadow-lg hover:shadow-blue-600/30 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  <span>{isLoading ? 'Signing in…' : 'Sign in'}</span>
                  {!isLoading && (
                    <FiArrowRight className="transition-transform group-hover:translate-x-0.5" />
                  )}
                </motion.button>
              </motion.div>
            </form>
          </motion.div>
        </div>

        <p className="mt-6 text-center text-xs text-gray-400">
          Demo build &mdash; credentials in <code>src/constants/faculty.js</code>
        </p>
      </motion.div>
    </div>
  );
}
