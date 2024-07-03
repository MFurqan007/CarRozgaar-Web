"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';

import Menu from '../../../../components/CompanyPortal/CampMenu'
import CompOverview from '@/components/CompanyPortal/CompOverview';
import CompDrivers from '@/components/CompanyPortal/CompDrivers';
import CompBudget from '@/components/CompanyPortal/CompBudget';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../../lib/firebase_config';

import { useParams } from 'next/navigation'


// export async function getStaticProps({ params }) {
//   // params contains the post `slug`.
//   // If the route is like /posts/1, then params.slug is 1
//   // const res = await fetch(`https://your-api/posts/${params.slug}`);
//   // const post = await res.json();
//   let campaignData; 
//   let advData;
//   try {
//     // Reference to the campaign document
//     const campaignRef = doc(db, 'Campaigns', params.slug);
    
//     // Fetch the document
//     const campaignSnap = await getDoc(campaignRef);

//     if (campaignSnap.exists()) {
//       console.log("Campaign Document Data:", campaignSnap.data());
//       campaignData = campaignSnap.data() // Update state with fetched data
//     } else {
//       console.log("No such campaign!");
//       // setCampaignData(null); // Reset state if campaign doesn't exist
//     }

//     const advertDocRef = doc(db, `CompanyUsers/${campaignData.CompanyID}/Advertisements/${campaignData.AdvertID}`);
        
//     // Fetch the document
//     const advertDocSnap = await getDoc(advertDocRef);

//     if (advertDocSnap.exists()) {
//       console.log("Advertisement Document Data:", advertDocSnap.data());
//       advData = advertDocSnap.data();
//       // setAdvData();
//       // return advertDocSnap.data(); // Returns the document data if found
//     } else {
//       console.log("No such advertisement document!");
//       // return null; // Indicates no document was found
//     }

//   } catch (error) {
//     console.error("Error fetching campaign:", error);
//     // setCampaignData(null); // Reset state in case of an error
//   }
//   // Pass post data to the page via props
//   return { props: { campaignData, advData } };
// }
// {campaignData, advData}
export default function page() {
  const params = useParams()
  console.log("Params: ",params)
  const [CampMenu, setCampMenu] = useState('Overview');
  // Props that are passed to sub Components
  const [campaignData, setCampaignData] = useState('');
  const [advData, setAdvData] = useState('');

  useEffect(() => {
    const getData = async () => {
      let cData;
      let aData; 
      try {
        // Reference to the campaign document
        const campaignRef = doc(db, 'Campaigns', params.slug);
        
        // Fetch the document
        const campaignSnap = await getDoc(campaignRef);

        if (campaignSnap.exists()) {
          console.log("Campaign Document Data:", campaignSnap.data());
          cData = campaignSnap.data();
          setCampaignData(campaignSnap.data()) // Update state with fetched data
        } else {
          console.log("No such campaign!");
          // setCampaignData(null); // Reset state if campaign doesn't exist
        }

        const advertDocRef = doc(db, `CompanyUsers/${cData.CompanyID}/Advertisements/${cData.AdvertID}`);
            
        // Fetch the document
        const advertDocSnap = await getDoc(advertDocRef);

        if (advertDocSnap.exists()) {
          console.log("Advertisement Document Data:", advertDocSnap.data());
          aData = advertDocSnap.data();
          setAdvData(advertDocSnap.data());
        } else {
          console.log("No such advertisement document!");
          // return null; // Indicates no document was found
        }

      } catch (error) {
        console.error("Error fetching campaign:", error);
        // setCampaignData(null); // Reset state in case of an error
      }
    };
    getData();
    // console.log( "Props Data: ", props.data)
  }, [])


  return (
    <div className='w-[700px] xl:w-[850px] p-6 min-h-[450px] xl:min-h-[550px] max-h-auto flex flex-col bg-[#201f1f] rounded-[10px] overflow-auto '>
        <div className='w-full h-min border-2 border-white flex justify-between items-center'>
          <p className='text-white font-[500] text-[28px] '>{CampMenu}</p>
          <Menu active={CampMenu} setActive={setCampMenu}/>
        </div>
        <div className='w-full h-auto'>
          {
            CampMenu === 'Overview'? 
            <CompOverview campaign={campaignData} advert={advData}/>
            : CampMenu === 'Drivers'?
            <CompDrivers campaign={campaignData}/>
            : CampMenu === 'Budget'?
            <CompBudget campaign={campaignData}/>
            :
            <></>
          }
        </div>
    </div>
  )
}
