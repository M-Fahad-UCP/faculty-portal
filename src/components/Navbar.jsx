import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiHome, FiBook, FiCalendar, FiUser, FiLogOut } from "react-icons/fi";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('facultyAuth');
    navigate("/");
    window.location.reload();
  };

  const navItems = [
    { path: "/dashboard", icon: <FiHome />, label: "Dashboard" },
    { path: "/courses", icon: <FiBook />, label: "Courses" },
    { path: "/grades", icon: <FiBook />, label: "Grades" },
    { path: "/schedule", icon: <FiCalendar />, label: "Schedule" },
    { path: "/profile", icon: <FiUser />, label: "Profile" },
  ];

  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/dashboard" className="text-xl font-bold text-blue-800">Faculty Portal</Link>
        <div className="flex space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-2 ${
                location.pathname === item.path ? "text-blue-600" : "text-gray-600"
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 text-gray-600 hover:text-red-600"
          >
            <FiLogOut />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
}