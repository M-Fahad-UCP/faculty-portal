import { useEffect, useMemo, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from 'framer-motion';
import { FiAward, FiCheckCircle, FiUser, FiXCircle } from 'react-icons/fi';
import { INITIAL_STUDENTS } from '../../constants/faculty';
import { readStorage, writeStorage, STORAGE_KEYS } from '../../lib/storage';

const GRADE_PATTERN = /^[A-F][+-]?$/i;

const GRADE_TONE = {
  A: 'bg-green-100 text-green-700',
  B: 'bg-blue-100 text-blue-700',
  C: 'bg-amber-100 text-amber-700',
  D: 'bg-orange-100 text-orange-700',
  F: 'bg-red-100 text-red-700',
};

function gradeChip(grade) {
  if (!grade) return 'bg-gray-100 text-gray-500';
  return GRADE_TONE[grade[0].toUpperCase()] ?? 'bg-gray-100 text-gray-700';
}

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
};

export default function GradeForm() {
  const [students, setStudents] = useState(() =>
    readStorage(STORAGE_KEYS.grades, INITIAL_STUDENTS),
  );
  const [selectedId, setSelectedId] = useState(() => students[0]?.id ?? '');
  const [grade, setGrade] = useState('');
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    if (!feedback) return undefined;
    const timer = setTimeout(() => setFeedback(null), 3000);
    return () => clearTimeout(timer);
  }, [feedback]);

  const selectedStudent = useMemo(
    () => students.find((s) => s.id === selectedId),
    [students, selectedId],
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const normalized = grade.trim().toUpperCase();

    if (!GRADE_PATTERN.test(normalized)) {
      setFeedback({ type: 'error', text: 'Enter a valid grade (A, A-, B+, C, …).' });
      return;
    }

    const updated = students.map((s) =>
      s.id === selectedId ? { ...s, grade: normalized } : s,
    );
    setStudents(updated);
    writeStorage(STORAGE_KEYS.grades, updated);
    setFeedback({
      type: 'success',
      text: `Grade updated to ${normalized} for ${selectedStudent?.name}.`,
    });
    setGrade('');
  };

  return (
    <div className="container mx-auto px-4 py-8 md:px-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
          Grade Management
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Record or update a student grade. Stored locally on this device.
        </p>
      </div>

      <AnimatePresence>
        {feedback && (
          <motion.div
            key={feedback.text}
            role="status"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className={`mb-4 flex items-center gap-2 rounded-lg border p-3 text-sm ${
              feedback.type === 'success'
                ? 'border-green-200 bg-green-50 text-green-700'
                : 'border-red-200 bg-red-50 text-red-700'
            }`}
          >
            {feedback.type === 'success' ? <FiCheckCircle /> : <FiXCircle />}
            <span>{feedback.text}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <motion.form
          variants={itemVariants}
          initial="hidden"
          animate="show"
          onSubmit={handleSubmit}
          className="rounded-2xl border border-gray-200/70 bg-white p-6 card-shadow lg:col-span-3"
        >
          <h3 className="mb-4 text-lg font-semibold tracking-tight text-gray-900">
            New grade
          </h3>

          <div className="mb-4">
            <label
              htmlFor="student"
              className="mb-1.5 block text-sm font-semibold text-gray-700"
            >
              Student
            </label>
            <div className="relative">
              <FiUser className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <select
                id="student"
                className="w-full appearance-none rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-3 text-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                value={selectedId}
                onChange={(e) => setSelectedId(Number(e.target.value))}
              >
                {students.map((student) => (
                  <option key={student.id} value={student.id}>
                    {student.name} (Current: {student.grade})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-6">
            <label
              htmlFor="grade"
              className="mb-1.5 block text-sm font-semibold text-gray-700"
            >
              New grade
            </label>
            <div className="relative">
              <FiAward className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                id="grade"
                type="text"
                className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-3 text-sm uppercase tracking-wide transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                placeholder="A, B+, C-…"
                maxLength={2}
                required
              />
            </div>
            <p className="mt-1.5 text-xs text-gray-400">
              Letter A–F optionally followed by + or −.
            </p>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="w-full rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 py-2.5 px-4 text-sm font-semibold text-white shadow-md shadow-blue-600/25 transition hover:shadow-lg hover:shadow-blue-600/30 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Submit grade
          </motion.button>
        </motion.form>

        <motion.aside
          variants={itemVariants}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.1 }}
          className="rounded-2xl border border-gray-200/70 bg-white p-6 card-shadow lg:col-span-2"
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Selected student
          </p>
          {selectedStudent ? (
            <>
              <div className="mt-3 flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 text-base font-bold text-blue-700">
                  {selectedStudent.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .slice(0, 2)}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-base font-semibold text-gray-900">
                    {selectedStudent.name}
                  </p>
                  <p className="text-xs text-gray-500">Student #{selectedStudent.id}</p>
                </div>
              </div>

              <div className="mt-5 rounded-xl bg-gray-50 p-4">
                <p className="text-xs font-medium text-gray-500">Current grade</p>
                <div className="mt-1.5 flex items-center justify-between">
                  <span
                    className={`inline-flex items-center rounded-md px-3 py-1 text-2xl font-bold ${gradeChip(
                      selectedStudent.grade,
                    )}`}
                  >
                    {selectedStudent.grade || '—'}
                  </span>
                  {grade && GRADE_PATTERN.test(grade.trim()) && (
                    <motion.span
                      initial={{ opacity: 0, x: -4 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs text-gray-500"
                    >
                      →
                      <span
                        className={`ml-2 inline-flex items-center rounded-md px-2 py-0.5 text-sm font-bold ${gradeChip(
                          grade.trim().toUpperCase(),
                        )}`}
                      >
                        {grade.trim().toUpperCase()}
                      </span>
                    </motion.span>
                  )}
                </div>
              </div>
            </>
          ) : (
            <p className="mt-3 text-sm text-gray-500">No student selected.</p>
          )}
        </motion.aside>
      </div>
    </div>
  );
}
