import { useState, useEffect } from "react";
import { students as initialStudents } from "../../data";

export default function GradeForm() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [grade, setGrade] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    const savedStudents = JSON.parse(localStorage.getItem('studentGrades'));
    if (savedStudents) {
      setStudents(savedStudents);
      setSelectedStudent(savedStudents[0]?.id || "");
    } else {
      setStudents(initialStudents);
      setSelectedStudent(initialStudents[0]?.id || "");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedStudents = students.map(student =>
      student.id === selectedStudent
        ? { ...student, grade: grade }
        : student
    );

    setStudents(updatedStudents);
    localStorage.setItem('studentGrades', JSON.stringify(updatedStudents));
    setSuccessMsg(`Grade updated to ${grade} for ${students.find(s => s.id === selectedStudent)?.name}`);
    setGrade("");

    setTimeout(() => setSuccessMsg(""), 3000);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Grade Management</h2>

      {successMsg && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
          {successMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Select Student
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(parseInt(e.target.value))}
          >
            {students.map((student) => (
              <option key={student.id} value={student.id}>
                {student.name} (Current: {student.grade})
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Enter Grade
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            placeholder="A, B+, C-, etc."
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
        >
          Submit Grade
        </button>
      </form>
    </div>
  );
}