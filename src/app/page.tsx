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

export const dynamic = "force-dynamic"; // 🚀 force Next.js à ne rien mettre en cache
export const revalidate = 0;            // 🚀 pas de revalidation ISR


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
      <IATFObjectives />
      {/* Venue Section */}
      <KeySectors />
      <Venue />


      {/* Services Section */}

      <Services />

      {/* Sectors Section */}
      <Secteurs />

      {/* Hotels & Restaurants Section */}
     <HotelsAndRestaurants ></HotelsAndRestaurants>

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
