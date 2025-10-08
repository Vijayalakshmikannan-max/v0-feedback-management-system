"use client"
import type * as React from "react"

const scale = [5, 4, 3, 2, 1]

type CO = {
  code: string
  title: string
}

const cos: CO[] = [
  {
    code: "CO-3",
    title: "Examine the concepts of relational algebra and advanced SQL in database application development.",
  },
  {
    code: "CO-4",
    title: "Employ normalization techniques to normalize the database.",
  },
  {
    code: "CO-5",
    title: "Illustrate transaction management, concurrency control and recovery management.",
  },
  {
    code: "CO-6",
    title: "Make use of database security and corresponding privileges.",
  },
]

const statements = [
  "The CO statement is stated clearly & is relevant to the course content and/or industry requirements",
  "Enough learning opportunities are being provided by the teacher related to this CO",
  "Effective assessment tools/methods related to each learning activity under this CO has been used by the teacher(s) to evaluate your performance.",
]

export function CourseExitSurveyDBMSForm({
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
    <form className="space-y-8" onSubmit={onSubmit}>
      <h2 className="text-lg font-semibold">Course Exit Survey: DBMS</h2>
      <p className="text-sm text-muted-foreground">5 - To a great extent; 1 - Not at all</p>

      {cos.map((co, cIdx) => (
        <section key={co.code} className="space-y-3">
          <h3 className="text-sm font-medium">
            {co.code}: {co.title}
          </h3>
          <div className="space-y-2">
            {statements.map((st, sIdx) => (
              <fieldset key={sIdx} className="rounded-md border border-border p-3">
                <legend className="text-sm">{st}</legend>
                <div className="mt-2 flex flex-wrap items-center gap-3">
                  {scale.map((v) => (
                    <label key={v} className="flex items-center gap-2 text-sm">
                      <input
                        type="radio"
                        name={`${co.code.replace("-", "")}_s${sIdx + 1}`}
                        value={v}
                        required
                        className="accent-foreground"
                      />
                      {v}
                    </label>
                  ))}
                </div>
              </fieldset>
            ))}
          </div>
        </section>
      ))}

      <section className="space-y-3">
        <h3 className="text-sm font-medium">General Feedback</h3>
        {[
          {
            id: "improveCourse",
            label: "Your suggestions for the improvement of the Course",
          },
          {
            id: "improveContents",
            label: "Your suggestions for the improvement of the Course Contents",
          },
          {
            id: "improveDelivery",
            label: "Your suggestions for the improvement of the Course Delivery",
          },
          {
            id: "improveAssessment",
            label: "Your suggestions for the improvement of the Course Assessment",
          },
          {
            id: "improveFaculty",
            label: "Your suggestions for the improvement to be incorporated by the faculty",
          },
        ].map((f) => (
          <div key={f.id} className="space-y-2">
            <label htmlFor={f.id} className="text-sm font-medium">
              {f.label}
            </label>
            <textarea
              id={f.id}
              name={f.id}
              rows={3}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </div>
        ))}
      </section>

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
