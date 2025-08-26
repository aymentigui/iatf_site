"use client"

import React, { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Bus, Clock, MapPin, Navigation, Phone, Signal, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
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

const Services = () => {
  const t = useTranslations("services")

  const supportServices = [
    {
      icon: Users,
      title: t("support.agents.title"),
      description: t("support.agents.description"),
      action: t("support.agents.action"),
    },
    {
      icon: Signal,
      title: t("support.signage.title"),
      description: t("support.signage.description"),
      action: t("support.signage.action"),
    },
    {
      icon: Clock,
      title: t("support.schedule.title"),
      description: t("support.schedule.description"),
      action: t("support.schedule.action"),
    },
  ]

  const zones = [
    {
      id: "est",
      name: t("station.zones.est.name"),
      description: t("station.zones.est.description"),
      color: "bg-orange-500",
      quais: "1-32",
    },
    {
      id: "ouest",
      name: t("station.zones.ouest.name"),
      description: t("station.zones.ouest.description"),
      color: "bg-blue-500",
      quais: "33-64",
    },
    {
      id: "centrale",
      name: t("station.zones.centrale.name"),
      description: t("station.zones.centrale.description"),
      color: "bg-cyan-500",
      quais: "65-96",
    },
    {
      id: "h",
      name: t("station.zones.h.name"),
      description: t("station.zones.h.description"),
      color: "bg-indigo-500",
      quais: "97-128",
    },
  ]

  const mapZones = [
    {
      id: "zone1",
      name: t("station.zones.zone1.name"),
      description: t("station.zones.zone1.description"),
      color: "red",
      coordinates: [36.7763, 3.0585] as [number, number],
    },
    {
      id: "zone2",
      name: t("station.zones.zone2.name"),
      description: t("station.zones.zone2.description"),
      color: "orange",
      coordinates: [36.7128, 3.1755] as [number, number],
    },
    {
      id: "zone3",
      name: t("station.zones.zone3.name"),
      description: t("station.zones.zone3.description"),
      color: "gold",
      coordinates: [36.7375, 3.1333] as [number, number],
    },
    {
      id: "zone4",
      name: t("station.zones.zone4.name"),
      description: t("station.zones.zone4.description"),
      color: "green",
      coordinates: [36.7642, 2.9594] as [number, number],
    },
    {
      id: "zone5",
      name: t("station.zones.zone5.name"),
      description: t("station.zones.zone5.description"),
      color: "blue",
      coordinates: [36.5966, 2.8104] as [number, number],
    },
    {
      id: "zone6",
      name: t("station.zones.zone6.name"),
      description: t("station.zones.zone6.description"),
      color: "purple",
      coordinates: [36.691, 3.2154] as [number, number],
    },
    {
      id: "zone7",
      name: t("station.zones.zone7.name"),
      description: t("station.zones.zone7.description"),
      color: "pink",
      coordinates: [36.7325, 3.0864] as [number, number],
    },
  ]

  const [activeZone, setActiveZone] = useState<any>(null)

  return (
    <section className="bg-gradient-to-b from-blue-50 to-white lg:p-40">
      <div className="grid lg:grid-cols-2 gap-8 mb-10">
        {/* Support et Assistance */}
        <Card className="animate-fade-in-scale hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
          <CardHeader className="text-center pb-6">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Phone className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold text-primary">{t("support.title")}</CardTitle>
            <CardDescription className="text-base">{t("support.subtitle")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {supportServices.map((service, index) => (
              <div
                key={index}
                className="group p-4 rounded-lg border border-border hover:border-primary/30 hover:bg-card/50 transition-all duration-300 cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Organisation de la Station */}
        <Card className="animate-fade-in-scale hover:shadow-xl transition-all duration-300 border-2 hover:border-secondary/20">
          <CardHeader className="text-center pb-6">
            <div className="mx-auto w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
              <Navigation className="w-8 h-8 text-black" />
            </div>
            <CardTitle className="text-2xl text-black font-bold">{t("station.title")}</CardTitle>
            <CardDescription className="text-base">{t("station.subtitle")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <MapPin className="w-5 h-5 text-black" />
                {t("station.zonesTitle")}
              </h3>
              <p className="text-sm text-muted-foreground">{t("station.zonesDescription")}</p>
            </div>

            <div className="space-y-3">
              {zones.map((zone, index) => (
                <div
                  key={zone.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                    activeZone === zone.id
                      ? "border-secondary shadow-lg scale-105 animate-pulse-glow"
                      : "border-border hover:border-secondary/50 hover:shadow-md"
                  }`}
                  onClick={() => setActiveZone(activeZone === zone.id ? null : zone.id)}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full ${zone.color}`} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-foreground">{zone.name}</h4>
                        <span className="text-xs">{t("station.platform")} {zone.quais}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{zone.description}</p>
                    </div>
                    <Bus className="w-5 h-5 text-muted-foreground" />
                  </div>

                  {activeZone === zone.id && (
                    <div className="mt-4 pt-4 border-t border-border animate-slide-in-up">
                      <div className="flex items-center gap-2 text-sm text-black">
                        <AlertCircle className="w-4 h-4" />
                        <span>{t("station.activeZone")}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="p-4 bg-muted/50 rounded-lg border border-border">
              <p className="text-sm text-muted-foreground">{t("station.note")}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transport des Invités */}
      <Card className="animate-fade-in-scale border-2 hover:border-accent/20 hover:shadow-xl transition-all duration-300 mb-10">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4">
            <Bus className="w-8 h-8 text-accent" />
          </div>
          <CardTitle className="text-3xl text-black font-black">{t("transport.title")}</CardTitle>
          <CardDescription className="text-lg">{t("transport.subtitle")}</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <div className="space-y-2">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold">{t("transport.punctuality.title")}</h3>
              <p className="text-sm text-muted-foreground">{t("transport.punctuality.description")}</p>
            </div>
            <div className="space-y-2">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto">
                <MapPin className="w-6 h-6 text-black" />
              </div>
              <h3 className="font-semibold">{t("transport.coverage.title")}</h3>
              <p className="text-sm text-muted-foreground">{t("transport.coverage.description")}</p>
            </div>
            <div className="space-y-2">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto">
                <Users className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold">{t("transport.comfort.title")}</h3>
              <p className="text-sm text-muted-foreground">{t("transport.comfort.description")}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Carte Interactive */}
      <Card className="animate-fade-in-scale border-2 hover:border-blue-500/20">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-2xl font-bold text-blue-600">{t("map.title")}</CardTitle>
          <CardDescription className="text-base">{t("map.subtitle")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg overflow-hidden border border-gray-200 h-96">
            <MapContainer
              center={[36.7325, 3.0864] as [number, number]}
              zoom={11}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/">OSM</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {/* Ajouter les zones */}
              {mapZones.map((zone) => (
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
    </section>
  )
}

export default Services