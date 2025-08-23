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
    Calendar,
    Users,
    Wifi,
    Car,
    Utensils,
    Dumbbell,
    Waves,
    Loader2
} from 'lucide-react';

import { Hotel } from '@/types/hotel';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import NewHeader from '@/components/my/public/new-header';
import NewFooter from '@/components/my/public/new-footer';
import { gethotel } from '@/actions/hotels/get';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import HotelMap from '@/components/my/public/hotels/HotelMap';

export default function HotelDetailPage() {
    const params = useParams();
    const router = useRouter();
    const locale = useLocale();
    const t = useTranslations('hotels');

    const [hotel, setHotel] = useState<Hotel | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const formatUrl = (url: string) => {
        if (!/^https?:\/\//i.test(url)) {
          return `https://${url}`;
        }
        return url;
      };
    

    useEffect(() => {
        const fetchHotel = async () => {
            try {
                setLoading(true);
                const result = await gethotel(Number(params.id));

                if (result.status === 200 && result.data) {
                    setHotel(result.data);
                } else {
                    setError(result.data.message || 'Hotel not found');
                }
            } catch (err) {
                setError('Failed to load hotel details');
                console.error('Error fetching hotel:', err);
            } finally {
                setLoading(false);
            }
        };

        if (params.id) {
            fetchHotel();
        }
    }, [params.id]);

    // Helper functions for localized content
    const getName = () => {
        if (!hotel) return '';
        switch (locale) {
            case 'en': return hotel.nom_en || hotel.nom_fr || hotel.nom_ar;
            case 'ar': return hotel.nom_ar || hotel.nom_fr || hotel.nom_en;
            default: return hotel.nom_fr || hotel.nom_en || hotel.nom_ar;
        }
    };

    const getDescription = () => {
        if (!hotel) return '';
        switch (locale) {
            case 'en': return hotel.description_en || hotel.description_fr || hotel.description_ar;
            case 'ar': return hotel.description_ar || hotel.description_fr || hotel.description_en;
            default: return hotel.description_fr || hotel.description_en || hotel.description_ar;
        }
    };

    const getAddress = () => {
        if (!hotel) return '';
        switch (locale) {
            case 'en': return hotel.adresse_en || hotel.adresse_fr || hotel.adresse_ar;
            case 'ar': return hotel.adresse_ar || hotel.adresse_fr || hotel.adresse_en;
            default: return hotel.adresse_fr || hotel.adresse_en || hotel.adresse_ar;
        }
    };

    const getWilaya = () => {
        if (!hotel) return '';
        switch (locale) {
            case 'en': return hotel.wilaya_en || hotel.wilaya_fr || hotel.wilaya_ar;
            case 'ar': return hotel.wilaya_ar || hotel.wilaya_fr || hotel.wilaya_en;
            default: return hotel.wilaya_fr || hotel.wilaya_en || hotel.wilaya_ar;
        }
    };

    const getServices = () => {
        if (!hotel) return '';
        switch (locale) {
            case 'en': return hotel.services_en || hotel.services_fr || hotel.services_ar;
            case 'ar': return hotel.services_ar || hotel.services_fr || hotel.services_en;
            default: return hotel.services_fr || hotel.services_en || hotel.services_ar;
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
                <NewHeader />
                <div className="container mx-auto px-4 py-8">
                    <div className="flex items-center justify-center py-20">
                        <div className="text-center">
                            <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
                            <p className="text-gray-600">Loading hotel details...</p>
                        </div>
                    </div>
                </div>
                <NewFooter />
            </div>
        );
    }

    if (error || !hotel) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
                <NewHeader />
                <div className="container mx-auto px-4 py-8">
                    <div className="flex flex-col items-center justify-center py-20">
                        <h1 className="text-2xl font-bold text-gray-800 mb-4">{t('hotelNotFound')}</h1>
                        <p className="text-gray-600 mb-6">{error}</p>
                        <Button onClick={() => router.push('/')} className="flex items-center gap-2">
                            <ArrowLeft className="w-4 h-4" />
                            {t('backToHotels')}
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
                        onClick={() => router.push('/')}
                        className="flex items-center gap-2"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        {t('backToHotels')}
                    </Button>
                </motion.div>

                {/* Hotel Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                        <div>
                            <h1 className={`text-3xl md:text-4xl font-bold text-gray-800 mb-2 ${locale === 'ar' ? 'text-right' : 'text-left'
                                }`}>
                                {getName()}
                            </h1>

                            <div className="flex items-center gap-4 flex-wrap">
                                {hotel.etoiles && (
                                    <div className="flex items-center gap-1">
                                        {[...Array(hotel.etoiles)].map((_, i) => (
                                            <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                        ))}
                                        <span className="ml-1 text-gray-600">{hotel.etoiles} {t('stars')}</span>
                                    </div>
                                )}

                                {getWilaya() && (
                                    <div className="flex items-center gap-1 text-gray-600">
                                        <MapPin className="w-4 h-4" />
                                        {getWilaya()}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Price and Actions */}
                        <div className="flex flex-col items-end gap-3">
                            {(hotel.prix_min || hotel.prix_max) && (
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-blue-600">
                                        {hotel.prix_min && `${hotel.prix_min} DA`}
                                        {hotel.prix_min && hotel.prix_max && hotel.prix_min !== hotel.prix_max && ` - ${hotel.prix_max} DA`}
                                    </div>
                                    <div className="text-sm text-gray-500">{t('perNight')}</div>
                                </div>
                            )}

                            <div className="flex gap-2">
                                {hotel.telephone && (
                                    <Button
                                        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                                        onClick={() => window.open(`tel:${hotel.telephone}`, '_self')}
                                    >
                                        <Phone className="w-4 h-4 mr-2" />
                                        {t('callNow')}
                                    </Button>
                                )}

                                {hotel.site_web && (
                                    <Button
                                        variant="outline"
                                        onClick={() => window.open(formatUrl(hotel.site_web || ""), "_blank")}
                                        >
                                        <Globe className="w-4 h-4 mr-2" />
                                        {t('visitWebsite')}
                                    </Button>
                                )}
                            </div>
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
                                        <Users className="w-5 h-5" />
                                        {t('overview')}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className={`text-gray-700 leading-relaxed ${locale === 'ar' ? 'text-right' : 'text-left'
                                        }`}>
                                        {getDescription()}
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Amenities */}
                        {getServices() && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Utensils className="w-5 h-5" />
                                            {t('amenities')}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            {/* @ts-ignore */}
                                            {getServices() !== undefined && getServices().split(',').map((service, index) => (
                                                <div key={index} className="flex items-center gap-2">
                                                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                                    <span className="text-gray-700">{service.trim()}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        )}

                        {/* Map */}
                        {hotel.latitude && hotel.longitude && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <MapPin className="w-5 h-5" />
                                            {t('locationMap')}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <HotelMap
                                            latitude={hotel.latitude}
                                            longitude={hotel.longitude}
                                            hotelName={getName()||""}
                                            address={getAddress()}
                                        />
                                        <div className="mt-4 flex items-center justify-between">
                                            <p className="text-gray-600">{getAddress()}</p>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => window.open(
                                                    `https://www.google.com/maps/dir/?api=1&destination=${hotel.latitude},${hotel.longitude}`,
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
                                    {hotel.telephone && (
                                        <div className="flex items-center gap-3">
                                            <Phone className="w-4 h-4 text-gray-500" />
                                            <span className="text-gray-700">{hotel.telephone}</span>
                                        </div>
                                    )}

                                    {hotel.email && (
                                        <div className="flex items-center gap-3">
                                            <Mail className="w-4 h-4 text-gray-500" />
                                            <span className="text-gray-700 truncate">{hotel.email}</span>
                                        </div>
                                    )}

                                    {hotel.site_web && (
                                        <div className="flex items-center gap-3">
                                            <Globe className="w-4 h-4 text-gray-500" />
                                            <a
                                                href={hotel.site_web}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:underline truncate"
                                            >
                                                {hotel.site_web}
                                            </a>
                                        </div>
                                    )}

                                    <Separator />

                                    <div className="space-y-2">
                                        {hotel.email && (
                                            <Button
                                                variant="outline"
                                                className="w-full justify-start"
                                                onClick={() => window.open(`mailto:${hotel.email}`, '_self')}
                                            >
                                                <Mail className="w-4 h-4 mr-2" />
                                                {t('sendEmail')}
                                            </Button>
                                        )}

                                        {hotel.telephone && (
                                            <Button
                                                className="w-full justify-start bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                                                onClick={() => window.open(`tel:${hotel.telephone}`, '_self')}
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
                                    <CardTitle>Quick Info</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    {hotel.etoiles && (
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600">{t('rating')}</span>
                                            <div className="flex items-center gap-1">
                                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                                <span className="font-semibold">{hotel.etoiles}/5</span>
                                            </div>
                                        </div>
                                    )}

                                    {hotel.distance && (
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600">{t('distance')}</span>
                                            <span className="font-semibold">{hotel.distance} km</span>
                                        </div>
                                    )}

                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">{t('zone')}</span>
                                        <span>
                                            {locale === 'en' ? hotel.zone_en || hotel.zone_fr :
                                                locale === 'ar' ? hotel.zone_ar || hotel.zone_fr :
                                                    hotel.zone_fr || hotel.zone_en}
                                        </span>
                                    </div>
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