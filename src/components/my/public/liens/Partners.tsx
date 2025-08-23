"use client"

import { useTranslations } from "next-intl"
import { Card, CardContent } from "@/components/ui/card"

export function Partners() {
  const t = useTranslations("partners")

  const partners = [
    "Sonatrach",
    "Air Algérie",
    "Algérie Poste",
    "Algérie Télécom",
    "CNAS",
    "CASNOS",
    "CNAC",
    "ANSEJ",
    "ANDI",
    "ANEM",
    "ONDA",
    "SEAAL",
    "Sonelgaz",
    "SNTF",
    "EMA",
    "ETRHB",
  ]

  return (
    <section>
      <h2 className="text-2xl font-bold text-center mb-8 text-blue-800">{t("title")}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {partners.map((partner, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4 text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center mx-auto mb-2">
                <span className="text-xs font-semibold text-gray-600">{partner.substring(0, 3)}</span>
              </div>
              <p className="text-xs font-medium">{partner}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
