export interface Course {
  code: string;
  title: string;
  credits: number;
  grade: string;
  points: number;
  type: "Theory" | "Lab";
  section: string;
}

export interface AttendanceRecord {
  lectureNo: number;
  date: string;
  duration: string;
  status: "Present" | "Absent" | "Leave";
}

export interface CourseAttendance {
  courseCode: string;
  held: number;
  attended: number;
  absent: number;
  percentage: number;
  records: AttendanceRecord[];
}

export interface MarkItem {
  component: string;
  totalMarks: number;
  obtainedMarks: number;
  classAverage: number;
  classMin: number;
  classMax: number;
}

export interface CourseMarks {
  courseCode: string;
  items: MarkItem[];
}

export interface StudentProfile {
  name: string;
  rollNo: string;
  degree: string;
  section: string;
  semester: string;
  campus: string;
  email: string;
  cnic: string;
  mobile: string;
  admissionDate: string;
  guardianName: string;
  feeStatus: "Paid" | "Unpaid";
  cgpa: number;
  sgpa: number;
}

export const STUDENT_PROFILE: StudentProfile = {
  name: "Syed Lutfan Haider",
  rollNo: "24K-3052",
  degree: "BS (software Enginnering )",
  section: "BSE-4A",
  semester: "4th Semester (Spring 2026)",
  campus: "Karachi Campus",
  email: "k243052@nu.edu.pk",
  cnic: "41302-3134205-3",
  mobile: "03181300122",
  admissionDate: "August 15, 2024",
  guardianName: "Syed Hassan jafri",
  feeStatus: "Paid",
  cgpa: 2.86,
  sgpa: 2.91,
};

export const COURSES_4TH_SEM: Course[] = [
  {
    code: "CL2001",
    title: "Data Structures - Lab",
    credits: 1,
    grade: "B-",
    points: 2.67,
    type: "Lab",
    section: "BCS-4A",
  },
  {
    code: "CS2001",
    title: "Data Structures",
    credits: 3,
    grade: "B-",
    points: 2.67,
    type: "Theory",
    section: "BCS-4A",
  },
  {
    code: "MT2005",
    title: "Probability and Statistics",
    credits: 3,
    grade: "C+",
    points: 2.33,
    type: "Theory",
    section: "BSE-4B",
  },
  {
    code: "SE2001",
    title: "Software Requirements Engineering",
    credits: 3,
    grade: "A-",
    points: 3.67,
    type: "Theory",
    section: "BSE-4B",
  },
  {
    code: "SE2004",
    title: "Software Design and Architecture",
    credits: 3,
    grade: "B+",
    points: 3.33,
    type: "Theory",
    section: "BSE-4B",
  },
  {
    code: "SS1015",
    title: "Pakistan Studies",
    credits: 2,
    grade: "A+",
    points: 4.00,
    type: "Theory",
    section: "BSE-4B",
  },
];

// Attendance data
const makeRecords = (
  dates: string[],
  absentAt: number[]
): AttendanceRecord[] =>
  dates.map((date, idx) => ({
    lectureNo: idx + 1,
    date,
    duration: "1",
    status: absentAt.includes(idx + 1) ? "Absent" : "Present",
  }));

const labDates = [
  "20-Jan-2026","29-Jan-2026","12-Feb-2026","19-Feb-2026","26-Feb-2026",
  "05-Mar-2026","12-Mar-2026","19-Mar-2026","26-Mar-2026","03-Apr-2026",
  "16-Apr-2026","23-Apr-2026","30-Apr-2026",
];

const theoryDates = [
  "20-Jan-2026","22-Jan-2026","27-Jan-2026","29-Jan-2026","03-Feb-2026",
  "05-Feb-2026","10-Feb-2026","12-Feb-2026","17-Feb-2026","19-Feb-2026",
  "24-Feb-2026","26-Feb-2026","03-Mar-2026","05-Mar-2026","10-Mar-2026",
  "12-Mar-2026","17-Mar-2026","19-Mar-2026","24-Mar-2026","26-Mar-2026",
  "02-Apr-2026","07-Apr-2026","09-Apr-2026","14-Apr-2026","16-Apr-2026",
  "21-Apr-2026","23-Apr-2026","28-Apr-2026",
];

export const ATTENDANCE_DATA: CourseAttendance[] = [
  {
    courseCode: "CL2001",
    held: 13,
    attended: 9,
    absent: 4,
    percentage: 69.23,
    records: makeRecords(labDates, [1, 3, 4, 5]),
  },
  {
    courseCode: "CS2001",
    held: 28,
    attended: 24,
    absent: 4,
    percentage: 85.71,
    records: makeRecords(theoryDates, [3, 9, 17, 24]),
  },
  {
    courseCode: "MT2005",
    held: 28,
    attended: 23,
    absent: 5,
    percentage: 82.14,
    records: makeRecords(theoryDates, [2, 8, 14, 20, 26]),
  },
  {
    courseCode: "SE2001",
    held: 28,
    attended: 25,
    absent: 3,
    percentage: 89.29,
    records: makeRecords(theoryDates, [5, 12, 22]),
  },
  {
    courseCode: "SE2004",
    held: 28,
    attended: 24,
    absent: 4,
    percentage: 85.71,
    records: makeRecords(theoryDates, [4, 11, 19, 25]),
  },
  {
    courseCode: "SS1015",
    held: 18,
    attended: 16,
    absent: 2,
    percentage: 88.89,
    records: makeRecords(theoryDates.slice(0, 18), [6, 13]),
  },
];

