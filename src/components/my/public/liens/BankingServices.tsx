"use client"

import { useTranslations } from "next-intl"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, CreditCard, Banknote } from "lucide-react"

export function BankingServices() {
  const t = useTranslations("bankingServices")

  const banks = t.raw("banks") as { name: string; hours: string; closed: string }[]
  const atms = t.raw("atmsLocations") as string[]
  const exchangePlaces = t.raw("exchangePlaces") as string[]

  return (
    <section className="max-w-6xl mx-auto py-12">
      <h2 className="text-3xl font-bold text-center mb-10 text-blue-900">
        {t("title")}
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Banques */}
        <Card className="bg-gradient-to-br from-blue-700 to-blue-900 text-white shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Building2 className="w-6 h-6" />
              {t("publicBanks")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4 text-sm">
              {banks.map((bank, i) => (
                <li key={i} className="border-b border-blue-500 pb-2">
                  <p className="font-semibold">{bank.name}</p>
                  <p className="text-xs">{bank.hours}</p>
                  <p className="text-xs text-red-200">{bank.closed}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Distributeurs Automatiques */}
        <Card className="bg-gradient-to-br from-green-600 to-green-800 text-white shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <CreditCard className="w-6 h-6" />
              {t("atms")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-3">{t("atmsInfo")}</p>
            <ul className="space-y-2 text-sm">
              {atms.map((loc, i) => (
                <li key={i}>• {loc}</li>
              ))}
            </ul>
            <p className="mt-3 text-xs bg-white/20 p-2 rounded-md">
              {t("atmsNote")}
            </p>
          </CardContent>
        </Card>

        {/* Change de Devises */}
        <Card className="bg-gradient-to-br from-red-600 to-red-800 text-white shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Banknote className="w-6 h-6" />
              {t("exchange")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-3">{t("exchangeInfo")}</p>
            <ul className="space-y-2 text-sm">
              {exchangePlaces.map((place, i) => (
                <li key={i}>• {place}</li>
              ))}
            </ul>
            <div className="mt-4 space-y-1 text-xs bg-white/20 p-2 rounded-md">
              <p>{t("exchangeCurrency")}</p>
              <p>{t("exchangeRate")}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
