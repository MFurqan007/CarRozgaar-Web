"use client"
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation';
import {db} from '../lib/firebase_config'
import { collection, getDocs } from "firebase/firestore";

export default function page() {
  // const colref = collection(db, 'adverts');
  // getDocs(colref)
  //   .then((snapshot)=>{
  //     let books = []
  //     snapshot.docs.forEach((doc)=>{
  //       books.push({ ...doc.data(), id: doc.id})
  //     });
  //     console.log(books)
  //   })
  //   .catch(err => {
  //     console.log(err)
  //   })
  const router = useRouter();
  useEffect (() => {
    router.push('/LandingPage')
  }, [])
  return (
    <div>Landing Page Loading ...</div>
  )
}
