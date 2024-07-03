"use client"
import React, {useState} from 'react'
import Menu from '../../components/SuperAdmin/Menu'
import Overview from '@/components/SuperAdmin/Overview';
import VideoAlert from '@/components/SuperAdmin/VideoAlert';
import VideoCheck from '@/components/SuperAdmin/VideoCheck';
import UploadVid from '@/components/SuperAdmin/UploadVid';
import CampaignExpired from '@/components/SuperAdmin/CampaignExpired';
export default function page() {
    const [CampMenu, setCampMenu] = useState('Overview');
  return (
    <div className='w-full h-[95vh] flex flex-col gap-8 text-[white]'>
        <div className='w-full h-[10%] px-4 flex justify-between items-center shadow-[0px_5px_20px_5px_#1b1b1b]'>
            <p className='text-sans text-white text-[20px] font-[600] '>Super Admin</p>
            <Menu active={CampMenu} setActive={setCampMenu}/>
        </div>
        <div className='w-full h-[85%] border-2 border-white'>
            {
                CampMenu === 'Overview'? 
                    <Overview/>
                : CampMenu === 'updVid'?
                    <UploadVid/>
                : CampMenu === 'vidCh'?
                    <VideoCheck/>
                :
                CampMenu === 'vidAl'?
                    <VideoAlert/>
                :
                CampMenu === 'campExp'?
                    <CampaignExpired/>
                :
                <></>
          }
        </div>

    </div>
  )
}
