"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { parseUSN, calculateSemester } from "../../lib/usn"
import { Label } from "../../components/ui/label"
import { Input } from "../../components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Button } from "../../components/ui/button"
import Link from "next/link"

type Role = "engineering" | "mba" | "admin"

export default function LoginPage() {
  const router = useRouter()
  const [role, setRole] = useState<Role | "">("")
  const [usnRaw, setUsnRaw] = useState("")
  const [adminUser, setAdminUser] = useState("")
  const [adminPass, setAdminPass] = useState("")

  const parsed = useMemo(() => (role && role !== "admin" && usnRaw ? parseUSN(usnRaw) : null), [role, usnRaw])

  const derived = useMemo(() => {
    if (!parsed || !role || role === "admin") return null
    const sem = calculateSemester(parsed.admissionYear, role)
    return {
      branch: parsed.branchCode,
      admissionYear: parsed.admissionYear,
      semester: sem,
    }
  }, [parsed, role])

  return (
    <main className="min-h-dvh bg-background text-foreground">
      {/* Content */}
      <div className="mx-auto w-full max-w-5xl p-6">
        <div className="grid grid-cols-1 gap-6">
          <div className="rounded-xl border border-border p-5 bg-card">
            <header className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Login</h2>
              <Link href="/" className="text-sm underline underline-offset-4 hover:opacity-80">
                Home
              </Link>
            </header>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Role</Label>
                <Select value={role} onValueChange={(v: Role) => setRole(v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="engineering">Engineering</SelectItem>
                    <SelectItem value="mba">MBA</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {role && role !== "admin" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="usn">USN</Label>
                    <Input
                      id="usn"
                      value={usnRaw}
                      onChange={(e) => setUsnRaw(e.target.value)}
                      placeholder="e.g., 4sf23is009"
                      autoCapitalize="off"
                      autoCorrect="off"
                      spellCheck={false}
                    />
                    <p className="text-xs text-muted-foreground">
                      Pattern: 4SF (college) + 23 (admission year) + IS (branch) + 009 (roll)
                    </p>
                  </div>

                  {/* Preview chips */}
                  {derived && (
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                        Branch: {derived.branch}
                      </span>
                      <span className="inline-flex items-center rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
                        Admission: {derived.admissionYear}
                      </span>
                      <span className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                        Semester: {derived.semester}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    <Button
                      disabled={!parsed || !derived}
                      onClick={() => {
                        if (!parsed || !derived || !role) return
                        const qs = new URLSearchParams({
                          usn: parsed.raw,
                          branch: derived.branch,
                          adm: String(derived.admissionYear),
                          sem: String(derived.semester),
                        })
                        router.push(`/${role}?${qs.toString()}`)
                      }}
                    >
                      Continue
                    </Button>
                    <Link href="/faculty/login" className="text-sm underline underline-offset-4">
                      Faculty Login
                    </Link>
                  </div>
                </div>
              )}

              {role === "admin" && (
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="adminUser">Username</Label>
                    <Input id="adminUser" value={adminUser} onChange={(e) => setAdminUser(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="adminPass">Password</Label>
                    <Input
                      id="adminPass"
                      type="password"
                      value={adminPass}
                      onChange={(e) => setAdminPass(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <Button
                      onClick={() => {
                        if (adminUser && adminPass) {
                          localStorage.setItem("auth.admin", JSON.stringify({ at: Date.now(), user: adminUser }))
                          window.location.href = "/admin"
                        } else {
                          alert("Enter admin credentials")
                        }
                      }}
                    >
                      Login as Admin
                    </Button>
                    <p className="text-xs text-muted-foreground">No backend; credentials are not verified.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
