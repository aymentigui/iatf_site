"use client"

import { useTranslations } from "next-intl"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building, Plane, GraduationCap, MapPin, Truck, ShoppingCart, Scale, Home, Palette, Users, Dumbbell, HeartPulse } from "lucide-react"

const ministries = [
  {
    key: "commerceInterior",
    icon: ShoppingCart,
    color: "green",
    link: "https://www.commerce.gov.dz/fr"
  },
  {
    key: "defense",
    icon: Plane,
    color: "blue",
    link: "https://www.mdn.dz/"
  },
  {
    key: "foreignAffairs",
    icon: GraduationCap,
    color: "purple",
    link: "https://www.mfa.gov.dz/fr"
  },
  {
    key: "interior",
    icon: Home,
    color: "red",
    link: "https://www.interieur.gov.dz/"
  },
  {
    key: "agriculture",
    icon: Building,
    color: "green",
    link: "https://www.minagri.dz/"
  },
  {
    key: "commerceExterior",
    icon: ShoppingCart,
    color: "blue",
    link: "https://www.commerce-ext.gov.dz/"
  },
  {
    key: "transport",
    icon: Truck,
    color: "blue",
    link: "https://www.transport.gov.dz/"
  },
  {
    key: "tourism",
    icon: MapPin,
    color: "orange",
    link: "https://www.mtata.gov.dz/"
  },
  {
    key: "culture",
    icon: Palette,
    color: "pink",
    link: "https://www.mculture.gov.dz/"
  },
  {
    key: "youth",
    icon: Users,
    color: "teal",
    link: "https://www.mjs.gov.dz/"
  },
  {
    key: "sports",
    icon: Dumbbell,
    color: "red",
    link: "https://www.mjs.gov.dz/"
  },
  {
    key: "health",
    icon: HeartPulse,
    color: "blue",
    link: "https://www.sante.gov.dz/"
  }
]

export function GovernmentLinks() {
  const t = useTranslations("governmentLinks")

  return (
    <section>
      <h2 className="text-2xl font-bold text-center mb-8 text-blue-800">{t("title")}</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ministries.map((ministry) => {
          const Icon = ministry.icon
          const colorClass =
            ministry.color === "blue" ? "text-blue-600" : ministry.color === "green" ? "text-green-600" : "text-red-600"
          const bgClass =
            ministry.color === "blue" ? "bg-blue-50" : ministry.color === "green" ? "bg-green-50" : "bg-red-50"

          return (
            <Card key={ministry.key} className={`${bgClass} border-2`}>
              <CardHeader className="text-center pb-2">
                <Icon className={`w-12 h-12 mx-auto ${colorClass}`} />
                <CardTitle className="text-sm font-semibold">{t(`${ministry.key}.title`)}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-xs text-gray-600 mb-4 text-center">{t(`${ministry.key}.description`)}</p>
                <a href={ministry.link} target="_blank">
                  <Button
                    size="sm"
                    className={`w-full ${ministry.color === "blue"
                        ? "bg-blue-600 hover:bg-blue-700"
                        : ministry.color === "green"
                          ? "bg-green-600 hover:bg-green-700"
                          : "bg-red-600 hover:bg-red-700"
                      }`}
                  >
                    Visiter
                  </Button>
                </a>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
