"use client";

import React from 'react'
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import RestaurantCard from "@/components/my/public/restaurants/RestaurantCard";
import HotelCard from "@/components/my/public/hotels/HotelCard";
import { getRestos } from "@/actions/restaurant/get";
import { getHotels } from "@/actions/hotels/get";
import { useTranslations } from 'next-intl';
import Link from "next/link";
import { useParams } from 'next/navigation';

const HotelsAndRestaurants = () => {
    const t = useTranslations();
    const params = useParams();
    const locale = params.locale as string;

    const [hotels, setHotels] = useState([]);
    // const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchData();
      }, []);
    
    const fetchData = async () => {
        setLoading(true);
        try {
            const [restaurantsResponse, hotelsResponse] = await Promise.all([
                // getRestos({
                //     search: "",
                //     statut: undefined,
                //     page: 1,
                //     limit: 3,
                // }),
                [],
                getHotels({
                    search: "",
                    statut: undefined,
                    page: 1,
                    limit: 3,
                }),
            ]);
            const hotelsData = await hotelsResponse;
            // const restaurantsData = await restaurantsResponse;
            if (hotelsData.status === 200 && hotelsData.data.hotels) {
                setHotels(hotelsData.data.hotels);
            }
            // if (restaurantsData.status === 200 && restaurantsData.data.restaurants) {
            //     setRestaurants(restaurantsData.data.restaurants);
            // }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    }


    return (
        <>
            <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            {t('hotels.title')}
                        </h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            {t('hotels.subtitle')}
                        </p>
                    </motion.div>

                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                        </div>
                    ) : (
                        <>
                            {hotels.length > 0 ? (
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {hotels.slice(0, 3).map((hotel, index) => (
                                        <HotelCard key={index} hotel={hotel} locale={locale} />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <p className="text-gray-500">{t('hotels.noHotels')}</p>
                                </div>
                            )}

                            <div className="text-center mt-12">
                                <Link href="/hotels">
                                    <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg">
                                        {t('hotels.viewAll')}
                                    </Button>
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </section>
{/* 
            <section className="py-20 bg-gradient-to-br from-orange-50 to-amber-100">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            {t('restaurants.title')}
                        </h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            {t('restaurants.subtitle')}
                        </p>
                    </motion.div>

                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
                        </div>
                    ) : (
                        <>
                            {restaurants.length > 0 ? (
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {restaurants.slice(0, 3).map((restaurant, index) => (
                                        <RestaurantCard key={index} restaurant={restaurant} locale={locale} />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <p className="text-gray-500">{t('restaurants.noRestaurants')}</p>
                                </div>
                            )}

                            <div className="text-center mt-12">
                                <Link href="/restaurants">
                                    <Button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg">
                                        {t('restaurants.viewAll')}
                                    </Button>
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </section> */}
        </>
    )
}

export default HotelsAndRestaurants
