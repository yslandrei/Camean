'use client'
import { useState } from "react";
import ReviewCard from "./ReviewCard";
import { reviewType, facilityType } from "./page";

const reviewsPerPage: number = 4

export default function ReviewsArea(props: { reviews: reviewType[] }) {

  const [isDimmed, setIsDimmed] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)
  const pages: number = Math.ceil(props.reviews.length / reviewsPerPage)

  return (
    <>
      {/* Reviews */}
      <div className='flex flex-wrap w-full'>
        {props.reviews.slice((page - 1) * reviewsPerPage, page * reviewsPerPage).map((review, index) => (
          <ReviewCard key={index} review={review} setIsDimmed={setIsDimmed}/>
        ))}
      </div>

      {/* Pages */}
      <div className='flex w-full justify-center h-[50px] relative' style={{top: page == pages ? '220px' : '40px'}}>
        <div className='rounded-[10px] bg-gray-300 space-x-2 p-[6px] flex'>
          {Array.from({ length: pages }, (_, index) => index + 1).map((pageNumber) => (
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

      {/* Dimmer */}
      <div className='bg-gray-700 fixed w-full h-full left-0 top-0 opacity-40' style={{display: isDimmed ? 'block' : 'none'}}/>
            
      {/* Read More Modal */}
      <div className='fixed w-full h-full top-0 left-0 flex justify-center items-center'>
        <div className='bg-white-snow rounded-[15px] w-[40%] h-[50%]'>
          <p>aici o sa vina review-ul detaliat</p>  
        </div>
      </div>
    </>
  )
}