"use client";

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Search, Grid3X3, List, X } from 'lucide-react';
import { ViewMode } from '@/types/hotel';
import { useTranslations } from 'next-intl';

interface SearchAndFiltersProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  totalResults: number;
  locale: string;
}

export default function SearchAndFilters({
  searchTerm,
  onSearchChange,
  viewMode,
  onViewModeChange,
  totalResults,
  locale
}: SearchAndFiltersProps) {
  const t = useTranslations('hotels');

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-sm border p-6 mb-6"
    >
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder={t('searchPlaceholder')}
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className={`pl-10 ${locale === 'ar' ? 'text-right pr-10 pl-4' : ''}`}
            dir={locale === 'ar' ? 'rtl' : 'ltr'}
          />
          {searchTerm && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Results count */}
        <div className="text-sm text-gray-600">
          <span>
            {totalResults} {totalResults === 1 ? 'hotel' : 'hotels'}
          </span>
        </div>

        {/* View toggle */}
        <div className="flex rounded-lg border p-1 bg-gray-50">
          <Button
            variant={viewMode === 'card' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewModeChange('card')}
            className="rounded-md"
          >
            <Grid3X3 className="w-4 h-4 mr-1" />
            {t('viewCard')}
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewModeChange('list')}
            className="rounded-md"
          >
            <List className="w-4 h-4 mr-1" />
            {t('viewList')}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}