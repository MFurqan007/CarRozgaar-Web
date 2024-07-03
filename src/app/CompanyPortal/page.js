"use client"
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation';

export default function page() {
  const router = useRouter();
  useEffect (() => {
    router.push('/CompanyPortal/Dashboard')
  }, [])
  return (
    <div>Company Dashboard Loading ...</div>
  )
}
