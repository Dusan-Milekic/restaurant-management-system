import { useState } from "react"
import api from "../lib/api"
type Invoice = {
  id: number
  total: number
  createdAt: string
  table: {
    broj: number
  }
}

export default function PeriodicalStats() {
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [total, setTotal] = useState(0)
  const [count, setCount] = useState(0)
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [searched, setSearched] = useState(false)

const handleSearch = async () => {
  if (!from || !to) return
  try {
    const res = await api.get("/api/stats/period", {
      params: { from, to }
    })
    setTotal(res.data.total)
    setCount(res.data.count)
    setInvoices(res.data.invoices)
    setSearched(true)
  } catch {
    alert("Greška pri učitavanju izveštaja!")
  }
}

  const avgPerTable = count > 0 ? Math.round(total / count) : 0

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="font-serif text-3xl font-light tracking-widest uppercase text-stone-800 mb-10">
        Periodični izveštaj
      </h1>

      {/* Filter */}
      <div className="bg-white border border-stone-200 rounded-2xl px-8 py-6 mb-8 flex items-end gap-6">
        <div className="flex flex-col gap-1 flex-1">
          <label className="text-xs tracking-widest uppercase text-stone-400">Od</label>
          <input
            type="date"
            value={from}
            onChange={e => setFrom(e.target.value)}
            className="border-b-2 border-stone-200 focus:border-amber-400 py-2 text-sm text-stone-700 outline-none transition-colors"
          />
        </div>
        <div className="flex flex-col gap-1 flex-1">
          <label className="text-xs tracking-widest uppercase text-stone-400">Do</label>
          <input
            type="date"
            value={to}
            onChange={e => setTo(e.target.value)}
            className="border-b-2 border-stone-200 focus:border-amber-400 py-2 text-sm text-stone-700 outline-none transition-colors"
          />
        </div>
        <button
          onClick={handleSearch}
          className="bg-amber-700 hover:bg-amber-800 text-white text-xs tracking-widest uppercase px-8 py-3 rounded-xl transition-colors duration-200"
        >
          Pretraži
        </button>
      </div>

      {searched && (
        <>
          {/* Stat cards */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-white border border-stone-200 rounded-2xl p-6">
              <p className="text-xs tracking-widest uppercase text-stone-400 mb-2">Ukupan prihod</p>
              <p className="font-serif text-3xl font-light text-amber-700">{total.toLocaleString()} RSD</p>
            </div>
            <div className="bg-white border border-stone-200 rounded-2xl p-6">
              <p className="text-xs tracking-widest uppercase text-stone-400 mb-2">Broj računa</p>
              <p className="font-serif text-3xl font-light text-stone-800">{count}</p>
            </div>
            <div className="bg-white border border-stone-200 rounded-2xl p-6">
              <p className="text-xs tracking-widest uppercase text-stone-400 mb-2">Prosek po stolu</p>
              <p className="font-serif text-3xl font-light text-stone-800">{avgPerTable.toLocaleString()} RSD</p>
            </div>
          </div>

          {/* Tabela */}
          <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-stone-100 bg-stone-50">
              <p className="text-xs tracking-widest uppercase text-stone-400">
                Računi od {new Date(from).toLocaleDateString("sr-RS")} do {new Date(to).toLocaleDateString("sr-RS")}
              </p>
            </div>
            <div className="grid grid-cols-4 px-6 py-3 border-b border-stone-100">
              <span className="text-xs tracking-widest uppercase text-stone-400">Broj</span>
              <span className="text-xs tracking-widest uppercase text-stone-400">Sto</span>
              <span className="text-xs tracking-widest uppercase text-stone-400">Datum</span>
              <span className="text-xs tracking-widest uppercase text-stone-400 text-right">Ukupno</span>
            </div>
            <div className="divide-y divide-stone-100">
              {invoices.length === 0 ? (
                <p className="text-sm text-stone-300 text-center py-12">Nema računa za ovaj period</p>
              ) : (
                invoices.map(invoice => (
                  <div key={invoice.id} className="grid grid-cols-4 px-6 py-4">
                    <span className="text-sm text-stone-500">#{invoice.id}</span>
                    <span className="text-sm text-stone-700">Sto {invoice.table.broj}</span>
                    <span className="text-sm text-stone-500">
                      {new Date(invoice.createdAt).toLocaleDateString("sr-RS")}
                    </span>
                    <span className="text-sm font-medium text-amber-700 text-right">
                      {invoice.total.toLocaleString()} RSD
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}