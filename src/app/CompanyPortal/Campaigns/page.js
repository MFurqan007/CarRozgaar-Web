"use client"
import React, {useState, useEffect} from 'react'
import CampCard from '../../../components/CompanyPortal/CampCard'

import {db} from '../../../lib/firebase_config'
// import {storage} from '../../../lib/firebase_config'
import { collection, addDoc, query, where, getDocs, doc, getDoc  } from "firebase/firestore";
// import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage"
// import { useRouter } from 'next/router';

export default function page() {
  // const router = useRouter();
  const [data, setData] = useState([]);

  // const redirectToDynamicRoute = (dynamicParam) => {
  //   // Replace 'your-dynamic-route' with the actual route pattern and dynamicParam with the dynamic value
  //   const dynamicRoute = `/CompanyPortal/Campaigns/${dynamicParam}`;
    
  //   // Push the dynamic route
  //   router.push(dynamicRoute);
  // };

  useEffect(() => {

    const fetchDataFromFirestore = async () => {
      let uid = localStorage.getItem('cuid');;
      
      try {
        // Query to fetch user data from "CompanyUsers" collection
        const userQuery = query(collection(db, "Campaigns/"), where("CompanyID", "==", uid));
        const userQuerySnapshot = await getDocs(userQuery);
    
        if (userQuerySnapshot.empty) {
          console.log("No matching campaigns found for UID: ", uid);
          return;
        }
    
        let campaignDataTotal = [];
    
        userQuerySnapshot.forEach((campDoc) => {
          // Extract user data
          const campaignData = { ...campDoc.data(), id: campDoc.id };
          campaignDataTotal.push(campaignData);

          console.log("Campaign Document found with ID: ", campDoc.id, " => ", campDoc.data());
        });
    
        // Query to fetch advertisements from the "advertisement" subcollection
        // const advertisementQuery = query(collection(getDocs(db, 'CompanyUsers', userData.id), 'Advertisement'));
        // const advertisementQuerySnapshot = await getDocs(collection(db, `CompanyUsers/${userData.id}/Advertisement/`));
    
        // if (advertisementQuerySnapshot.empty) {
        //   console.log("No matching advertisement documents found for UID: ", uid);
        //   return;
        // }
    
        // let advertisements = [];
    
        // advertisementQuerySnapshot.forEach((advertisementDoc) => {
        //   // Extract advertisement data
        //   const advertisementData = { ...advertisementDoc.data(), id: advertisementDoc.id };
        //   if (advertisementData.isActive === false){
        //     advertisements.push(advertisementData);
        //   }
        //   console.log("Advertisement Document found with ID: ", advertisementDoc.id, " => ", advertisementDoc.data());
        // });
    
        // // Do something with the user data and advertisements
        // console.log("User Data: ", userData);
        // console.log("Advertisements: ", advertisements);
        setData(campaignDataTotal);

        // const AdvQuery = query(collection(db, `CompanyUsers//Advertisement`));
        // const AdvSnapshot = await getDocs(AdvQuery) ;
        

        // let advDataTotal = [];
    
        // AdvSnapshot.forEach((advDoc) => {
        //   // Extract user data
        //   const advData = { ...advDoc.data(), id: advDoc.id };
          
        //   const containsAttributes = campaignDataTotal.every(attribute => 
        //     advData.hasOwnProperty(attribute.CompanyDocID) && advData.id === attribute.CompanyDocID
        //   );
          
        //   if (containsAttributes) {
        //     console.log("Advert found with required attributes: ", advData);
        //     // Add the data to the campaignDataTotal array if needed
        //     // campaignDataTotal.push(campaignData);
        //   }
          
        //   // campaignDataTotal.push(campaignData);

        //   console.log("Campaign Document found with ID: ", campDoc.id, " => ", campDoc.data());
        // });
  
    
        // You can return or further process userData and advertisements here
    
      } catch (error) {
        console.error("Error fetching documents: ", error);
      }
    };
    fetchDataFromFirestore();

  }, [])  

  return (
    <div className='w-[700px] xl:w-[850px] p-6 min-h-[450px] xl:min-h-[550px] max-h-auto flex bg-[#201f1f] rounded-[10px] overflow-auto '>
      <div className='w-full h-auto grid grid-cols-2 xl:grid-cols-auto gap-4'>
        {data.map((item) => (
          
          <CampCard 
            key={item.id} 
            data={item}
            // redirectToDynamicRoute={redirectToDynamicRoute}
          />
        ))}
        {/* </> */}
        {/* <CampCard/>
        <CampCard/>
        <CampCard/> */}

      
      </div>
  
    </div>
  )
}
