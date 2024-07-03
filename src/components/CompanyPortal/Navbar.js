"use client"
import React from 'react'
import Image from 'next/image'
import Logo from '../../../public/Logo.svg'

import Link from 'next/link';

import { useEffect}  from 'react'
import { usePathname, useRouter } from 'next/navigation'

import { IoPowerSharp } from "react-icons/io5";


import { Tooltip} from 'antd';

import {auth} from "../../lib/firebase_config";
import {signOut } from 'firebase/auth';

export default function Navbar() {
    const pathname = usePathname()
    const router = useRouter();

    const logout = async () => {
        // const auth = getAuth();
    
        signOut(auth).then(() => {
            // Sign-out successful.
            // dispatch(userChange(''));
    
            localStorage.setItem('cuid', 'null');
            alert('User signed out.')
    
            router.push('/Company'); // Redirect to login page or home page as needed
        }).catch((error) => {
            // An error happened.
            console.error('Sign out error', error);
        });
    };


    const TextStyles = {
        active: 'text-sans text-[#F75757] text-[20px] font-[400]',
        inactive: 'text-sans text-white text-[20px] font-[400] hover:text-[#753232]',
    };

    useEffect(() => {

        console.log(pathname);
        console.log('Company Navbar Rendered');
    },[pathname]);

  return (
    <div className="w-full h-[70px] pl-4 pr-20 py-4 flex justify-between items-center shadow-[0px_5px_20px_5px_#1b1b1b]">
        <Image
            src={Logo}
            className='w-[100px] h-[50px]'
        />
        <div className='w-auto h-full flex justify-between items-center'>
            <Tooltip placement="rightTop" title={"Logout"}>
                <div 
                    className='group hover:cursor-pointer w-[60px] h-[60px] flex justify-center items-center rounded-full bg-[#201f1f]'
                    onClick={logout}
                >
                    <IoPowerSharp className='text-[26px] text-[#F75757] group-hover:text-[30px]'/>
                </div>
            </Tooltip>
        </div>
    </div>
  )
}