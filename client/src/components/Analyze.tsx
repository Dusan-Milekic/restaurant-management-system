import { useEffect, useState } from "react"
import api from "../lib/api"
import PeriodicalStats from "./PeriodicalStats"
import { useAuth } from "../hooks/useAuth"

type Invoice = {
  id: number
  total: number
  amount: number
  tax: number
  createdAt: string
  table: {
    broj: number
  }
}

export default function Analyze() {
  const [total, setTotal] = useState(0)
  const [count, setCount] = useState(0)
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [periodical, setPeriodical] = useState(false)



    useAuth()

    useEffect(() => {
    api.get("/api/stats")
        .then(res => {
        setTotal(res.data.total)
        setCount(res.data.count)
        setInvoices(res.data.invoices)
        })
        .catch(() => console.error("Greška pri učitavanju statistika"))
    }, [])
  const avgPerTable = count > 0 ? Math.round(total / count) : 0

  return (
    <>
      <div className="max-w-5xl mx-auto px-6 py-10">

        <div className="flex items-center justify-between mb-10">
          <h1 className="font-serif text-3xl font-light tracking-widest uppercase text-stone-800">
            Dnevni izveštaj
          </h1>
          <button
            onClick={() => setPeriodical(!periodical)}
            className="border-2 border-stone-200 text-stone-500 text-xs tracking-widest uppercase px-6 py-3 rounded-xl hover:bg-stone-50 hover:border-stone-300 transition-colors duration-200 cursor-pointer"
          >
            {periodical ? "Zatvori" : "Periodični izveštaj"}
          </button>
        </div>

        {periodical && <PeriodicalStats />}

        <div className="grid grid-cols-3 gap-4 mb-10">
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

        <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-stone-100 bg-stone-50">
            <p className="text-xs tracking-widest uppercase text-stone-400">Današnji računi</p>
          </div>
          <div className="grid grid-cols-4 px-6 py-3 border-b border-stone-100">
            <span className="text-xs tracking-widest uppercase text-stone-400">Broj</span>
            <span className="text-xs tracking-widest uppercase text-stone-400">Sto</span>
            <span className="text-xs tracking-widest uppercase text-stone-400">Vreme</span>
            <span className="text-xs tracking-widest uppercase text-stone-400 text-right">Ukupno</span>
          </div>
          <div className="divide-y divide-stone-100">
            {invoices.length === 0 ? (
              <p className="text-sm text-stone-300 text-center py-12">Nema računa danas</p>
            ) : (
              invoices.map(invoice => (
                <div key={invoice.id} className="grid grid-cols-4 px-6 py-4">
                  <span className="text-sm text-stone-500">#{invoice.id}</span>
                  <span className="text-sm text-stone-700">Sto {invoice.table.broj}</span>
                  <span className="text-sm text-stone-500">
                    {new Date(invoice.createdAt).toLocaleTimeString("sr-RS", { hour: "2-digit", minute: "2-digit" })}
                  </span>
                  <span className="text-sm font-medium text-amber-700 text-right">
                    {invoice.total.toLocaleString()} RSD
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </>
  )
}