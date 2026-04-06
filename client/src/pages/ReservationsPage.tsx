import { useEffect, useState } from "react"
import axios from "axios"
import Navbar from "../components/Navbar"

type Table = {
  id: number
  broj: number
}

type Reservation = {
  id: number
  nameReserved: string
  date: string
  table: {
    broj: number
  }
}

export default function ReservationPage() {
  const [user, setUser] = useState<{ username: string; name: string; lastName: string } | null>(null)
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [tables, setTables] = useState<Table[]>([])
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ nameReserved: "", tableId: "", date: "" })

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

    axios.get("http://localhost:3000/api/reservations")
      .then(res => setReservations(res.data.reservations))

    axios.get("http://localhost:3000/api/tables")
      .then(res => setTables(res.data.tables))
  }, [])

const handleSubmit = async () => {
  if (!form.nameReserved || !form.tableId || !form.date) return
  try {
    await axios.post("http://localhost:3000/api/reservations", {
      nameReserved: form.nameReserved,
      tableId: parseInt(form.tableId),
      date: form.date,
    })
    
    // refetch umesto push u state
    const res = await axios.get("http://localhost:3000/api/reservations")
    setReservations(res.data.reservations)
    
    setForm({ nameReserved: "", tableId: "", date: "" })
    setShowForm(false)
  } catch {
    alert("Greška pri kreiranju rezervacije!")
  }
}
  return (
    <>
      <Navbar username={user?.username} name={user?.name} lastname={user?.lastName} />
      <div className="max-w-5xl mx-auto px-6 py-10">

        <div className="flex items-center justify-between mb-10">
          <h1 className="font-serif text-3xl font-light tracking-widest uppercase text-stone-800">
            Rezervacije
          </h1>
          <button
            onClick={() => setShowForm(true)}
            className="bg-amber-700 hover:bg-amber-800 text-white text-xs tracking-widest uppercase px-6 py-3 rounded-xl transition-colors duration-200"
          >
            + Nova rezervacija
          </button>
        </div>

        {/* Lista */}
        <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden">
          <div className="grid grid-cols-4 px-6 py-3 border-b border-stone-100 bg-stone-50">
            <span className="text-xs tracking-widest uppercase text-stone-400">Gost</span>
            <span className="text-xs tracking-widest uppercase text-stone-400">Sto</span>
            <span className="text-xs tracking-widest uppercase text-stone-400">Datum</span>
            <span className="text-xs tracking-widest uppercase text-stone-400">Vreme</span>
          </div>
          <div className="divide-y divide-stone-100">
            {reservations.length === 0 ? (
              <p className="text-sm text-stone-300 text-center py-12">Nema rezervacija</p>
            ) : (
              reservations.map(r => (
                <div key={r.id} className="grid grid-cols-4 px-6 py-4">
                  <span className="text-sm text-stone-700 font-medium">{r.nameReserved}</span>
                  <span className="text-sm text-stone-500">Sto {r.table.broj}</span>
                  <span className="text-sm text-stone-500">{new Date(r.date).toLocaleDateString("sr-RS")}</span>
                  <span className="text-sm text-stone-500">{new Date(r.date).toLocaleTimeString("sr-RS", { hour: "2-digit", minute: "2-digit" })}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Form popup */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">

            <div className="bg-amber-700 px-8 py-6 flex items-center justify-between">
              <div>
                <p className="text-xs tracking-widest uppercase text-amber-200 mb-1">Nova</p>
                <h2 className="font-serif text-2xl font-light text-white">Rezervacija</h2>
              </div>
              <button
                onClick={() => setShowForm(false)}
                className="w-9 h-9 rounded-full bg-amber-600 hover:bg-amber-500 flex items-center justify-center text-white transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="px-8 py-6 flex flex-col gap-5">

              <div className="flex flex-col gap-1">
                <label className="text-xs tracking-widest uppercase text-stone-400">Ime gosta</label>
                <input
                  type="text"
                  value={form.nameReserved}
                  onChange={e => setForm(prev => ({ ...prev, nameReserved: e.target.value }))}
                  placeholder="npr. Marko Jovanović"
                  className="border-b-2 border-stone-200 focus:border-amber-400 py-2 text-sm text-stone-700 outline-none transition-colors placeholder-stone-300"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs tracking-widest uppercase text-stone-400">Sto</label>
                <select
                  value={form.tableId}
                  onChange={e => setForm(prev => ({ ...prev, tableId: e.target.value }))}
                  className="border-b-2 border-stone-200 focus:border-amber-400 py-2 text-sm text-stone-700 outline-none transition-colors bg-transparent"
                >
                  <option value="">Odaberi sto</option>
                  {tables.map(t => (
                    <option key={t.id} value={t.id}>Sto {t.broj}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs tracking-widest uppercase text-stone-400">Datum i vreme</label>
                <input
                  type="datetime-local"
                  value={form.date}
                  onChange={e => setForm(prev => ({ ...prev, date: e.target.value }))}
                  className="border-b-2 border-stone-200 focus:border-amber-400 py-2 text-sm text-stone-700 outline-none transition-colors"
                />
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-amber-700 hover:bg-amber-800 text-white text-xs tracking-widest uppercase py-4 rounded-2xl transition-colors duration-200 mt-2"
              >
                Sačuvaj rezervaciju
              </button>

            </div>
          </div>
        </div>
      )}
    </>
  )
}