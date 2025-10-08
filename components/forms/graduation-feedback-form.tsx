"use client"
import type * as React from "react"

const scale = [5, 4, 3, 2, 1]

const questions = [
  "Ability to investigate, analyze evidence, and make well-versed conclusions to find solutions",
  "Use and presentation of data across resources/formats considering ethics, legal, environmental, health & safety; explore alternatives using modern tools",
  "Manage assigned tasks proficiently as an individual, team member, or leader",
  "Communicate data vocally or in written form clearly and effectively",
  "Manage projects across multi-disciplinary domains considering financial, legal, social, and environmental standards",
  "Encouragement and opportunities to pursue cultural, sports, management, and literary activities",
  "Adapt to new technology with awareness of impact on mankind for sustainable development",
  "Overall satisfaction with the quality of the academic program at SAHYADRI",
]

export function GraduationFeedbackForm({
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
      <h2 className="text-lg font-semibold">Graduation Feedback</h2>
      <p className="text-sm text-muted-foreground">5 - To a great extent; 1 - Not at all</p>

      <div className="space-y-3">
        {questions.map((q, idx) => (
          <fieldset key={idx} className="rounded-md border border-border p-3">
            <legend className="text-sm">{q}</legend>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              {scale.map((v) => (
                <label key={v} className="flex items-center gap-2 text-sm">
                  <input type="radio" name={`q_${idx + 1}`} value={v} required className="accent-foreground" />
                  {v}
                </label>
              ))}
            </div>
          </fieldset>
        ))}
      </div>

      <div className="grid gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="strengths">
            Strengths (department)
          </label>
          <textarea
            id="strengths"
            name="strengths"
            rows={3}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="improvements">
            Areas of Improvement
          </label>
          <textarea
            id="improvements"
            name="improvements"
            rows={3}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="skills">
            Skills developed while studying in Sahyadri
          </label>
          <textarea
            id="skills"
            name="skills"
            rows={3}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="valued">
            Learning/field experiences valued the most
          </label>
          <textarea
            id="valued"
            name="valued"
            rows={3}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="inspiration">
            Anything that inspired you or changed your ideas about the world?
          </label>
          <textarea
            id="inspiration"
            name="inspiration"
            rows={3}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
        </div>
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
