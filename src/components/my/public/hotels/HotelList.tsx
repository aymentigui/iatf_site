"use client";

import { Hotel } from '@/types/hotel';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Star, MapPin, Phone, Mail, Globe, Navigation, Clock } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

interface HotelListProps {
  hotel: Hotel;
  locale: string;
  index: number;
}

export default function HotelList({ hotel, locale, index }: HotelListProps) {
  const t = useTranslations('hotels');

  // Get localized content
  const getName = () => {
    switch (locale) {
      case 'en': return hotel.nom_en || hotel.nom_fr || hotel.nom_ar;
      case 'ar': return hotel.nom_ar || hotel.nom_fr || hotel.nom_en;
      default: return hotel.nom_fr || hotel.nom_en || hotel.nom_ar;
    }
  };

  const getDescription = () => {
    switch (locale) {
      case 'en': return hotel.description_en || hotel.description_fr || hotel.description_ar;
      case 'ar': return hotel.description_ar || hotel.description_fr || hotel.description_en;
      default: return hotel.description_fr || hotel.description_en || hotel.description_ar;
    }
  };

  const getAddress = () => {
    switch (locale) {
      case 'en': return hotel.adresse_en || hotel.adresse_fr || hotel.adresse_ar;
      case 'ar': return hotel.adresse_ar || hotel.adresse_fr || hotel.adresse_en;
      default: return hotel.adresse_fr || hotel.adresse_en || hotel.adresse_ar;
    }
  };

  const getWilaya = () => {
    switch (locale) {
      case 'en': return hotel.wilaya_en || hotel.wilaya_fr || hotel.wilaya_ar;
      case 'ar': return hotel.wilaya_ar || hotel.wilaya_fr || hotel.wilaya_en;
      default: return hotel.wilaya_fr || hotel.wilaya_en || hotel.wilaya_ar;
    }
  };

  const getServices = () => {
    switch (locale) {
      case 'en': return hotel.services_en || hotel.services_fr || hotel.services_ar;
      case 'ar': return hotel.services_ar || hotel.services_fr || hotel.services_en;
      default: return hotel.services_fr || hotel.services_en || hotel.services_ar;
    }
  };

  const formatUrl = (url: string) => {
    if (!/^https?:\/\//i.test(url)) {
      return `https://${url}`;
    }
    return url;
  };


  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
    >
      <Card className="overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 mb-4">
        <CardContent className="p-0">
          <div className={`flex ${locale === 'ar' ? 'flex-row-reverse' : 'flex-row'} gap-4`}>
            {/* Image */}
            <div className="relative w-48 h-32 flex-shrink-0">
              {hotel.image_url ? (
                <Image
                  src={hotel.image_url}
                  alt={getName() || ''}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                  <MapPin className="w-8 h-8 text-blue-500" />
                </div>
              )}
              
              {hotel.etoiles && (
                <div className="absolute top-2 left-2">
                  <span className="bg-yellow-500 hover:bg-yellow-600 text-white text-xs">
                    <Star className="w-3 h-3 mr-1" />
                    {hotel.etoiles}
                  </span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 p-4 min-h-32 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className={`font-bold text-lg ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
                    {getName()}
                  </h3>
                  
                  {(hotel.prix_min || hotel.prix_max) && (
                    <div className={`text-right ${locale === 'ar' ? 'text-left' : 'text-right'}`}>
                      <div className="font-bold text-blue-600">
                        {hotel.prix_min && `${hotel.prix_min} DA`}
                        {hotel.prix_min && hotel.prix_max && hotel.prix_min !== hotel.prix_max && ` - ${hotel.prix_max} DA`}
                      </div>
                      <div className="text-xs text-gray-500">{t('perNight')}</div>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                  {getWilaya() && (
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      {getWilaya()}
                    </div>
                  )}
                  
                  {hotel.telephone && (
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 mr-2" />
                      {hotel.telephone}
                    </div>
                  )}
                  
                  {hotel.email && (
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 mr-2" />
                      <span className="truncate">{hotel.email}</span>
                    </div>
                  )}

                  {hotel.distance && (
                    <div className="flex items-center">
                      <Navigation className="w-4 h-4 mr-2" />
                      {hotel.distance} km
                    </div>
                  )}
                </div>

                {getDescription() && (
                  <p className={`text-sm text-gray-600 line-clamp-2 ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
                    {getDescription()}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-2 mt-3">
                {hotel.site_web && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => window.open(formatUrl(hotel.site_web || ""), "_blank")}
                    >
                    <Globe className="w-4 h-4 mr-1" />
                    {t('website')}
                  </Button>
                )}
                
                {hotel.telephone && (
                  <Button 
                    variant="default" 
                    size="sm"
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                    onClick={() => window.open(`tel:${hotel.telephone}`, '_self')}
                  >
                    <Phone className="w-4 h-4 mr-1" />
                    {t('contact')}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}