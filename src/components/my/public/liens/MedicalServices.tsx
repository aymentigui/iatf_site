"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone } from "lucide-react"
import { useTranslations } from "next-intl"

export function MedicalServices() {
  const t = useTranslations("medicalServices")

  // ⚡ Récupération directe depuis le JSON
  const hospitals = t.raw("hospitals") as { name: string; phone: string }[]
  const pharmacies = t.raw("pharmacies") as { name: string; phone: string }[]

  return (
    <div className="max-w-6xl mx-auto py-8">
      <h2 className="text-2xl font-bold text-center mb-8">{t("title")}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Hôpitaux */}
        <Card>
          <CardHeader className="bg-blue-900 text-white rounded-t-lg">
            <CardTitle className="flex items-center">
              🏥 {t("hospitalsTitle")}
            </CardTitle>
          </CardHeader>
          <CardContent className="divide-y">
            {hospitals.map((h, i) => (
              <div key={i} className="flex items-center justify-between py-3">
                <span>{h.name}</span>
                <Button size="icon" className="bg-green-600 hover:bg-green-700" asChild>
                  <a href={`tel:${h.phone}`}>
                    <Phone className="h-4 w-4 text-white" />
                  </a>
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Pharmacies */}
        <Card>
          <CardHeader className="bg-blue-900 text-white rounded-t-lg">
            <CardTitle className="flex items-center">
              💊 {t("pharmaciesTitle")}
            </CardTitle>
          </CardHeader>
          <CardContent className="divide-y">
            <p className="text-sm text-gray-600 mb-2">{t("pharmaciesInfo")}</p>
            {pharmacies.map((p, i) => (
              <div key={i} className="flex items-center justify-between py-3">
                <span>{p.name}</span>
                <Button size="icon" variant="outline" className="text-green-700 border-green-600" asChild>
                  <a href={`tel:${p.phone}`}>
                    <Phone className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            ))}
            <div className="mt-4 p-3 bg-blue-50 text-sm text-blue-900 rounded">
              ℹ️ {t("pharmaciesHotline")}: <strong>3011</strong>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
