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

export default function Home() {
  const t = useTranslations();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });



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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', message: '' });
  };


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
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {t('contact.title')}
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                {t('contact.subtitle')}
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('contact.name')}
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('contact.email')}
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('contact.message')}
                  </label>
                  <textarea
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-orange-500 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-shadow"
                >
                  {t('contact.send')}
                </motion.button>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-50 to-orange-50 p-8 rounded-2xl"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                {t('contact.links')}
              </h3>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{t('footer.phone')}</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{t('footer.email')}</div>
                    <div className="text-gray-600">contact@iatf2025.dz</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <MapPinIcon className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{t('footer.address')}</div>
                    <div className="text-gray-600">Alger, Algérie</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <NewFooter />
    </div>
  );
}
