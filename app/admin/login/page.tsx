"use client"

import { useState } from "react"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { Button } from "../../../components/ui/button"

export default function AdminLoginPage() {
  const [u, setU] = useState("")
  const [p, setP] = useState("")

  return (
    <main className="min-h-dvh bg-background text-foreground p-6">
      <div className="mx-auto max-w-md space-y-4 rounded-lg border border-border p-4">
        <h1 className="text-xl font-semibold">Admin Login</h1>
        <div className="space-y-2">
          <Label htmlFor="u">Username</Label>
          <Input id="u" value={u} onChange={(e) => setU(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="p">Password</Label>
          <Input id="p" type="password" value={p} onChange={(e) => setP(e.target.value)} />
        </div>
        <Button
          onClick={() => {
            if (u && p) {
              localStorage.setItem("auth.admin", JSON.stringify({ at: Date.now(), user: u }))
              window.location.href = "/admin"
            } else {
              alert("Enter credentials")
            }
          }}
        >
          Login
        </Button>
        <p className="text-xs text-muted-foreground">Demo only. No server auth.</p>
      </div>
    </main>
  )
}
