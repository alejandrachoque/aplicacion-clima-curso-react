import { useState } from "react"
export const WheatherApp = () => {


const urlBase= 'https://api.openweathermap.org/data/2.5/weather'
const API_KEY='e1cff7a6112385435c9ebff5352ac322'
const difKelvin=273.15

const [ciudad, setCiudad] = useState('')
const [dataClima, setDataClima] = useState(null)

const handleCambioCiudad=(e)=>{
setCiudad(e.target.value)
}

const handleSubmit=async(e)=>{
e.preventDefault()
if(ciudad.length>0) await fetchClima()
}

const fetchClima=async()=>{
    try {
        const response= await fetch(`${urlBase}?q=${ciudad}&appid=${API_KEY}`)
        const data=await response.json()
        setDataClima(data)
    } catch (error) {
        console.log('Ocurrio el siguiente problema:', error);
    }
}

  return (

    <div className='container'>
        <h1>Aplicación del clima</h1>
        <form onSubmit={handleSubmit}> 
            <input
            type='text'
            value={ciudad}
            onChange={handleCambioCiudad}
            />
            <button type='submit'>Buscar</button>
        </form>
        {
            dataClima&&(
                <div>
                        <h2>{dataClima.name}</h2>
                        <p>Temperatura: {parseInt(dataClima?.main.temp-difKelvin)}°C</p>
                        <p>Condición meteorologiva: {dataClima.weather[0].description}</p>
                        <img src={`https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`}/>



                </div>
            )
        }





    </div>
  )
}
