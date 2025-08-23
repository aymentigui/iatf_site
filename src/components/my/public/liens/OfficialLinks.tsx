"use client"

import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function OfficialLinks() {
  const t = useTranslations("officialLinks")

  return (
    <section>
      <h2 className="text-2xl font-bold text-center mb-8 text-blue-800">{t("title")}</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-blue-700 text-white">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4">{t("websiteTitle")}</h3>
            <p className="mb-4">{t("websiteDescr")}</p>
            <div className="space-y-3">
              <a href="https://2025.iatf.africa/newfront" target="_blank"><Button className="w-full text-2xl bg-blue-600 hover:bg-blue-500 py-10">{t("visitSite")}</Button></a>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-700 text-white">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4">{t("visaInfoTitle")}</h3>
            <p className="mb-4">{t("visaInfoDescr")}</p>
            <div className="space-y-3">
              <a href="https://www.algerianembassy.org/visa" target="_blank">
                <Button className="w-full bg-green-600 text-2xl py-10 hover:bg-green-500">{t("visaApplication")}</Button>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
