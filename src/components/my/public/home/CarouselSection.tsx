"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function CarouselSection() {
  const images = [
    "/slide0.jpg",
    "/slide4.jpg",
    "/slide2.png",
    "/slide3.png",
    "/slide1.png",
  ];

  return (
    <section className="w-full h-[400px] md:h-[400px] relative bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 py-10">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
        className="w-full h-full"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-contain rounded-2xl shadow-lg"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
