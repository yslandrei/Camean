'use client'
import { useState } from "react";
import { HiHeart, HiOutlineHeart } from "react-icons/hi";


export default function Heart() {
  const [hearted, setHearted] = useState(false)

  return (
    <div className='flex space-x-1 cursor-pointer' onClick={() => setHearted(hearted => !hearted.valueOf())}>
      <p className='md:block hidden text-xl relative top-[3px] text-gray-700 select-none'>Salveaza</p>
      {hearted ? 
        <HiHeart className='text-red-500 w-[34px] h-[34px]'/>
        : 
        <HiOutlineHeart className='text-gray-700 w-[34px] h-[34px]'/> 
      }
    </div>
  )
}