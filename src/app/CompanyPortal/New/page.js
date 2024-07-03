"use client"
import React, {useState} from 'react'
import {db} from '../../../lib/firebase_config'
import {storage} from '../../../lib/firebase_config'
import { collection, addDoc, query, where, getDocs  } from "firebase/firestore";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage"
import { v4 } from "uuid"

import { Image } from 'antd';

import { Button, message, Space } from 'antd';

const DisplayImage = ({link}) => (
  <Image
    width={200}
    height={200}
    src={link}
    fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4BnRU0NHR0UEFVdIlFRV7TzRksomPY8uykTk/zewQfKw/9znv4yvJynLv4uLiV2dBoDiBf4qP3/ARuCRABEFAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghgg0Aj8i0JO4OzsrPv69Wv+hi2qPHr0qNvf39+iI97soRIh4f3z58/u7du3SXX7Xt7Z2enevHmzfQe+oSN2apSAPj09TSrb+XKI/f379+08+A0cNRE2ANkupk+ACNPvkSPcAAEibACyXUyfABGm3yNHuAECRNgAZLuYPgEirKlHu7u7XdyytGwHAd8jjNyng4OD7vnz51dbPT8/7z58+NB9+/bt6jU/TI+AGWHEnrx48eJ/EsSmHzx40L18+fLyzxF3ZVMjEyDCiEDjMYZZS5wiPXnyZFbJaxMhQIQRGzHvWR7XCyOCXsOmiDAi1HmPMMQjDpbpEiDCiL358eNHurW/5SnWdIBbXiDCiA38/Pnzrce2YyZ4//59F3ePLNMl4PbpiL2J0L979+7yDtHDhw8vtzzvdGnEXdvUigSIsCLAWavHp/+qM0BcXMd/q25n1vF57TYBp0a3mUzilePj4+7k5KSLb6gt6ydAhPUzXnoPR0dHl79WGTNCfBnn1uvSCJdegQhLI1vvCk+fPu2ePXt2tZOYEV6/fn31dz+shwAR1sP1cqvLntbEN9MxA9xcYjsxS1jWR4AIa2Ibzx0tc44fYX/16lV6NDFLXH+YL32jwiACRBiEbf5KcXoTIsQSpzXx4N28Ja4BQoK7rgXiydbHjx/P25TaQAJEGAguWy0+2Q8PD6/Ki4R8EVl+bzBOnZY95fq9rj9zAkTI2SxdidBHqG9+skdw43borCXO/ZcJdraPWdv22uIEiLA4q7nvvCug8WTqzQveOH26fodo7g6uFe/a17W3+nFBAkRYENRdb1vkkz1CH9cPsVy/jrhr27PqMYvENYNlHAIesRiBYwRy0V+8iXP8+/fvX11Mr7L7ECueb/r48eMqm7FuI2BGWDEG8cm+7G3NEOfmdcTQw4h9/55lhm7DekRYKQPZF2ArbXTAyu4kDYB2YxUzwg0gi/41ztHnfQG26HbGel/crVrm7tNY+/1btkOEAZ2M05r4FB7r9GbAIdxaZYrHdOsgJ/wCEQY0J74TmOKnbxxT9n3FgGGWWsVdowHtjt9Nnvf7yQM2aZU/TIAIAxrw6dOnAWtZZcoEnBpNuTuObWMEiLAx1HY0ZQJEmHJ3HNvGCBBhY6jtaMoEiJB0Z29vL6ls58vxPcO8/zfrdo5qvKO+d3Fx8Wu8zf1dW4p/cPzLly/dtv9Ts/EbcvGAHhHyfBIhZ6NSiIBTo0LNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiEC/wGgKKC4YMA4TAAAAABJRU5ErkJggg=="
  />
);

