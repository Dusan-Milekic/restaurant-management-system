import { useEffect, useState } from "react"
import axios from "axios"
import Navbar from "../components/Navbar"

type MeniItem = {
  id: number
  naziv: string
  cena: number
  kategorija: {
    id: number
    nazivKategorije: string
  }
}

export default function MeniPage() {
  const [meni, setMeni] = useState<MeniItem[]>([])
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

    axios.get("http://localhost:3000/api/meni")
      .then(res => setMeni(res.data.meni))
      .catch(() => console.error("Greška pri učitavanju menija"))
  }, [])

  const grupisano = meni.reduce((acc, item) => {
    const kat = item.kategorija.nazivKategorije
    if (!acc[kat]) acc[kat] = []
    acc[kat].push(item)
    return acc
  }, {} as Record<string, MeniItem[]>)

  return (
    <>

      <Navbar username={user?.username} name={user?.name} lastname={user?.lastName} />
      
      <div className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="font-serif text-3xl font-light tracking-widest uppercase text-stone-800 mb-10">
          Naš Meni
        </h1>
        {Object.entries(grupisano).map(([kategorija, stavke]) => (
          <div key={kategorija} className="mb-10">
            <h2 className="text-xs tracking-widest uppercase text-amber-700 font-medium mb-4 border-b border-stone-200 pb-2">
              {kategorija}
            </h2>
            <div className="divide-y divide-stone-100">
              {stavke.map(item => (
                <div key={item.id} className="flex justify-between items-center py-3">
                  <span className="text-stone-700 text-sm">{item.naziv}</span>
                  <span className="text-stone-500 text-sm font-light">{item.cena.toLocaleString()} RSD</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}