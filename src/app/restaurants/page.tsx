"use client";

import NewFooter from '@/components/my/public/new-footer';
import NewHeader from '@/components/my/public/new-header';
import { useLocale, useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import React, { useEffect, useState, useMemo } from 'react';
import { Loader2, MapPin } from 'lucide-react';
import { Restaurant2 as Restaurant, ViewMode } from '@/types/restaurant';
import { getRestos } from '@/actions/restaurant/get';
import SearchAndFilters from '@/components/my/public/restaurants/SearchAndFilters';
import PaginationControls from '@/components/my/public/restaurants/PaginationControls';
import RestaurantCard from '@/components/my/public/restaurants/RestaurantCard';
import RestaurantList from '@/components/my/public/restaurants/RestaurantList';

const ITEMS_PER_PAGE = 12;

export default function Restaurants() {
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [viewMode, setViewMode] = useState<ViewMode>('card');
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>([]);
    const [paginatedRestaurants, setPaginatedRestaurants] = useState<any[]>([]);

    const locale = useLocale();
    const t = useTranslations('restaurants');

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const result = await getRestos({
                    search: "",
                    statut: undefined,
                    page: 1,
                    limit: 25,
                });
                if (result.status !== 200) {
                    console.error("Failed to fetch restaurants:", result.data.message);
                    return;
                }
                setRestaurants(result.data.restaurants || []);
            } catch (error) {
                console.error("Error fetching restaurants:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => { 
        // Update filteredRestaurants whenever restaurants or searchTerm changes
        if (!searchTerm.trim()) {
            setFilteredRestaurants(restaurants);
            setPaginatedRestaurants(restaurants.slice(0, ITEMS_PER_PAGE));
            console.log(restaurants.length, 'filteredRestaurants length');
            return;
        };
        const r = restaurants.filter((restaurant) => {
            const getName = () => {
                switch (locale) {
                    case 'en': return restaurant.nomen || restaurant.nomfr || restaurant.nomar;
                    case 'ar': return restaurant.nomar || restaurant.nomfr || restaurant.nomen;
                    case 'es': return restaurant.nomes || restaurant.nomfr || restaurant.nomen;
                    case 'pt': return restaurant.nompt || restaurant.nomfr || restaurant.nomen;
                    default: return restaurant.nomfr || restaurant.nomen || restaurant.nomar;
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

            const name = getName()?.toLowerCase() || '';
            const cuisineType = getCuisineType()?.toLowerCase() || '';
            const term = searchTerm.toLowerCase();

            return name.includes(term) || cuisineType.includes(term);
        });
        setFilteredRestaurants(r);
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        const g = r.slice(startIndex, endIndex);
        setPaginatedRestaurants(r.slice(0, ITEMS_PER_PAGE));
    }, [searchTerm, restaurants]);

    const totalPages = Math.ceil(filteredRestaurants.length / ITEMS_PER_PAGE);

    // Reset to first page when search term changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    const handleSearchChange = (term: string) => {
        setSearchTerm(term);
    };

    const handleViewModeChange = (mode: ViewMode) => {
        setViewMode(mode);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        // Smooth scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
            <NewHeader />

            <main className="container mx-auto px-4 py-8">
                {/* Page Title */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-8"
                >
                    <h1 className={`text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-4 ${locale === 'ar' ? 'font-arabic' : ''
                        }`}>
                        {t('title')}
                    </h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-amber-600 to-orange-600 mx-auto rounded-full"></div>
                </motion.div>

                {/* Search and Filters */}
                <SearchAndFilters
                    searchTerm={searchTerm}
                    onSearchChange={handleSearchChange}
                    viewMode={viewMode}
                    onViewModeChange={handleViewModeChange}
                    totalResults={filteredRestaurants.length}
                    locale={locale}
                />

                {/* Loading State */}
                {loading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center justify-center py-20"
                    >
                        <div className="text-center">
                            <Loader2 className="w-12 h-12 animate-spin text-amber-600 mx-auto mb-4" />
                            <p className="text-gray-600">{t('loadingMore')}</p>
                        </div>
                    </motion.div>
                )}

                {/* No Results */}
                {!loading && filteredRestaurants.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center justify-center py-20"
                    >
                        <MapPin className="w-16 h-16 text-gray-300 mb-4" />
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">
                            {t('noResults')}
                        </h3>
                        {searchTerm && (
                            <p className="text-gray-500 text-center">
                                Aucun résultat pour "{searchTerm}"
                            </p>
                        )}
                    </motion.div>
                )}

                {/* Restaurants Grid/List */}
                {!loading && Array.isArray(paginatedRestaurants) && paginatedRestaurants.length > 0 && (
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`${viewMode}-${currentPage}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {viewMode === 'card' ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {Array.isArray(paginatedRestaurants) && paginatedRestaurants.map((restaurant, index) => (
                                        <RestaurantCard
                                            key={restaurant.id}
                                            restaurant={restaurant}
                                            locale={locale}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {Array.isArray(paginatedRestaurants) && paginatedRestaurants.map((restaurant, index) => (
                                        <RestaurantList
                                            key={restaurant.id}
                                            restaurant={restaurant}
                                            locale={locale}
                                            index={index}
                                        />
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                )}

                {/* Pagination */}
                {!loading && filteredRestaurants.length > ITEMS_PER_PAGE && (
                    <PaginationControls
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                        totalItems={filteredRestaurants.length}
                        itemsPerPage={ITEMS_PER_PAGE}
                        locale={locale}
                    />
                )}
            </main>

            <NewFooter />
        </div>
    );
}