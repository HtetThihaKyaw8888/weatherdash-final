import { useParams, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import Status from "../components/Status.jsx"
import { geocodeCity, fetchDailyForecast } from "../lib/api.js"

export default function DayDetail() {
  const { city, date } = useParams()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [place, setPlace] = useState(null)
  const [day, setDay] = useState(null)

  useEffect(() => {
    let cancelled = false

    const run = async () => {
      setLoading(true)
      setError("")
      setDay(null)

      try {
        const p = await geocodeCity(city)
        const d = await fetchDailyForecast(p.latitude, p.longitude, p.timezone)
        if (cancelled) return

        const idx = d.time.findIndex(t => t === date)
        if (idx === -1) throw new Error("Date not found")

        setPlace(p)
        setDay({
          date,
          max: Math.round(d.temperature_2m_max[idx]),
          min: Math.round(d.temperature_2m_min[idx]),
          code: d.weathercode[idx]
        })
      } catch (e) {
        if (!cancelled) setError(e?.message || "Something went wrong")
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    run()
    return () => {
      cancelled = true
    }
  }, [city, date])

  if (loading) {
    return (
      <section className="card">
        <h1 className="title">Day Detail</h1>
        <Status title="Loading..." />
      </section>
    )
  }

  if (error) {
    return (
      <section className="card">
        <h1 className="title">Day Detail</h1>
        <Status title="Error" message={error} />
        <Link className="btn" to={`/forecast/${encodeURIComponent(city)}`}>Back</Link>
      </section>
    )
  }

  return (
    <section className="card">
      <h1 className="title">Weather on {day.date}</h1>
      <p className="muted">{place.name}, {place.country}</p>

      <div className="rows">
        <div className="row">
          <div>Max</div>
          <div className="pill">{day.max}°C</div>
        </div>
        <div className="row">
          <div>Min</div>
          <div className="pill">{day.min}°C</div>
        </div>
        <div className="row">
          <div>Weather Code</div>
          <div className="pill">{day.code}</div>
        </div>
      </div>

      <div className="actions">
        <Link className="btn" to={`/forecast/${encodeURIComponent(city)}`}>Back to forecast</Link>
        <Link className="btn" to="/">Search another city</Link>
      </div>
    </section>
  )
}
