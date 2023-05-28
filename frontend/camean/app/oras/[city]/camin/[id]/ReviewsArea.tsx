'use client'
import { useState } from "react";
import ReviewCard from "./ReviewCard";
import { reviewType, facilityType } from "./page";
import { IoMdClose } from "react-icons/io"
import { HiUserCircle } from "react-icons/hi";
import { AiFillStar, AiOutlineClose } from "react-icons/ai";
import { FaBath, FaParking } from "react-icons/fa";
import { MdBoy, MdElevator, MdGirl } from "react-icons/md";
import { BiRestaurant } from "react-icons/bi";

const reviewsPerPage: number = 4

export default function ReviewsArea(props: { reviews: reviewType[] }) {

  const [detailedReview, setDetailedReview] = useState<reviewType>()
  const [page, setPage] = useState<number>(1)
  const pages: number = Math.ceil(props.reviews.length / reviewsPerPage)

  function handleReadMore(review: reviewType) {
    setDetailedReview(review)
  }

  return (
    <div>
      {/* Reviews */}
      <div className='flex flex-wrap w-full'>
        {props.reviews.slice((page - 1) * reviewsPerPage, page * reviewsPerPage).map((review, index) => (
          <div onClick={() => handleReadMore(review)} className='w-1/2 mt-10 h-[140px] cursor-pointer'>
            <ReviewCard key={index} review={review}/>
          </div>
        ))}
      </div>

      {/* Pages */}
      {pages > 1 &&
        <div className='flex w-full justify-center h-[50px] relative' style={{top: page == pages && props.reviews.length % reviewsPerPage <= 2 ? '220px' : '40px'}}>
          <div className='rounded-[10px] bg-gray-300 space-x-2 p-[6px] flex'>
            {pages <= 9 && Array.from({ length: pages }, (_, index) => index + 1).map((pageNumber) => (
              pageNumber == page ? 
                <button key={pageNumber} className='rounded-[10px] bg-blue-3 h-[38px] w-[38px] flex justify-center items-center'>
                  <p className='text-white-snow text-lg font-medium'>{pageNumber}</p>
                </button>
                :
                <button key={pageNumber} onClick={() => setPage(pageNumber)} className='rounded-[10px] bg-white-snow h-[38px] w-[38px] flex justify-center items-center'>
                  <p className='text-blue-3 text-lg font-medium'>{pageNumber}</p>
                </button>
            ))}

            {pages > 9 && page >= 6 && page < pages - 4 && Array.from({ length: 9 }, (_, index) => index + page - 4).map((pageNumber) => (
              pageNumber == page ? 
                <button key={pageNumber} className='rounded-[10px] bg-blue-3 h-[38px] w-[38px] flex justify-center items-center'>
                  <p className='text-white-snow text-lg font-medium'>{pageNumber}</p>
                </button>
                :
                <button key={pageNumber} onClick={() => setPage(pageNumber)} className='rounded-[10px] bg-white-snow h-[38px] w-[38px] flex justify-center items-center'>
                  <p className='text-blue-3 text-lg font-medium'>{pageNumber}</p>
                </button>
            ))}

            {pages > 9 && page < 6 && page < pages - 4  && Array.from({ length: 9 }, (_, index) => index + 1).map((pageNumber) => (
              pageNumber == page ? 
                <button key={pageNumber} className='rounded-[10px] bg-blue-3 h-[38px] w-[38px] flex justify-center items-center'>
                  <p className='text-white-snow text-lg font-medium'>{pageNumber}</p>
                </button>
                :
                <button key={pageNumber} onClick={() => setPage(pageNumber)} className='rounded-[10px] bg-white-snow h-[38px] w-[38px] flex justify-center items-center'>
                  <p className='text-blue-3 text-lg font-medium'>{pageNumber}</p>
                </button>
            ))}
            
            {pages > 9 && page >= pages - 4  && 
            Array.from({ length: 9 }, (_, index) => index + pages - 8).map((pageNumber) => (
              pageNumber == page ? 
                <button key={pageNumber} className='rounded-[10px] bg-blue-3 h-[38px] w-[38px] flex justify-center items-center'>
                  <p className='text-white-snow text-lg font-medium'>{pageNumber}</p>
                </button>
                :
                <button key={pageNumber} onClick={() => setPage(pageNumber)} className='rounded-[10px] bg-white-snow h-[38px] w-[38px] flex justify-center items-center'>
                  <p className='text-blue-3 text-lg font-medium'>{pageNumber}</p>
                </button>
            ))}
          </div>
        </div>
      }
      
      {/* Detailed Review Modal */}
      {detailedReview && 
        <>
          {/* Dimmer */}
          <div className='bg-gray-700 fixed w-full h-full left-0 top-0 opacity-40'/>
          
          {/* Modal */}
          <div className='fixed w-full h-full top-0 left-0 flex justify-center items-center'>
            <div className='bg-white-snow rounded-[15px] w-[45%]'>
              {/* Close Button */}
              <div className='w-full flex justify-end items-center mt-2'>
                <IoMdClose className='w-[25px] h-[25px] text-gray-700 cursor-pointer mr-3 mt-2' onClick={() => setDetailedReview(undefined)}/>
              </div>

              {/* Detailed Review */}
              <div className='px-10 flex h-[50vh] mb-12 flex-col'>
                <div className='flex justify-between items-center'>
                  {/* Photo + Name + Date + Stars */}
                  <div className='flex relative left-[-4px]'>
                    <HiUserCircle className='text-gray-300 w-[52px] h-[52px] mr-1'/>
                    <div>
                      <p className='text-xl font-medium text-gray-700'>{detailedReview.author}</p>
                      <div className='flex space-x-1'>
                        <p className='text-base text-gray-500'>{detailedReview.date}</p>
                        <p className='text-base text-gray-500'>|</p>
                        {Array.from({ length: detailedReview.stars }, (_, index) => index + 1).map((star) => (
                          <AiFillStar className='text-blue-3 w-[20px] h-[20px] relative top-[1px]'/>
                        ))}
                      </div>
                    </div>
                  </div>
                
                  {/* Facilities */}
                  <div className='flex flex-col items-end mr-1'>
                    <div className='flex space-x-[2px] flex-grow relative top-[6px]'>
                      <p className='text-lg text-gray-700'>{detailedReview.facilities.peoplePerRoom}</p>
                      <p className='text-lg text-gray-700 relative left-[1.8%]'>x</p>
                      <MdBoy className='w-[24px] h-[24px] relative left-[-1.5%] top-[0.5%] mt-[1px] text-gray-600'/>
                      <p className='text-lg text-gray-700 relative left-[-4.2%]'>/</p>
                      <p className='text-lg text-gray-700 relative left-[-2.2%]'>camera</p>
                    </div>
                    <div className='flex items-center space-x-2 relative left-[17%] top-[4px]'>
                      {detailedReview.facilities.parking && <FaParking className='text-blue-3 md:w-[25px] md:h-[25px] w-[15px] h-[15px]'/>}
                      {detailedReview.facilities.elevator && <MdElevator className='text-blue-3 md:w-[29px] md:h-[29px] w-[18px] h-[18px]'/>}
                      {detailedReview.facilities.bath && <FaBath className='text-blue-3 md:w-[22px] md:h-[22px] w-[13px] h-[13px]'/>}
                      {detailedReview.facilities.kitchen && <BiRestaurant className='text-blue-3 md:w-[29px] md:h-[29px] w-[17px] h-[17px]'/>}
                      {detailedReview.facilities.sex == 'baieti' && <MdBoy className='text-blue-3 md:w-[33px] md:h-[33px] w-[20px] h-[20px] relative left-[-6%]'/>}
                      {detailedReview.facilities.sex == 'fete' && <MdGirl className='text-pink-400 md:w-[33px] md:h-[33px] w-[20px] h-[20px] relative left-[-6%]'/>}
                      {detailedReview.facilities.sex == 'mixt' &&
                        <div className='flex relative left-[-3%]'>
                          <MdBoy className='text-blue-3 md:w-[33px] md:h-[33px] w-[20px] h-[20px]'/>
                          <MdGirl className='text-pink-400 md:w-[33px] md:h-[33px] w-[20px] h-[20px] relative left-[-31%]'/>
                        </div>
                      }
                    </div>
                  </div>
                </div>

                {/* Text */}  
                <div className='overflow-auto flex-grow bg-gray-200 mt-3 rounded-[15px] px-4 py-3'>
                  <p className='text-base text-gray-700'>{detailedReview.text}{detailedReview.text}{detailedReview.text}{detailedReview.text}{detailedReview.text}{detailedReview.text}{detailedReview.text}{detailedReview.text}{detailedReview.text}</p>  
                </div>
              </div>
            </div>
          </div>
        </>
      } 
    </div>
  )
}