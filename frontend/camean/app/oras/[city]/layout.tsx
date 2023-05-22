import SearchBar from "@/app/SearchBar"
import Link from "next/link"

export default function CityLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar/>
      {children}
    </div>
  )
}

function Navbar() {
  return (
    <>
      <nav className='w-full fixed z-[1]'>
        <div className='h-[80px] bg-white-snow flex md:justify-between justify-center'>
          <div className='md:flex hidden justify-start self-center ml-[2vw]'>
            <Link href={`/`}><p className='text-center text-4xl font-bold  text-blue-3 cursor-pointer'>Camean</p></Link>
          </div>
          <div className='md:mt-[17px] mt-[25px] w-full md:max-w-[40vw] max-w-[95vw]'>
            <SearchBar/>
          </div>
          <div className='md:flex hidden justify-end self-center mr-[2vw]'>
            <p className='text-xl text-center text-white-snow bg-blue-3 hover:bg-blue-4 cursor-pointer rounded-[15px] p-3'>Adauga un Camin</p>
          </div>
        </div>
        <div className='h-[1px] bg-gray-300'/>
      </nav>
    </>
  )
}