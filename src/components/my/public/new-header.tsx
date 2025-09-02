"use client"
import React, { useState } from 'react'
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from '@/components/my/public/LanguageSwitcher';
import CountdownTimer from './CountdownTimer';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const NewHeader = () => {
    const t = useTranslations();
    const params = useParams();
    const locale = params.locale as string;
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const targetDate = new Date('2025-09-04T00:00:00Z');

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="text-white py-6"
            style={{ background: 'linear-gradient(to right, #8a0a2c, #DE1B50, #8a0a2c)' }}
        >
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center mb-6">
                    <Link href="/">
                        <div className="flex items-center gap-3">
                            {/* Logo */}
                            <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center bg-white p-2">
                                <Image
                                    src="/logo-transtev.png"
                                    alt="IATF2025 Logo"
                                    width={48}
                                    height={48}
                                    className="object-contain"
                                />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold">IATF2025</h1>
                                <p className="text-sm opacity-80">{t("footer.address")}</p>
                            </div>
                        </div>
                    </Link>

                    {/* Menu desktop */}
                    <nav className="hidden md:flex items-center space-x-6 mr-4">
                        <a href="/" className="hover:opacity-80 mx-2 transition-opacity">
                            {t('Header.home')}
                        </a>
                        <a href="/contact" className="hover:opacity-80 mx-2 transition-opacity">
                            {t('contact.title')}
                        </a>
                        <a href="/busrequest" className="hover:opacity-80 mx-2 transition-opacity">
                            {t('busRequest.title')}
                        </a>
                    </nav>

                    <div className="flex items-center gap-4">
                        <LanguageSwitcher locale={locale} />
                        {/* Bouton menu mobile */}
                        <button
                            className="md:hidden p-2 rounded-md hover:bg-[#8a0a2c] transition-colors"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Ouvrir le menu"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                <div className="text-center">
                    <h2 className="text-lg md:text-xl mb-6 font-medium">
                        {t('header.title')}
                    </h2>
                    <CountdownTimer
                        targetDate={targetDate}
                        labels={{
                            days: t('header.days'),
                            hours: t('header.hours'),
                            minutes: t('header.minutes'),
                            seconds: t('header.seconds')
                        }}
                    />
                </div>
            </div>

            {/* Menu mobile */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'tween', ease: 'easeInOut' }}
                        className="fixed inset-y-0 right-0 w-64 z-50 md:hidden shadow-2xl"
                        style={{ backgroundColor: '#DE1B50' }}
                    >
                        <div className="p-5 flex flex-col h-full">
                            <div className="flex justify-between items-center mb-10">
                                <h2 className="text-xl font-bold">Menu</h2>
                                <button
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="p-2 rounded-full hover:bg-[#8a0a2c]"
                                    aria-label="Fermer le menu"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <nav className="flex flex-col space-y-6">
                                <a
                                    href="/"
                                    className="py-3 px-4 rounded-lg hover:bg-[#8a0a2c] transition-colors text-lg"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {t('Header.home')}
                                </a>
                                <a
                                    href="/contact"
                                    className="py-3 px-4 rounded-lg hover:bg-[#8a0a2c] transition-colors text-lg"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {t('contact.title')}
                                </a>
                                <a
                                    href="/busrequest"
                                    className="py-3 px-4 rounded-lg hover:bg-[#8a0a2c] transition-colors text-lg"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {t('busRequest.title')}
                                </a>
                            </nav>

                            <div className="mt-auto pt-6 border-t border-[#8a0a2c]">
                                <LanguageSwitcher locale={locale} />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Overlay */}
            {isMobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}
        </motion.header>
    )
}

export default NewHeader;