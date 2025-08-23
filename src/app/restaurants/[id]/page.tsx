"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import {
    ArrowLeft,
    Star,
    MapPin,
    Phone,
    Mail,
    Globe,
    Navigation,
    Clock,
    Utensils,
    ChefHat,
    Loader2
} from 'lucide-react';

import { Restaurant2 } from '@/types/restaurant';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import NewHeader from '@/components/my/public/new-header';
import NewFooter from '@/components/my/public/new-footer';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import RestaurantMap from '@/components/my/public/restaurants/RestaurantMap';
import { getResto } from '@/actions/restaurant/get';

export default function RestaurantDetailPage() {
    const params = useParams();
    const router = useRouter();
    const locale = useLocale();
    const t = useTranslations('restaurants');
    const [isMounted, setIsMounted] = useState(false);

    const [restaurant, setRestaurant] = useState<Restaurant2 | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const formatUrl = (url: string) => {
        if (!/^https?:\/\//i.test(url)) {
          return `https://${url}`;
        }
        return url;
    };

    useEffect(() => {
        setIsMounted(true);
        const fetchRestaurant = async () => {
            try {
                setLoading(true);
                const result = await getResto(Number(params.id));

                if (result.status === 200 && result.data) {
                    setRestaurant(result.data);
                } else {
                    setError(result.data?.message || 'Restaurant not found');
                }
            } catch (err) {
                setError('Failed to load restaurant details');
                console.error('Error fetching restaurant:', err);
            } finally {
                setLoading(false);
            }
        };

        if (params.id) {
            fetchRestaurant();
        }
    }, [params.id]);

    // Helper functions for localized content
    const getName = () => {
        if (!restaurant) return '';
        switch (locale) {
            case 'en': return restaurant.nomen || restaurant.nomfr || restaurant.nomar;
            case 'ar': return restaurant.nomar || restaurant.nomfr || restaurant.nomen;
            case 'es': return restaurant.nomes || restaurant.nomfr || restaurant.nomen;
            case 'pt': return restaurant.nompt || restaurant.nomfr || restaurant.nomen;
            default: return restaurant.nomfr || restaurant.nomen || restaurant.nomar;
        }
    };

    const getDescription = () => {
        if (!restaurant) return '';
        switch (locale) {
            case 'en': return restaurant.descriptionen || restaurant.descriptionfr || restaurant.descriptionar;
            case 'ar': return restaurant.descriptionar || restaurant.descriptionfr || restaurant.descriptionen;
            case 'es': return restaurant.descriptiones || restaurant.descriptionfr || restaurant.descriptionen;
            case 'pt': return restaurant.descriptionpt || restaurant.descriptionfr || restaurant.descriptionen;
            default: return restaurant.descriptionfr || restaurant.descriptionen || restaurant.descriptionar;
        }
    };

    const getAddress = () => {
        if (!restaurant) return '';
        switch (locale) {
            case 'en': return restaurant.adresseen || restaurant.adressefr || restaurant.adressear;
            case 'ar': return restaurant.adressear || restaurant.adressefr || restaurant.adresseen;
            case 'es': return restaurant.adressees || restaurant.adressefr || restaurant.adresseen;
            case 'pt': return restaurant.adressept || restaurant.adressefr || restaurant.adresseen;
            default: return restaurant.adressefr || restaurant.adresseen || restaurant.adressear;
        }
    };

    const getCuisineType = () => {
        if (!restaurant) return '';
        switch (locale) {
            case 'en': return restaurant.type_cuisineen || restaurant.type_cuisinefr || restaurant.type_cuisinear;
            case 'ar': return restaurant.type_cuisinear || restaurant.type_cuisinefr || restaurant.type_cuisineen;
            case 'es': return restaurant.type_cuisinees || restaurant.type_cuisinefr || restaurant.type_cuisineen;
            case 'pt': return restaurant.type_cuisinept || restaurant.type_cuisinefr || restaurant.type_cuisineen;
            default: return restaurant.type_cuisinefr || restaurant.type_cuisineen || restaurant.type_cuisinear;
        }
    };

    const getSpecialties = () => {
        if (!restaurant) return '';
        switch (locale) {
            case 'en': return restaurant.specialitesen || restaurant.specialitesfr || restaurant.specialitesar;
            case 'ar': return restaurant.specialitesar || restaurant.specialitesfr || restaurant.specialitesen;
            case 'es': return restaurant.specialiteses || restaurant.specialitesfr || restaurant.specialitesen;
            case 'pt': return restaurant.specialitespt || restaurant.specialitesfr || restaurant.specialitesen;
            default: return restaurant.specialitesfr || restaurant.specialitesen || restaurant.specialitesar;
        }
    };
        

    if (loading|| !isMounted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
                <NewHeader />
                <div className="container mx-auto px-4 py-8">
                    <div className="flex items-center justify-center py-20">
                        <div className="text-center">
                            <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
                            <p className="text-gray-600">Loading restaurant details...</p>
                        </div>
                    </div>
                </div>
                <NewFooter />
            </div>
        );
    }

    if (error || !restaurant) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
                <NewHeader />
                <div className="container mx-auto px-4 py-8">
                    <div className="flex flex-col items-center justify-center py-20">
                        <h1 className="text-2xl font-bold text-gray-800 mb-4">{t('restaurantNotFound')}</h1>
                        <p className="text-gray-600 mb-6">{error}</p>
                        <Button onClick={() => router.push('/restaurants')} className="flex items-center gap-2">
                            <ArrowLeft className="w-4 h-4" />
                            {t('backToRestaurants')}
                        </Button>
                    </div>
                </div>
                <NewFooter />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
            <NewHeader />

            <main className="container mx-auto px-4 py-8">
                {/* Back button */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-6"
                >
                    <Button
                        variant="outline"
                        onClick={() => router.push('/restaurants')}
                        className="flex items-center gap-2"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        {t('backToRestaurants')}
                    </Button>
                </motion.div>

                {/* Restaurant Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                        <div>
                            <h1 className={`text-3xl md:text-4xl font-bold text-gray-800 mb-2 ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
                                {getName()}
                            </h1>

                            <div className="flex items-center gap-4 flex-wrap">
                                {getCuisineType() && (
                                    <div className="flex items-center gap-1 text-gray-600">
                                        <Utensils className="w-4 h-4" />
                                        {getCuisineType()}
                                    </div>
                                )}

                                {restaurant.prix_moyen && (
                                    <div className="flex items-center gap-1 text-gray-600">
                                        <span className="font-medium">
                                            {restaurant.prix_moyen} DA {t('averagePrice')}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Contact Actions */}
                        <div className="flex gap-2">
                            {restaurant.telephone && (
                                <Button
                                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                                    onClick={() => window.open(`tel:${restaurant.telephone}`, '_self')}
                                >
                                    <Phone className="w-4 h-4 mr-2" />
                                    {t('callNow')}
                                </Button>
                            )}

                            {restaurant.site_web && (
                                <Button
                                    variant="outline"
                                    onClick={() => window.open(formatUrl(restaurant.site_web || ""), "_blank")}
                                >
                                    <Globe className="w-4 h-4 mr-2" />
                                    {t('visitWebsite')}
                                </Button>
                            )}
                        </div>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Overview */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <ChefHat className="w-5 h-5" />
                                        {t('about')}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className={`text-gray-700 leading-relaxed ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
                                        {getDescription()}
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Specialties */}
                        {getSpecialties() && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Utensils className="w-5 h-5" />
                                            {t('specialties')}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            {/* @ts-ignore */}
                                            {getSpecialties().split(',').map((specialty, index) => (
                                                <div key={index} className="flex items-center gap-2">
                                                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                                    <span className="text-gray-700">{specialty.trim()}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        )}

                        {/* Map */}
                        {restaurant.latitude && restaurant.longitude && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <MapPin className="w-5 h-5" />
                                            {t('location')}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <RestaurantMap
                                            latitude={Number(restaurant.latitude)}
                                            longitude={Number(restaurant.longitude)}
                                            restaurantName={getName()||""}
                                            address={getAddress()||""}
                                        />
                                        <div className="mt-4 flex items-center justify-between">
                                            <p className="text-gray-600">{getAddress()}</p>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => window.open(
                                                    `https://www.google.com/maps/dir/?api=1&destination=${restaurant.latitude},${restaurant.longitude}`,
                                                    '_blank'
                                                )}
                                            >
                                                <Navigation className="w-4 h-4 mr-2" />
                                                {t('getDirections')}
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Contact Info */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Phone className="w-5 h-5" />
                                        {t('contactInfo')}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {restaurant.telephone && (
                                        <div className="flex items-center gap-3">
                                            <Phone className="w-4 h-4 text-gray-500" />
                                            <span className="text-gray-700">{restaurant.telephone}</span>
                                        </div>
                                    )}

                                    {restaurant.email && (
                                        <div className="flex items-center gap-3">
                                            <Mail className="w-4 h-4 text-gray-500" />
                                            <span className="text-gray-700 truncate">{restaurant.email}</span>
                                        </div>
                                    )}

                                    {restaurant.site_web && (
                                        <div className="flex items-center gap-3">
                                            <Globe className="w-4 h-4 text-gray-500" />
                                            <a
                                                href={formatUrl(restaurant.site_web)}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:underline truncate"
                                            >
                                                {restaurant.site_web}
                                            </a>
                                        </div>
                                    )}

                                    {restaurant.horaires_ouverture && (
                                        <div className="flex items-center gap-3">
                                            <Clock className="w-4 h-4 text-gray-500" />
                                            <span className="text-gray-700">{restaurant.horaires_ouverture}</span>
                                        </div>
                                    )}

                                    <Separator />

                                    <div className="space-y-2">
                                        {restaurant.email && (
                                            <Button
                                                variant="outline"
                                                className="w-full justify-start"
                                                onClick={() => window.open(`mailto:${restaurant.email}`, '_self')}
                                            >
                                                <Mail className="w-4 h-4 mr-2" />
                                                {t('sendEmail')}
                                            </Button>
                                        )}

                                        {restaurant.telephone && (
                                            <Button
                                                className="w-full justify-start bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                                                onClick={() => window.open(`tel:${restaurant.telephone}`, '_self')}
                                            >
                                                <Phone className="w-4 h-4 mr-2" />
                                                {t('callNow')}
                                            </Button>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Quick Info */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <Card>
                                <CardHeader>
                                    <CardTitle>{t('quickInfo')}</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    {restaurant.prix_moyen && (
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600">{t('averagePrice')}</span>
                                            <span className="font-semibold">{restaurant.prix_moyen} DA</span>
                                        </div>
                                    )}

                                    {getCuisineType() && (
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600">{t('cuisineType')}</span>
                                            <span className="font-semibold text-right">{getCuisineType()}</span>
                                        </div>
                                    )}

                                    {restaurant.horaires_ouverture && (
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600">{t('openingHours')}</span>
                                            <span className="font-semibold">{restaurant.horaires_ouverture}</span>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </main>

            <NewFooter />
        </div>
    );
}