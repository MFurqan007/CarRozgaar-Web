"use client"
import React, {useState} from 'react'
import Image from 'next/image'
import Logo from '../../../public/Logo.svg'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { SlCalender } from "react-icons/sl";

import {db} from '../../lib/firebase_config'
import { collection, addDoc, updateDoc , query, where, getDocs, doc  } from "firebase/firestore";

export default function Drawer(props) {
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

    const launchCampaign = async (e) => {
        e.preventDefault();
        let uid = localStorage.getItem('cuid');
        console.log("props: ", props)
        try {
        const docRef = await addDoc(collection(db, `Campaigns/`), {
            // Name: props.name || "Not Passed",
            AdvertID: props.id || "Not Passed",
            // CompanyDocID: props.userId,
            CompanyID: uid || "Not Passed",
            StartDate: startDate || "Not Passed",
            EndDate: endDate || "Not Passed", 
            // RegDrivers: []
        });
        // success("Advert Uploaded");
        console.log("Document written with ID: ", docRef.id);

        // const userQuery = query(collection(db, "CompanyUsers"), where("uid", "==", uid));
        // const userQuerySnapshot = await getDocs(userQuery);
    
        // if (userQuerySnapshot.empty) {
        //   console.log("No matching user documents found for UID: ", uid);
        //   return;
        // }
    
        // let userData = {};
    
        // userQuerySnapshot.forEach((userDoc) => {
        //   // Extract user data
        //   userData = { ...userDoc.data(), id: userDoc.id };
        //   console.log("User Document found with ID: ", userDoc.id, " => ", userDoc.data());
        // });

        const advertRef = doc(db, `CompanyUsers/${uid}/Advertisements/${props.id}`)
        await updateDoc(advertRef, {
            isActive: true
        })
        console.log('Document updated successfully');
        
        setStartDate(null);
        setEndDate(null);  

        } catch (e) {
        console.error("Error adding document: ", e);
        // error("Error: ", e);
        }
    };
  return (
    <div className="drawer drawer-end" style={{zIndex:10}}>
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
            {/* Page content here */}
            <label htmlFor="my-drawer-4" className="drawer-button btn btn-primary bg-[#5E1212] hover:bg-[#862e2e] border-none">Open</label>
        </div> 
        <div className="drawer-side ">
            <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
            <ul className="menu p-4 w-80 min-h-full bg-[#201f1f] pr-6 text-base-content">
            {/* Sidebar content here */}
                <li>
                    <div className='w-full h-auto flex justify-center items-center'>
                        <Image
                            src={Logo}
                            className='w-[150px] h-[150px]'
                        />
                    </div>
                </li>
                <li>
                    <div className='w-full h-auto flex flex-col'>
                        <p className='text-white text-[28px] font-[500]'>Launch</p>
                        <p className='text-white text-[28px] font-[500]'>Campaign !</p>
                    </div>
                </li>
                <li>
                    <div className='w-full h-auto flex flex-col items-start pt-4'>
                        <p className='text-white text-[16px] font-[200]'>Advert Name:</p>
                        <p className='text-white text-[20px] font-[400]'>{props.name}</p>
                    </div>
                </li>
                <li>
                    <div className='w-full h-auto flex flex-col items-start pt-6'>
                        <p className='text-white text-[18px] font-[400]'>Start Date:</p>
                        <div className='w-full flex'>
                            <DatePicker 
                                selected={startDate} 
                                onChange={(date) => setStartDate(date)} 
                                className="input input-ghost w-full max-w-xs text-white"
                                placeholderText='Pick Date'
                            />
                            <div className='p-2 bg-[#272727] flex justify-center items-center rounded-[5px]'>
                                <SlCalender className='text-[24px] text-[#ff5454]'/>
                            </div>
                        </div>
                    </div>
                </li>
                <li>
                    <div className='w-full h-auto flex flex-col items-start pt-3'>
                        <p className='text-white text-[18px] font-[400]'>End Date:</p>
                        <div className='w-full flex'>
                            <DatePicker 
                                selected={endDate} 
                                onChange={(date) => setEndDate(date)} 
                                className="input input-ghost w-full max-w-xs text-white"
                                placeholderText='Pick Date'
                            />
                            <div className='p-2 bg-[#272727] flex justify-center items-center rounded-[5px]'>
                                <SlCalender className='text-[24px] text-[#ff5454]'/>
                            </div>
                        </div>
                    </div>
                </li>
                <li>
                    <div className='w-full h-auto flex justify-evenly items-center'>
                        <button className="btn">Edit</button>
                        <button 
                            className="btn bg-[#5E1212] border-none text-white hover:bg-[#8f4949]"
                            onClick={launchCampaign}
                        >
                            Launch
                        </button>
                    </div>
                </li>
            </ul>
        </div>
    </div>
  )
}
