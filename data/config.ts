export type Course = { name: string; code: string }

export const engineeringCoursesBySem: Record<number, Course[]> = {
  5: [
    { name: "Data Communication and Networks", code: "IS522I2C" },
    { name: "Data Science and Application", code: "IS522I1I" },
    { name: "Automata Theory and Computation", code: "CS522T3C" },
    { name: "Database Management Systems", code: "CS522T4C" },
    { name: "Information System Management", code: "IS522T6IA" },
    { name: "Research Methodology", code: "BS52298X" },
    { name: "Environmental Studies (EVS)", code: "BS52299X" },
    { name: "Mini Project", code: "IS522P7I" },
  ],
}

// placeholders for other semesters (1..8). Edit freely in Admin panel or here.
for (let s = 1; s <= 8; s++) {
  if (engineeringCoursesBySem[s]) continue
  engineeringCoursesBySem[s] = Array.from({ length: 9 }).map((_, i) => ({
    name: `Course ${i + 1}`,
    code: `Code ${i + 1}`,
  }))
}

export const engineeringFacultyByCourseCode: Record<string, string> = {
  IS522I2C: "MRS. SHWETHA S. SHETTY", // DCN
  IS522I1I: "MRS. VIDYA .A.R", // DSA
  CS522T3C: "DR. RITHESH. PAKKALA", // ATC
  CS522T4C: "MR. VASUDEVA RAO P.V", // DBMS
  IS522T6IA: "MRS. AKHILA THEJASWI R", // ISM
  IS522P7I: "MS. SHEHA BHOSE", // MINI PROJECT
  BS52298X: "MRS. VIDYA .A.R", // RM
  BS52299X: "MS. MADHURA", // EVS
}

export const mbaCoursesBySem: Record<number, Course[]> = {}
for (let s = 1; s <= 4; s++) {
  mbaCoursesBySem[s] = Array.from({ length: 9 }).map((_, i) => ({
    name: `Course ${i + 1}`,
    code: `Code ${i + 1}`,
  }))
}

// localStorage keys to allow Admin edits to override defaults
export const STORE_KEYS = {
  engCourses: "cfg.eng.coursesBySem",
  engFaculty: "cfg.eng.facultyByCode",
  mbaCourses: "cfg.mba.coursesBySem",
  availability: "cfg.forms.availability", // { enabled: boolean, startISO?: string, endISO?: string }
  submissions: "data.submissions", // array
  adminAuth: "auth.admin",
  facultyAuth: "auth.faculty", // { name: string }
} as const
