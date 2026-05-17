import { useState, useEffect } from "react";
import { facultyData as initialData } from "../../data";

export default function Profile() {
  const [profile, setProfile] = useState(initialData);
  const [isEditing, setIsEditing] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  // Load saved profile data
  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem('facultyProfile'));
    if (savedProfile) setProfile(savedProfile);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('facultyProfile', JSON.stringify(profile));
    setSuccessMsg("Profile updated successfully!");
    setIsEditing(false);
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">My Profile</h2>

      {successMsg && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 text-sm rounded-md">
          {successMsg}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl">
        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <div className="flex items-center space-x-6 mb-6">
              <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center text-2xl font-bold text-gray-600">
                {profile.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-blue-500 text-xl font-bold"
                  required
                />
                <input
                  type="text"
                  name="department"
                  value={profile.department}
                  onChange={handleChange}
                  className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-blue-500 text-gray-600"
                  required
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Email</label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-blue-500 text-gray-800"
                  required
                />
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Courses Teaching</h4>
                <ul className="list-disc list-inside text-gray-800">
                  {profile.courses.map(course => (
                    <li key={course.id}>{course.code}: {course.name}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 flex space-x-3">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 text-sm font-medium rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <>
            <div className="flex items-center space-x-6 mb-6">
              <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center text-2xl font-bold text-gray-600">
                {profile.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">{profile.name}</h3>
                <p className="text-gray-600">{profile.department}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500">Email</h4>
                <p className="text-gray-800">{profile.email}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Department</h4>
                <p className="text-gray-800">{profile.department}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Courses Teaching</h4>
                <ul className="list-disc list-inside text-gray-800">
                  {profile.courses.map(course => (
                    <li key={course.id}>{course.code}: {course.name}</li>
                  ))}
                </ul>
              </div>
            </div>

            <button
              onClick={() => setIsEditing(true)}
              className="mt-6 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
            >
              Edit Profile
            </button>
          </>
        )}
      </div>
    </div>
  );
}