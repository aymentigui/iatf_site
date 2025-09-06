import NewHeader from "@/components/my/public/new-header";
import { BusRequestForm } from "./_components/BusRequestForm";
import NewFooter from "@/components/my/public/new-footer";
import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations('busRequest2.page');

  return (
    <>
      <NewHeader />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {t('title')}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('description')}
            </p>
          </div>

          <BusRequestForm />
        </div>
      </div>
      <NewFooter />
    </>
  )
}