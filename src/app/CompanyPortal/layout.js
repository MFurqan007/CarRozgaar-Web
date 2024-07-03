import { Inter } from "next/font/google";
// import {Redux} from '../provider/redux';
// import "./globals.css";

import Navbar from "@/components/CompanyPortal/Navbar";
import Sidebar from "@/components/CompanyPortal/Sidebar"

import ProtectedRoute from "@/components/MainPages/RouteProtection";

export default function PortalLayout({ children }) {
  return (
    <ProtectedRoute>
      <div className="w-full h-auto">
        <Navbar/>
        <div className="w-full h-auto mt-[20px] gap-5 flex justify-start items-start">
          <Sidebar/>
          {children}

        </div>
      </div>
    </ProtectedRoute>
  );
}