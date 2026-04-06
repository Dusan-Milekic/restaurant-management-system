import { useEffect, useState,useRef } from "react"
import axios from "axios"
import Navbar from "../components/Navbar"
import { useReactToPrint } from "react-to-print"
import PrintInvoice from "../components/PrintInovice"


type InvoiceItem = {
  id: number
  naziv: string
  cena: number
  kolicina: number
}

type Invoice = {
  id: number
  amount: number
  tax: number
  total: number
  createdAt: string
  table: {
    broj: number
  }
  items: InvoiceItem[]
}

export default function InvoicesPage() {
  const [user, setUser] = useState<{ username: string; name: string; lastName: string } | null>(null)
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [selected, setSelected] = useState<Invoice | null>(null)
  const printRef = useRef<HTMLDivElement>(null)
  const handlePrint = useReactToPrint({ contentRef: printRef })




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

    axios.get("http://localhost:3000/api/invoices")
      .then(res => setInvoices(res.data.invoices))
      .catch(() => console.error("Greška pri učitavanju računa"))
  }, [])

  return (
    <>
      <Navbar username={user?.username} name={user?.name} lastname={user?.lastName} />
      <div className="max-w-5xl mx-auto px-6 py-10">
        <h1 className="font-serif text-3xl font-light tracking-widest uppercase text-stone-800 mb-10">
          Računi
        </h1>

        <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden">
          <div className="grid grid-cols-5 px-6 py-3 border-b border-stone-100 bg-stone-50">
            <span className="text-xs tracking-widest uppercase text-stone-400">Broj</span>
            <span className="text-xs tracking-widest uppercase text-stone-400">Sto</span>
            <span className="text-xs tracking-widest uppercase text-stone-400">Datum</span>
            <span className="text-xs tracking-widest uppercase text-stone-400">Vreme</span>
            <span className="text-xs tracking-widest uppercase text-stone-400 text-right">Ukupno</span>
          </div>

          <div className="divide-y divide-stone-100">
            {invoices.length === 0 ? (
              <p className="text-sm text-stone-300 text-center py-12">Nema računa</p>
            ) : (
              invoices.map(invoice => (
                <button
                  key={invoice.id}
                  onClick={() => setSelected(invoice)}
                  className="w-full grid grid-cols-5 px-6 py-4 hover:bg-amber-50 transition-colors text-left"
                >
                  <span className="text-sm text-stone-500">#{invoice.id}</span>
                  <span className="text-sm text-stone-700">Sto {invoice.table.broj}</span>
                  <span className="text-sm text-stone-500">{new Date(invoice.createdAt).toLocaleDateString("sr-RS")}</span>
                  <span className="text-sm text-stone-500">{new Date(invoice.createdAt).toLocaleTimeString("sr-RS", { hour: "2-digit", minute: "2-digit" })}</span>
                  <span className="text-sm font-medium text-amber-700 text-right">{invoice.total.toLocaleString()} RSD</span>
                </button>
              ))
            )}
          </div>
        
        </div>
        
      </div>

      {/* Detail popup */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden">

            <div className="bg-amber-700 px-8 py-6 flex items-center justify-between">
              <div>
                <p className="text-xs tracking-widest uppercase text-amber-200 mb-1">Račun #{selected.id}</p>
                <h2 className="font-serif text-2xl font-light text-white">Sto {selected.table.broj}</h2>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="w-9 h-9 rounded-full bg-amber-600 hover:bg-amber-500 flex items-center justify-center text-white transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="px-8 py-4 max-h-64 overflow-y-auto divide-y divide-stone-100">
              {selected.items.map(item => (
                <div key={item.id} className="flex justify-between items-center py-3">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-xs text-amber-700 font-medium">
                      {item.kolicina}
                    </span>
                    <span className="text-sm text-stone-700">{item.naziv}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-stone-700">{(item.cena * item.kolicina).toLocaleString()} RSD</p>
                    <p className="text-xs text-stone-400">{item.cena.toLocaleString()} × {item.kolicina}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="px-8 py-5 border-t border-stone-100 bg-stone-50">
              <div className="flex justify-between py-1.5">
                <span className="text-sm text-stone-400">Međuzbir</span>
                <span className="text-sm text-stone-600">{selected.amount.toLocaleString()} RSD</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-sm text-stone-400">PDV (10%)</span>
                <span className="text-sm text-stone-600">{selected.tax.toLocaleString()} RSD</span>
              </div>
              <div className="flex justify-between pt-3 mt-2 border-t-2 border-stone-200">
                <span className="text-base font-medium tracking-widest uppercase text-stone-800">Ukupno</span>
                <span className="text-2xl font-light text-amber-700">{selected.total.toLocaleString()} RSD</span>
              </div>
            </div>
              <div className="hidden">
            {selected && (
                <PrintInvoice
                ref={printRef}
                id={selected.id}
                tableNumber={selected.table.broj}
                amount={selected.amount}
                tax={selected.tax}
                total={selected.total}
                createdAt={selected.createdAt}
                items={selected.items}
                />
            )}
            </div>
            <div className="px-8 py-4 border-t border-stone-100">
              <button className="w-full border-2 border-stone-200 text-stone-500 text-xs tracking-widest uppercase py-4 rounded-2xl hover:bg-stone-50 transition-colors"
              onClick={() => handlePrint()}>
                Štampaj
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  )
}