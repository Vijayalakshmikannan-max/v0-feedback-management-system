"use client"

import { useState } from "react"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { Button } from "../../../components/ui/button"

export default function FacultyLoginPage() {
  const [name, setName] = useState("")
  return (
    <main className="min-h-dvh bg-background text-foreground p-6">
      <div className="mx-auto max-w-md space-y-4 rounded-lg border border-border p-4">
        <h1 className="text-xl font-semibold">Faculty Login</h1>
        <div className="space-y-2">
          <Label htmlFor="name">Faculty Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., MR. VASUDEVA RAO P.V"
          />
        </div>
        <Button
          onClick={() => {
            if (name.trim()) {
              localStorage.setItem("auth.faculty", JSON.stringify({ at: Date.now(), name: name.trim() }))
              window.location.href = "/faculty"
            } else {
              alert("Enter your name")
            }
          }}
        >
          Continue
        </Button>
        <p className="text-xs text-muted-foreground">Demo only. No server auth.</p>
      </div>
    </main>
  )
}
