"use client"
import React, {useState, useEffect} from 'react'
import { Card} from 'antd';
import { IoMdAdd } from "react-icons/io";
import { Tooltip} from 'antd';
import Link from 'next/link';

import { TbLayersIntersect } from "react-icons/tb";
import { IoLayersOutline } from "react-icons/io5";
import { GiCartwheel } from "react-icons/gi";
import { CiBadgeDollar } from "react-icons/ci";
import { TiLocation } from "react-icons/ti";
import { MdCurrencyExchange } from "react-icons/md";
import { BsShopWindow } from "react-icons/bs";


import {db} from '../../../lib/firebase_config'
// import {storage} from '../../../lib/firebase_config'
import { collection, addDoc, query, where, getDocs, doc, getDoc  } from "firebase/firestore";

export default function page() {
  const [campaignsCount, setCampaignsCount] = useState(0);
  const [advertsCount, setAdvertsCount] = useState(0);
  const [companyName, setCompanyName] = useState(null);
  const [companyLogo, setCompanyLogo] = useState(null);

  useEffect(() => {
    async function countDocuments() {
      const uid = localStorage.getItem('cuid');

      let localCampaignsCount = 0;
      let localAdvertsCount = 0;
      let CompanyUser;

      // User Attributes
      const userDocRef = doc(db, `CompanyUsers/${uid}`);
      const userDocSnap = await getDoc(userDocRef);
      console.log("Company User Document Data:", userDocSnap.data());
      // Set the document's data to the component's state
      CompanyUser = userDocSnap.data();
      console.log(CompanyUser.logoPictureUrl)
      setCompanyName(CompanyUser.name)
      setCompanyLogo(CompanyUser.logoPictureUrl)

      // setCompanyUserData(userDocSnap.data());

       
      // Counting documents in the Campaigns collection
      const campaignsQuery = query(collection(db, 'Campaigns'));
      const campaignsSnapshot = await getDocs(campaignsQuery);
      localCampaignsCount = campaignsSnapshot.docs.length;

      // Counting documents in the Advertisements subcollection of each CompanyUser
      const advertsQuery = query(collection(db, `CompanyUsers/${uid}/Advertisements`));
      const advertsSnapshot = await getDocs(advertsQuery);
      localAdvertsCount = advertsSnapshot.docs.length; 

      // Update state with the final counts
      setCampaignsCount(localCampaignsCount);
      setAdvertsCount(localAdvertsCount);
    }

    // Execute the countDocuments function
    countDocuments().catch(console.error);
  }, []); // Empty array ensures this effect runs only once after mount



  return (
    <div className='w-[700px] xl:w-[850px] p-6 min-h-[450px] xl:min-h-[550px] max-h-auto bg-[#201f1f] rounded-[10px] overflow-auto '>
      
      <div className='w-auto h-auto flex justify-between items-center'>
        <div className='w-auto flex items-center gap-2'>
          <div className="avatar">
            <div className=" w-16 rounded-full">
              <img src={companyLogo && companyLogo} alt='...' />
            </div>
          </div>
          <p className='text-white text-[24px] font-[600]'>{companyName? companyName : "..." }</p>
        </div>
        <Link href={"/CompanyPortal/New"}>        
          <Tooltip placement="leftTop" title={"Create Add"}>
            <button className="btn btn-circle">
              <IoMdAdd className='text-[28px]'/>
            </button>
          </Tooltip>
        </Link>
      </div>

      <div className='w-full h-auto py-5 justify-center grid gap-3 grid-cols-3 '>

        <Card bordered={false} className='w-[220px] bg-[#272727]'>
          <div className='w-auto h-auto flex justify-evenly items-center'>
            <TbLayersIntersect className='text-[#ff5454] text-[36px]'/>
            <p className='text-[#F75757] text-[24px] font-[500]'>Adverts</p>
          </div>
          <p className='text-[#ff9a9a] text-center text-[36px] font-[500]'>{advertsCount}</p>
        </Card>

        <Card bordered={false} className='w-[220px] bg-[#272727]'>
          <div className='w-auto h-auto flex justify-evenly items-center'>
            <IoLayersOutline className='text-[#ff5454] text-[36px]'/>
            <p className='text-[#F75757] text-[24px] font-[500]'>Campaigns</p>
          </div>
          <p className='text-[#ff9a9a] text-center text-[36px] font-[500]'>{campaignsCount}</p>
        </Card>

        <Card bordered={false} className='w-[220px] bg-[#272727]'>
          <div className='w-auto h-auto flex justify-evenly items-center'>
            <GiCartwheel className='text-[#ff5454] text-[36px]'/>
            <p className='text-[#F75757] text-[24px] font-[500]'>Drivers</p>
          </div>
          <p className='text-[#ff9a9a] text-center text-[36px] font-[500]'>20+</p>
        </Card>

        {/* <Card bordered={false} className='w-[180px] bg-[#272727]'>
          <div className='w-auto h-auto flex justify-evenly items-center'>
            <CiBadgeDollar className='text-[#ff5454] text-[36px]'/>
            <p className='text-[#F75757] text-[24px] font-[500]'>Budget</p>
          </div>
          <p className='text-[#ff9a9a] text-center text-[36px] font-[500]'>20+</p>
        </Card> */}

        <Card bordered={false} className='w-[220px] bg-[#272727]'>
          <div className='w-auto h-auto flex justify-evenly items-center'>
            <TiLocation className='text-[#ff5454] text-[36px]'/>
            <p className='text-[#F75757] text-[24px] font-[500]'>Hotspots</p>
          </div>
          <p className='text-[#ff9a9a] text-center text-[36px] font-[500]'>10</p>
        </Card>

        {/* <Card bordered={false} className='w-[180px] bg-[#272727]'>
          <div className='w-auto h-auto flex justify-evenly items-center'>
            <MdCurrencyExchange className='text-[#ff5454] text-[36px]'/>
            <p className='text-[#F75757] text-[24px] font-[500]'>Daily</p>
          </div>
          <p className='text-[#ff9a9a] text-center text-[36px] font-[500]'>20+</p>
        </Card> */}
      </div>
      <div className='w-full h-auto flex justify-end items-center pr-7'>
        <button className="btn w-[200px] bg-[#5E1212] hover:bg-[#682e2e] text-white border-none btn-md shadow-[0px_0px_6px_1px_#ffffff]">
          <BsShopWindow className='text-[26px]'/>
          Marketplace
        </button>
      </div>
    </div>
  )
}
