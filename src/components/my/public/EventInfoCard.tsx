'use client';

import { motion } from 'framer-motion';
import { Calendar, MapPin, Globe } from 'lucide-react';

interface EventInfoCardProps {
  date: string;
  location: string;
  region: string;
  className?: string;
}

export default function EventInfoCard({ date, location, region, className = '' }: EventInfoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-gradient-to-r from-blue-700 to-blue-800 text-white rounded-2xl p-6 shadow-lg ${className}`}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
            <Calendar className="w-5 h-5 text-white" />
          </div>
          <span className="font-semibold text-lg">{date}</span>
        </div>
        
        <div className="w-px h-8 bg-white/30"></div>
        
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <span className="font-semibold text-lg">{location}</span>
        </div>
        
        <div className="w-px h-8 bg-white/30"></div>
        
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
            <Globe className="w-5 h-5 text-white" />
          </div>
          <span className="font-semibold text-lg">{region}</span>
        </div>
      </div>
    </motion.div>
  );
}