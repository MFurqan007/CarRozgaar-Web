import { Inter } from "next/font/google";
import {Redux} from '../provider/redux';

import "./globals.css";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="w-full h-auto scrollbar pb-8 bg-[#272727]">
          <Redux>
            {children}
          </Redux>
        </main>
      </body>
    </html>
  );
}