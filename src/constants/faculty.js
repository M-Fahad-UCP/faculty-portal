export const FACULTY_PROFILE = {
  name: 'Dr. Ahmed Ali Khan',
  department: 'Software Engineering',
  email: 'u.khan@pu.edu.pk',
  courses: [
    { id: 1, code: 'SECP4063', name: 'Advanced Web Programming', students: 38 },
    { id: 2, code: 'SENS3523', name: 'Computer Comm. & Networks', students: 30 },
    { id: 3, code: 'AL143', name: 'Discrete Structure', students: 35 },
  ],
  schedule: [
    { id: 's1', day: 'Monday', time: '9:00 AM - 11:00 AM', course: 'SEST2613', room: 'A-302' },
    { id: 's2', day: 'Tuesday', time: '1:00 PM - 3:00 PM', course: 'SENS3523', room: 'B-205' },
    { id: 's3', day: 'Wednesday', time: '10:00 AM - 12:00 PM', course: 'SESD3253', room: 'A-101' },
    { id: 's4', day: 'Thursday', time: '2:00 PM - 4:00 PM', course: 'Office Hours', room: 'F-305' },
  ],
  recentActivities: [
    { id: 1, action: 'Posted grades for SECP3053 Midterm', time: '2 hours ago' },
    { id: 2, action: 'Updated SESE4143 syllabus', time: '1 day ago' },
    { id: 3, action: 'Responded to student inquiry', time: '2 days ago' },
  ],
};

export const INITIAL_STUDENTS = [
  { id: 1, name: 'Ali Ahmed', grade: 'A-' },
  { id: 2, name: 'Bilal Hassan', grade: 'B+' },
  { id: 3, name: 'Omar Farooq', grade: 'A' },
  { id: 4, name: 'Usman Malik', grade: 'B' },
  { id: 5, name: 'Haris Riaz', grade: 'A+' },
  { id: 6, name: 'Zain Khan', grade: 'C+' },
  { id: 7, name: 'Taha Sheikh', grade: 'B-' },
  { id: 8, name: 'Fahad Mahmood', grade: 'A' },
];

export const DEMO_CREDENTIALS = {
  email: 'u.khan@pu.edu.pk',
  password: 'pu@cs2024',
};
