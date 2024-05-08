"use client"

import { useEffect, useState } from "react"
import useLocalStorage from "@/hooks/useLocalStorage"
import VehicleSelector from "@/components/VehicleSelector.jsx"
import PeopleSelector from "@/components/peopleselector.jsx"
import RequestButton from "@/components/RequestButton.jsx"
import PayMethodSelector from "@/components/PayMethodSelector.jsx"
import Select from "@/components/Select"
import { useParams } from "next/navigation"

import services from "@/DB/services" // temporal

import { FaMapMarkerAlt } from "react-icons/fa"

const getServices = () => {
  //fetch services
  return services
}

export default function ServicePage() {
  const services = getServices()
  const params = useParams()
  const service = services.find(service => service.id == params.id)

  const [specs, setSpecs] = useState([]) // [vehicle, payMethod, ...options

  // temporal
  const [price, setPrice] = useState(0)
  useEffect(() => {
    setPrice(150 + Math.floor(Math.random() * 300))
    const locationInput = document.getElementById("location-input")
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords
      locationInput.value = `${latitude}, ${longitude}`
    })
  }, [])

  const getPrice=() =>{
  return price
  }

  return (
    <div className='bg-background'>
      <div className='flex flex-col w-full min-h-[50vh] relative items-center'>
        {/* MAP */}
        <iframe
          src='https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d20985.897600169985!2d-106.07221478662314!3d28.64170210748429!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2smx!4v1682756834904!5m2!1ses-419!2smx'
          width='100%'
          height='auto'
          className='border-0 w-full h-[50vh] fixed top-0 z-0'
          allowFullScreen={false}
          loading='lazy'
          referrerPolicy='no-referrer-when-downgrade'></iframe>

        <div className='h-6 w-full z-1 fixed bottom-[50vh] bg-gradient-to-t from-background to-transparent' />

        <div className='rounded-full shadow-md text-primary-foreground bg-gradient-to-t from-[#0002] to-transparent backdrop-blur backdrop-brightness-95 p-4 my-4 w-[95%] max-w-[25rem] flex gap-2 z-10 sticky top-4'>
          <label htmlFor='input-location'>
            <i className='center text-2xl'>
              <FaMapMarkerAlt />
            </i>
          </label>
          <input
            title='location'
            id='location-input'
            type='text'
            className='flex-1 text-xl bg-transparent border-0 outline-none'
          />
        </div>
      </div>
      <div className='rounded-t-3xl bg-background p-4 flex flex-col gap-4 z-10 relative'>
        <div className='center gap-4 justify-between'>
          <h4 className='text-primary text-2xl'>{service.name}</h4>
        </div>
        <hr />
        <VehicleSelector setSpecs={setSpecs} />
        <PayMethodSelector setSpecs={setSpecs} /> 
        <PeopleSelector setSpecs={setSpecs}/>
        <hr />
        {service.options.map(({ items, label }, i) => (
          <Select key={i} items={items} label={label} setSpecs={setSpecs} />
        ))}
        {service.options.length > 0 && <hr />}
        <div className='justify-between px-4'>
          <h4>Total a pagar</h4>
          <h4 className='text-primary'>{`$${price}`}</h4>
        </div>
        <hr />
        <RequestButton service={service} specs={specs} />
        <div className='flex flex-col gap-2'>
          <h4 className='text-primary'>Descripción del servicio</h4>
          <p className='text-sm'>{service.description}</p>
          <h4 className='text-primary'>Aviso de seguridad</h4>
          <p className='text-sm'>
            Al solicitar un servicio está aceptando nuestro acuerdo de{" "}
            <a href='#' className='text-secondary underline'>
              términos y condiciones
            </a>
            . <br /> Recomendamos leer las{" "}
            <a href='#' className='text-secondary underline'>
              normas de la comunidad
            </a>{" "}
            para estar al tanto de las políticas de uso de la plataforma.
          </p>
        </div>
      </div>
    </div>
  )
}
