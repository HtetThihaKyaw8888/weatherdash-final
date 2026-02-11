import { Link } from "react-router-dom"

export default function NotFound() {
  return (
    <section className="card">
      <h1 className="title">404</h1>
      <p className="muted">Page not found.</p>
      <Link className="btn" to="/">Back to Home</Link>
    </section>
  )
}
