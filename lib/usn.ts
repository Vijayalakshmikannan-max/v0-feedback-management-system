export type ParsedUSN = {
  raw: string
  collegeCode: string
  admissionYear: number
  branchCode: string
  rollNumber: string
}

const USN_REGEX = /^([0-9]{1,2}[a-z]{2})(\d{2})([a-z]{2,3})(\d{3})$/i

export function parseUSN(usnRaw: string): ParsedUSN | null {
  const usn = usnRaw.trim().replace(/\s+/g, "").toLowerCase()
  const m = usn.match(USN_REGEX)
  if (!m) return null
  const [, college, year2, branch, roll] = m
  const admissionYear = 2000 + Number(year2)
  return {
    raw: usnRaw,
    collegeCode: college.toUpperCase(),
    admissionYear,
    branchCode: branch.toUpperCase(),
    rollNumber: roll,
  }
}

export function calculateSemester(admissionYear: number, program: "engineering" | "mba", now = new Date()): number {
  const yearsDiff = now.getFullYear() - admissionYear
  const base = 1 + 2 * yearsDiff
  if (program === "engineering") return Math.max(1, Math.min(8, base))
  return Math.max(1, Math.min(4, base))
}
