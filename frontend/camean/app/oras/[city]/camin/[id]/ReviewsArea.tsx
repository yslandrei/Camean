'use client'
import { useState } from "react";
import ReviewCard from "./ReviewCard";
import { reviewType, facilityType } from "./page";

const reviewsPerPage: number = 4

export default function ReviewsArea(props: { reviews: reviewType[] }) {
  const [page, setPage] = useState<number>(1)
  const pages: number = Math.ceil(props.reviews.length / reviewsPerPage)

  return (
    <>
      <div className='flex flex-wrap w-full'>
        {props.reviews.slice((page - 1) * reviewsPerPage, page * reviewsPerPage).map((review, index) => (
          <ReviewCard key={index} review={review}/>
        ))}
      </div>
      <div className='flex w-full justify-center h-[50px] relative' style={{top: page == pages ? '220px' : '40px'}}>
        <div className='rounded-[10px] bg-gray-300 space-x-2 p-[6px] flex'>
          {Array.from({ length: pages }, (_, index) => index + 1).map((pageNumber) => (
            pageNumber == page ? 
              <button key={pageNumber} className='rounded-[10px] bg-blue-3 h-full aspect-square flex justify-center items-center'>
                <p className='text-white-snow text-lg font-medium'>{pageNumber}</p>
              </button>
              :
              <button key={pageNumber} onClick={() => setPage(pageNumber)} className='rounded-[10px] bg-white-snow h-full aspect-square flex justify-center items-center'>
                <p className='text-blue-3 text-lg font-medium'>{pageNumber}</p>
              </button>
          ))}
        </div>
      </div>
    </>
  )
}