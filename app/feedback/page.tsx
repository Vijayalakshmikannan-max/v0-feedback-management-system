"use client"
import { useState, useMemo } from "react"
import Link from "next/link"

import { useToast } from "../../hooks/use-toast"

type TemplateKey = "faculty" | "grad-institute" | "graduation" | "graduate-exit" | "course-exit-dbms"

export default function FeedbackPage() {
  const [template, setTemplate] = useState<TemplateKey | "">("")
  const { toast } = useToast()

  const TemplateComponent = useMemo(() => {
    switch (template) {
      case "faculty":
        return require("../../components/forms/faculty-feedback-form").FacultyFeedbackForm
      case "grad-institute":
        return require("../../components/forms/graduation-institute-feedback-form").GraduationInstituteFeedbackForm
      case "graduation":
        return require("../../components/forms/graduation-feedback-form").GraduationFeedbackForm
      case "graduate-exit":
        return require("../../components/forms/graduate-exit-survey").GraduateExitSurveyForm
      case "course-exit-dbms":
        return require("../../components/forms/course-exit-survey-dbms").CourseExitSurveyDBMSForm
      default:
        return null
    }
  }, [template])

  return (
    <main className="min-h-dvh bg-background text-foreground p-6">
      <div className="mx-auto max-w-3xl space-y-6">
        <header className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Feedback Templates</h1>
          <Link href="/" className="text-sm underline underline-offset-4 hover:opacity-80" aria-label="Go back home">
            Home
          </Link>
        </header>

        <section className="rounded-lg border border-border p-4">
          <label htmlFor="template" className="block text-sm font-medium mb-2">
            Select template
          </label>
          <select
            id="template"
            name="template"
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            value={template}
            onChange={(e) => setTemplate(e.target.value as TemplateKey | "")}
          >
            <option value="">Choose…</option>
            <option value="faculty">Faculty Feedback</option>
            <option value="grad-institute">Graduation Institute Feedback</option>
            <option value="graduation">Graduation Feedback (Capabilities)</option>
            <option value="graduate-exit">Graduate Exit Survey</option>
            <option value="course-exit-dbms">Course Exit Survey (DBMS COs)</option>
          </select>
        </section>

        {TemplateComponent ? (
          <div className="rounded-lg border border-border p-4">
            <TemplateComponent
              onSubmitted={(data: Record<string, any>) => {
                // local-only handler
                // eslint-disable-next-line no-console
                console.log("[v0] Local submission:", data)
                toast({
                  title: "Submission received",
                  description: "Your response has been recorded locally. No integrations configured.",
                })
              }}
            />
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">Choose a template to begin.</p>
        )}
      </div>
    </main>
  )
}
