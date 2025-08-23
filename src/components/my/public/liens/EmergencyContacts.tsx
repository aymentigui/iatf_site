"use client"

import { useTranslations } from "next-intl"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Flame, Heart } from "lucide-react"

export function EmergencyContacts() {
  const t = useTranslations("emergencyContacts")

  const contacts = [
    { key: "police", number: "17", icon: Shield, color: "blue" },
    { key: "fire", number: "14", icon: Flame, color: "red" },
    { key: "medical", number: "15", icon: Heart, color: "green" },
  ]

  return (
    <section>
      <div className="bg-blue-800 text-white p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-6">⚠️ {t("title")}</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {contacts.map((contact) => {
            const Icon = contact.icon
            return (
              <Card key={contact.key} className="bg-white text-gray-800">
                <CardContent className="p-4 text-center">
                  <Icon
                    className={`w-8 h-8 mx-auto mb-2 ${
                      contact.color === "blue"
                        ? "text-blue-600"
                        : contact.color === "red"
                          ? "text-red-600"
                          : "text-green-600"
                    }`}
                  />
                  <h3 className="font-semibold">{t(contact.key)}</h3>
                  <p className="text-2xl font-bold text-blue-800">{contact.number}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
