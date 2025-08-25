import DivStart from "@/components/my/public/div-start";
import NewHeader from "@/components/my/public/new-header";
import Hero from "@/components/my/public/home/Hero";
import Services from "@/components/my/public/home/Services";
import Venue from "@/components/my/public/home/Venue";
import NewFooter from "@/components/my/public/new-footer";
import HotelsAndRestaurants from "@/components/my/public/home/HotelsAndRestaurants";
import IATFObjectives from "@/components/my/public/home/IATFObjectives";
import KeySectors from "@/components/my/public/home/KeySectors";
import Contact from "@/components/my/public/contact";
import Secteurs from "@/components/my/public/home/secteurs";
import Image from "next/image";
import CarouselSection from "@/components/my/public/home/CarouselSection";
import { WeatherInfo } from "@/components/my/public/liens/WeatherInfo";

import type { Metadata } from "next";
import QrSection from "@/components/my/public/home/QrSection";

export const metadata: Metadata = {
  title: "Intra-African Trade Fair 2025 | IATF 2025",
  description:
    "The Intra-African Trade Fair (IATF2025) is Africa’s premier trade and investment fair, connecting businesses, policy makers, and investors to boost intra-African trade and accelerate the AfCFTA.",
  openGraph: {
    title: "Intra-African Trade Fair 2025 | IATF 2025",
    description:
      "The Intra-African Trade Fair (IATF2025) is Africa’s premier trade and investment fair, connecting businesses, policy makers, and investors to boost intra-African trade and accelerate the AfCFTA.",
    url: "https://2025.iatf.africa",
    siteName: "IATF 2025",
    images: [
      {
        url: "/iatf_image.jpeg",
        width: 1200,
        height: 630,
        alt: "IATF 2025",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function Home() {
  
  return (
    <div className="h-full w-full overflow-hidden">
      <DivStart />
      {/* Header */}
      {/* <HeaderPublic /> */}
      {/* Header */}
      <NewHeader />

      {/* Hero Section */}
      <Hero />
      <CarouselSection />
      {/* <IATFObjectives /> */}
      {/* Venue Section */}
      {/* <KeySectors /> */}
      <Venue />


      {/* Services Section */}

      <Services />

      {/* Sectors Section */}
      <Secteurs />
      <QrSection />

      {/* Hotels & Restaurants Section */}
     {/* <HotelsAndRestaurants ></HotelsAndRestaurants> */}

      <section className="w-full p-8 lg:p-20 h-[250px] lg:h-[550px]">
        <Image className="w-full h-full object-contain" src="/iatf_image.jpeg" alt="IATF_2025" width={600} height={600}></Image>
      </section>

      {/* Contact Section */}
      <Contact />

      <WeatherInfo />

      {/* Footer */}
      <NewFooter />
    </div>
  );
}
