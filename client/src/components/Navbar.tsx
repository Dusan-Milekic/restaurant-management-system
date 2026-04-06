export default function Navbar({ name, lastname }: {
  username: string | undefined
  name: string | undefined
  lastname: string | undefined
}) {
  const initials = name && lastname
    ? `${name[0]}${lastname[0]}`.toUpperCase()
    : "?"

  return (
    <nav className="flex items-center justify-between px-10 h-16 border-b border-stone-200 bg-white">
      <div className="font-serif text-xl font-light tracking-widest uppercase" onClick={() => {window.location.href="/dashboard"}}>
        La<span className="text-amber-700">Belle</span>
      </div>

      <ul className="flex items-center gap-8 list-none">
        {[
          { label: "Stolovi", href: "/table" },
          { label: "Rezervacije", href: "/reservations" },
          { label: "Meni", href: "/meni" },
          { label: "Račun", href: "/inovices" },
        ].map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              className="text-xs tracking-widest uppercase text-stone-400 hover:text-stone-800 transition-colors duration-200"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full border border-amber-700 flex items-center justify-center text-sm text-amber-700 font-serif">
          {initials}
        </div>
        <span className="text-xs text-stone-400 tracking-wide font-light">
          {name} {lastname}
        </span>
      </div>
    </nav>
  )
}