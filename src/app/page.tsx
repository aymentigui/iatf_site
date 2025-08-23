"use client";

import DivStart from "@/components/my/public/div-start";
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import {
  Wheat,
  Factory,
  Zap,
  DollarSign,
  Microscope,
  Heart,
  Truck,
  Lightbulb,
  Phone,
  Mail,
  MapPinIcon,
} from 'lucide-react';
import SectorCard from '@/components/my/public/SectorCard';
import { useState } from 'react';
import NewHeader from "@/components/my/public/new-header";


import Hero from "@/components/my/public/home/Hero";
import Services from "@/components/my/public/home/Services";
import Venue from "@/components/my/public/home/Venue";
import NewFooter from "@/components/my/public/new-footer";
import HotelsAndRestaurants from "@/components/my/public/home/HotelsAndRestaurants";
import IATFObjectives from "@/components/my/public/home/IATFObjectives";
import KeySectors from "@/components/my/public/home/KeySectors";
import Contact from "@/components/my/public/contact";

export default function Home() {
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
    <div className="h-full w-full overflow-hidden">
      <DivStart />
      {/* Header */}
      {/* <HeaderPublic /> */}
      {/* Header */}
      <NewHeader />

      {/* Hero Section */}
      <Hero />
      <IATFObjectives />
      {/* Venue Section */}
      <KeySectors />
      <Venue />


      {/* Services Section */}

      <Services />

      {/* Sectors Section */}
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

      {/* Hotels & Restaurants Section */}
     <HotelsAndRestaurants ></HotelsAndRestaurants>



      {/* Contact Section */}
      <Contact />

      {/* Footer */}
      <NewFooter />
    </div>
  );
}
