import React, {useState} from 'react'
import Image from "next/image";
import { useRouter} from 'next/navigation';

import { MdOutlinePerson } from "react-icons/md";
import Logo from '../../../public/Logo.svg'

import {db} from '../../lib/firebase_config'
import {auth} from '../../lib/firebase_config'
import {storage} from '../../lib/firebase_config'

import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function SignUpModal() {
  const router = useRouter();

  const [selectedImage, setSelectedImage] = useState();
  const [selectedImageFile, setSelectedImageFile] = useState(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [logoPic, setLogoPic] = useState(null);

  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleFileChange = (e) => {
      const file = e.target.files[0];
      setSelectedImageFile(file);
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setLogoPic(reader.result);
        };
        reader.readAsDataURL(file);
      }
  };
  
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };


  async function handleSignup() {
    try {
      // Step 1: Register the user using Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      alert('CUser Created Successfully')
  
      // Step 2: Upload the profile picture to Firebase Storage
      const storageRef = ref(storage, `companyPictures/${user.uid}/Logo`);
      const uploadResult = await uploadBytes(storageRef, logoPic);
      const photoURL = await getDownloadURL(uploadResult.ref);
      alert('CProfile Pic Uploaded Successfully')
  
      // Step 3: Store additional information along with the profile picture URL in Firestore
      await setDoc(doc(db, "CompanyUsers", user.uid), {
        name: name,
        logoPictureUrl: photoURL,
      });
      alert('CUser Data Stored Successfully')
      
      // 4: Initialise Wallet
      // 5: Initialise Trips
      // 6: Tokens
      
      alert('CUser Logged in Successfully')


      // dispatch(userChange(user.uid));
      localStorage.setItem('cuid', user.uid);
      setName('')
      setEmail('')
      setPassword('')
      setLogoPic('')
      
      console.log("User registered, profile picture uploaded, and additional info stored successfully.");
      router.push('/CompanyPortal/Dashboard');
    } catch (error) {
      console.error("Error registering user, uploading profile picture, and storing info:", error);
    }
  };

  return (
    <>
    {/* Open the modal using document.getElementById('ID').showModal() method */}
    {/* <button className='w-[250px] h-[40px] flex justify-center items-center rounded-[5px] bg-[#d64141] text-white text-[16px]'>
        Login 
      </button> */}
    <button 
        className="btn w-[250px] h-[40px] ml-5 border-2 border-[#d64141] bg-inherit text-[white] text-[16px] hover:bg-[#fc5d5d] hover:border-2 hover:border-[#d64141]" 
        onClick={()=>document.getElementById('my_modal_2').showModal()}
    >
      Sign Up
    </button>
    <dialog id="my_modal_2" className="modal w-auto">
      <div className="modal-box w-9/12 max-w-3xl bg-gradient-to-br from-[#bb3f3f] from-[50%] to-[#5E1212] to-[50%]">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost bg-[#1b1b1b] absolute right-2 top-2">
            <p className='text-[#d64141]'>✕</p>
          </button>
        </form>

        <div className='w-full h-auto flex'>

          <div className=' h-auto flex flex-col justify-center items-center'>
              <div className='w-auto p-8 rounded-[10px] bg-[#1b1b1b] h-auto'>
                <Image
                  src={Logo}
                />
              </div>
              <p className='text-white font-[700] text-[32px] mt-4'>Sign Up</p>
              {/* <p className='text-white font-[700] text-[40px] mt-2'>Car Rozgaar</p> */}
          </div>
          <div className='w-[2px] h-9/12 bg-[#1b1b1b] rounded-full mx-5'/>
          <div className='h-auto'>
            
            <label className="w-[30vw] input flex items-center gap-2 mt-4">
              <MdOutlinePerson className="w-5 h-5 opacity-70"/>
              {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg> */}
              <input type="text" className="grow" placeholder="Name" value={name} onChange={handleChangeName}/>
            </label>

            <label className="w-[30vw] input flex items-center gap-2 mt-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
              <input type="email" className="grow" placeholder="Email" value={email} onChange={handleChangeEmail}/>
            </label>

            <label className="w-[30vw] input flex items-center gap-2 mt-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
              <input type="password" className="grow" placeholder='Password' value={password} onChange={handleChangePassword}/>
            </label>

            <div className='w-full h-auto my-4 flex flex-col justify-center items-center'>

              <div className="avatar">
                <div className="w-24 rounded-full">
                  <img src={logoPic} className='bg-[#292828] text-white text-center text-wrap w-inherit h-inherit' alt='Add Image' />
                </div>
              </div>
              <input 
                type="file" 
                className="file-input file-input-bordered w-full mt-4 max-w-xs" 
                onChange={handleFileChange}
              />
            </div>
            <div className="modal-action flex justify-center">
              <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button 
                    className="btn w-[250px] h-[40px] bg-[#1b1b1b] border-none text-white text-[16px] hover:bg-[#414040]"
                    onClick={handleSignup}
                  >
                    SignUp
                  </button>
              </form>
            </div>
          </div>

        </div>

      </div>
    </dialog>
    </>
  )
}