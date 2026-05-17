import { useEffect, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from 'framer-motion';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  FiBook,
  FiCalendar,
  FiEdit3,
  FiHome,
  FiLogOut,
  FiMenu,
  FiUser,
  FiX,
} from 'react-icons/fi';
import { useAuth } from '../hooks/useAuth';

const NAV_ITEMS = [
  { to: '/dashboard', icon: <FiHome aria-hidden />, label: 'Dashboard' },
  { to: '/courses', icon: <FiBook aria-hidden />, label: 'Courses' },
  { to: '/grades', icon: <FiEdit3 aria-hidden />, label: 'Grades' },
  { to: '/schedule', icon: <FiCalendar aria-hidden />, label: 'Schedule' },
  { to: '/profile', icon: <FiUser aria-hidden />, label: 'Profile' },
];

function DesktopNavItem({ to, icon, label, isActive }) {
  return (
    <NavLink
      to={to}
      className="relative flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
    >
      {isActive && (
        <motion.span
          layoutId="nav-active"
          className="absolute inset-0 -z-0 rounded-md bg-blue-50"
          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
        />
      )}
      <span
        className={`relative z-10 inline-flex items-center gap-2 ${
          isActive ? 'text-blue-700' : ''
        }`}
      >
        {icon}
        <span>{label}</span>
      </span>
    </NavLink>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <nav
      className={`sticky top-0 z-20 border-b transition-colors ${
        scrolled
          ? 'border-gray-200 bg-white/80 backdrop-blur-md'
          : 'border-transparent bg-white/60 backdrop-blur'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <NavLink to="/dashboard" className="group flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 text-sm font-bold text-white shadow-sm">
            FP
          </span>
          <span className="text-lg font-bold tracking-tight text-gray-900 group-hover:text-blue-700">
            Faculty Portal
          </span>
        </NavLink>

        <div className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => (
            <DesktopNavItem
              key={item.to}
              to={item.to}
              icon={item.icon}
              label={item.label}
              isActive={location.pathname === item.to}
            />
          ))}
          <motion.button
            type="button"
            onClick={handleLogout}
            whileTap={{ scale: 0.96 }}
            className="ml-2 flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-red-50 hover:text-red-600"
          >
            <FiLogOut aria-hidden />
            <span>Logout</span>
          </motion.button>
        </div>

        <button
          type="button"
          className="rounded-md p-2 text-gray-600 hover:bg-gray-100 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-gray-200 bg-white md:hidden"
          >
            <div className="container mx-auto flex flex-col gap-1 px-4 py-3">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    [
                      'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                    ].join(' ')
                  }
                >
                  {item.icon}
                  <span>{item.label}</span>
                </NavLink>
              ))}
              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-3 rounded-md px-3 py-2 text-left text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600"
              >
                <FiLogOut aria-hidden />
                <span>Logout</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
