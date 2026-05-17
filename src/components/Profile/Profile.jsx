import { useEffect, useMemo, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from 'framer-motion';
import { FiBookOpen, FiCheck, FiEdit2, FiMail, FiX } from 'react-icons/fi';
import { FACULTY_PROFILE } from '../../constants/faculty';
import { mergeStorage, writeStorage, STORAGE_KEYS } from '../../lib/storage';

function getInitials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}

const panelVariants = {
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -6, transition: { duration: 0.2 } },
};

export default function Profile() {
  const [profile, setProfile] = useState(() =>
    mergeStorage(STORAGE_KEYS.profile, FACULTY_PROFILE),
  );
  const [draft, setDraft] = useState(profile);
  const [isEditing, setIsEditing] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const initials = useMemo(() => getInitials(profile.name), [profile.name]);

  useEffect(() => {
    if (!successMsg) return undefined;
    const timer = setTimeout(() => setSuccessMsg(''), 3000);
    return () => clearTimeout(timer);
  }, [successMsg]);

  const startEdit = () => {
    setDraft(profile);
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setDraft(profile);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDraft((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProfile(draft);
    writeStorage(STORAGE_KEYS.profile, draft);
    setIsEditing(false);
    setSuccessMsg('Profile updated successfully!');
  };

  return (
    <div className="container mx-auto px-4 py-8 md:px-6">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">My Profile</h2>
          <p className="mt-1 text-sm text-gray-500">
            Your faculty information, courses, and contact details.
          </p>
        </div>
        {!isEditing && (
          <motion.button
            type="button"
            whileTap={{ scale: 0.96 }}
            onClick={startEdit}
            className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-3.5 py-2 text-sm font-semibold text-white transition hover:bg-blue-600"
          >
            <FiEdit2 /> Edit
          </motion.button>
        )}
      </div>

      <AnimatePresence>
        {successMsg && (
          <motion.div
            role="status"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="mb-4 flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700"
          >
            <FiCheck /> {successMsg}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="overflow-hidden rounded-2xl border border-gray-200/70 bg-white card-shadow">
        <div className="relative h-28 bg-gradient-to-br from-blue-500 via-indigo-500 to-violet-500">
          <div
            aria-hidden
            className="absolute inset-0 [background-image:radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.18),transparent_50%),radial-gradient(circle_at_80%_120%,rgba(255,255,255,0.15),transparent_55%)]"
          />
        </div>

        <div className="-mt-14 px-6 pb-6">
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 grid h-24 w-24 place-items-center rounded-full border-4 border-white bg-gradient-to-br from-blue-100 to-indigo-100 text-2xl font-bold text-blue-700 shadow-lg"
            aria-hidden
          >
            {initials}
          </motion.div>

          <div className="mt-4">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900">
              {profile.name}
            </h3>
            <p className="text-sm text-gray-500">{profile.department}</p>
            <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-gray-600">
              <FiMail className="text-gray-400" /> {profile.email}
            </p>
          </div>

          <div className="mt-6 border-t border-gray-100 pt-6">
            <AnimatePresence mode="wait" initial={false}>
              {isEditing ? (
                <motion.form
                  key="edit"
                  variants={panelVariants}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  onSubmit={handleSubmit}
                  className="grid grid-cols-1 gap-4 sm:grid-cols-2"
                >
                  <Field
                    label="Full Name"
                    name="name"
                    value={draft.name}
                    onChange={handleChange}
                  />
                  <Field
                    label="Department"
                    name="department"
                    value={draft.department}
                    onChange={handleChange}
                  />
                  <Field
                    label="Email"
                    name="email"
                    type="email"
                    value={draft.email}
                    onChange={handleChange}
                    full
                  />

                  <div className="sm:col-span-2">
                    <CourseList courses={profile.courses} />
                  </div>

                  <div className="flex gap-3 sm:col-span-2">
                    <motion.button
                      type="submit"
                      whileTap={{ scale: 0.97 }}
                      className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-blue-600/25 transition hover:shadow-lg hover:shadow-blue-600/30"
                    >
                      <FiCheck /> Save changes
                    </motion.button>
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.97 }}
                      onClick={cancelEdit}
                      className="inline-flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-200"
                    >
                      <FiX /> Cancel
                    </motion.button>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="view"
                  variants={panelVariants}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                >
                  <CourseList courses={profile.courses} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, name, value, onChange, type = 'text', full }) {
  return (
    <div className={full ? 'sm:col-span-2' : undefined}>
      <label htmlFor={name} className="block text-xs font-semibold uppercase tracking-wider text-gray-500">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required
        className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
      />
    </div>
  );
}

function CourseList({ courses }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
        Courses Teaching
      </p>
      <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {courses.map((course) => (
          <li
            key={course.id}
            className="flex items-start gap-3 rounded-lg border border-gray-100 bg-gray-50/60 p-3"
          >
            <span className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-md bg-white text-blue-600 shadow-sm">
              <FiBookOpen className="text-sm" />
            </span>
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                {course.code}
              </p>
              <p className="truncate text-sm font-medium text-gray-800">{course.name}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
