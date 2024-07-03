"use client"
import { RxHamburgerMenu } from "react-icons/rx";

import React, { useState } from 'react';
import { Button, Modal } from 'antd';

const App = ({active, setActive}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const styleTab = {
    active: "mt-8 w-full h-[50px] flex justify-center items-center bg-[#F75757]",
    inactive: "mt-8 w-full h-[50px] flex justify-center items-center hover:bg-[#7e8491] hover:cursor-pointer"
  }
  const styleTab2 = {
    active: "mt-2 w-full h-[50px] flex justify-center items-center bg-[#F75757]",
    inactive: "mt-2 w-full h-[50px] flex justify-center items-center hover:bg-[#7e8491] hover:cursor-pointer"
  }
  
  const handleClick = (msg) => {
    setActive(msg);
    handleCancel();
  };
  return (
    <>
        <div 
            className='p-3 bg-[#32363F] rounded-full group hover:cursor-pointer'
            onClick={showModal}
        >
            <RxHamburgerMenu className='text-[#ff4e4e] group-hover:text-[18px]'/>
        </div>
            
        <Modal 
            open={isModalOpen} footer={null} onCancel={handleCancel}
            width={'300px'} 
            
        >
        
            <div 
                className={active == 'Overview'? styleTab.active: styleTab.inactive}
                onClick={() => handleClick('Overview')}
            >
                <p className="text-[22px] font-[400]">Overview</p>
            </div>
            <div 
                className={active == 'Drivers'? styleTab2.active: styleTab2.inactive}
                onClick={() => handleClick('Drivers')}
            >
                <p className="text-[22px] font-[400]">Drivers</p>
            </div>
            <div 
                className={active == 'Budget'? styleTab2.active: styleTab2.inactive}
                onClick={() => handleClick('Budget')}
            >
                <p className="text-[22px] font-[400]">Budget</p>
            </div>

        </Modal>
    </>
  );
};
export default App;