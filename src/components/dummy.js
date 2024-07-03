"use client"
import React from 'react'
import { UseSelector, useSelector } from "react-redux";

export default function dummy() {
    const testState = useSelector((state) => state.sidebar)
  return (
    <div>
        <p>dummy</p>
        <p>{testState.value}</p>
    </div>
  )
}