// Marks: Quiz(10) + Assignment(10) + Sessional1(15) + Sessional2(15) + Final(50) = 100
export const MARKS_DATA: CourseMarks[] = [
  {
    courseCode: "CL2001",
    items: [
      { component: "Quiz",       totalMarks: 10, obtainedMarks: 7,  classAverage: 6.8,  classMin: 2,  classMax: 10 },
      { component: "Assignment", totalMarks: 10, obtainedMarks: 8,  classAverage: 7.5,  classMin: 3,  classMax: 10 },
      { component: "Sessional 1",totalMarks: 15, obtainedMarks: 10, classAverage: 10.2, classMin: 4,  classMax: 15 },
      { component: "Sessional 2",totalMarks: 15, obtainedMarks: 10,  classAverage: 9.8,  classMin: 3,  classMax: 15 },
      { component: "Final",      totalMarks: 50, obtainedMarks: 35, classAverage: 30.5, classMin: 10, classMax: 48 },
    ],
  },
  {
    courseCode: "CS2001",
    items: [
      { component: "Quiz",       totalMarks: 10, obtainedMarks: 7,  classAverage: 6.5,  classMin: 1,  classMax: 10 },
      { component: "Assignment", totalMarks: 10, obtainedMarks: 7,  classAverage: 7.2,  classMin: 2,  classMax: 10 },
      { component: "Sessional 1",totalMarks: 15, obtainedMarks: 11,  classAverage: 9.4,  classMin: 3,  classMax: 15 },
      { component: "Sessional 2",totalMarks: 15, obtainedMarks: 10,  classAverage: 8.8,  classMin: 3,  classMax: 15 },
      { component: "Final",      totalMarks: 50, obtainedMarks: 35, classAverage: 29.1, classMin: 8,  classMax: 47 },
    ],
  },
  {
    courseCode: "MT2005",
    items: [
      { component: "Quiz",       totalMarks: 10, obtainedMarks: 6,  classAverage: 6.1,  classMin: 1,  classMax: 10 },
      { component: "Assignment", totalMarks: 10, obtainedMarks: 7,  classAverage: 6.8,  classMin: 2,  classMax: 10 },
      { component: "Sessional 1",totalMarks: 15, obtainedMarks: 11,  classAverage: 8.5,  classMin: 3,  classMax: 15 },
      { component: "Sessional 2",totalMarks: 15, obtainedMarks: 9,  classAverage: 7.9,  classMin: 2,  classMax: 14 },
      { component: "Final",      totalMarks: 50, obtainedMarks: 33, classAverage: 27.3, classMin: 6,  classMax: 45 },
    ],
  },
  {
    courseCode: "SE2001",
    items: [
      { component: "Quiz",       totalMarks: 10, obtainedMarks: 9,  classAverage: 7.4,  classMin: 2,  classMax: 10 },
      { component: "Assignment", totalMarks: 10, obtainedMarks: 9,  classAverage: 7.8,  classMin: 3,  classMax: 10 },
      { component: "Sessional 1",totalMarks: 15, obtainedMarks: 12, classAverage: 10.9, classMin: 4,  classMax: 15 },
      { component: "Sessional 2",totalMarks: 15, obtainedMarks: 11, classAverage: 10.2, classMin: 5,  classMax: 15 },
      { component: "Final",      totalMarks: 50, obtainedMarks: 39, classAverage: 36.5, classMin: 15, classMax: 49 },
    ],
  },
  {
    courseCode: "SE2004",
    items: [
      { component: "Quiz",       totalMarks: 10, obtainedMarks: 8,  classAverage: 7.3,  classMin: 2,  classMax: 10 },
      { component: "Assignment", totalMarks: 10, obtainedMarks: 8,  classAverage: 7.6,  classMin: 3,  classMax: 10 },
      { component: "Sessional 1",totalMarks: 15, obtainedMarks: 11, classAverage: 10.5, classMin: 4,  classMax: 15 },
      { component: "Sessional 2",totalMarks: 15, obtainedMarks: 10, classAverage: 9.8,  classMin: 4,  classMax: 15 },
      { component: "Final",      totalMarks: 50, obtainedMarks: 38, classAverage: 34.2, classMin: 12, classMax: 48 },
    ],
  },
  {
    courseCode: "SS1015",
    items: [
      { component: "Quiz",       totalMarks: 10, obtainedMarks: 10, classAverage: 7.8,  classMin: 3,  classMax: 10 },
      { component: "Assignment", totalMarks: 10, obtainedMarks: 10, classAverage: 8.2,  classMin: 4,  classMax: 10 },
      { component: "Sessional 1",totalMarks: 15, obtainedMarks: 12, classAverage: 11.5, classMin: 5,  classMax: 15 },
      { component: "Sessional 2",totalMarks: 15, obtainedMarks: 13, classAverage: 11.9, classMin: 6,  classMax: 15 },
      { component: "Final",      totalMarks: 50, obtainedMarks: 44, classAverage: 40.3, classMin: 18, classMax: 50 },
    ],
  },
];
