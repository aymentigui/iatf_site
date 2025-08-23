import React from 'react'
import Hotels from './list-hotels'

export const dynamic = "force-dynamic"; // 🚀 force Next.js à ne rien mettre en cache
export const revalidate = 0;            // 🚀 pas de revalidation ISR


const Page = () => {
  return (
    <Hotels></Hotels>
  )
}

export default Page
