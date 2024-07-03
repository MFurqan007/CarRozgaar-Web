"use client"
import React, { useState, useEffect } from 'react'
import AdvertCard from '../../../components/CompanyPortal/AdvertCard'

import {db} from '../../../lib/firebase_config'
import {storage} from '../../../lib/firebase_config'
import { collection, addDoc, query, where, getDocs  } from "firebase/firestore";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage"

export default function page() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // const fetchDataFromFirestore = async () => {
    //   let uid = "authentication";
      
    //   try {
    //     // Query to fetch user data from "CompanyUsers" collection
    //     const userQuery = query(collection(db, "CompanyUsers"), where("uid", "==", uid));
    //     const userQuerySnapshot = await getDocs(userQuery);
    
    //     if (userQuerySnapshot.empty) {
    //       console.log("No matching user documents found for UID: ", uid);
    //       return;
    //     }
    
    //     let userData = {};
    
    //     userQuerySnapshot.forEach((userDoc) => {
    //       // Extract user data
    //       userData = { ...userDoc.data(), id: userDoc.id };
    //       console.log("User Document found with ID: ", userDoc.id, " => ", userDoc.data());
    //     });
    
    //     // Query to fetch advertisements from the "advertisement" subcollection
    //     // const advertisementQuery = query(collection(getDocs(db, 'CompanyUsers', userData.id), 'Advertisement'));
    //     // console.log("HEE",userData.id);
    //     const advertisementQuerySnapshot = await getDocs(collection(db, `CompanyUsers/${userData.id}/Advertisement/`));
    
    //     if (advertisementQuerySnapshot.empty) {
    //       console.log("No matching advertisement documents found for UID: ", uid);
    //       return;
    //     }
    
    //     let advertisements = [];
    
    //     advertisementQuerySnapshot.forEach((advertisementDoc) => {
    //       // Extract advertisement data
    //       const advertisementData = { ...advertisementDoc.data(), id: advertisementDoc.id, userId: userData.id };
    //       if (advertisementData.isActive === false){
    //         advertisements.push(advertisementData);
    //       }
    //       console.log("Advertisement Document found with ID: ", advertisementDoc.id, " => ", advertisementDoc.data());
    //     });
    
    //     // Do something with the user data and advertisements
    //     console.log("User Data: ", userData);
    //     console.log("Advertisements: ", advertisements);
    //     setData(advertisements);
    
    //     // You can return or further process userData and advertisements here
    
    //   } catch (error) {
    //     console.error("Error fetching documents: ", error);
    //   }
    // };

    const fetchDataFromFirestore = async () => {
      // Retrieve uid from local storage
      const uid = localStorage.getItem('cuid'); // Adjust the key as per how you've stored it
      
      // if (!uid) {
      //   console.log("User UID not found in local storage.");
      //   return;
      // }
    
      try {
        console.log("Fetching Data Adverts Page ...")
        // Directly access the user's document using the uid
        // const userDocRef = doc(db, "CompanyUsers", uid);
        // const userDocSnap = await getDoc(userDocRef);
    
        // if (!userDocSnap.exists()) {
        //   console.log("No matching user document found for UID: ", uid);
        //   return;
        // }
    
        // const userData = { ...userDocSnap.data(), id: userDocSnap.id };
        // console.log("User Document found with ID: ", userDocSnap.id, " => ", userDocSnap.data());
    
        // Fetch advertisements from the "Advertisements" subcollection
        const advertisementQuerySnapshot = await getDocs(collection(db, `CompanyUsers/${uid}/Advertisements`));
    
        if (advertisementQuerySnapshot.empty) {
          console.log("No matching advertisement documents found for UID: ", uid);
          return;
        }
    
        let advertisements = [];
    
        advertisementQuerySnapshot.forEach((advertisementDoc) => {
          // Extract advertisement data
          const advertisementData = { ...advertisementDoc.data(), AdvertDocID: advertisementDoc.id};
          if (advertisementData.isActive === false) {
            advertisements.push(advertisementData);
          }
          console.log("Advertisement Document found with ID: ", advertisementDoc.id, " => ", advertisementDoc.data());
        });
    
        // Do something with the user data and advertisements
        // console.log("User Data: ", userData);
        console.log("Advertisements: ", advertisements);
        setData(advertisements);
    
      } catch (error) {
        console.error("Error fetching documents: ", error);
      }
    };
    
    fetchDataFromFirestore();

  }, [])  
  return (
    <div className='w-[700px] xl:w-[850px] p-6 min-h-[450px] xl:min-h-[550px] max-h-auto bg-[#201f1f] rounded-[10px]'>

      <div className='w-full h-auto grid grid-cols-2 xl:grid-cols-3 gap-4'>
        {data.map((item) => (
        
          <AdvertCard key={item.id} data={item}/>
          ))}
        {/* <AdvertCard/>
        <AdvertCard/> */}
        {/* <AdvertCard/>
        <AdvertCard/>
        <AdvertCard/>
        <AdvertCard/>
        <AdvertCard/>
        <AdvertCard/>
        <AdvertCard/>
        <AdvertCard/>
        <AdvertCard/> */}


      </div>
    </div>
  )
}
