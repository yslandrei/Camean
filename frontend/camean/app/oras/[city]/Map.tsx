'use client'
import { useEffect, useState } from 'react'
import ReactMapGL from 'react-map-gl'

export default function Map(props: { city: string }) {
  const [viewState, setViewState] = useState({
    longitude: 23.5901124,
    latitude: 46.7741825,
    zoom: 12
  })
  
  async function fetchLonLat() {
    try {
      const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${props.city}.json?country=ro&limit=1&proximity=-73.990593%2C40.740121&types=place&language=ro&access_token=${process.env.mapbox_key}`)
      const data = await response.json()
      setViewState({
        longitude: data.features[0].center[0],
        latitude: data.features[0].center[1],
        zoom: 12
      })
    } catch (error) {
      console.error('Error:', error);
    }
  }

  useEffect(() => {
    fetchLonLat();
  }, []);

  return (

    <ReactMapGL
      {...viewState}
      onMove={e => setViewState(e.viewState)}
      mapStyle='mapbox://styles/yslandrei/clhuxq7rd005301qs1nug9roe'
      mapboxAccessToken={process.env.mapbox_key}
    >

    </ReactMapGL>
  )
}