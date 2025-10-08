"use client"
import type * as React from "react"

const careerOptions = [
  "Core Engineering Work Force",
  "Research and Development",
  "Public Sector Unit",
  "Academics/Training",
  "Managerial / Administrative Work",
  "Marketing/Business Development",
  "Finance",
  "Business/Start up",
  "Others",
]

export function GraduateExitSurveyForm({
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
      <h2 className="text-lg font-semibold">Students Graduation Course Exit Survey</h2>

      <section className="space-y-4">
        <h3 className="text-sm font-medium">Graduating Student Personal Details</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { id: "name", label: "Name of the Graduating Student" },
            { id: "dob", label: "Date of Birth", type: "date" as const },
            { id: "usn", label: "University Seat No" },
            { id: "batch", label: "Academic Batch" },
            { id: "department", label: "Department" },
            { id: "phone", label: "Contact Number" },
            { id: "email", label: "E-Mail Id", type: "email" as const },
            { id: "fatherName", label: "Father's Name" },
          ].map((f) => (
            <div key={f.id} className="space-y-2">
              <label htmlFor={f.id} className="text-sm font-medium">
                {f.label}
              </label>
              <input
                id={f.id}
                name={f.id}
                type={f.type || "text"}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
            </div>
          ))}
          <div className="md:col-span-2 space-y-2">
            <label htmlFor="address" className="text-sm font-medium">
              Permanent Address
            </label>
            <textarea
              id="address"
              name="address"
              rows={3}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-sm font-medium">Placement Details</h3>
        <div className="space-y-2">
          <span className="text-sm font-medium block">Mode of Placement</span>
          <div className="flex flex-wrap gap-4">
            {["In campus", "Off campus", "Not yet placed"].map((opt) => (
              <label key={opt} className="flex items-center gap-2 text-sm">
                <input type="radio" name="placementMode" value={opt} className="accent-foreground" required />
                {opt}
              </label>
            ))}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium" htmlFor="company">
              Company/Organization & Designation (if placed)
            </label>
            <input
              id="company"
              name="company"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              placeholder="Company / Role"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <span className="text-sm font-medium">Career preferences after 4 years (select at least one)</span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {careerOptions.map((opt) => (
                <label key={opt} className="flex items-center gap-2 text-sm">
                  <input type="checkbox" name="careerPreferences" value={opt} className="accent-foreground" />
                  {opt}
                </label>
              ))}
            </div>
            <input
              name="careerOthersDetail"
              placeholder="If Others, please specify"
              className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-sm font-medium">Recommendation</h3>
        <div className="flex flex-wrap gap-4">
          {["Yes", "No"].map((opt) => (
            <label key={opt} className="flex items-center gap-2 text-sm">
              <input type="radio" name="recommend" value={opt} className="accent-foreground" required />
              {opt}
            </label>
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium" htmlFor="reason">
              If No, please provide reason(s)
            </label>
            <textarea
              id="reason"
              name="reason"
              rows={3}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="date">
              Date
            </label>
            <input
              id="date"
              name="date"
              type="date"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="signature">
              Signature (type your name)
            </label>
            <input
              id="signature"
              name="signature"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </div>
        </div>
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
