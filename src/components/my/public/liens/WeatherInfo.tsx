"use client"

import { useTranslations } from "next-intl"
import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Cloud, Sun, CloudRain, Thermometer } from "lucide-react"

type WeatherData = {
  city: string
  temperature: number
  code: number
}

const cities = [
  { name: "Alger", lat: 36.75, lon: 3.06 },
  { name: "Oran", lat: 35.69, lon: -0.64 },
  { name: "Constantine", lat: 36.36, lon: 6.61 },
  { name: "Ouargla", lat: 31.95, lon: 5.32 }
]

export function WeatherInfo() {
  const t = useTranslations("weather")
  const [weather, setWeather] = useState<WeatherData[]>([])

  useEffect(() => {
    async function fetchWeather() {
      const results: WeatherData[] = await Promise.all(
        cities.map(async (city) => {
          const res = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current_weather=true`
          )
          const data = await res.json()
          return {
            city: city.name,
            temperature: Math.round(data.current_weather.temperature),
            code: data.current_weather.weathercode
          }
        })
      )
      setWeather(results)
    }
    fetchWeather()
  }, [])

  const getIcon = (code: number) => {
    if ([0, 1].includes(code)) return <Sun className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
    if ([2, 3].includes(code)) return <Cloud className="w-8 h-8 mx-auto mb-2 text-gray-500" />
    if ([51, 61, 80].includes(code)) return <CloudRain className="w-8 h-8 mx-auto mb-2 text-blue-500" />
    return <Thermometer className="w-8 h-8 mx-auto mb-2 text-red-500" />
  }

  return (
    <section>
      <div className="bg-[#DE1B50] text-white p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-6">{t("title")}</h2>
        <div className="grid md:grid-cols-4 gap-4">
          {weather.map((w, i) => (
            <Card key={i} className="bg-white text-gray-800">
              <CardContent className="p-4 text-center">
                {getIcon(w.code)}
                <h3 className="font-semibold">{w.city}</h3>
                <p className="text-2xl font-bold">{w.temperature}°C</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-6">
          <a href="https://www.meteo.dz/" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="text-blue-800 border-blue-300">
              {t("checkWeather")}
            </Button>
          </a>
        </div>
      </div>
    </section>
  )
}
