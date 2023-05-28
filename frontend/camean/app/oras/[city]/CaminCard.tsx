import Image from 'next/image'
import { AiFillStar } from "react-icons/ai"
import { FaParking, FaBath } from "react-icons/fa"
import { MdElevator } from "react-icons/md"
import { BiRestaurant } from "react-icons/bi"
import { MdGirl, MdBoy } from "react-icons/md"
import { HiWifi } from "react-icons/hi"
import { GiWashingMachine } from "react-icons/gi"
import { caminWithMedianReviewsType } from './page'
import Link from 'next/link'

export default function CaminCard(props: { camin: caminWithMedianReviewsType }) {
  return (
    <Link href={`oras/${props.camin.city}/camin/${props.camin.id}`}>
      <div className='flex my-4 mr-[2%] ml-[2%] space-x-4 hover:bg-gray-100 rounded-[15px] cursor-pointer'>
        <div className='relative md:w-[320px] md:h-[208px] w-[160px] h-[96px] flex-shrink-0'>
          <Image
            className='rounded-[15px]'
            src="/camin1.jpg"
            fill={true}
            style={{objectFit: 'cover'}}
            sizes='(max-width: 768px) [160px], [320px]'
            quality={100}
            alt=""
          />
        </div>
        <div className='flex flex-col w-full'>
          <div className='flex justify-between items-center'>
            <p className='md:text-2xl font-medium text-base text-gray-700'>{props.camin.name}</p>
            <div className='flex space-x-[2px] mr-[1%] mt-1 items-center'>
              <AiFillStar className='text-blue-3 md:w-[23px] md:h-[23px] w-[15px] h-[15px] relative top-[-1px]'/>
              <p className='md:text-lg text-xs text-gray-700'>{props.camin.stars.toFixed(1)}</p>
            </div>
          </div>
          <p className='md:text-lg text-xs text-gray-700'>{props.camin.owner}</p>
          <div className='flex space-x-1 flex-grow'>
            <p className='md:text-lg text-xs text-gray-700'>{props.camin.peoplePerRoom}</p>
            <p className='md:text-lg text-xs text-gray-700'>x</p>
            <MdBoy className='w-[24px] h-[24px] relative left-[-0.8%] top-[0.5%] mt-[1px] text-gray-600'/>
            <p className='md:text-lg text-xs text-gray-700 relative left-[-1.8%]'>/</p>
            <p className='md:text-lg text-xs text-gray-700 relative left-[-1.8%]'>camera</p>
          </div>
          <div className='flex justify-between items-center mb-1'>
            <div className='flex space-x-1 items-center'>
              {/* <HiWifi className='text-blue-3 md:w-[30px] md:h-[30px] w-[18px] h-[18px]'/> */}
              {props.camin.parking && <FaParking className='text-blue-3 md:w-[25px] md:h-[25px] w-[15px] h-[15px]'/>}
              {props.camin.elevator && <MdElevator className='text-blue-3 md:w-[29px] md:h-[29px] w-[18px] h-[18px]'/>}
              {props.camin.bath && <FaBath className='text-blue-3 md:w-[22px] md:h-[22px] w-[13px] h-[13px]'/>}
              {props.camin.kitchen && <BiRestaurant className='text-blue-3 md:w-[29px] md:h-[29px] w-[17px] h-[17px]'/>}
              {props.camin.sex == 'baieti'&& <MdBoy className='text-blue-3 md:w-[33px] md:h-[33px] w-[20px] h-[20px] relative left-[-6%]'/>}
              {props.camin.sex == 'fete' && <MdGirl className='text-pink-400 md:w-[33px] md:h-[33px] w-[20px] h-[20px] relative left-[-6%]'/>}
              {props.camin.sex == 'mixt' && 
                <div className='flex relative left-[-4%]'>
                  <MdBoy className='text-blue-3 md:w-[33px] md:h-[33px] w-[20px] h-[20px]'/>
                  <MdGirl className='text-pink-400 md:w-[33px] md:h-[33px] w-[20px] h-[20px] relative left-[-31%]'/>
                </div>
              }
            </div>
            <p className='md:text-lg text-xs text-gray-700 mr-[1%]'>{props.camin.pricePerMonth} / luna</p>
          </div>
        </div>
      </div>
    </Link>
  )
}