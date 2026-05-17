import { lazy, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import PageSpinner from './components/common/PageSpinner';
import PageTransition from './components/common/PageTransition';
import NotFound from './components/common/NotFound';
import ProtectedRoute, { PublicOnlyRoute } from './routes/ProtectedRoute';

const Login = lazy(() => import('./components/Auth/Login'));
const Dashboard = lazy(() => import('./components/Dashboard/Dashboard'));
const CoursesList = lazy(() => import('./components/Courses/CoursesList'));
const GradeForm = lazy(() => import('./components/Grades/GradeForm'));
const ScheduleView = lazy(() => import('./components/Schedule/ScheduleView'));
const Profile = lazy(() => import('./components/Profile/Profile'));

const withTransition = (page) => <PageTransition>{page}</PageTransition>;

export default function App() {
  const location = useLocation();

  return (
    <Suspense fallback={<PageSpinner />}>
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route element={<PublicOnlyRoute />}>
            <Route path="/login" element={withTransition(<Login />)} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={withTransition(<Dashboard />)} />
              <Route path="/courses" element={withTransition(<CoursesList />)} />
              <Route path="/grades" element={withTransition(<GradeForm />)} />
              <Route path="/schedule" element={withTransition(<ScheduleView />)} />
              <Route path="/profile" element={withTransition(<Profile />)} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </Suspense>
  );
}
