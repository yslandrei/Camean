import { caminWithMedianReviewsType } from "../../page"
import Heart from "./heart"
import Link from "next/link"
import Image from 'next/image'
import LineBreak from "../../LineBreak"
import Map from "../../Map"
import { AiFillStar } from "react-icons/ai"
import { FaParking, FaBath } from "react-icons/fa"
import { MdElevator } from "react-icons/md"
import { BiRestaurant } from "react-icons/bi"
import { MdGirl, MdBoy } from "react-icons/md"
import { HiWifi } from "react-icons/hi"
import { GiWashingMachine } from "react-icons/gi"

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
  peoplePerRoom: number,
}

export default async function Home( info: { params: { id: string } } ) {
  async function fetchCaminWithMedianReviewsById(id: string) {
    try {
      const response = await fetch(`http://localhost:8080/getCamine/id=${id}`, { next: { revalidate: 10 } })
      const data = await response.json();
      return data
    }
    catch (error) {
      console.error('Error:', error);
    }
  }

  async function fetchCamineWithMedianReviewsByCity(city: string) {
    try {
      const response = await fetch(`http://localhost:8080/getCamine/oras=${city}`, { next: { revalidate: 10 } })
      const data = await response.json();
      return data
    }
    catch (error) {
      console.error('Error:', error);
    }
  }
  
  const caminPromise = (await Promise.all([fetchCaminWithMedianReviewsById(info.params.id)]))[0]
  const camin: caminWithMedianReviewsType = (await Promise.all([caminPromise]))[0]
  const caminePromise = (await Promise.all([fetchCamineWithMedianReviewsByCity(camin.city)]))[0]
  const camine: caminWithMedianReviewsType[] = (await Promise.all([caminePromise]))[0]

  return (
    <div className='mt-[81px] flex justify-center'>
      <div className='max-w-[1200px] w-[90vw] mt-[20px]'>
        {/* Name */}
        <p className='text-3xl font-semibold text-gray-700'>{camin.name}</p>

        {/* Stars + ReviewsCount + City + Heart */}
        <div className='flex justify-between'>
          <div className='flex space-x-[5px] items-center mt-2'>
            <div className='flex space-x-[2px] items-center'>
              <AiFillStar className='text-blue-3 md:w-[23px] md:h-[23px] w-[15px] h-[15px] relative top-[-1px]'/>
              <p className='md:text-lg text-xs text-gray-700'>{camin.stars.toFixed(1)}</p>
            </div>
            <p className='md:text-lg text-xs text-gray-700 relative top-[-2px]'>•</p>
            <p className='md:text-lg text-xs text-gray-700'>{camin.reviewsCount} recenzii</p>
            <p className='md:text-lg text-xs text-gray-700 relative top-[-2px]'>•</p>
            <Link href={`/oras/${camin.city}`}><p className='md:text-lg text-xs text-gray-700 underline'>{camin.city}</p></Link>
          </div>
          <Heart/>
        </div>

        {/* Spacer */}
        <div className='w-full h-4'/>

        {/* Images */}
        <div className='h-[432px] flex'>
          {/* Main Image */}
          <div className='h-full max-w-[800px] w-full relative'>
            <Image
              className='rounded-[15px]'
              src="/camin1.jpg"
              fill={true} 
              style={{objectFit: 'cover', objectPosition: 'start'}}
              quality={100}
              sizes='(max-width: 1024px) 90vw, 800px'
              alt=""
            />
          </div>  
          <div className='ml-[10px] hidden lg:block'>
            {/* Secondary Image 1 */}
            <div className='h-[211px] w-[400px] relative'>
                <Image
                  className='rounded-[15px]'
                  src="/camin1.jpg"
                  fill={true} 
                  style={{objectFit: 'cover', objectPosition: 'start'}}
                  quality={100}
                  sizes='(max-width: 1024px) 0px, 400px'
                  alt=""
                />
              </div>
              {/* Secondary Image 2 */}
              <div className='h-[211px] w-[400px] relative mt-[10px]'>
                <Image
                  className='rounded-[15px]'
                  src="/camin1.jpg"
                  fill={true} 
                  style={{objectFit: 'cover', objectPosition: 'start'}}
                  quality={100}
                  sizes='(max-width: 1024px) 0px, 400px'
                  alt=""
                />
              </div>
          </div>  
        </div>

        {/* LineBreak 1 */}
        <div className='my-12'>
          <LineBreak width='100%'/>
        </div>

        <div className='w-full h-[500px] flex'>
          {/* Facilities */}
          <div className='w-1/2 '>
            <p className='text-3xl text-gray-700'>Ce ofera acest camin</p>
            <div className='flex flex-wrap w-full items-center mt-8'>
              {camin.parking && <div className='flex w-[250px] h-[50px] space-x-[13px] items-center mr-12 mb-6'>
                <FaParking className='text-blue-3 w-[40px] h-[40px]'/>
                <p className='text-xl text-gray-700'>Parcare</p>    
              </div>}

              {camin.elevator && <div className='flex w-[250px] h-[50px] space-x-[6px] items-center mr-12 mb-6'>
                <MdElevator className='text-blue-3 w-[48px] h-[48px] relative left-[-1%]'/>
                <p className='text-xl text-gray-700'>Lift</p>    
              </div>}
              
              {camin.bath && <div className='flex w-[250px] h-[50px] space-x-4 items-center mr-12 mb-6'>
                <FaBath className='text-blue-3 w-[35px] h-[35px] relative left-[1%]'/>
                <p className='text-xl text-gray-700'>Baie in camera</p>    
              </div>}

              {camin.kitchen && <div className='flex w-[250px] h-[50px] space-x-2 items-center mr-12 mb-6'>
                <BiRestaurant className='text-blue-3 w-[46px] h-[46px] relative left-[-1%]'/>
                <p className='text-xl text-gray-700'>Bucatarie in camera</p>    
              </div>}

              {camin.sex == 'mixt' && <div className='flex w-[250px] h-[50px] space-x-2 items-center mr-12 mb-6'>
                <div className='flex relative left-[-7%]'>
                  <MdBoy className='text-blue-3 w-[53px] h-[53px]'/>
                  <MdGirl className='text-pink-400 w-[53px] h-[53px] relative left-[-31%]'/>
                </div>
                <p className='text-xl text-gray-700 relative left-[-23%]'>Camin Mixt</p>    
              </div>}

              {camin.sex == 'baieti' && <div className='flex w-[250px] h-[50px] space-x-[3px] items-center mr-12 mb-6'>
                <MdBoy className='text-blue-3 w-[53px] h-[53px] relative left-[-2%]'/>
                <p className='text-xl text-gray-700'>Camin de Baieti</p>    
              </div>}

              {camin.sex == 'fete' && <div className='flex w-[250px] h-[50px] space-x-[3px] items-center mr-12 mb-6'>
                <MdGirl className='text-pink-400 w-[53px] h-[53px] relative left-[-2%]'/>
                <p className='text-xl text-gray-700'>Camin de Fete</p>    
              </div>}
            </div>
          </div>

          {/* Map */}
          <div className='w-1/2'>
            <p className='text-3xl text-gray-700 mb-8'>Locatie</p>
            <div className='w-full h-[432px]'>
              <Map camin={camin} camine={camine}/>
            </div>
          </div>
        </div>

        {/* LineBreak 2 */}
        <div className='my-12'>
          <LineBreak width='100%'/>
        </div>

        <div className='w-full h-[1000px]'/>
      </div>
    </div>
  )
}