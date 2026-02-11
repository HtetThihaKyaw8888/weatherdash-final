export async function geocodeCity(city) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=5&language=en&format=json`
  const res = await fetch(url)
  if (!res.ok) throw new Error("Failed to geocode city")
  const data = await res.json()
  const first = data?.results?.[0]
  if (!first) throw new Error("City not found")
  return {
    name: first.name,
    country: first.country,
    latitude: first.latitude,
    longitude: first.longitude,
    timezone: first.timezone
  }
}

export async function fetchDailyForecast(latitude, longitude, timezone) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${encodeURIComponent(latitude)}&longitude=${encodeURIComponent(longitude)}&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=${encodeURIComponent(timezone)}`
  const res = await fetch(url)
  if (!res.ok) throw new Error("Failed to fetch forecast")
  const data = await res.json()
  const daily = data?.daily
  if (!daily?.time?.length) throw new Error("Forecast data missing")
  return daily
}
