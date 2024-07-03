"use client"
import React, {useState, useEffect} from 'react'
import {storage} from "../../lib/firebase_config";
import {db} from '../../lib/firebase_config'
// import {storage} from '../../../lib/firebase_config'
import { collection, addDoc, query, where, getDocs, doc, getDoc  } from "firebase/firestore";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage"
import Image from 'next/image'
import Logo from '../../../public/Logo.svg'

import Link from 'next/link';


export default function CampCard(props) {

  const [img, setImage] = useState(null);
  const [advdata, setAdvData] = useState();
  
  // const handleClick = () => {
  //   // Replace 'child-example-param' with the actual dynamic parameter
  //   redirectToDynamicRoute(props.data.id);
  // }

  useEffect(() => {
    const getAdvertisementDocument = async () => {
      try {
        // Reference to the specific advertisement document in the subcollection
        const advertDocRef = doc(db, `CompanyUsers/${props.data.CompanyID}/Advertisements/${props.data.AdvertID}`);
        
        // Fetch the document
        const advertDocSnap = await getDoc(advertDocRef);
    
        if (advertDocSnap.exists()) {
          console.log("Advertisement Document Data:", advertDocSnap.data());
          setAdvData(advertDocSnap.data());
          // return advertDocSnap.data(); // Returns the document data if found
        } else {
          console.log("No such advertisement document!");
          // return null; // Indicates no document was found
        }
      } catch (error) {
        console.error("Error fetching advertisement document:", error);
        return null; // Return null to indicate an error occurred during fetch
      }
    };
    // const fetchAdd = async () => {
    //   let uid = localStorage.getItem('cuid');;
    //   console.log("Debug")
    //   try {
    //     // Query to fetch user data from "CompanyUsers" collection
    //     const userQuery = query(collection(db, `CompanyUsers/${props.data.CompanyID}/Advertisement`), where("Name", "==", props.data.Name));
    //     const userQuerySnapshot = await getDocs(userQuery) ;
    
    //     if (userQuerySnapshot.empty) {
    //       console.log("No matching campaigns found for UID: ", props.data.id);
    //       return;
    //     }
    //     let AdvData;
    
    //     userQuerySnapshot.forEach((campDoc) => {
    //       // Extract user data
    //       AdvData = { ...campDoc.data(), id: campDoc.id };
    //       // campaignDataTotal.push(campaignData);

    //       console.log("Advert found with ID: ", AdvData);
    //     });

    //     setAdvData(AdvData);
 
    //     listAll(ref(storage, AdvData.StickerPath)).then((res) => {
    //       res.items.forEach((item) => {
    //         getDownloadURL(item).then((url) => {
    //           setImage(url); 
    //         })
    //       })
    //     })
  
     
    //     // You can return or further process userData and advertisements here
    
    //   } catch (error) {
    //     console.error("Error fetching documents: ", error);
    //   }
    // };
    // fetchAdd();
    getAdvertisementDocument();
    console.log( "Props Data: ", props.data)
  }, [])
  return (
        <div className="card w-80 h-80 bg-[#272727] shadow-xl">
            <figure><img src={advdata && advdata.StickerURL} alt="Image Not Available" className='w-full h-26' /></figure>
            <div className="card-body">
                <h2 className="card-title text-white">{advdata ? advdata.Name : "loading"}</h2>
                <p className='text-white'>{advdata ? advdata.Tagline : "loading"}</p>
                <div className="card-actions justify-end">
                    <Link href={`/CompanyPortal/Campaigns/${props.data.id}`}>
                      <button 
                        className="btn btn-primary border-none bg-[#5E1212] hover:bg-[#5e121271]"
                        // onClick={handleClick}
                      >
                        View Details ...
                      </button>
                    </Link>
                </div>
            </div>
        </div>
  )
}