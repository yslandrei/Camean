'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { BiSearch } from 'react-icons/bi'

export default function Home() {
  return (
    <main>
      <div className='z-[-1] absolute'>
          <Image
            src="/bg-city-blue.svg"
            width={3000}
            height={1000}
            quality={100}
            alt="red"
          />
          <div className='flex justify-center relative top-[-8vw]'>
            <SearchBar/>
          </div> 
      </div>

      <Header/>
    </main>
  )
}

function SearchBar() {
  const cities: string[] = [
    'Cluj-Napoca', 
    'Bucuresti', 
    'Ramnicu Valcea', 
    'Iasi',
    'Constana', 
    'Timisoara', 
    'Satu Mare',
    'Baia Mare',
    'Craiova',
    'Salaj',
    'Suceava',
    'Botosani',
    'Piatra Neamt',
    'Pitesti',
    'Ploiesti',
    'Salaj',
    'Deva',
    'Tulcea',
  ]
  
  const [search, setSearch] = useState<string>('')
  const [searchResults, setSearchResults] = useState<string[]>([])

  useEffect(() => {
    var typedCity: boolean = false
    cities.forEach(city => {
      if(city == search)
        typedCity = true
    })

    setSearchResults(typedCity ? [] : search == '' ? [] : cities.filter(city => {
      if(city.toLowerCase().indexOf(search.toLowerCase()) == 0)
        return city 
    }))
  }, [search])

  return (
    <div className='w-1/3'>
      <div className='h-[3vw] flex justify-center'>
        <div className='w-[5%] bg-gray-200' style={{ borderTopLeftRadius: '1.5vw', borderBottomLeftRadius: searchResults.length ? '0vw' : '1.5vw' }}/>
          <input id='searchInput' className='w-[85%] bg-gray-200 outline-none text-[1.4vw] text-gray-700' value={search} onChange={e => setSearch(e.target.value)}/>
        <div className='w-[10%] bg-blue-3 flex hover:bg-blue-4 justify-center items-center' style={{ borderTopRightRadius: '1.5vw', borderBottomRightRadius: searchResults.length ? '0vw' : '1.5vw' }}>
          <BiSearch className='h-[60%] w-[60%] text-white-snow relative top-[-0.05vw] left-[-0.10vw]'/>
        </div>
      </div>
      <div className='overflow-y-auto overflow-x-hidden h-[12.2vw] rounded-b-[1.5vw]'>
        {searchResults.map((searchResult, i) => (
            <div key={i} onClick={() => {
              setSearch(searchResult)
              setSearchResults([])
            }}>
              <div className='h-[0.05vw] bg-gray-300'/>
              <div className='h-[3vw] flex items-center bg-gray-200 hover:bg-gray-300' style={{ borderBottomLeftRadius: i == searchResults.length - 1 ? '1.5vw' : '0vw' , borderBottomRightRadius: i == searchResults.length - 1 ? '1.5vw' : '0vw' }}>
                <div className='w-[1.6vw]'/>
                <p className='text-[1.4vw] text-gray-700'>{ searchResult }</p>
              </div>
            </div>
        ))}
      </div>
    </div>
  )
}

function Header() {
  return (
    <>
      <div className='h-[0.5vw] bg-blue-3'/>
      <div className='flex justify-between items-center'>
        <div className='flex flex-1 justify-start ml-auto'>
          <p className='md:text-xl text-xs text-center text-white-snow ml-[2vw]'>Home</p>
          <p className='md:text-xl text-xs text-center text-white-snow ml-[2vw]'>About</p>
        </div>
        <div className='flex-1'>
          <p className='text-center md:text-7xl text-4xl font-bold  text-white-snow'>Camean</p>
          <p className='text-center md:text-xl text-xs text-white-snow'>de studenți, pentru studenți</p>
        </div>
        <div className='flex flex-1 justify-end mr-auto'>
          <p className='md:text-xl text-xs text-center bg-white-snow text-blue-3 rounded-[1.5vw] p-3 mr-[2vw]'>Adauga un Camin</p>
        </div>
      </div>
    </>
  )
}
