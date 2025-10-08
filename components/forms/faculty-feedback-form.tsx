"use client"
import type * as React from "react"

const rating = [5, 4, 3, 2, 1]

const questions = [
  "The learning from the course in terms of Knowledge, Concepts and other Skills",
  "The Quality of Study & Reference material provided during the semester",
  "The Quality of Assignments and CIE Question papers of the course",
  "Availability & willingness of faculty for doubt clearance/discussion of the Course content and other issues faced, if any",
  "The Quality of Content delivery with suitable practical examples and use of Teaching aids",
  "Faculty's ability to stimulate interest/motivate students towards learning",
  "Engaging classes on time & Complete duration/Maintaining discipline in the class",
  "The level of command on language of the faculty (Communication Skills)",
  "Maintaining Equality without any discrimination.",
  "Overall quality of the course delivered by the faculty",
]

export function FacultyFeedbackForm({
  onSubmitted,
}: {
  onSubmitted?: (data: Record<string, any>) => void
}) {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const data = Object.fromEntries(fd.entries())
    onSubmitted?.(data)
    e.currentTarget.reset()
  }

  return (
    <form className="space-y-6" onSubmit={onSubmit}>
      <h2 className="text-lg font-semibold">Faculty Feedback</h2>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="academicYear">
            Academic Year
          </label>
          <input
            id="academicYear"
            name="academicYear"
            placeholder="e.g., 2023-24"
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="branch">
            Branch
          </label>
          <input
            id="branch"
            name="branch"
            placeholder="e.g., UG-IS"
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="semester">
            Semester
          </label>
          <input
            id="semester"
            name="semester"
            placeholder="e.g., 3"
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="feedbackType">
            Feedback Type
          </label>
          <input
            id="feedbackType"
            name="feedbackType"
            placeholder="e.g., Faculty"
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium" htmlFor="feedbackName">
            Feedback Name
          </label>
          <input
            id="feedbackName"
            name="feedbackName"
            placeholder="e.g., BE-IS-II FEEDBACK III SEM 2024-25"
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium" htmlFor="subjectType">
            Subject Type
          </label>
          <input
            id="subjectType"
            name="subjectType"
            placeholder="e.g., Theory"
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="text-sm text-muted-foreground">5 - Strongly Agree, 1 - Not at all</div>
        {questions.map((q, idx) => (
          <fieldset key={idx} className="border border-border rounded-md p-3">
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

      <div className="flex items-center gap-3">
        <button
          type="submit"
          className="inline-flex items-center rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition"
        >
          Submit
        </button>
        <button
          type="reset"
          className="inline-flex items-center rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-muted transition"
        >
          Reset
        </button>
      </div>
    </form>
  )
}
