'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import ReactMapGL from 'react-map-gl'
import { Marker } from 'react-map-gl'
import { caminWithMedianReviews } from './page'
import 'mapbox-gl/dist/mapbox-gl.css'

export default function Map(props: { city: string, camine: caminWithMedianReviews[] }) {
  const [viewState, setViewState] = useState({
    latitude: 46.7741825,
    longitude: 23.5901124,
    zoom: 12
  })
  
  async function fetchLonLat() {
    try {
      const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${props.city}.json?country=ro&limit=1&proximity=-73.990593%2C40.740121&types=place&language=ro&access_token=${process.env.mapbox_key}`)
      const data = await response.json()
      setViewState({
        latitude: data.features[0].center[1],
        longitude: data.features[0].center[0],
        zoom: 12
      })
    } catch (error) {
      console.error('Error:', error);
    }
  }

  useEffect(() => {
    fetchLonLat();
  }, []);

  const [focusedId, setFocusedId] = useState<string>()
  const handleChangeFocused = (camin: caminWithMedianReviews) => {
    if (focusedId == camin.id) {
      setFocusedId('')
    } 
    else {
      setFocusedId(camin.id)
    }
  }


  return (
    <ReactMapGL
      {...viewState}
      doubleClickZoom={false}
      onMove={e => setViewState(e.viewState)}
      mapStyle='mapbox://styles/yslandrei/clhuxq7rd005301qs1nug9roe'
      mapboxAccessToken={process.env.mapbox_key}
    >
      {props.camine.map((camin: any) => (
          <Marker
            key={camin.id}
            longitude={camin.longitude}
            latitude={camin.latitude}
            offset={focusedId == camin.id ? [0, -115] : [0, 0]}
          >
            <div className='flex flex-col items-center'>
              {focusedId == camin.id ? 
                <div className='w-[300px] h-[220px] bg-white-snow shadow-xl rounded-[15px] cursor-pointer border-[0px] border-blue-3 mb-2'>
                  <div className='w-full h-[60%] relative'>
                    <Image
                      className='rounded-t-[15px]'
                      src="/camin1.jpg"
                      fill={true}
                      style={{objectFit: 'cover', display: focusedId == camin.id? 'hidden' : 'static'}}
                      quality={100}
                      alt=""
                    />
                  </div>
                  <div className='py-1 px-2'>
                    <p className='text-lg text-gray-700'>{camin.name}</p>
                  </div>
                </div>
              : ''}
              <div onClick={() => handleChangeFocused(camin)} className='ring-offset-[10px] w-[65px] h-[30px] rounded-[15px] flex justify-center items-center border-[1px] border-blue-3' style={{backgroundColor: focusedId == camin.id? '#2990e2' : '#F9F9FF'}}>
                <p className='text-blue-3 font-bold text-base' style={{color: focusedId == camin.id? '#F9F9FF' : '#2990e2'}}>{camin.pricePerMonth} lei</p>
              </div> 
            </div>
          </Marker>
      ))}
    </ReactMapGL>
  )
}