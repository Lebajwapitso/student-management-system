/**
 * DIWA2110: Web Application Development
 * Data Utilities & Initial Mock Data
 */

// 1. Array of Objects: Non-primitive structure containing initial student records
export const INITIAL_STUDENTS = [
  {
    id: "901026401", // String: Unique Identifier starting with 9010
    name: "Lethabo Mofokeng", // String
    age: 21, // Number
    email: "lethabo.mofokeng@limkokwing.ac.ls", // String
    course: "Diploma in Business Information Technology", // String
    enrollmentStatus: "Active", // Standardized to match App.jsx status
  },
  {
    // <-- Fixed the missing opening brace here!
    id: "901026402",
    name: "Mpho Moroesi",
    age: 22,
    email: "mpho.moroesi@limkokwing.ac.ls",
    course: "Diploma in Business Information Technology",
    enrollmentStatus: "Active",
  },
  {
    id: "901026403",
    name: "Thabo Letsie",
    age: 20,
    email: "thabo.letsie@limkokwing.ac.ls",
    course: "Diploma in Information Technology",
    enrollmentStatus: "Active",
  },
  {
    id: "901026404",
    name: "Bokang Molapo",
    age: 23,
    email: "bokang.molapo@limkokwing.ac.ls",
    course: "Diploma in Business Information Technology",
    enrollmentStatus: "Inactive",
  },
  {
    id: "901026405",
    name: "Selloane Phamotse",
    age: 21,
    email: "selloane.phamotse@limkokwing.ac.ls",
    course: "Diploma in Information Technology",
    enrollmentStatus: "Active",
  },
  {
    id: "901026406",
    name: "Khotso Sekoati",
    age: 22,
    email: "khotso.sekoati@limkokwing.ac.ls",
    course: "Diploma in Business Information Technology",
    enrollmentStatus: "Active",
  },
];

// 2. LocalStorage Persistence Functions
export const loadStudents = () => {
  const savedData = localStorage.getItem("student_records");
  if (savedData) {
    return JSON.parse(savedData);
  }
  saveStudents(INITIAL_STUDENTS);
  return INITIAL_STUDENTS;
};

export const saveStudents = (studentsList) => {
  localStorage.setItem("student_records", JSON.stringify(studentsList));
};
