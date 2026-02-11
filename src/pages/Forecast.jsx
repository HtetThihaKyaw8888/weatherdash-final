import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import Status from "../components/Status.jsx"
import ForecastList from "../components/ForecastList.jsx"
import { geocodeCity, fetchDailyForecast } from "../lib/api.js"

export default function Forecast() {
  const { city } = useParams()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [place, setPlace] = useState(null)
  const [daily, setDaily] = useState(null)

  useEffect(() => {
    let cancelled = false

    const run = async () => {
      setLoading(true)
      setError("")
      setPlace(null)
      setDaily(null)

      try {
        const p = await geocodeCity(city)
        const d = await fetchDailyForecast(p.latitude, p.longitude, p.timezone)
        if (cancelled) return
        setPlace(p)
        setDaily(d)
      } catch (e) {
        if (cancelled) return
        setError(e?.message || "Something went wrong")
      } finally {
        if (!cancelled) setLoading(false)
      }

    }

    run()

    return () => {
      cancelled = true
    }
  }, [city])

  if (loading) {
    return (
      <section className="card">
        <h1 className="title">Forecast</h1>
        <Status title="Loading..." message="Fetching weather data." />
      </section>
    )
  }

  if (error) {
    return (
      <section className="card">
        <h1 className="title">Forecast</h1>
        <Status title="Error" message={error} />
        <div className="actions">
          <Link className="btn" to="/">Back</Link>
        </div>
      </section>
    )
  }

  return (
    <section className="card">
      <h1 className="title">Forecast</h1>
      <ForecastList cityLabel={`${place.name}, ${place.country}`} daily={daily} />
      <div className="actions">
        <Link className="btn" to="/">Search another city</Link>
      </div>
    </section>
  )
}
