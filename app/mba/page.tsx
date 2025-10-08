"use client"

import { useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { CourseFeedbackForm } from "../../components/forms/course-feedback-form"
import { FacultyFeedbackForm } from "../../components/forms/faculty-feedback-form"
import type { Course } from "../../data/config"
import { mbaCoursesBySem as defaultMbaCourses, STORE_KEYS } from "../../data/config"
import { GraduationFeedbackForm } from "../../components/forms/graduation-feedback-form" // placeholder for exit-like survey

type Submission = Record<string, any> & {
  meta: {
    usn: string
    branch: string
    semester: number
    program: "mba"
    courseName?: string
    courseCode?: string
  }
  at: number
}

function getCourses(sem: number): Course[] {
  const local = localStorage.getItem(STORE_KEYS.mbaCourses)
  if (local) {
    try {
      const parsed = JSON.parse(local) as Record<number, Course[]>
      if (parsed[sem]?.length) return parsed[sem]
    } catch {}
  }
  return defaultMbaCourses[sem] || []
}

function isFormOpen(): boolean {
  const raw = localStorage.getItem(STORE_KEYS.availability)
  if (!raw) return true
  try {
    const cfg = JSON.parse(raw) as { enabled?: boolean; startISO?: string; endISO?: string }
    if (!cfg.enabled) return true
    const now = Date.now()
    const start = cfg.startISO ? Date.parse(cfg.startISO) : Number.NEGATIVE_INFINITY
    const end = cfg.endISO ? Date.parse(cfg.endISO) : Number.POSITIVE_INFINITY
    return now >= start && now <= end
  } catch {
    return true
  }
}

export default function MBADashboard() {
  const sp = useSearchParams()
  const usn = sp.get("usn") || ""
  const branch = sp.get("branch") || ""
  const sem = Number(sp.get("sem") || "0")
  const adm = Number(sp.get("adm") || "0")

  const [selectedCode, setSelectedCode] = useState<string>("")
  const courses = useMemo(() => getCourses(sem), [sem])
  const selected = useMemo(() => courses.find((c) => c.code === selectedCode), [courses, selectedCode])

  const open = isFormOpen()

  const handleStore = (payload: Record<string, any>) => {
    const raw = localStorage.getItem(STORE_KEYS.submissions)
    const arr: Submission[] = raw ? JSON.parse(raw) : []
    arr.push({
      ...payload,
      meta: { usn, branch, semester: sem, program: "mba", courseName: selected?.name, courseCode: selected?.code },
      at: Date.now(),
    })
    localStorage.setItem(STORE_KEYS.submissions, JSON.stringify(arr))
    alert("Saved locally.")
  }

  return (
    <main className="min-h-dvh bg-background text-foreground">
      {/* Program header */}
      <section className="w-full bg-primary/10 border-b border-primary/20">
        <div className="mx-auto max-w-5xl px-6 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-xl md:text-2xl font-semibold">MBA Dashboard</h1>
            <p className="text-sm text-muted-foreground">Submit Course and Faculty feedback</p>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                open ? "bg-primary text-primary-foreground" : "bg-destructive text-white"
              }`}
            >
              {open ? "Forms Open" : "Forms Closed"}
            </span>
            {selected && (
              <span className="hidden md:inline-flex items-center rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                {selected.name} — {selected.code}
              </span>
            )}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl p-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Student Info</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
            <div className="rounded-md border border-border p-3">
              <div className="text-muted-foreground">USN</div>
              <div className="font-medium">{usn}</div>
            </div>
            <div className="rounded-md border border-border p-3">
              <div className="text-muted-foreground">Branch</div>
              <div className="font-medium">{branch}</div>
            </div>
            <div className="rounded-md border border-border p-3">
              <div className="text-muted-foreground">Admission Year</div>
              <div className="font-medium">{adm}</div>
            </div>
            <div className="rounded-md border border-border p-3">
              <div className="text-muted-foreground">Semester</div>
              <div className="font-medium">{sem}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Course Feedback</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="text-sm font-medium">Select Course</div>
              <Select value={selectedCode} onValueChange={setSelectedCode}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose course" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map((c) => (
                    <SelectItem key={c.code} value={c.code}>
                      {c.name} — {c.code}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selected && (
              <Tabs defaultValue="course" className="w-full">
                <TabsList>
                  <TabsTrigger value="course">Course Feedback</TabsTrigger>
                  <TabsTrigger value="faculty">Faculty Feedback</TabsTrigger>
                  {sem === 4 && <TabsTrigger value="exit">Course Exit Survey</TabsTrigger>}
                </TabsList>

                <TabsContent value="course" className="mt-4">
                  <CourseFeedbackForm
                    courseName={selected.name}
                    courseCode={selected.code}
                    disabled={!open}
                    onSubmitted={(data) => handleStore(data)}
                  />
                </TabsContent>

                <TabsContent value="faculty" className="mt-4">
                  <FacultyFeedbackForm
                    onSubmitted={(data) =>
                      handleStore({
                        ...data,
                        formType: "faculty-feedback",
                        courseName: selected.name,
                        courseCode: selected.code,
                      })
                    }
                  />
                </TabsContent>

                {sem === 4 && (
                  <TabsContent value="exit" className="mt-4">
                    {/* Using graduation capabilities as a placeholder exit survey for MBA */}
                    <GraduationFeedbackForm
                      onSubmitted={(data: any) => handleStore({ ...data, formType: "course-exit-survey" })}
                    />
                  </TabsContent>
                )}
              </Tabs>
            )}
            {!open && (
              <p className="text-sm text-muted-foreground">
                Forms are currently unavailable (outside the configured window).
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
