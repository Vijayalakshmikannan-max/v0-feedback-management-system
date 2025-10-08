"use client"
import type * as React from "react"

const scale = [5, 4, 3, 2, 1]

const sections: { title: string; items: string[] }[] = [
  {
    title: "1. Quality of instructions and support for learning by faculty & staff members",
    items: [
      "Basic sciences (Mathematics, Physics, Chemistry)",
      "Foundation courses in Engineering",
      "Applied and specialized courses in engineering",
      "Computers (Programming and use of software)",
      "Humanities and Management courses",
      "Languages (English and Kannada)",
      "Additional Resources used in Teaching - Presentation/Video Lectures etc.",
      "Support given by Technical and Supporting Staff in Engg. & Mgt.",
      "Mentoring by Faculty with respect to academic planning",
      "Treatment by Principal, HoD and other staff members",
    ],
  },
  {
    title: "2. Facilities offered for Academics",
    items: [
      "Class Rooms",
      "Multimedia facilities in classrooms (like LCD projectors, videos)",
      "Basic Sciences Lab",
      "Engineering lab (and workshop)",
      "Computer, internet and intranet facilities",
      "Department Library with personalized study space",
      "Hands on Laboratory",
      "Aptitude Laboratory",
      "Industry Connect Laboratory",
      "Seminars / Academic Projects",
      "Content beyond Syllabus: Guest Lectures/ Workshops/ Industry Visits",
      "Sahyadri Project Support Scheme (SPSS)",
      "Green Technology",
      "Social Innovation",
      "Connectivity with Premier Institutions",
      "Department Association",
    ],
  },
  {
    title: "3. Academic Services",
    items: [
      "Examination Cell",
      "Placement & Training Cell",
      "Library Services",
      "College Office for Information",
      "Students Services through Students Welfare Office",
      "Books & Stationeries Depot & Reprographics",
      "Sports & games, Gymnasia",
      "Seminar Hall/Auditorium",
      "Food Court/Cafeteria",
      "Clubs for personality development",
      "Launchpad Support",
      "Healthcare/Counselling Center",
      "Security and Safety",
      "Grievances Redressal",
      "Hostel",
      "Drinking water facilities, Campus hygiene",
      "Transport",
      "Parking Lot",
    ],
  },
]

export function GraduationInstituteFeedbackForm({
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
      <h2 className="text-lg font-semibold">Graduation Institute Feedback</h2>
      <p className="text-sm text-muted-foreground">5 - To a great extent; 1 - Not at all</p>

      {sections.map((sec, sIdx) => (
        <div key={sIdx} className="space-y-3">
          <h3 className="text-sm font-medium">{sec.title}</h3>
          <div className="space-y-2">
            {sec.items.map((item, iIdx) => (
              <fieldset key={iIdx} className="rounded-md border border-border p-3">
                <legend className="text-sm">{item}</legend>
                <div className="mt-2 flex flex-wrap items-center gap-3">
                  {scale.map((value) => (
                    <label key={value} className="flex items-center gap-2 text-sm">
                      <input
                        type="radio"
                        name={`s${sIdx + 1}_i${iIdx + 1}`}
                        value={value}
                        required
                        className="accent-foreground"
                      />
                      {value}
                    </label>
                  ))}
                </div>
              </fieldset>
            ))}
          </div>
        </div>
      ))}

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
