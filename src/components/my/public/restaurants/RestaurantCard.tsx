"use client";

import { Restaurant2 } from '@/types/restaurant';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Globe, Clock, Utensils } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

interface RestaurantCardProps {
  restaurant: Restaurant2;
  locale: string;
}

export default function RestaurantCard({ restaurant, locale }: RestaurantCardProps) {
  const t = useTranslations('restaurants');

  // Get localized content
  const getName = () => {
    switch (locale) {
      case 'en': return restaurant.nomen || restaurant.nomfr || restaurant.nomar;
      case 'ar': return restaurant.nomar || restaurant.nomfr || restaurant.nomen;
      case 'es': return restaurant.nomes || restaurant.nomfr || restaurant.nomen;
      case 'pt': return restaurant.nompt || restaurant.nomfr || restaurant.nomen;
      default: return restaurant.nomfr || restaurant.nomen || restaurant.nomar;
    }
  };

  const getDescription = () => {
    switch (locale) {
      case 'en': return restaurant.descriptionen || restaurant.descriptionfr || restaurant.descriptionar;
      case 'ar': return restaurant.descriptionar || restaurant.descriptionfr || restaurant.descriptionen;
      case 'es': return restaurant.descriptiones || restaurant.descriptionfr || restaurant.descriptionen;
      case 'pt': return restaurant.descriptionpt || restaurant.descriptionfr || restaurant.descriptionen;
      default: return restaurant.descriptionfr || restaurant.descriptionen || restaurant.descriptionar;
    }
  };

  const getCuisineType = () => {
    switch (locale) {
      case 'en': return restaurant.type_cuisineen || restaurant.type_cuisinefr || restaurant.type_cuisinear;
      case 'ar': return restaurant.type_cuisinear || restaurant.type_cuisinefr || restaurant.type_cuisineen;
      case 'es': return restaurant.type_cuisinees || restaurant.type_cuisinefr || restaurant.type_cuisineen;
      case 'pt': return restaurant.type_cuisinept || restaurant.type_cuisinefr || restaurant.type_cuisineen;
      default: return restaurant.type_cuisinefr || restaurant.type_cuisineen || restaurant.type_cuisinear;
    }
  };

  const getSpecialties = () => {
    switch (locale) {
      case 'en': return restaurant.specialitesen || restaurant.specialitesfr || restaurant.specialitesar;
      case 'ar': return restaurant.specialitesar || restaurant.specialitesfr || restaurant.specialitesen;
      case 'es': return restaurant.specialiteses || restaurant.specialitesfr || restaurant.specialitesen;
      case 'pt': return restaurant.specialitespt || restaurant.specialitesfr || restaurant.specialitesen;
      default: return restaurant.specialitesfr || restaurant.specialitesen || restaurant.specialitesar;
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
      <Link href={"restaurants/"+restaurant.id}>
        <Card className="h-full overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-orange-50">
          {/* Image */}
          <div className="relative h-48 overflow-hidden">
            {restaurant.image_id ? (
              <Image
                src={`/api/images/${restaurant.image_id}`}
                alt={getName() || ''}
                fill
                className="object-cover transition-transform duration-300 hover:scale-110"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-amber-100 to-orange-200 flex items-center justify-center">
                <Utensils className="w-12 h-12 text-amber-500" />
              </div>
            )}
          </div>

          <CardHeader className="pb-3">
            <div className="space-y-2">
              <h3 className={`font-bold text-lg line-clamp-1 ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
                {getName()}
              </h3>

              {getCuisineType() && (
                <div className="flex items-center text-sm text-gray-600">
                  <Utensils className="w-4 h-4 mr-1" />
                  {getCuisineType()}
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

            {/* Average Price */}
            {restaurant.prix_moyen && (
              <div className="mb-4 p-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg">
                <div className="text-sm text-gray-600">{t('averagePrice')}:</div>
                <div className="font-bold text-lg text-amber-600">
                  {restaurant.prix_moyen} DA
                  <span className="text-sm font-normal text-gray-500 ml-1">
                    {t('perPerson')}
                  </span>
                </div>
              </div>
            )}

            {/* Opening Hours */}
            {restaurant.horaires_ouverture && (
              <div className="flex items-center text-sm text-gray-600 mb-3">
                <Clock className="w-4 h-4 mr-2" />
                <span>{restaurant.horaires_ouverture}</span>
              </div>
            )}

            {/* Contact Info */}
            <div className="space-y-2 mb-4">
              {restaurant.telephone && (
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="w-4 h-4 mr-2" />
                  <span>{restaurant.telephone}</span>
                </div>
              )}

              {restaurant.email && (
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="w-4 h-4 mr-2" />
                  <span className="truncate">{restaurant.email}</span>
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-2">
              {restaurant.site_web && (
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    window.open(formatUrl(restaurant.site_web || ""), "_blank");
                  }}
                >
                  <Globe className="w-4 h-4 mr-1" />
                  {t('website')}
                </Button>
              )}

              {restaurant.telephone && (
                <Button
                  variant="default"
                  size="sm"
                  className="flex-1 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    window.open(`tel:${restaurant.telephone}`, '_self');
                  }}
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