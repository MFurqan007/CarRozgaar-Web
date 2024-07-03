"use client"
import React, {useEffect} from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link';
import Image from 'next/image'

import New from '../../../public/Sidebar/New.png';
import { RxDashboard } from "react-icons/rx";  
import { VscLayersActive } from "react-icons/vsc";
import { RiAdvertisementLine } from "react-icons/ri";

export default function Sidebar() {
  const pathname = usePathname();

  const SidebarTabStyle = {
    card: {
      active: 'w-full h-[60px] gap-3 bg-[#292424] flex justify-start items-center',
      inactive: 'w-full h-[60px] gap-3 group hover:bg-[#292424] hover:cursor-pointer bg-inherit flex justify-start items-center',
    },
    img: {
      active: 'w-full h-[60px] gap-3 bg-[#292424] flex justify-start items-center',
      inactive: 'w-full h-[60px] gap-3 hover:bg-[#292424] hover:cursor-pointer bg-inherit flex justify-start items-center',
    },
    sidetab: {
      active: 'w-[7px] h-full bg-[#bd3434]',
      inactive: 'w-[7px] h-full bg-inherit',
    },
    icon: {
      active: 'text-[30px] text-[#ff3d3d]',
      inactive: 'text-[30px] text-[white] group-hover:text-[#F75757]',
    },
    text: {
      active: 'text-[18px] text-[#ff3d3d]',
      inactive: 'text-[18px] text-[white] group-hover:text-[#F75757]',
    }
  }

  useEffect(() => {

      console.log(pathname);
      console.log('Company Portal Sidebar rendered');
  },[pathname]);

  return (
    <div className='w-[230px] xl:w-[300px] h-[450px] py-4 px-3 gap-3 flex flex-col rounded-tr-[10px] rounded-br-[10px] bg-[#201f1f] '>

      <Link href={"/CompanyPortal/Dashboard"}>
        <div className={pathname.startsWith("/CompanyPortal/Dashboard")? SidebarTabStyle.card.active: SidebarTabStyle.card.inactive}>
          <div className={pathname.startsWith("/CompanyPortal/Dashboard")? SidebarTabStyle.sidetab.active: SidebarTabStyle.sidetab.inactive}/>
          <RxDashboard className={pathname.startsWith("/CompanyPortal/Dashboard")? SidebarTabStyle.icon.active: SidebarTabStyle.icon.inactive}/>
          <p className={pathname.startsWith("/CompanyPortal/Dashboard")? SidebarTabStyle.text.active: SidebarTabStyle.text.inactive}>Dashboard</p>
        </div>
      </Link>

      <Link href={"/CompanyPortal/Campaigns"}>
        <div className={pathname.startsWith("/CompanyPortal/Campaigns")? SidebarTabStyle.card.active: SidebarTabStyle.card.inactive}>
          <div className={pathname.startsWith("/CompanyPortal/Campaigns")? SidebarTabStyle.sidetab.active: SidebarTabStyle.sidetab.inactive}/>
          <VscLayersActive className={pathname.startsWith("/CompanyPortal/Campaigns")? SidebarTabStyle.icon.active: SidebarTabStyle.icon.inactive}/>
          <p className={pathname.startsWith("/CompanyPortal/Campaigns")? SidebarTabStyle.text.active: SidebarTabStyle.text.inactive}>Campaigns</p>
        </div>
      </Link>

      <Link href={"/CompanyPortal/Adverts"}>
        <div className={pathname.startsWith("/CompanyPortal/Adverts")? SidebarTabStyle.card.active: SidebarTabStyle.card.inactive}>
          <div className={pathname.startsWith("/CompanyPortal/Adverts")? SidebarTabStyle.sidetab.active: SidebarTabStyle.sidetab.inactive}/>
          <RiAdvertisementLine className={pathname.startsWith("/CompanyPortal/Adverts")? SidebarTabStyle.icon.active: SidebarTabStyle.icon.inactive}/>
          <p className={pathname.startsWith("/CompanyPortal/Adverts")? SidebarTabStyle.text.active: SidebarTabStyle.text.inactive}>Adverts</p>
        </div>
      </Link>

      <Link href={"/CompanyPortal/New"}>
        <div className={pathname.startsWith("/CompanyPortal/New")? SidebarTabStyle.img.active: SidebarTabStyle.img.inactive}>
          <div className={pathname.startsWith("/CompanyPortal/New")? SidebarTabStyle.sidetab.active: SidebarTabStyle.sidetab.inactive}/>
          <Image src={New} className='w-2/4 h-5/6'/>
        </div>
      </Link>
    </div>
  )
}
