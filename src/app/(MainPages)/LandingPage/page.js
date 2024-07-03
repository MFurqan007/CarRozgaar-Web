"use client"

import React from 'react'

import LP from '../../../components/MainPages/LandingPage'

export default function page() {
  return (
    <>
        <main className="lg:hidden w-full h-full flex justify-center items-center bg-[red]">
        <p className="text-white">WebSite can be viewed only on Large screens</p>
        </main>
        <main className="hidden lg:block lg:w-full lg:h-max">
        <LP/>
        {/* <p>Mian Page</p> */}
        {/* <Dummy/> */}


        </main>


    </>
  )
}
