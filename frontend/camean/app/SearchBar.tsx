'use client'
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { BiSearch } from "react-icons/bi"
import { usePathname } from 'next/navigation'

export default function SearchBar() {
  //const width = useRef(window.innerWidth)
  
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
  const path = usePathname()
  let selectedCity: string = path.indexOf('oras') == -1 ? '' : path.slice(path.indexOf('oras') + 5).replaceAll('%20', ' ')
  if(selectedCity.indexOf('/') != -1)
    selectedCity = selectedCity.slice(0, selectedCity.indexOf('/'))
  const [search, setSearch] = useState<string>(selectedCity)
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
    <div className=''>
      <div className='md:h-[46px] h-[30px] flex justify-center'>
        <div className='min-w-[15px] bg-gray-200' style={{ borderTopLeftRadius: '15px', borderBottomLeftRadius: searchResults.length ? '0px' : '15px' }}/>
          <input placeholder='Cauta un oras' className='w-[100%] md:text-xl text-sm bg-gray-200 text-gray-700 outline-none' value={search} onChange={e => setSearch(e.target.value)}/>
          {search.length ? 
            <Link href={`/oras/${search}`} className='md:min-w-[50px] min-w-[35px] bg-blue-3 flex hover:bg-blue-4 justify-center items-center' style={{ borderTopRightRadius: '15px', borderBottomRightRadius: searchResults.length ? '0px' : '15px' }}>
              <BiSearch className='h-[60%] w-[60%] text-white-snow relative top-[-1%] left-[-1.5%] cursor-pointer'/>
            </Link>
            :
            <div className='md:min-w-[50px] min-w-[35px] bg-blue-3 flex hover:bg-blue-4 justify-center items-center' style={{ borderTopRightRadius: '15px', borderBottomRightRadius: searchResults.length ? '0px' : '15px' }}>
              <BiSearch className='h-[60%] w-[60%] text-white-snow relative top-[-0.05vw] left-[-0.18vw] cursor-pointer'/>
            </div>
          }
      </div>
      <div className='overflow-y-auto overflow-x-hidden rounded-b-[1.5vw]'>
        {searchResults.map((searchResult, i) => (
            <div key={i} onClick={() => {
              setSearch(searchResult)
              setSearchResults([])
            }}>
              <div className='h-[1px] bg-gray-300'/>
              <div className='md:h-[46px] h-[30px] flex items-center bg-gray-200 hover:bg-gray-300' style={{ borderBottomLeftRadius: i == searchResults.length - 1 ? '15px' : '0px' , borderBottomRightRadius: i == searchResults.length - 1 ? '15px' : '0px' }}>
                <div className='w-[15px]'/>
                <p className=' text-gray-700 md:text-xl text-xs'>{ searchResult }</p>
              </div>
            </div>
        ))}
      </div>
    </div>
  )
}