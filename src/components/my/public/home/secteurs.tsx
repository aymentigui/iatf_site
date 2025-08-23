import React from 'react'
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import {
  Wheat,
  Factory,
  Zap,
  DollarSign,
  Microscope,
  Heart,
  Truck,
  Lightbulb,
} from 'lucide-react';
import SectorCard from '../SectorCard';

const Secteurs = () => {
    const t = useTranslations();

    const sectors = [
        { icon: <Wheat className="w-8 h-8" />, title: t('sectors.agriculture'), color: 'bg-green-500' },
        { icon: <Factory className="w-8 h-8" />, title: t('sectors.industry'), color: 'bg-blue-600' },
        { icon: <Zap className="w-8 h-8" />, title: t('sectors.energy'), color: 'bg-yellow-500' },
        { icon: <DollarSign className="w-8 h-8" />, title: t('sectors.finance'), color: 'bg-emerald-600' },
        { icon: <Microscope className="w-8 h-8" />, title: t('sectors.research'), color: 'bg-purple-600' },
        { icon: <Heart className="w-8 h-8" />, title: t('sectors.health'), color: 'bg-red-500' },
        { icon: <Truck className="w-8 h-8" />, title: t('sectors.transport_sector'), color: 'bg-orange-600' },
        { icon: <Lightbulb className="w-8 h-8" />, title: t('sectors.startups'), color: 'bg-indigo-600' },
    ];


    return (
        <section className="py-20 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        {t('sectors.title')}
                    </h2>
                    <p className="text-lg text-white/80 max-w-3xl mx-auto">
                        {t('sectors.subtitle')}
                    </p>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {sectors.map((sector, index) => (
                        <SectorCard
                            key={sector.title}
                            icon={sector.icon}
                            title={sector.title}
                            index={index}
                            color={sector.color}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Secteurs
