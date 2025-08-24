import Contact from '@/components/my/public/contact'
import { Communication } from '@/components/my/public/liens/Communication'
import { EmergencyContacts } from '@/components/my/public/liens/EmergencyContacts'
import { WeatherInfo } from '@/components/my/public/liens/WeatherInfo'
import NewFooter from '@/components/my/public/new-footer'
import NewHeader from '@/components/my/public/new-header'
import React from 'react'

const ContactPage = () => {
  return (
    <div>
      <NewHeader />
      <Contact />
      <EmergencyContacts />
      <Communication />
      <WeatherInfo />
      <NewFooter />
    </div>
  )
}

export default ContactPage
