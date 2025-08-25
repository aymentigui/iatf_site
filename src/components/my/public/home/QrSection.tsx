"use client";
import React from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";

const QrSection = () => {
  const t = useTranslations("qr"); // traduction section qr

  return (
    <section className="w-full py-12 bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center justify-center gap-10">
        {/* Texte */}
        <div className="text-center lg:text-left max-w-lg">
          <h2 className="text-2xl md:text-4xl font-bold text-blue-900 mb-4">
            {t("title")}
          </h2>
          <p className="text-lg text-gray-700 mb-6">{t("description")}</p>
          <a
            href="https://odiro-dz.com/atms/public"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-blue-700 text-white rounded-xl shadow-lg hover:bg-blue-800 transition"
          >
            {t("button")}
          </a>
        </div>

        {/* QR Code */}
        <div className="flex justify-center items-center">
          <Image
            src="/qr-odiro.png" // mets ton image QR code ici dans public/
            alt="QR Code"
            width={220}
            height={220}
            className="rounded-xl shadow-xl border border-gray-300"
          />
        </div>
      </div>
    </section>
  );
};

export default QrSection;
