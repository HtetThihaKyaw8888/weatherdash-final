import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Home() {
  const [city, setCity] = useState("")
  const navigate = useNavigate()

  const submit = (e) => {
    e.preventDefault()
    const v = city.trim()
    if (!v) return
    navigate(`/forecast/${encodeURIComponent(v)}`)
  }

  return (
    <section className="card">
      <h1 className="title">Weather Dashboard</h1>
      <p className="muted">Search a city to see the forecast.</p>
      <form onSubmit={submit} className="search">
        <input
          className="input"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button className="btn" type="submit">Search</button>
      </form>
    </section>
  )
}
