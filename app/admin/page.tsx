"use client"

import { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import { STORE_KEYS, engineeringCoursesBySem, engineeringFacultyByCourseCode } from "../../data/config"

type Submission = {
  at: number
  meta: {
    usn: string
    branch: string
    semester: number
    program: string
    courseName?: string
    courseCode?: string
    facultyName?: string
  }
} & Record<string, any>

function avg(nums: number[]) {
  if (!nums.length) return 0
  return nums.reduce((a, b) => a + b, 0) / nums.length
}

function extractRatings(obj: Record<string, any>) {
  const keys = Object.keys(obj).filter((k) => /^q_\d+$/i.test(k))
  const vals = keys.map((k) => Number(obj[k])).filter((n) => !Number.isNaN(n))
  const counts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
  vals.forEach((v) => (counts[v] = (counts[v] || 0) + 1))
  return { vals, counts, average: avg(vals) }
}

export default function AdminPanel() {
  const [authed, setAuthed] = useState(false)
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [enabled, setEnabled] = useState(false)
  const [startISO, setStartISO] = useState<string>("")
  const [endISO, setEndISO] = useState<string>("")

  const [engCourses, setEngCourses] = useState(engineeringCoursesBySem)
  const [engFaculty, setEngFaculty] = useState(engineeringFacultyByCourseCode)

  // auth check
  useEffect(() => {
    const raw = localStorage.getItem(STORE_KEYS.adminAuth)
    setAuthed(!!raw)
  }, [])

  useEffect(() => {
    const raw = localStorage.getItem(STORE_KEYS.submissions)
    setSubmissions(raw ? JSON.parse(raw) : [])
    const av = localStorage.getItem(STORE_KEYS.availability)
    if (av) {
      try {
        const a = JSON.parse(av)
        setEnabled(!!a.enabled)
        setStartISO(a.startISO || "")
        setEndISO(a.endISO || "")
      } catch {}
    }
    const ec = localStorage.getItem(STORE_KEYS.engCourses)
    if (ec)
      try {
        setEngCourses(JSON.parse(ec))
      } catch {}
    const ef = localStorage.getItem(STORE_KEYS.engFaculty)
    if (ef)
      try {
        setEngFaculty(JSON.parse(ef))
      } catch {}
  }, [])

  const count = submissions.length
  const ratingStats = useMemo(() => {
    const allVals: number[] = []
    const starCounts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
    submissions.forEach((s) => {
      const { vals, counts } = extractRatings(s)
      allVals.push(...vals)
      ;[1, 2, 3, 4, 5].forEach((k) => (starCounts[k] += counts[k] || 0))
    })
    return { average: avg(allVals), starCounts }
  }, [submissions])

  if (!authed) {
    return (
      <main className="min-h-dvh bg-background text-foreground p-6">
        <div className="mx-auto max-w-xl">
          <Card>
            <CardHeader>
              <CardTitle>Admin Access Required</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">Please login from /admin/login.</p>
              <Button onClick={() => (window.location.href = "/admin/login")}>Go to Login</Button>
            </CardContent>
          </Card>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-dvh bg-background text-foreground p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Availability Window</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-4 gap-3 items-end">
            <div className="space-y-2">
              <Label>Enable window</Label>
              <Button variant={enabled ? "default" : "secondary"} onClick={() => setEnabled((v) => !v)}>
                {enabled ? "Enabled" : "Disabled"}
              </Button>
            </div>
            <div className="space-y-2">
              <Label htmlFor="start">Start</Label>
              <Input id="start" type="datetime-local" value={startISO} onChange={(e) => setStartISO(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end">End</Label>
              <Input id="end" type="datetime-local" value={endISO} onChange={(e) => setEndISO(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label className="invisible">.</Label>
              <Button
                onClick={() => {
                  localStorage.setItem(STORE_KEYS.availability, JSON.stringify({ enabled, startISO, endISO }))
                  alert("Saved window.")
                }}
              >
                Save Window
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Analytics</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-3 gap-4">
            <div className="rounded-md border border-border p-3">
              <div className="text-muted-foreground text-sm">Total Submissions</div>
              <div className="text-2xl font-semibold">{count}</div>
            </div>
            <div className="rounded-md border border-border p-3">
              <div className="text-muted-foreground text-sm">Average Rating</div>
              <div className="text-2xl font-semibold">{ratingStats.average.toFixed(2)}</div>
            </div>
            <div className="rounded-md border border-border p-3">
              <div className="text-muted-foreground text-sm">Star Distribution (5→1)</div>
              <div className="font-medium">
                {[5, 4, 3, 2, 1].map((s) => `${s}★:${ratingStats.starCounts[s]}`).join("  ")}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Manage Engineering (Sem 5) Courses & Faculty</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {engCourses[5].map((c, idx) => (
                <div key={c.code + idx} className="rounded-md border border-border p-3 space-y-2">
                  <Label>Course Name</Label>
                  <Input
                    value={c.name}
                    onChange={(e) => {
                      const copy = { ...engCourses }
                      copy[5] = copy[5].map((x, i) => (i === idx ? { ...x, name: e.target.value } : x))
                      setEngCourses(copy)
                    }}
                  />
                  <Label>Course Code</Label>
                  <Input
                    value={c.code}
                    onChange={(e) => {
                      const copy = { ...engCourses }
                      copy[5] = copy[5].map((x, i) => (i === idx ? { ...x, code: e.target.value } : x))
                      setEngCourses(copy)
                    }}
                  />
                  <Label>Faculty</Label>
                  <Input
                    value={engFaculty[c.code] || ""}
                    onChange={(e) => {
                      setEngFaculty((m) => ({ ...m, [c.code]: e.target.value }))
                    }}
                    placeholder="Faculty Name"
                  />
                </div>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <Button onClick={() => localStorage.setItem(STORE_KEYS.engCourses, JSON.stringify(engCourses))}>
                Save Courses
              </Button>
              <Button onClick={() => localStorage.setItem(STORE_KEYS.engFaculty, JSON.stringify(engFaculty))}>
                Save Faculty
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Submissions</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Time</TableHead>
                  <TableHead>USN</TableHead>
                  <TableHead>Branch</TableHead>
                  <TableHead>Program</TableHead>
                  <TableHead>Semester</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Type</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {submissions.map((s, i) => (
                  <TableRow key={i}>
                    <TableCell>{new Date(s.at).toLocaleString()}</TableCell>
                    <TableCell>{s.meta?.usn || "-"}</TableCell>
                    <TableCell>{s.meta?.branch || "-"}</TableCell>
                    <TableCell>{s.meta?.program || "-"}</TableCell>
                    <TableCell>{s.meta?.semester || "-"}</TableCell>
                    <TableCell>
                      {s.meta?.courseName ? `${s.meta.courseName} (${s.meta.courseCode || ""})` : "-"}
                    </TableCell>
                    <TableCell>{s.formType || "-"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex items-center gap-3 mt-4">
              <Button
                variant="secondary"
                onClick={() => {
                  localStorage.removeItem(STORE_KEYS.submissions)
                  setSubmissions([])
                }}
              >
                Clear Submissions
              </Button>
              <Button
                onClick={() => {
                  const blob = new Blob([JSON.stringify(submissions, null, 2)], { type: "application/json" })
                  const url = URL.createObjectURL(blob)
                  const a = document.createElement("a")
                  a.href = url
                  a.download = `submissions-${Date.now()}.json`
                  a.click()
                  URL.revokeObjectURL(url)
                }}
              >
                Download JSON
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
