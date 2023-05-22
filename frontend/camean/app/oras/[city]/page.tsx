import CaminCard from "./CaminCard";
import LineBreak from "./LineBreak";
import Map from "./Map";


export default async function Home( info: { params: { city: string } } ) {
  async function fetchCamineOfCity(city: string) {
    try {
      const response = await fetch(`http://localhost:8080/getCamine/oras=${city}`, { next: { revalidate: 10 } })
      //const response = await fetch(`http://localhost:8080/getCamine/${city}`)
      const data = await response.json();
      return data
    }
    catch (error) {
      console.error('Error:', error);
    }
  }

  const caminePromise = (await Promise.all([fetchCamineOfCity(info.params.city)]))[0]
  const camine: {
    id: string,
    name: string,
    city: string,
    owner: string,
    stars: number,
    parking: boolean,
    elevator: boolean,
    bath: boolean,
    kitchen: boolean,
    sex: string,
    pricePerMonth: number,
  } [] = (await Promise.all([caminePromise]))[0]
  console.log(camine)
  
  return (
    <div>
      <div className='flex'>
        <div className='flex flex-col lg:w-[60%] w-[100%] mt-[81px]'>
          {camine.map((camin: any) => (
            <div>
              <CaminCard camin={camin}/>
              <LineBreak width='97%'/>
            </div>
          ))}
        </div>
      </div>
      <div className='w-full flex justify-end '>
        <div className='fixed lg:block hidden w-[40%] self-start top-[81px]' style={{height: 'calc(100vh - 81px)'}}>
          <Map city={info.params.city}/>
        </div>
      </div>
    </div>
  )
}
