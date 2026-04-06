import { useState, useEffect } from "react"
import axios from "axios"

type OrderItem = {
  id: number
  naziv: string
  cena: number
  kolicina: number
}

type MeniItem = {
  id: number
  naziv: string
  cena: number
  kategorija: {
    nazivKategorije: string
  }
}

type PaymentProps = {
  tableId: number,
  tableNumber: number
  onClose: () => void
}

export default function Payment({ tableId,tableNumber, onClose }: PaymentProps) {
  const STORAGE_KEY = `order_table_${tableNumber}`

  const [items, setItems] = useState<OrderItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  })
  const [meni, setMeni] = useState<MeniItem[]>([])
  const [search, setSearch] = useState("")
  const [showSearch, setShowSearch] = useState(false)

  useEffect(() => {
    axios.get("http://localhost:3000/api/meni")
      .then(res => setMeni(res.data.meni))
      .catch(() => console.error("Greška pri učitavanju menija"))
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const filtered = meni.filter(item =>
    item.naziv.toLowerCase().includes(search.toLowerCase())
  )

  const addItem = (meniItem: MeniItem) => {
    setItems(prev => {
      const existing = prev.find(o => o.id === meniItem.id)
      if (existing) {
        return prev.map(o => o.id === meniItem.id ? { ...o, kolicina: o.kolicina + 1 } : o)
      }
      return [...prev, { id: meniItem.id, naziv: meniItem.naziv, cena: meniItem.cena, kolicina: 1 }]
    })
    setSearch("")
    setShowSearch(false)
  }

  const removeItem = (id: number) => {
    setItems(prev => {
      const existing = prev.find(o => o.id === id)
      if (existing && existing.kolicina > 1) {
        return prev.map(o => o.id === id ? { ...o, kolicina: o.kolicina - 1 } : o)
      }
      return prev.filter(o => o.id !== id)
    })
  }

const handleNaplata = async () => {
  try {
    await axios.post("http://localhost:3000/api/payment", {
      tableId: tableId,
      items: items.map(item => ({
        naziv: item.naziv,
        cena: item.cena,
        kolicina: item.kolicina,
      }))
    })
    localStorage.removeItem(STORAGE_KEY)
    setItems([])
    onClose()
  } catch (e) {
    alert("Greška pri naplati!")
  }
}

  const subtotal = items.reduce((sum, item) => sum + item.cena * item.kolicina, 0)
  const tax = Math.round(subtotal * 0.1)
  const total = subtotal + tax

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-xl mx-4 overflow-hidden border border-stone-100">

        {/* Header */}
        <div className="bg-amber-700 px-8 py-6 flex items-center justify-between">
          <div>
            <p className="text-xs tracking-widest uppercase text-amber-200 mb-1">Aktivni račun</p>
            <h1 className="font-serif text-3xl font-light text-white">
              Sto {tableNumber}
            </h1>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-sm text-amber-200">{new Date().toLocaleDateString("sr-RS")}</p>
              <p className="text-lg font-light text-white">
                {new Date().toLocaleTimeString("sr-RS", { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-amber-600 hover:bg-amber-500 flex items-center justify-center text-white transition-colors text-lg"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="px-8 py-5 bg-stone-50 border-b border-stone-100 relative">
          <p className="text-xs tracking-widest uppercase text-stone-400 mb-3">Dodaj stavku</p>
          <div className="flex items-center gap-3 bg-white border-2 border-stone-200 rounded-2xl px-5 py-3 focus-within:border-amber-400 transition-colors shadow-sm">
            <span className="text-stone-300 text-base">🔍</span>
            <input
              type="text"
              placeholder="Pretraži jela i pića..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setShowSearch(e.target.value.length > 0)
              }}
              onFocus={() => setShowSearch(search.length > 0)}
              className="flex-1 text-sm text-stone-700 outline-none bg-transparent placeholder-stone-300"
            />
            {search && (
              <button
                onClick={() => { setSearch(""); setShowSearch(false) }}
                className="text-stone-300 hover:text-stone-500 text-sm"
              >
                ✕
              </button>
            )}
          </div>

          {/* Dropdown */}
          {showSearch && filtered.length > 0 && (
            <div className="absolute left-8 right-8 top-28 bg-white border border-stone-200 rounded-2xl shadow-xl z-10 max-h-52 overflow-y-auto">
              {filtered.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => addItem(item)}
                  className={`w-full flex justify-between items-center px-5 py-3.5 hover:bg-amber-50 transition-colors text-left ${index !== filtered.length - 1 ? "border-b border-stone-100" : ""}`}
                >
                  <div>
                    <p className="text-sm font-medium text-stone-700">{item.naziv}</p>
                    <p className="text-xs text-stone-400 mt-0.5">{item.kategorija.nazivKategorije}</p>
                  </div>
                  <span className="text-sm font-medium text-amber-700 bg-amber-50 px-3 py-1 rounded-lg ml-4 shrink-0">
                    {item.cena.toLocaleString()} RSD
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Items */}
        <div className="px-8 py-4 max-h-52 overflow-y-auto">
          {items.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-2xl mb-2">🍽️</p>
              <p className="text-sm text-stone-300">Pretraži meni i dodaj stavke</p>
            </div>
          ) : (
            <div className="divide-y divide-stone-100">
              {items.map(item => (
                <div key={item.id} className="flex items-center justify-between py-3.5">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 bg-stone-50 rounded-xl px-2 py-1">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="w-6 h-6 rounded-lg bg-white border border-stone-200 hover:border-red-300 hover:text-red-500 text-stone-400 flex items-center justify-center text-sm font-medium transition-colors shadow-sm"
                      >
                        −
                      </button>
                      <span className="w-7 text-center text-sm font-medium text-amber-700">
                        {item.kolicina}
                      </span>
                      <button
                        onClick={() => addItem({ id: item.id, naziv: item.naziv, cena: item.cena, kategorija: { nazivKategorije: "" } })}
                        className="w-6 h-6 rounded-lg bg-white border border-stone-200 hover:border-green-300 hover:text-green-500 text-stone-400 flex items-center justify-center text-sm font-medium transition-colors shadow-sm"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-sm text-stone-700">{item.naziv}</span>
                  </div>
                  <div className="text-right shrink-0 ml-4">
                    <p className="text-sm font-medium text-stone-800">{(item.cena * item.kolicina).toLocaleString()} RSD</p>
                    <p className="text-xs text-stone-400">{item.cena.toLocaleString()} × {item.kolicina}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Totals */}
        <div className="px-8 py-5 border-t-2 border-stone-100 bg-stone-50">
          <div className="flex justify-between py-1.5">
            <span className="text-sm text-stone-400">Međuzbir</span>
            <span className="text-sm text-stone-600">{subtotal.toLocaleString()} RSD</span>
          </div>
          <div className="flex justify-between py-1.5">
            <span className="text-sm text-stone-400">PDV (10%)</span>
            <span className="text-sm text-stone-600">{tax.toLocaleString()} RSD</span>
          </div>
          <div className="flex justify-between pt-3 mt-2 border-t-2 border-stone-200">
            <span className="text-base font-medium tracking-widest uppercase text-stone-800">Ukupno</span>
            <span className="text-2xl font-light text-amber-700">{total.toLocaleString()} RSD</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 px-8 py-5 border-t border-stone-100">
          <button className="flex-1 border-2 border-stone-200 text-stone-500 text-xs tracking-widest uppercase py-4 rounded-2xl hover:bg-stone-50 hover:border-stone-300 transition-colors duration-200 font-medium">
            Štampaj
          </button>
          <button
            onClick={handleNaplata}
            className="flex-2 bg-amber-700 hover:bg-amber-800 text-white text-xs tracking-widest uppercase py-4 rounded-2xl transition-colors duration-200 font-medium shadow-lg shadow-amber-200"
          >
            Naplati
          </button>
        </div>

      </div>
    </div>
  )
}