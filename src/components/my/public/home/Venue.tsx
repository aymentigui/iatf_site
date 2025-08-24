"use client"
import React from 'react'
import CircularGallery from "@/components/my/public/animated-components/CircularGallery";
import Galaxy from "@/components/my/public/animated-components/galaxy";
import TextType from "@/components/my/public/animated-components/TextType";
import { useTranslations } from 'next-intl';

const Venue = () => {
    const t = useTranslations();

    return (
        <>

            <section>
                <div style={{ height: '450px', position: 'relative' }}>
                    <CircularGallery bend={3} textColor="#000000FF" borderRadius={0.05} scrollEase={0.02} />
                </div>
            </section>
            <section className="bg-white">
                {/* <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            
          </motion.div>
        </div> */}
                <div style={{ width: '100%', height: '200px', position: 'relative' }}>
                    <Galaxy />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">

                        <TextType
                            text={[t('venue.title'), t('venue.description')]}
                            typingSpeed={75}
                            pauseDuration={1500}
                            showCursor={true}
                            cursorCharacter="|"
                        />
                    </div>
                </div>

            </section>
        </>
    )
}

export default Venue
