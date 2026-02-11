import { Outlet, Link } from "react-router-dom"

export default function Layout() {
  return (
    <div className="app">
      <header className="header">
        <div className="header__inner">
          <Link className="brand" to="/">WeatherDash</Link>
        </div>
      </header>
      <main className="main">
        <Outlet />
      </main>
    </div>
  )
}
