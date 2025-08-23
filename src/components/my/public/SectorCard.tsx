'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface SectorCardProps {
  icon: ReactNode;
  title: string;
  index: number;
  color: string;
}

export default function SectorCard({ icon, title, index, color }: SectorCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -10, scale: 1.05 }}
      className={`${color} rounded-xl p-6 text-white text-center shadow-lg hover:shadow-xl transition-shadow cursor-pointer`}
    >
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
          {icon}
        </div>
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
    </motion.div>
  );
}