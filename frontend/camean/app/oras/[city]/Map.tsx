'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import ReactMapGL from 'react-map-gl'
import { Marker, Popup } from 'react-map-gl'
import { caminWithMedianReviewsType } from './page'
import 'mapbox-gl/dist/mapbox-gl.css'
import './Map.css'
import { AiFillStar } from 'react-icons/ai'
import Link from 'next/link'

export default function Map(props: { city?: string, camin?: caminWithMedianReviewsType, camine: caminWithMedianReviewsType[] }) {
  const [viewState, setViewState] = useState({
    latitude: typeof props.camin != 'undefined' ? props.camin.latitude : 46.7741825,
    longitude: typeof props.camin != 'undefined' ? props.camin.longitude : 23.5901124,
    zoom: typeof props.camin != 'undefined' ? 15 : 12
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

  if(typeof props.city != undefined) {
    useEffect(() => {
      fetchLonLat();
    }, []);
  }

  const [focusedCamin, setFocusedCamin] = useState<caminWithMedianReviewsType>()
  const handleChangeFocused = (e: any, camin: caminWithMedianReviewsType) => {
    e.originalEvent.stopPropagation();
    if (focusedCamin?.id == camin.id) {
      setFocusedCamin(undefined)
    } 
    else {
      setFocusedCamin(camin)
    }
  }

  return (
    <ReactMapGL
      style={{borderRadius: typeof props.camin != 'undefined' ? '15px' : '0px'}}
      {...viewState}
      doubleClickZoom={false}
      onMove={e => setViewState(e.viewState)}
      mapStyle='mapbox://styles/yslandrei/clhuxq7rd005301qs1nug9roe'
      mapboxAccessToken={process.env.mapbox_key}
    >
      {props.camine.map((camin: any) => (
          <div key={camin.id}>
            <Marker
              longitude={camin.longitude}
              latitude={camin.latitude}
              offset={focusedCamin?.id == camin.id ? [0, -0] : [0, 0]}
              onClick={(e) => handleChangeFocused(e, camin)}
              >
                <div  className='ring-offset-[10px] w-[65px] h-[30px] rounded-[15px] flex justify-center items-center border-[1px] border-blue-3' style={{backgroundColor: focusedCamin?.id == camin.id? '#2990e2' : '#F9F9FF'}}>
                  <p className='text-blue-3 font-bold text-base cursor-pointer' style={{color: focusedCamin?.id == camin.id? '#F9F9FF' : '#2990e2'}}>{camin.pricePerMonth} lei</p>
                </div> 
            </Marker>
            
          </div>
          
      ))}
      {focusedCamin != undefined && (
        <Link href={`oras/${focusedCamin.city}/camin/${focusedCamin.id}`}>
          <Popup
            latitude={focusedCamin.latitude}
            longitude={focusedCamin.longitude}
            anchor='bottom'
            offset={[0, -25]}
            maxWidth='300px'
            className='w-[300px] cursor-pointer'
            closeButton={false}
            closeOnClick={false}
          >
            <div className='h-[220px]'>
              <div className='h-[60%] relative'>
                <Image
                  className='rounded-t-[15px]'
                  src="/camin1.jpg"
                  fill={true} 
                  style={{objectFit: 'cover'}}
                  quality={100}
                  sizes='(max-width: 1024px) 0px, 300px'
                  alt=""
                />
              </div>
              <div className='py-1 px-2 w-full'>
                <div className='flex justify-between'>
                  <p className='text-xl text-gray-700'>{focusedCamin.name}</p>
                  <div className='flex space-x-[2px] items-center'>
                    <AiFillStar className='text-blue-3 w-[20px] h-[20px] relative top-[-1px]'/>
                    <p className='text-base text-gray-700'>{focusedCamin.stars.toFixed(1)}</p>
                  </div>
                </div>
                <p className='text-base text-gray-700'>{focusedCamin.owner}</p>
                
              </div>
            </div>
          </Popup>
        </Link>
      )}
    </ReactMapGL>
  )
}