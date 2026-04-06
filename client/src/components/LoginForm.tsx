import { useState } from "react"
import axios from "axios";

export default function LoginForm(){
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/login", {
        username,
        password
      })
      console.log(res.data.message)
      // ovde dodaj redirect ili sta vec treba
    } catch (error){
        console.log(error)
    }
  }

  return (
    <>
      <form className="flex flex-col border-2 border-amber-50 rounded-2xl mt-32 p-6 gap-2">
        <label className="text-white">Username:</label>
        <input
          type="text"
          className="border-b-2 border-amber-950"
          onChange={(e) => setUsername(e.currentTarget.value)}
        />
        <label className="text-white">Password:</label>
        <input
          type="password"
          className="border-b-2 border-amber-950"
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        {error && <p className="text-red-400 text-sm">{error}</p>}
      </form>
      <button
        className="text-black bg-white w-full rounded-3xl py-6 cursor-pointer mt-11"
        onClick={handleSubmit}
      >
        Login
      </button>
    </>
  )
}