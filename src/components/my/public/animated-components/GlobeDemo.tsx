"use client";
import React from "react";
import dynamic from "next/dynamic";

const World = dynamic(() => import("../../../ui/globe").then((m) => m.World), {
  ssr: false,
});

export function GlobeDemo() {
  const globeConfig = {
    pointSize: 4,
    globeColor: "#062056",
    showAtmosphere: true,
    atmosphereColor: "#FFFFFF",
    atmosphereAltitude: 0.1,
    emissive: "#062056",
    emissiveIntensity: 0.1,
    shininess: 0.9,
    polygonColor: "rgba(255,255,255,0.7)",
    ambientLight: "#38bdf8",
    directionalLeftLight: "#ffffff",
    directionalTopLight: "#ffffff",
    pointLight: "#ffffff",
    arcTime: 1000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    initialPosition: { lat: 28.0339, lng: 1.6596 }, // Algerie
    autoRotate: true,
    autoRotateSpeed: 0.5,
  };

  const colors = ["#06b6d4", "#3b82f6", "#6366f1"];

  // Exemple d'arcs uniquement en Afrique (incluant Algérie, excluant Maroc)
  const sampleArcs = [
    {
      order: 1,
      startLat: 28.0339, // Alger, Algérie
      startLng: 1.6596,
      endLat: 9.0820, // Nigéria
      endLng: 8.6753,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * colors.length)],
    },
    {
      order: 2,
      startLat: -1.2921, // Nairobi, Kenya
      startLng: 36.8219,
      endLat: -26.2041, // Johannesburg, Afrique du Sud
      endLng: 28.0473,
      arcAlt: 0.4,
      color: colors[Math.floor(Math.random() * colors.length)],
    },
    {
      order: 3,
      startLat: 28.0339, // Algérie
      startLng: 1.6596,
      endLat: 6.5244, // Lagos, Nigéria
      endLng: 3.3792,
      arcAlt: 0.5,
      color: colors[Math.floor(Math.random() * colors.length)],
    },
    {
      order: 4,
      startLat: 15.5007, // N'Djamena, Tchad
      startLng: 32.5599,
      endLat: 30.0444, // Le Caire, Egypte
      endLng: 31.2357,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * colors.length)],
    },
    {
      order: 5,
      startLat: -4.4419, // Kinshasa, RDC
      startLng: 15.2663,
      endLat: 14.7167, // Dakar, Sénégal
      endLng: -17.4677,
      arcAlt: 0.4,
      color: colors[Math.floor(Math.random() * colors.length)],
    },
  ];

  return (
    <div className="h-[250px] lg:h-[450px]">
      <World data={sampleArcs} globeConfig={globeConfig} />
    </div>
  );
}
