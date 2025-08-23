// components/IATFObjectives.tsx
'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

const IATFObjectives = () => {
  const t = useTranslations('IATF2025');
  const objectives = t.raw('objectives') as string[];

  return (
    <section className="w-full py-12 md:py-16 lg:py-20 bg-gradient-to-b from-blue-50 to-white">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-blue-900">
              {t('title')}
            </h2>
            <p className="max-w-[700px] text-blue-700 md:text-xl">
              {t('subtitle')}
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 md:gap-8">
          {objectives.map((objective, index) => (
            <Card key={index} className="flex flex-col h-full transition-all hover:shadow-lg">
              <CardContent className="flex flex-col items-center text-center p-6">
                <div className="mb-4 p-2 rounded-full bg-blue-100 text-blue-600">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <p className="text-lg font-medium text-gray-800">
                  {objective}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IATFObjectives;