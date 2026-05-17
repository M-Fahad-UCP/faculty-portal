import { useEffect, useMemo, useState } from 'react';
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
    <div className="container mx-auto px-4 py-6 md:px-6">
      <h2 className="mb-6 text-2xl font-bold text-gray-800">My Profile</h2>

      {successMsg && (
        <div
          role="status"
          className="mb-4 rounded-md bg-green-100 p-3 text-sm text-green-700"
        >
          {successMsg}
        </div>
      )}

      <div className="max-w-2xl rounded-lg bg-white p-6 shadow-md">
        <div className="mb-6 flex items-center space-x-6">
          <div
            className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-2xl font-bold text-blue-700"
            aria-hidden
          >
            {initials}
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">{profile.name}</h3>
            <p className="text-gray-600">{profile.department}</p>
          </div>
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Field label="Full Name" name="name" value={draft.name} onChange={handleChange} />
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
            />

            <CourseList courses={profile.courses} />

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={cancelEdit}
                className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800 transition hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <>
            <div className="space-y-4">
              <ReadOnly label="Email" value={profile.email} />
              <ReadOnly label="Department" value={profile.department} />
              <CourseList courses={profile.courses} />
            </div>
            <button
              type="button"
              onClick={startEdit}
              className="mt-6 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              Edit Profile
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function Field({ label, name, value, onChange, type = 'text' }) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-500">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required
        className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-800 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

function ReadOnly({ label, value }) {
  return (
    <div>
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="text-gray-800">{value}</p>
    </div>
  );
}

function CourseList({ courses }) {
  return (
    <div>
      <p className="text-sm font-medium text-gray-500">Courses Teaching</p>
      <ul className="mt-1 list-inside list-disc text-gray-800">
        {courses.map((course) => (
          <li key={course.id}>
            <span className="font-semibold">{course.code}</span>: {course.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
