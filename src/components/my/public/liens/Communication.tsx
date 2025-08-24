"use client"

import { useTranslations } from "next-intl"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Phone, Wifi, Mail } from "lucide-react"

export function Communication() {
  const t = useTranslations("communication")

  const operators = t.raw("operators") as { name: string; desc: string }[]
  const offices = t.raw("poste.offices") as string[]

  return (
    <section className="max-w-6xl mx-auto py-12 p-10">
      <h2 className="text-3xl font-bold text-center mb-10 text-blue-900 border-b-2 border-blue-500 inline-block">
        {t("title")}
      </h2>

      <div className="grid grid-cols-1 gap-8">
        {/* Télécom */}
        <Card className="shadow-lg rounded-2xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Phone className="w-5 h-5" />
              {t("telecom")}
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6">
            {operators.map((op, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                {op.name.toLowerCase().includes("wifi") ? (
                  <Wifi className="w-8 h-8 text-sky-500 mb-2" />
                ) : (
                  <Phone className="w-8 h-8 text-blue-600 mb-2" />
                )}
                <p className="font-semibold">{op.name}</p>
                <p className="text-xs text-gray-600">{op.desc}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Poste */}
        {/* <Card className="shadow-lg rounded-2xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Mail className="w-5 h-5" />
              {t("post")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 py-6">
            <p className="font-semibold">{t("poste.title")}</p>
            <p className="text-sm text-gray-700">{t("poste.desc")}</p>
            <ul className="space-y-2 text-sm list-disc list-inside">
              {offices.map((office, i) => (
                <li key={i}>{office}</li>
              ))}
            </ul>
            <p className="text-sm font-medium">{t("poste.hours")}</p>
            <p className="text-sm text-red-600">{t("poste.closed")}</p>
          </CardContent>
        </Card> */}
      </div>
    </section>
  )
}
