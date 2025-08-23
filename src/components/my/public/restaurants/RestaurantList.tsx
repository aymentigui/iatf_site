"use client";

import { Restaurant2 } from '@/types/restaurant';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Globe, Clock, Utensils } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

interface RestaurantListProps {
  restaurant: Restaurant2;
  locale: string;
  index: number;
}

export default function RestaurantList({ restaurant, locale, index }: RestaurantListProps) {
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
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
    >
      <Link href={"restaurants/"+restaurant.id}>
        <Card className="overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 mb-4">
          <CardContent className="p-0">
            <div className={`flex ${locale === 'ar' ? 'flex-row-reverse' : 'flex-row'} gap-4`}>
              {/* Image */}
              <div className="relative w-48 h-32 flex-shrink-0">
                {restaurant.image_id ? (
                  <Image
                    src={`/api/images/${restaurant.image_id}`}
                    alt={getName() || ''}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-amber-100 to-orange-200 flex items-center justify-center">
                    <Utensils className="w-8 h-8 text-amber-500" />
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
                    
                    {restaurant.prix_moyen && (
                      <div className={`text-right ${locale === 'ar' ? 'text-left' : 'text-right'}`}>
                        <div className="font-bold text-amber-600">
                          {restaurant.prix_moyen} DA
                        </div>
                        <div className="text-xs text-gray-500">{t('perPerson')}</div>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                    {getCuisineType() && (
                      <div className="flex items-center">
                        <Utensils className="w-4 h-4 mr-2" />
                        {getCuisineType()}
                      </div>
                    )}
                    
                    {restaurant.telephone && (
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-2" />
                        {restaurant.telephone}
                      </div>
                    )}
                    
                    {restaurant.email && (
                      <div className="flex items-center">
                        <Mail className="w-4 h-4 mr-2" />
                        <span className="truncate">{restaurant.email}</span>
                      </div>
                    )}

                    {restaurant.horaires_ouverture && (
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        {restaurant.horaires_ouverture}
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
                  {restaurant.site_web && (
                    <Button 
                      variant="outline" 
                      size="sm"
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
                      className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
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
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}