import { useEffect, useState } from "react"
import axios from "axios"

export default function DashboardPage() {
  const [user, setUser] = useState<{ username: string, name: string, lastname: string } | null>(null)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      window.location.href = "/login"
      return
    }

    axios.post("http://localhost:3000/api/user", { token })
      .then(res => setUser(res.data))
      .catch(() => {
        localStorage.removeItem("token")
        window.location.href = "/login"
      })
  }, [])

  return (
    <>
      <h1>Welcome: {user?.name} {user?.username} {user?.lastname}</h1>
    </>
  )
}