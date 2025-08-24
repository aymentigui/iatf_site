// components/KeySectors.tsx
'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent } from '@/components/ui/card';
import { Building2, Users, Rocket } from 'lucide-react';

const KeySectors = () => {
  const t = useTranslations('KeySectors');
  const sectors = t.raw('sectors') as string[];
  
  // Group sectors into chunks of 5 for better layout
  const chunkSize = 5;
  const sectorChunks = [];
  for (let i = 0; i < sectors.length; i += chunkSize) {
    sectorChunks.push(sectors.slice(i, i + chunkSize));
  }

  return (
    <section className="w-full py-12 md:py-16 lg:py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900">
              {t('title')}
            </h2>
            <p className="max-w-[700px] text-gray-700 md:text-xl">
              {t('subtitle')}
            </p>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-16">
          {sectorChunks.map((chunk, chunkIndex) => (
            <div key={chunkIndex} className="flex flex-col space-y-4">
              {chunk.map((sector, index) => (
                <div 
                  key={index} 
                  className="flex items-start p-4 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                >
                  <div className="flex-shrink-0 mt-1 mr-3 text-blue-600">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <span className="text-gray-800 font-medium">{sector}</span>
                </div>
              ))}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default KeySectors;