"use client"
import React from 'react'
import Image from "next/image";
import HSecion from '../../../../public/HSECT.svg'
import LoginModal from '../../../components/MainPages/LoginModal'
import SignUpModal from '../../../components/MainPages/SignUpModal';

export default function page() {
  return (

    <div className='w-full min-h-[90vh] h-auto'>
      <div className='w-full h-auto p-10 flex justify-between items-center'>
        <div className='w-full h-[250px]'>
          <Image
              src={HSecion}
              className='h-[300px]'
            />
      
        </div>
        
      </div>
      <div className='w-full h-auto mt-10 py-4 flex justify-center items-center'>
        {/* <button className='w-[250px] h-[40px] flex justify-center items-center rounded-[5px] bg-[#d64141] text-white text-[16px]'>
          Login 
        </button>       */}
        <LoginModal/>
        <SignUpModal/>
        {/* <button className='w-[250px] h-[40px] flex justify-center items-center ml-5 rounded-[5px] border-2 border-[#d64141] text-white text-[16px]'>
          Signup 
        </button>       */}
      </div>    
    </div>
  )
}
