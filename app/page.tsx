import Link from "next/link"
import { redirect } from "next/navigation"

export default function HomePage() {
  redirect("/login")

  return (
    <main className="min-h-dvh bg-background text-foreground flex items-center justify-center p-6">
      <div className="max-w-xl w-full text-center space-y-4">
        <h1 className="text-2xl md:text-3xl font-semibold text-balance">Feedback Management System</h1>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Explore feedback templates and capture responses locally (no integrations required).
        </p>
        <div className="flex items-center justify-center">
          <Link
            href="/feedback"
            className="inline-flex items-center justify-center rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition"
          >
            Go to Feedback
          </Link>
        </div>
      </div>
    </main>
  )
}
