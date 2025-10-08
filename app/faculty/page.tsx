"use client"

import { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import { STORE_KEYS } from "../../data/config"

type Submission = {
  at: number
  formType?: string
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

export default function FacultyPanel() {
  const [authed, setAuthed] = useState<{ name: string } | null>(null)
  const [submissions, setSubmissions] = useState<Submission[]>([])

  const mine = useMemo(
    () =>
      submissions.filter(
        (s) => s.meta?.facultyName && authed?.name && s.meta.facultyName.toLowerCase() === authed.name.toLowerCase(),
      ),
    [submissions, authed],
  )

  const stats = useMemo(() => {
    const allVals: number[] = []
    const starCounts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
    mine.forEach((s) => {
      const { vals, counts } = extractRatings(s)
      allVals.push(...vals)
      ;[1, 2, 3, 4, 5].forEach((k) => (starCounts[k] += counts[k] || 0))
    })
    return { average: avg(allVals), starCounts }
  }, [mine])

  useEffect(() => {
    const raw = localStorage.getItem(STORE_KEYS.facultyAuth)
    setAuthed(raw ? JSON.parse(raw) : null)
    const s = localStorage.getItem(STORE_KEYS.submissions)
    const all: Submission[] = s ? JSON.parse(s) : []
    setSubmissions(all)
  }, [])

  if (!authed) {
    return (
      <main className="min-h-dvh bg-background text-foreground p-6">
        <div className="mx-auto max-w-xl">
          <Card>
            <CardHeader>
              <CardTitle>Faculty Access Required</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">Please login from /faculty/login.</p>
              <Button onClick={() => (window.location.href = "/faculty/login")}>Go to Login</Button>
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
            <CardTitle>Welcome, {authed.name}</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-3 gap-4">
            <div className="rounded-md border border-border p-3">
              <div className="text-muted-foreground text-sm">Your Submissions</div>
              <div className="text-2xl font-semibold">{mine.length}</div>
            </div>
            <div className="rounded-md border border-border p-3">
              <div className="text-muted-foreground text-sm">Average Rating</div>
              <div className="text-2xl font-semibold">{stats.average.toFixed(2)}</div>
            </div>
            <div className="rounded-md border border-border p-3">
              <div className="text-muted-foreground text-sm">Star Distribution (5→1)</div>
              <div className="font-medium">{[5, 4, 3, 2, 1].map((s) => `${s}★:${stats.starCounts[s]}`).join("  ")}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Student Submissions</CardTitle>
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
                {mine.map((s, i) => (
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
                onClick={() => {
                  const data = JSON.stringify(mine, null, 2)
                  const blob = new Blob([data], { type: "application/json" })
                  const url = URL.createObjectURL(blob)
                  const a = document.createElement("a")
                  a.href = url
                  a.download = `faculty-${authed.name}-submissions.json`
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
