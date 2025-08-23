"use client"
import { useTranslations } from 'next-intl';
import React from 'react'

const NewFooter = () => {
    const t = useTranslations();

    return (
        <footer className="bg-gray-900 text-white py-12">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">{t('footer.about')}</h3>
                        <p className="text-gray-300 mb-6">
                            {t('footer.description')}
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold mb-4">{t('footer.contact_info')}</h3>
                        <div className="space-y-2 text-gray-300">
                            <div>{t('footer.address')}</div>
                            <div>{t('footer.phone')}</div>
                            <div>{t('footer.email')}</div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
                    {t('footer.rights')}
                </div>
            </div>
        </footer>
    )
}

export default NewFooter
