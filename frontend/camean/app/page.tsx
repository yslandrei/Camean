import Image from 'next/image'
import SearchBar from './SearchBar'

export default function Home() {
  return (
    <main>
      <div className='relative h-[90vh]'>
          <Image
            src="/bg-city-blue.svg"
            fill={true}
            style={{objectFit: 'cover'}}
            quality={100}
            alt=""
          />
          <div className='absolute w-full'>
            <Header/>
            <div className='flex justify-center'>
              <div className='mt-[68vh] w-full md:max-w-[40vw] max-w-[70vw]'>
                <SearchBar/>
              </div>
            </div> 
          </div>
      </div>

    </main>
  )
}

function Header() {
  return (
    <>
      <div className='flex justify-center items-start'>
        <div className='flex flex-1 justify-start mt-[25px] ml-[2vw] space-x-[2vw]'>
          <p className='md:text-xl text-xs text-center text-white-snow'>Home</p>
          <p className='md:text-xl text-xs text-center text-white-snow'>About</p>
        </div>
        <div className='flex-1'>
          <p className='text-center md:text-6xl text-3xl font-bold  text-white-snow'>Camean</p>
          <p className='text-center md:text-xl text-xs text-white-snow'>de studenți, pentru studenți</p>
        </div>
        <div className='flex flex-1 justify-end mt-[14px] mr-[2vw] space-x-[2vw]'>
          <p className='md:text-xl text-xs text-center bg-white-snow hover:bg-gray-200 cursor-pointer text-blue-3 rounded-[15px] p-3 '>Adauga un Camin</p>
        </div>
      </div>
    </>
  )
}
