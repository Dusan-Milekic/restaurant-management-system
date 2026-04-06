// src/hooks/useAuth.ts
import { useEffect, useState } from "react"
import api from "../lib/api"

type User = {
  username: string
  name: string
  lastName: string
}

export function useAuth() {
  const [userAuth, setUser] = useState<User | null>(null)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      window.location.href = "/login"
      return
    }

    api.post("/api/user", { token })
      .then(res => setUser(res.data))
      .catch(() => {
        localStorage.removeItem("token")
        window.location.href = "/login"
      })
  }, [])

  return { userAuth }
}