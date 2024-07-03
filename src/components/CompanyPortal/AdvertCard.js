"use client"
import React, {useState, useEffect} from 'react'
import Drawer from './Drawer'
import {storage} from "../../lib/firebase_config";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage"

export default function AdvertCard(props) {
  // const [img, setImage] = useState(null);
  // useEffect(() => {
  //   const getImage = async () => {
  //     try {
  //       // Create a reference to the image file
  //       listAll(ref(storage, props.data.StickerPath)).then((res) => {
  //         res.items.forEach((item) => {
  //           getDownloadURL(item).then((url) => {
  //             setImage(url); 
  //           })
  //         })
  //       })
  //     } catch (error) {
  //       // Handle errors, such as permission issues or file not found
  //       console.error('Error getting image from Firebase Storage:', error.message);
  //       return null;
  //     }
  //     console.log(props.data)
  //     setImage(props.data.StickerURL)

  //   }
  //   getImage()
  // }, [])
  // console.log("Props: ", props.data)
  return (
    <div className="card w-64 xl:w-60 bg-base-100 shadow-xl image-full">
        <figure><img src={props.data.StickerURL} alt="Image Not Available" /></figure>
        <div className="card-body">
        <h2 className="card-title">{props.data.Name}</h2>
        <p>{props.data.Tagline}</p>
        <div className="card-actions flex justify-end">
            <Drawer name={props.data.Name} id={props.data.AdvertDocID}/>
        </div>
        </div>
    </div>
  )
}
