// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { FACULTY_PROFILE } from '../../constants/faculty';
import CourseCard from './CourseCard';

const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

export default function CoursesList() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">My Courses</h2>
        <p className="mt-1 text-sm text-gray-500">
          {FACULTY_PROFILE.courses.length} active courses this semester
        </p>
      </div>
      <motion.div
        variants={gridVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {FACULTY_PROFILE.courses.map((course) => (
          <motion.div key={course.id} variants={cardVariants}>
            <CourseCard course={course} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
