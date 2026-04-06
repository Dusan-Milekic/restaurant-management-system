import { useState } from "react"
import axios from "axios"

export default function LoginForm() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/login", {
        username,
        password,
      })
      if (!res.data.token) {
        setError("Pogrešno korisničko ime ili lozinka")
        return
      }
      localStorage.setItem("token", res.data.token)
      window.location.href = "/dashboard"
    } catch {
      setError("Došlo je do greške!")
    }
  }

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">

        <div className="text-center mb-10">
          <h1 className="font-serif text-4xl font-light tracking-widest uppercase text-stone-800">
            La<span className="text-amber-700">Belle</span>
          </h1>
          <p className="text-xs tracking-widest uppercase text-stone-400 mt-2">
            Restoran sistem
          </p>
        </div>

        <div className="bg-white border border-stone-200 rounded-2xl p-8 shadow-sm">
          <div className="flex flex-col gap-6">

            <div className="flex flex-col gap-1">
              <label className="text-xs tracking-widest uppercase text-stone-400">
                Korisničko ime
              </label>
              <input
                type="text"
                className="border-b border-stone-200 py-2 text-sm text-stone-800 bg-transparent outline-none focus:border-amber-700 transition-colors duration-200"
                onChange={(e) => setUsername(e.currentTarget.value)}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs tracking-widest uppercase text-stone-400">
                Lozinka
              </label>
              <input
                type="password"
                className="border-b border-stone-200 py-2 text-sm text-stone-800 bg-transparent outline-none focus:border-amber-700 transition-colors duration-200"
                onChange={(e) => setPassword(e.currentTarget.value)}
              />
            </div>

            {error && (
              <p className="text-red-400 text-xs tracking-wide">{error}</p>
            )}

            <button
              className="w-full bg-amber-700 hover:bg-amber-800 text-white text-xs tracking-widest uppercase py-4 rounded-xl cursor-pointer transition-colors duration-200 mt-2"
              onClick={handleSubmit}
            >
              Prijava
            </button>

          </div>
        </div>

      </div>
    </div>
  )
}