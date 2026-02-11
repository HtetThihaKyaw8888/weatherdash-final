import { Link, useParams } from "react-router-dom"

export default function ForecastList({ cityLabel, daily }) {
  const { city } = useParams()

  return (
    <div className="list">
      <div className="list__head">
        <h2 className="subtitle">{cityLabel}</h2>
        <div className="muted">7-day forecast</div>
      </div>

      <div className="rows">
        {daily.time.map((date, i) => (
          <Link key={date} className="row" to={`/forecast/${encodeURIComponent(city)}/${date}`}>
            <div className="row__date">{date}</div>
            <div className="row__temps">
              <span className="pill">Max {Math.round(daily.temperature_2m_max[i])}°</span>
              <span className="pill">Min {Math.round(daily.temperature_2m_min[i])}°</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
