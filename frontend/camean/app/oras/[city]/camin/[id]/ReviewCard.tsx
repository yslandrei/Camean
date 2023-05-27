'use client'
import { HiUserCircle } from 'react-icons/hi'
import { reviewType, facilityType } from './page'
import { useState } from 'react'
import { AiFillStar } from 'react-icons/ai'

export default function ReviewCard(props: { review: reviewType}) {

  function handleReadMore() {

  }

  return (
    <div onClick={() => handleReadMore} className='w-1/2 mt-10 h-[140px]'>
      {/* Photo + Name + Date + Stars */}        
      <div className='flex w-[90%] relative left-[-4px]'>
        <HiUserCircle className='text-gray-300 w-[52px] h-[52px] mr-1'/>
        <div>
          <p className='text-xl font-medium text-gray-700'>{props.review.author}</p>
          <div className='flex space-x-1'>
            <p className='text-base text-gray-500'>{props.review.date}</p>
            <p className='text-base text-gray-500'>|</p>
            {Array.from({ length: props.review.stars }, (_, index) => index + 1).map((star) => (
              <AiFillStar className='text-blue-3 w-[20px] h-[20px] relative top-[1px]'/>
            ))}
          </div>
        </div>
      </div>

      {/* Text */}        
      <p 
        className='text-lg text-gray-700 w-[90%] mt-1'
        style={{
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'normal'
        }}
      >
        {props.review.text}
      </p>
    </div>


  )
}