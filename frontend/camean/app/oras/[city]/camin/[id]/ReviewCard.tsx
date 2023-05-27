'use client'
import { HiUserCircle } from 'react-icons/hi'
import { reviewType, facilityType } from './page'
import { useState } from 'react'

const maxCharacters: number = 160

export default function ReviewCard(props: { review: reviewType}) {
  const [readMore, setReadMore] = useState(false)

  return (
    <div className='w-1/2 mt-10' style={{height: readMore ? 'auto' : '140px'}}>
      <div className='flex w-[90%] relative left-[-4px]'>
        <HiUserCircle className='text-gray-300 w-[52px] h-[52px] mr-1'/>
        <div>
          <p className='text-xl font-medium text-gray-700'>{props.review.author}</p>
          <p className='text-base text-gray-500'>{props.review.date}</p>
        </div>
      </div>

      {props.review.text.length < maxCharacters && 
        <p className='text-lg text-gray-700 w-[90%] mt-1'>{props.review.text}</p>
      }

      {props.review.text.length >= maxCharacters && readMore == false &&
        <p className='text-lg text-gray-700 w-[90%] mt-1'>
          {props.review.text.slice(0, maxCharacters)}...
          <span onClick={() => setReadMore(readMore => !readMore.valueOf())} className='text-blue-700 cursor-pointer'>
          &nbsp;Citeste mai mult
          </span>
        </p>
      }

      {props.review.text.length >= maxCharacters && readMore == true &&
        <p className='text-lg text-gray-700 w-[90%] mt-1'>
          {props.review.text}
          <span onClick={() => setReadMore(readMore => !readMore.valueOf())} className='text-blue-700 cursor-pointer'>
            &nbsp;Citeste mai putin
          </span>
        </p>
      }

    </div>


  )
}