import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
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
  { to: '/dashboard', icon: FiHome, label: 'Dashboard' },
  { to: '/courses', icon: FiBook, label: 'Courses' },
  { to: '/grades', icon: FiEdit3, label: 'Grades' },
  { to: '/schedule', icon: FiCalendar, label: 'Schedule' },
  { to: '/profile', icon: FiUser, label: 'Profile' },
];

function linkClasses({ isActive }) {
  return [
    'flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition',
    isActive
      ? 'bg-blue-50 text-blue-700'
      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
  ].join(' ');
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <nav className="sticky top-0 z-10 border-b border-gray-200 bg-white shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <NavLink to="/dashboard" className="text-xl font-bold text-blue-800">
          Faculty Portal
        </NavLink>

        <div className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.to} to={item.to} className={linkClasses}>
              <item.icon aria-hidden />
              <span>{item.label}</span>
            </NavLink>
          ))}
          <button
            type="button"
            onClick={handleLogout}
            className="ml-2 flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-red-50 hover:text-red-600"
          >
            <FiLogOut aria-hidden />
            <span>Logout</span>
          </button>
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

      {open && (
        <div className="border-t border-gray-200 bg-white md:hidden">
          <div className="container mx-auto flex flex-col gap-1 px-4 py-3">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={linkClasses}
                onClick={() => setOpen(false)}
              >
                <item.icon aria-hidden />
                <span>{item.label}</span>
              </NavLink>
            ))}
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                handleLogout();
              }}
              className="flex items-center gap-2 rounded-md px-3 py-2 text-left text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600"
            >
              <FiLogOut aria-hidden />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
