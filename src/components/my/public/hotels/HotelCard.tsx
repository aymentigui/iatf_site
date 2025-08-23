"use client";

import { Hotel } from '@/types/hotel';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Star, MapPin, Phone, Mail, Globe, Clock, Navigation } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

interface HotelCardProps {
  hotel: Hotel;
  locale: string;
}

export default function HotelCard({ hotel, locale }: HotelCardProps) {
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
  const formatUrl = (url: string) => {
    if (!/^https?:\/\//i.test(url)) {
      return `https://${url}`;
    }
    return url;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="h-full"
    >
      <Link href={"hotels/"+hotel.id}>
        <Card className="h-full overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50">
          {/* Image */}
          <div className="relative h-48 overflow-hidden">
            {hotel.image_url ? (
              <Image
                src={hotel.image_url}
                alt={getName() || ''}
                fill
                className="object-cover transition-transform duration-300 hover:scale-110"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                <MapPin className="w-12 h-12 text-blue-500" />
              </div>
            )}

            {/* Stars badge */}
            {hotel.etoiles && (
              <div className="absolute top-3 right-3">
                <span className="bg-yellow-500 hover:bg-yellow-600 text-white">
                  <Star className="w-3 h-3 mr-1" />
                  {hotel.etoiles} {t('stars')}
                </span>
              </div>
            )}
          </div>

          <CardHeader className="pb-3">
            <div className="space-y-2">
              <h3 className={`font-bold text-lg line-clamp-1 ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
                {getName()}
              </h3>

              {getWilaya() && (
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-1" />
                  {getWilaya()}
                </div>
              )}
            </div>
          </CardHeader>

          <CardContent className="pt-0">
            {/* Description */}
            {getDescription() && (
              <p className={`text-sm text-gray-600 mb-4 line-clamp-3 ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
                {getDescription()}
              </p>
            )}

            {/* Price */}
            {(hotel.prix_min || hotel.prix_max) && (
              <div className="mb-4 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                <div className="text-sm text-gray-600">{t('from')}:</div>
                <div className="font-bold text-lg text-blue-600">
                  {hotel.prix_min && `${hotel.prix_min} DA`}
                  {hotel.prix_min && hotel.prix_max && ' - '}
                  {hotel.prix_max && hotel.prix_min !== hotel.prix_max && `${hotel.prix_max} DA`}
                  <span className="text-sm font-normal text-gray-500 ml-1">
                    {t('perNight')}
                  </span>
                </div>
              </div>
            )}

            {/* Contact Info */}
            <div className="space-y-2 mb-4">
              {hotel.telephone && (
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="w-4 h-4 mr-2" />
                  <span>{hotel.telephone}</span>
                </div>
              )}

              {hotel.email && (
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="w-4 h-4 mr-2" />
                  <span className="truncate">{hotel.email}</span>
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-2">
              {hotel.site_web && (
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
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
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  onClick={() => window.open(`tel:${hotel.telephone}`, '_self')}
                >
                  <Phone className="w-4 h-4 mr-1" />
                  {t('contact')}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}