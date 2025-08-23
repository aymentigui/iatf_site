"use client";

import { getHotels } from '@/actions/hotels/get';
import NewFooter from '@/components/my/public/new-footer';
import NewHeader from '@/components/my/public/new-header';
import { useLocale, useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import React, { useEffect, useState, useMemo } from 'react';
import { Loader2, MapPin } from 'lucide-react';
import { Hotel, ViewMode } from '@/types/hotel';
import HotelList from '@/components/my/public/hotels/HotelList';
import HotelCard from '@/components/my/public/hotels/HotelCard';
import PaginationControls from '@/components/my/public/hotels/PaginationControls';
import SearchAndFilters from '@/components/my/public/hotels/SearchAndFilters';

const ITEMS_PER_PAGE = 12;

export default function Hotels() {
    const [hotels, setHotels] = useState<Hotel[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [viewMode, setViewMode] = useState<ViewMode>('card');
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredHotels, setFilteredHotels] = useState<Hotel[]>([]);
    const [paginatedHotels, setPaginatedHotels] = useState<any[]>([]);

    const locale = useLocale();
    const t = useTranslations('hotels');

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const result = await getHotels({
                    search: "",
                    statut: undefined,
                    page: 1,
                    limit: 25,
                });
                if (result.status !== 200) {
                    console.error("Failed to fetch hotels:", result.data.message);
                    return;
                }
                setHotels(result.data.hotels || []);
            } catch (error) {
                console.error("Error fetching hotels:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => { 
        // Update filteredHotels whenever hotels or searchTerm changes
        if (!searchTerm.trim()) {
            setFilteredHotels(hotels);
            setPaginatedHotels(hotels.slice(0, ITEMS_PER_PAGE));
            console.log(hotels.length, 'filteredHotels length');
            return;
        };
        const h=hotels.filter((hotel) => {
            const getName = () => {
                switch (locale) {
                    case 'en': return hotel.nom_en || hotel.nom_fr || hotel.nom_ar;
                    case 'ar': return hotel.nom_ar || hotel.nom_fr || hotel.nom_en;
                    default: return hotel.nom_fr || hotel.nom_en || hotel.nom_ar;
                }
            };

            const getWilaya = () => {
                switch (locale) {
                    case 'en': return hotel.wilaya_en || hotel.wilaya_fr || hotel.wilaya_ar;
                    case 'ar': return hotel.wilaya_ar || hotel.wilaya_fr || hotel.wilaya_en;
                    default: return hotel.wilaya_fr || hotel.wilaya_en || hotel.wilaya_ar;
                }
            };

            const name = getName()?.toLowerCase() || '';
            const wilaya = getWilaya()?.toLowerCase() || '';
            const term = searchTerm.toLowerCase();

            return name.includes(term) || wilaya.includes(term);
        });
        setFilteredHotels(h);
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        const g=h.slice(startIndex, endIndex);
        setPaginatedHotels(h.slice(0, ITEMS_PER_PAGE));
    }, [searchTerm,hotels]);



    // Paginate filtered hotels
    // const paginatedHotels = useMemo(() => {
    //     const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    //     const endIndex = startIndex + ITEMS_PER_PAGE;
    //     return filteredHotels.slice(startIndex, endIndex);
    // }, [filteredHotels, currentPage]);

    const totalPages = Math.ceil(filteredHotels.length / ITEMS_PER_PAGE);

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
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
            <NewHeader />

            <main className="container mx-auto px-4 py-8">
                {/* Page Title */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-8"
                >
                    <h1 className={`text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4 ${locale === 'ar' ? 'font-arabic' : ''
                        }`}>
                        {t('title')}
                    </h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full"></div>
                </motion.div>

                {/* Search and Filters */}
                <SearchAndFilters
                    searchTerm={searchTerm}
                    onSearchChange={handleSearchChange}
                    viewMode={viewMode}
                    onViewModeChange={handleViewModeChange}
                    totalResults={filteredHotels.length}
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
                            <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
                            <p className="text-gray-600">{t('loadingMore')}</p>
                        </div>
                    </motion.div>
                )}

                {/* No Results */}
                {!loading && filteredHotels.length === 0 && (
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

                {/* Hotels Grid/List */}
                {!loading && Array.isArray(paginatedHotels) && paginatedHotels.length > 0 && (
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
                                    {Array.isArray(paginatedHotels) && paginatedHotels.map((hotel, index) => (
                                        <HotelCard
                                            key={hotel.id}
                                            hotel={hotel}
                                            locale={locale}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {Array.isArray(paginatedHotels) && paginatedHotels.map((hotel, index) => (
                                        <HotelList
                                            key={hotel.id}
                                            hotel={hotel}
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
                {!loading && filteredHotels.length > ITEMS_PER_PAGE && (
                    <PaginationControls
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                        totalItems={filteredHotels.length}
                        itemsPerPage={ITEMS_PER_PAGE}
                        locale={locale}
                    />
                )}
            </main>

            <NewFooter />
        </div>
    );
}