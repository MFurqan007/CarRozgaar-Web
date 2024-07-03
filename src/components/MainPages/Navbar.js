"use client"
import React from 'react'
import Image from 'next/image'
import Logo from '../../../public/Logo.svg'

import Link from 'next/link';
import { useEffect}  from 'react'
import { usePathname } from 'next/navigation'

export default function Navbar() {
    const pathname = usePathname()

    const TextStyles = {
        active: 'text-sans text-[#F75757] text-[20px] font-[400]',
        inactive: 'text-sans text-white text-[20px] font-[400] hover:text-[#753232]',
    };

    useEffect(() => {

        console.log(pathname);
        console.log('Main Navbar Rendered');
    },[pathname]);

  return (
    <div className="w-full h-[70px] pl-4 pr-32 py-4 flex justify-between items-center shadow-[0px_5px_20px_5px_#1b1b1b]">
        <Image
            src={Logo}
            className='w-[100px] h-[50px]'
        />
        <div className='w-auto h-full flex gap-10 justify-between items-center'>
            <Link href={"/LandingPage"}>
                <p
                    className={pathname === "/LandingPage"? TextStyles.active: TextStyles.inactive}
                >
                    Home
                </p>
            </Link>
            <Link href={"/Vendor"}>
                <p 
                    className={pathname === "/Vendor"? TextStyles.active: TextStyles.inactive}
                >
                    Vendor
                </p>
            </Link>
            <Link href={"/Company"}>
                <p 
                    className={pathname === "/Company"? TextStyles.active: TextStyles.inactive}
                >
                    Company
                </p>
            </Link>
        </div>
    </div>
  )
}
