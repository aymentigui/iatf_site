"use client"

import React, { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import { useTranslations } from "next-intl"

// Fix default marker icons (Leaflet bug in React)
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
})

type Zone = {
  id: string
  name: string
  description: string
  color: string
  coordinates: [number, number] // ✅ tuple fixe (lat, lng)
}

const Services = () => {
  const t = useTranslations("services")

  const zones: Zone[]  = [
    {
      id: "zone1",
      name: t("station.zones.zone1.name"),
      description: t("station.zones.zone1.description"),
      color: "red",
      coordinates: [36.7763, 3.0585],
    },
    {
      id: "zone2",
      name: t("station.zones.zone2.name"),
      description: t("station.zones.zone2.description"),
      color: "orange",
      coordinates: [36.7128, 3.1755],
    },
    {
      id: "zone3",
      name: t("station.zones.zone3.name"),
      description: t("station.zones.zone3.description"),
      color: "gold",
      coordinates: [36.7375, 3.1333],
    },
    {
      id: "zone4",
      name: t("station.zones.zone4.name"),
      description: t("station.zones.zone4.description"),
      color: "green",
      coordinates: [36.7642, 2.9594],
    },
    {
      id: "zone5",
      name: t("station.zones.zone5.name"),
      description: t("station.zones.zone5.description"),
      color: "blue",
      coordinates: [36.5966, 2.8104],
    },
    {
      id: "zone6",
      name: t("station.zones.zone6.name"),
      description: t("station.zones.zone6.description"),
      color: "purple",
      coordinates: [36.691, 3.2154],
    },
    {
      id: "zone7",
      name: t("station.zones.zone7.name"),
      description: t("station.zones.zone7.description"),
      color: "pink",
      coordinates: [36.7325, 3.0864],
    },
  ]

  return (
    <Card className="animate-fade-in-scale border-2 hover:border-blue-500/20">
      <CardHeader className="text-center pb-6">
        <CardTitle className="text-2xl font-bold text-blue-600">{t("map.title")}</CardTitle>
        <CardDescription className="text-base">{t("map.subtitle")}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg overflow-hidden border border-gray-200 h-96">
          <MapContainer
            center={[36.7325, 3.0864]}
            zoom={11}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/">OSM</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Ajouter les zones */}
            {zones.map((zone) => (
              <React.Fragment key={zone.id}>
                <Marker position={zone.coordinates}>
                  <Popup>
                    <strong>{zone.name}</strong>
                    <br />
                    {zone.description}
                  </Popup>
                </Marker>

                {/* Cercle coloré pour chaque zone */}
                <Circle
                  center={zone.coordinates}
                  radius={1500} // rayon en mètres
                  pathOptions={{ color: zone.color, fillOpacity: 0.2 }}
                />
              </React.Fragment>
            ))}
          </MapContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export default Services
