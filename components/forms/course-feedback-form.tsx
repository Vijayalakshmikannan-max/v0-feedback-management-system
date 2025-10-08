"use client"
import type * as React from "react"

const rating = [5, 4, 3, 2, 1]

// Course-focused questions (editable)
const questions = [
  "Clarity of stated Course Outcomes (COs) and relevance to industry",
  "Adequacy and quality of study/reference materials during the semester",
  "Quality and relevance of Assignments and CIE question papers",
  "Availability and responsiveness for doubt resolution",
  "Effectiveness of content delivery and use of practical examples/teaching aids",
  "The course stimulated interest and motivation towards learning",
  "Punctuality and utilization of scheduled class duration",
  "Language clarity and communication effectiveness",
  "Maintaining equality without discrimination",
  "Overall quality of the course",
]

export function CourseFeedbackForm({
  courseName,
  courseCode,
  facultyName,
  onSubmitted,
  disabled,
}: {
  courseName: string
  courseCode: string
  facultyName?: string
  disabled?: boolean
  onSubmitted?: (data: Record<string, any>) => void
}) {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (disabled) return
    const fd = new FormData(e.currentTarget)
    // enrich meta
    fd.set("courseName", courseName)
    fd.set("courseCode", courseCode)
    if (facultyName) fd.set("facultyName", facultyName)
    fd.set("formType", "course-feedback")
    const data = Object.fromEntries(fd.entries())
    onSubmitted?.(data)
    e.currentTarget.reset()
  }

  return (
    <form className="space-y-6" onSubmit={onSubmit}>
      <h2 className="text-lg font-semibold">Course Feedback</h2>
      <div className="text-sm text-muted-foreground">
        {courseName} ({courseCode}) {facultyName ? `• Faculty: ${facultyName}` : ""}
      </div>

      <div className="space-y-4">
        <div className="text-sm text-muted-foreground">5 - Excellent, 1 - Poor</div>
        {questions.map((q, idx) => (
          <fieldset key={idx} className="border border-border rounded-md p-3" disabled={disabled}>
            <legend className="text-sm font-medium">{q}</legend>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              {rating.map((r) => (
                <label key={r} className="flex items-center gap-2 text-sm">
                  <input type="radio" name={`q_${idx + 1}`} value={r} required className="accent-foreground" />
                  {r}
                </label>
              ))}
            </div>
          </fieldset>
        ))}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="comments">
          Comments (optional)
        </label>
        <textarea
          id="comments"
          name="comments"
          rows={3}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          placeholder="Share any additional feedback…"
          disabled={disabled}
        />
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={disabled}
          className="inline-flex items-center rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition disabled:opacity-60"
        >
          Submit
        </button>
        <button
          type="reset"
          disabled={disabled}
          className="inline-flex items-center rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-muted transition disabled:opacity-60"
        >
          Reset
        </button>
      </div>
    </form>
  )
}