export default function page() {
  const [advertName, setAdvertName] = useState('');
  const [drivers, setDrivers] = useState('');
  const [tagLine, setTagLine] = useState('');
  const [description, setDescription] = useState('');
  // const [budget, setBudget] = useState('');
  const [earningPerHour, setEarningPerHour] = useState('');
  const [sticker, setSticker] = useState(null);

  const [messageApi, contextHolder] = message.useMessage();
  const success = (msg) => {
    messageApi.open({
      type: 'success',
      content: `${msg}`,
    });
  };
  const error = (msg) => {
    messageApi.open({
      type: 'error',
      content: `${msg}`,
    });
  };
  const warning = () => {
    messageApi.open({
      type: 'warning',
      content: 'This is a warning message',
    });
  };

  const handleAdvertNameChange = (e) => setAdvertName(e.target.value);
  const handleDriversChange = (e) => setDrivers(e.target.value);
  const handleTagLineChange = (e) => setTagLine(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  // const handleBudgetChange = (e) => setBudget(e.target.value);
  const handleEarningPerHourChange = (e) => setEarningPerHour(e.target.value);
  const handleStickerChange = (e) => setSticker(e.target.files[0]);

  // async function fetchDocumentIdByUid(uid) {

  //   const q = query(collection(db, "CompanyUsers"), where("uid", "==", uid));
  //   try {
  //     const querySnapshot = await getDocs(q);
  //     if (querySnapshot.empty) {
  //       console.log("No matching documents found.");
  //       return;
  //     }
  //     querySnapshot.forEach((doc) => {
  //       // Note: Use doc.id to get the document ID
  //       console.log("Document found with ID: ", doc.id, " => ", doc.data());
  //       // If you want to return or work with the document data and ID
  //       // consider storing them in an array or handling them as needed here
  //     });
  //   } catch (error) {
  //     console.error("Error fetching document: ", error);
  //   }
  // }

  // const addAdvertisement = async (e) => {
  //   e.preventDefault();
  //   let docs;
  //   let uid = "authentication";

  //   // fetch Relevant Document by uuid
  //   const q = query(collection(db, "CompanyUsers"), where("uid", "==", uid));
  //   try {
  //     const querySnapshot = await getDocs(q);
  //     if (querySnapshot.empty) {
  //       console.log("No matching documents found.");
  //       return;
  //     }
  //     querySnapshot.forEach((doc) => {
  //       // Note: Use doc.id to get the document ID
  //       console.log("Document found with ID: ", doc.id, " => ", doc.data());
  //       // If you want to return or work with the document data and ID
  //       // consider storing them in an array or handling them as needed here
  //       docs={...doc.data(), id: doc.id};
  //       success("Document Found")
  //     });
  //   } catch (error) {
  //     console.error("Error fetching document: ", error);
  //     error("Error: ", error);
  //   }

  //   console.log("Output docs: ", docs);

  //   // Upload Sticker to Firebase Storage
  //   try{
  //     if(sticker == null) return;
  //     const imageRef = ref(storage, `Company/${docs.name}/${advertName}/${sticker.name +v4()}`);
  //     uploadBytes(imageRef, sticker).then(() => {
  //       success("Sticker Uploaded")
  //       // alert("Image Uploaded");
  //       // setLink(`Company/${initState.name}/`);
  //     })

  //   }catch (e) {
  //     console.log("Error Upload Img: ", e);
  //     error("Error: ", e);
  //   }

  //   try {
  //     const docRef = await addDoc(collection(db, `CompanyUsers/${docs.id}/Advertisement/`), {
  //       Name: advertName,
  //       Tagline: tagLine,
  //       Description: description,
  //       MaxDriver: drivers,
  //       // Budget: budget,
  //       PerHour: earningPerHour,
  //       StickerPath: `Company/${docs.name}/${advertName}/`,
  //       isActive: false
  //     });
  //     success("Advert Uploaded");
  //     console.log("Document written with ID: ", docRef);

  //     setAdvertName('');
  //     setDrivers('');
  //     setTagLine('');
  //     setDescription('');
  //     // setBudget('');
  //     setEarningPerHour('');
  //     setSticker(null);      
  //   } catch (e) {
  //     console.error("Error adding document: ", e);
  //     error("Error: ", e);
  //   }
  // };

  const addAdvertisement = async (e) => {
    e.preventDefault();
    let uid = localStorage.getItem('cuid'); // This should be dynamically set to the current user's uid
  
    // Directly reference the user's document using uid
    // const userDocRef = doc(db, "CompanyUsers", uid);
    try {
      // const userDocSnap = await getDoc(userDocRef);
      // if (!userDocSnap.exists()) {
      //   console.log("Document does not exist.");
      //   return;
      // }
      // const userData = userDocSnap.data();
      // console.log("Document data:", userData);
  
      if (sticker == null) {
        console.log("No sticker to upload.");
        return;
      }
  
      // Upload the sticker and get the download URL
      const stickerRef = ref(storage, `companyPictures/${uid}/${advertName}/${sticker.name + v4()}`);
      const uploadResult = await uploadBytes(stickerRef, sticker);
      const stickerURL = await getDownloadURL(uploadResult.ref);
      console.log("Sticker uploaded and URL obtained:", stickerURL);
      success('Sticker uploaded Successfully')
  
      // Add the advertisement data to Firestore, including the sticker URL
      const advertData = {
        Name: advertName,
        Tagline: tagLine,
        Description: description,
        MaxDriver: drivers,
        PerHour: earningPerHour,
        // StickerPath: stickerRef.fullPath,
        StickerURL: stickerURL, // Include the sticker download URL
        isActive: false,
      };
      const advertRef = await addDoc(collection(db, `CompanyUsers/${uid}/Advertisements`), advertData);
      console.log("Advertisement added with ID:", advertRef.id);
      success("Advertisement Uploaded");
  
      // Reset form fields here
    } catch (error) {
      console.error("Error:", error);
      error("Error: ", error);
    }
  };
  

  return (
    <div className='w-[700px] xl:w-[850px] p-6 min-h-[450px] xl:min-h-[550px] max-h-auto flex bg-[#201f1f] rounded-[10px] overflow-auto '>
      {contextHolder}
      <div className='w-1/2 h-auto flex flex-col gap-4'>
        
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text text-[18px] font-[400] text-[#F75757]">Advert Name</span>
          </div>
          <input 
            type="text" 
            placeholder="Type here" 
            className="input input-bordered w-full max-w-xs bg-[#2B2E36] border-none text-[white]" 
            value={advertName}
            onChange={handleAdvertNameChange}
          />
        </label>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text text-[18px] font-[400] text-[#F75757]">Drivers</span>
          </div>
          <input 
            type="number" 
            placeholder="10, 100 etc" 
            className="input input-bordered w-full max-w-xs bg-[#2B2E36] border-none text-[white]" 
            value={drivers}
            onChange={handleDriversChange}
          />
        </label>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text text-[18px] font-[400] text-[#F75757]">Tag Line</span>
          </div>
          <textarea 
            className="textarea textarea-bordered bg-[#2B2E36] border-none text-[white]" 
            placeholder="Tag Line"
            value={tagLine}
            onChange={handleTagLineChange}
          />
        </label>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text text-[18px] font-[400] text-[#F75757]">Add Description</span>
          </div>
          <textarea 
            className="textarea textarea-bordered bg-[#2B2E36] border-none text-[white]" 
            placeholder="Type here ..."
            value={description}
            onChange={handleDescriptionChange}
          />
        </label>

      </div>

      <div className='w-1/2 h-auto flex flex-col gap-4'>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text text-[18px] font-[400] text-[#F75757]">Earning / hour</span>
          </div>
          <input 
            type="number" 
            placeholder="Driver Earning ..." 
            className="input input-bordered w-full max-w-xs bg-[#2B2E36] border-none text-[white]" 
            value={earningPerHour}
            onChange={handleEarningPerHourChange}
          />
        </label>

        <label className="form-control w-full max-w-xs ">
          {/* <DisplayImage link={sticker}/> */}
          <div className="label">
            <span className="label-text text-[18px] font-[400] text-[#F75757]">Upload Sticker</span>
          </div>
          <input 
            type="file" 
            className="file-input file-input-bordered border-none w-full max-w-xs" 
            onChange={handleStickerChange}
          />
        </label>

        <div className='w-full h-auto py-4 flex justify-center items-center'>
          <button 
            className="btn btn-lg bg-[#5E1212] border-none text-white hover:bg-[#8f4949]"
            onClick={addAdvertisement}
          >Add Advert</button>
        </div>
      </div>
    </div>
  )
}


