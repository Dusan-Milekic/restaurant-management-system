import { useEffect, useState } from "react"
import axios from "axios"
import Navbar from "../components/Navbar"

export default function DashboardPage() {
  const [user, setUser] = useState<{ username: string; name: string; lastName: string } | null>(null)

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
     

      <Navbar username={user?.username} name={user?.name} lastname={user?.lastName} />
    </>
  )
}