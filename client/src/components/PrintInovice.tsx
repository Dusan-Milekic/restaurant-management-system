import { forwardRef } from "react"

type InvoiceItem = {
  id: number
  naziv: string
  cena: number
  kolicina: number
}

type PrintInvoiceProps = {
  id: number
  tableNumber: number
  amount: number
  tax: number
  total: number
  createdAt: string
  items: InvoiceItem[]
}

const PrintInvoice = forwardRef<HTMLDivElement, PrintInvoiceProps>(
  ({ id, tableNumber, amount, tax, total, createdAt, items }, ref) => {
    return (
      <div ref={ref} className="p-10 max-w-sm mx-auto font-mono text-sm text-black bg-white">

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-xl font-bold tracking-widest uppercase">LaBelle</h1>
          <p className="text-xs text-gray-500 mt-1">Restoran & Bar</p>
          <p className="text-xs text-gray-500">Bulevar Oslobođenja 1, Beograd</p>
          <p className="text-xs text-gray-500">PIB: 123456789</p>
        </div>

        <div className="border-t border-dashed border-gray-300 my-4" />

        {/* Info */}
        <div className="flex justify-between text-xs mb-1">
          <span className="text-gray-500">Račun br.</span>
          <span className="font-medium">#{id}</span>
        </div>
        <div className="flex justify-between text-xs mb-1">
          <span className="text-gray-500">Sto</span>
          <span className="font-medium">{tableNumber}</span>
        </div>
        <div className="flex justify-between text-xs mb-1">
          <span className="text-gray-500">Datum</span>
          <span className="font-medium">{new Date(createdAt).toLocaleDateString("sr-RS")}</span>
        </div>
        <div className="flex justify-between text-xs mb-1">
          <span className="text-gray-500">Vreme</span>
          <span className="font-medium">{new Date(createdAt).toLocaleTimeString("sr-RS", { hour: "2-digit", minute: "2-digit" })}</span>
        </div>

        <div className="border-t border-dashed border-gray-300 my-4" />

        {/* Items */}
        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-400 mb-2 uppercase tracking-wider">
            <span>Naziv</span>
            <span>Iznos</span>
          </div>
          {items.map(item => (
            <div key={item.id} className="mb-2">
              <div className="flex justify-between text-xs">
                <span className="font-medium">{item.naziv}</span>
                <span>{(item.cena * item.kolicina).toLocaleString()} RSD</span>
              </div>
              <div className="text-xs text-gray-400">
                {item.kolicina} x {item.cena.toLocaleString()} RSD
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-dashed border-gray-300 my-4" />

        {/* Totals */}
        <div className="flex justify-between text-xs mb-1">
          <span className="text-gray-500">Međuzbir</span>
          <span>{amount.toLocaleString()} RSD</span>
        </div>
        <div className="flex justify-between text-xs mb-3">
          <span className="text-gray-500">PDV (10%)</span>
          <span>{tax.toLocaleString()} RSD</span>
        </div>
        <div className="flex justify-between text-base font-bold">
          <span>UKUPNO</span>
          <span>{total.toLocaleString()} RSD</span>
        </div>

        <div className="border-t border-dashed border-gray-300 my-4" />

        {/* Footer */}
        <div className="text-center text-xs text-gray-400 mt-4">
          <p>Hvala na poseti!</p>
          <p className="mt-1">www.labellerestoran.rs</p>
          <p className="mt-3 text-gray-300">— fiskalni račun —</p>
        </div>

      </div>
    )
  }
)

export default PrintInvoice;