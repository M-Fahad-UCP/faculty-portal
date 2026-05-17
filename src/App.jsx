import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Auth/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import CoursesList from "./components/Courses/CoursesList";
import GradeForm from "./components/Grades/GradeForm";
import ScheduleView from "./components/Schedule/ScheduleView";
import Profile from "./components/Profile/Profile";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('facultyAuth') === 'true';
  });

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem('facultyAuth', 'true');
    } else {
      localStorage.removeItem('facultyAuth');
    }
  }, [isAuthenticated]);

  return (
    <div className="min-h-screen bg-gray-50">
      {isAuthenticated && <Navbar />}
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />}
        />
        <Route
          path="/courses"
          element={isAuthenticated ? <CoursesList /> : <Navigate to="/" />}
        />
        <Route
          path="/grades"
          element={isAuthenticated ? <GradeForm /> : <Navigate to="/" />}
        />
        <Route
          path="/schedule"
          element={isAuthenticated ? <ScheduleView /> : <Navigate to="/" />}
        />
        <Route
          path="/profile"
          element={isAuthenticated ? <Profile /> : <Navigate to="/" />}
        />
      </Routes>
    </div>
  );
}