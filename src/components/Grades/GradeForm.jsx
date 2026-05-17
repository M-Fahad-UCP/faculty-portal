import { useEffect, useMemo, useState } from 'react';
import { INITIAL_STUDENTS } from '../../constants/faculty';
import { readStorage, writeStorage, STORAGE_KEYS } from '../../lib/storage';

const GRADE_PATTERN = /^[A-F][+-]?$/i;

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
    <div className="container mx-auto px-4 py-6 md:px-6">
      <h2 className="mb-6 text-2xl font-bold text-gray-800">Grade Management</h2>

      {feedback && (
        <div
          role="status"
          className={`mb-4 rounded-md p-3 text-sm ${
            feedback.type === 'success'
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
          }`}
        >
          {feedback.text}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="max-w-xl rounded-lg bg-white p-6 shadow-md"
      >
        <div className="mb-4">
          <label htmlFor="student" className="mb-2 block text-sm font-semibold text-gray-700">
            Select Student
          </label>
          <select
            id="student"
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
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

        <div className="mb-6">
          <label htmlFor="grade" className="mb-2 block text-sm font-semibold text-gray-700">
            New Grade
          </label>
          <input
            id="grade"
            type="text"
            className="w-full rounded-md border border-gray-300 px-3 py-2 uppercase focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            placeholder="A, B+, C-, …"
            maxLength={2}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-blue-600 py-2 px-4 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Submit Grade
        </button>
      </form>
    </div>
  );
}
