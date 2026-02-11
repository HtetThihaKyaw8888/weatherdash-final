import { Routes, Route, Navigate } from "react-router-dom"
import Layout from "./components/Layout.jsx"
import Home from "./pages/Home.jsx"
import Forecast from "./pages/Forecast.jsx"
import DayDetail from "./pages/DayDetail.jsx"
import NotFound from "./pages/NotFound.jsx"

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/forecast/:city" element={<Forecast />} />
        <Route path="/forecast/:city/:date" element={<DayDetail />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
