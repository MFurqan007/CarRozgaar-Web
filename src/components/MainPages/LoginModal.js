import React, {useState} from 'react'
import Image from "next/image";
import Logo from '../../../public/Logo.svg'

import { useRouter} from 'next/navigation';

import {auth} from '../../lib/firebase_config'
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function LoginModal() {
  const router = useRouter();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isClicked, setIsClicked] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const login = async () => {
    // const auth = getAuth()
    // setIsClicked(true);
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Sign in successful.
        console.log('Logged in:', userCredential.user);
        alert("User Logged In")
        const uid = userCredential.user.uid;
        console.log('Company UID:', uid);
        // setIsClicked(false);
        // dispatch(userChange(uid));
        localStorage.setItem('cuid', uid);
        router.push('/CompanyPortal/Dashboard'); // Redirect to a dashboard page or another page as needed
        setEmail('')
        setPassword('')
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // Handle errors here, such as displaying a notification to the user
        console.error('Login error', errorCode, errorMessage);
    });
  };

  const handleLogin = () => {
    console.log('Login')
  };

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  return (
    <>
    {/* Open the modal using document.getElementById('ID').showModal() method */}
    {/* <button className='w-[250px] h-[40px] flex justify-center items-center rounded-[5px] bg-[#d64141] text-white text-[16px]'>
        Login 
      </button> */}
    <button 
        className="btn w-[250px] h-[40px] bg-[#d64141] border-none text-white text-[16px] hover:bg-[#fc5d5d] hover:border-2 hover:border-[#d64141]" 
        onClick={()=>document.getElementById('my_modal_1').showModal()}
    >
        Login
    </button>
    <dialog id="my_modal_1" className="modal w-auto">
      <div className="modal-box bg-gradient-to-br from-[#bb3f3f] from-[50%] to-[#5E1212] to-[50%]">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost bg-[#1b1b1b] absolute right-2 top-2">
            <p className='text-[#d64141]'>✕</p>
          </button>
        </form>
        <div className='w-full h-auto flex flex-col justify-center items-center'>
            <div className='w-auto p-4 rounded-[10px] bg-[#1b1b1b] h-auto'>
              <Image
                src={Logo}
              />
            </div>
            <p className='text-white font-[700] text-[32px] mt-4'>Login</p>
            {/* <p className='text-white font-[700] text-[40px] mt-2'>Car Rozgaar</p> */}
        </div>
        <div className='w-full flex flex-col justify-center items-center'>

          <label className="w-5/6 input flex items-center gap-2 mt-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
            <input type="text" className="grow" placeholder="Email" value={email} onChange={handleChangeEmail} />
          </label>

          <label className="w-5/6 input flex items-center gap-2 mt-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
            <input type="password" className="grow" placeholder='Password' value={password} onChange={handleChangePassword} />
          </label>
        </div>
        <div className="modal-action flex justify-center">
          <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button 
                className="btn w-[250px] h-[40px] bg-[#1b1b1b] border-none text-white text-[16px] hover:bg-[#414040]"
                onClick={login}
              >
                Let's Go
              </button>
          </form>
        </div>
      </div>
    </dialog>
    </>
  )
}
