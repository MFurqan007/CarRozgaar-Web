"use client"
import Image from "next/image";
import TagLine from '../../../public/HeroSection.svg'
import TagImage from '../../../public/HeroSectionImg.svg'
import { IoPhonePortraitOutline } from "react-icons/io5";
import { BsShopWindow } from "react-icons/bs";
import { Tooltip} from 'antd';



export default function LandingPage() {
  return (
    <>
    <div className="w-full h-full p-8 flex justify-center items-center">
      <div className="w-[930px] xl:w-[1150px] h-auto">
        <div className="w-full flex justify-between">
          <Image
            src={TagLine}
          />
          <div className="w-3/4 xl:w-5/6 h-[320px] xl:h-[370px] mix-blend-lighten bg-[#272727]">
            <Image
              src={TagImage}
              className="w-full h-full"
            />
          </div>
        </div>
        <div className="w-auto h-auto flex justify-between items-center p-2 px-10 mt-2">
          <Tooltip placement="rightTop" title={"Download App"}>
            <div className=" w-[60px] h-[60px] hover:scale-125 hover:cursor-pointer rounded-full flex justify-center items-center border-2 border-[#F75757]">
              <IoPhonePortraitOutline
                className="text-[26px] text-[#F75757]"
              />
            </div>
          </Tooltip>
          <Tooltip placement="left" title={"Visit Marketplace"}>
            <div className=" w-[60px] h-[60px] hover:scale-125 hover:cursor-pointer rounded-full flex justify-center items-center border-2 border-[#F75757]">
              <BsShopWindow
                className="text-[26px] text-[#F75757]"
              />
            </div>
          </Tooltip>
        </div>
      </div>

    </div>
    </>
  )
}
