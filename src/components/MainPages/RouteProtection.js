"use client"
import {auth} from "../../lib/firebase_config";
import { useRouter, usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { onAuthStateChanged } from 'firebase/auth'


const ProtectedRoute = ({ children }) => {
    const [loading, setLoading] = useState(true); 
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
            onAuthStateChanged(auth, (user)=>{
                console.log("User Status Changed:", user);
                if (user == null){
                    // dispatch(userChange(''));
                    router.push('/Company')
                    localStorage.setItem('cuid', 'null');
                    setTimeout(() => {setLoading(false)}, 3000)
                }
                else {
                    setLoading(false)
                }
            })
    }, []);

    return (
        <div className="w-full h-[100vh]">
            {
                loading ? (
                    <div className="w-full h-full flex justify-center items-center">
                        <span className="loading loading-dots loading-[40px] text-[#ff5454]"></span>
                    </div>
                ) : (
                    <>{children}</>
                )
            }
        </div>  
    );
};

export default ProtectedRoute;