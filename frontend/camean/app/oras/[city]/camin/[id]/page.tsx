import { AiFillStar } from "react-icons/ai"
import { caminWithMedianReviewsType } from "../../page"
import Heart from "./heart"
import Link from "next/link"

export type reviewType = {
  author: string,
  stars: number,
  text: string,
  date: string,
  facilities: facilityType
}

export type facilityType = {
  parking: boolean,
  elevator: boolean,
  bath: boolean,
  kitchen: boolean,
  sex: string,
  pricePerMonth: number,
}

export default async function Home( info: { params: { id: string } } ) {
  async function fetchCamineById(id: string) {
    try {
      const response = await fetch(`http://localhost:8080/getCamine/id=${id}`, { next: { revalidate: 10 } })
      const data = await response.json();
      return data
    }
    catch (error) {
      console.error('Error:', error);
    }
  }

  const caminPromise = (await Promise.all([fetchCamineById(info.params.id)]))[0]
  const camin: caminWithMedianReviewsType = (await Promise.all([caminPromise]))[0]

  return (
    <div className='mt-[81px] flex justify-center'>
      <div className='max-w-[1130px] w-[90vw] mt-[20px] space-y-2'>
        <div className='flex justify-between'>
          <p className='text-3xl font-semibold text-gray-700'>{camin.name}</p>
          <Heart/>
        </div>
        <div className='flex space-x-[5px] items-center'>
          <div className='flex space-x-[2px] items-center'>
            <AiFillStar className='text-blue-3 md:w-[23px] md:h-[23px] w-[15px] h-[15px] relative top-[-1px]'/>
            <p className='md:text-lg text-xs text-gray-700'>{camin.stars.toFixed(1)}</p>
          </div>
          <p className='md:text-lg text-xs text-gray-700 relative top-[-2px]'>•</p>
          <p className='md:text-lg text-xs text-gray-700'>{camin.reviewsCount}</p>
          <p className='md:text-lg text-xs text-gray-700 relative top-[-2px]'>•</p>
          <Link href={`/oras/${camin.city}`}><p className='md:text-lg text-xs text-gray-700 underline'>{camin.city}</p></Link>
        </div>
      </div>
    </div>
  )
}