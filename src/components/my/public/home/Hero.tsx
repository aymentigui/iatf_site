"use client"
import React from 'react'
import { GlobeDemo } from "@/components/my/public/animated-components/GlobeDemo";
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';


const Hero = () => {
    const t = useTranslations();

    return (
        <section className="relative bg-gradient-to-br from-blue-50 to-orange-50 lg:p-40">

            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        className="flex justify-center items-start flex-col p-12 lg:p-0 lg:block"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                            {t('hero.title')}
                        </h1>
                        <h2 className="text-xl md:text-2xl text-orange-600 mb-6 font-medium">
                            {t('hero.subtitle')}
                        </h2>
                        <p className="text-lg text-gray-600 mb-8">
                            {t('hero.description')}
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-gradient-to-r from-blue-600 to-orange-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-lg transition-shadow"
                        >
                            {t('contact.form')}
                        </motion.button>
                    </motion.div>

                    {/* <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="relative"
        >
          <div className="bg-gradient-to-br from-blue-600 to-orange-500 rounded-2xl p-8 text-white shadow-2xl">
            <div className="w-full h-64 bg-white/20 rounded-lg flex items-center justify-center mb-6">
              <Bus className="w-20 h-20 text-white" />
            </div>
            <div className="flex justify-center space-x-2">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
                  className={`w-2 h-2 rounded-full ${i === 3 ? 'bg-orange-300' : 'bg-white/50'}`}
                />
              ))}
            </div>
          </div>
        </motion.div> */}
                    <GlobeDemo />
                </div>
            </div>
        </section>

    )
}

export default Hero
