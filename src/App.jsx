import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import PageSpinner from './components/common/PageSpinner';
import NotFound from './components/common/NotFound';
import ProtectedRoute, { PublicOnlyRoute } from './routes/ProtectedRoute';

const Login = lazy(() => import('./components/Auth/Login'));
const Dashboard = lazy(() => import('./components/Dashboard/Dashboard'));
const CoursesList = lazy(() => import('./components/Courses/CoursesList'));
const GradeForm = lazy(() => import('./components/Grades/GradeForm'));
const ScheduleView = lazy(() => import('./components/Schedule/ScheduleView'));
const Profile = lazy(() => import('./components/Profile/Profile'));

export default function App() {
  return (
    <Suspense fallback={<PageSpinner />}>
      <Routes>
        <Route element={<PublicOnlyRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/courses" element={<CoursesList />} />
            <Route path="/grades" element={<GradeForm />} />
            <Route path="/schedule" element={<ScheduleView />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
