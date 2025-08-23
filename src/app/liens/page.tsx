import NewHeader from "@/components/my/public/new-header"
import NewFooter from "@/components/my/public/new-footer"
import { OfficialLinks } from "@/components/my/public/liens/OfficialLinks"
import { GovernmentLinks } from "@/components/my/public/liens/GovernmentLinks"
import { EmergencyContacts } from "@/components/my/public/liens/EmergencyContacts"
import { MedicalServices } from "@/components/my/public/liens/MedicalServices"
import { BankingServices } from "@/components/my/public/liens/BankingServices"
import { Communication } from "@/components/my/public/liens/Communication"
import { Partners } from "@/components/my/public/liens/Partners"
import { WeatherInfo } from "@/components/my/public/liens/WeatherInfo"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <NewHeader />
      <main className="container mx-auto px-4 py-8 space-y-12">
        <OfficialLinks />
        <GovernmentLinks />
        <EmergencyContacts />
        <MedicalServices />
        <BankingServices />
        <Communication />
        {/* <Partners /> */}
        <WeatherInfo />
      </main>
      <NewFooter />
    </div>
  )
}
