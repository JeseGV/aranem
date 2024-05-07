import NextLink from "next/link"
import StatusBarMargin from "@/components/StatusBarMargin"

import services from "@/DB/services" // temporal
import ChatBot from "@/components/ChatBot"

import { Button } from "@nextui-org/button"
import { Link } from "@nextui-org/link"
import { Image } from "@nextui-org/image"

import { FaBoxOpen } from "react-icons/fa"
import { BsFillFuelPumpFill, BsTools, BsArrowRight } from "react-icons/bs"
import { MdLocalCarWash } from "react-icons/md"
import { LuParkingCircle } from "react-icons/lu"
import InstallPWAButton from "@/components/InstallPWAButton"

const getServices = () => {
  //fetch services
  return services
}
export default function Home() {
  const services = getServices()

  return (
    <div className='bg-poly min-h-full flex flex-col'>
      <section className='min-h-[65svh] flex flex-col justify-end'>
        <StatusBarMargin className='justify-self-start' />
        <ChatBot />
      </section>
      <div className='bg-background p-4 flex flex-col rounded-t-3xl flex-grow'>
        {/* SERVICIOS */}
        <h1 className='text-xl'>Servicios</h1>
        <div className='w-screen relative -ml-4 overflow-x-auto flex p-4 gap-4'>
          {services.map(({ id, img, name, description }) => (
            <Link
              as={NextLink}
              key={id}
              href={`services/${id}`}
              className='flex flex-col text-foreground items-start'>
              <Image
                className='min-w-[12rem] w-full'
                width={250}
                src={`/assets/img/services/${img}.jpg`}
                alt={name}
                isZoomed
                radius='lg'
                shadow='md'
              />
              <div className='pt-1 w-max'>
                <p className='text-sm flex gap-2 items-center'>
                  {name} <BsArrowRight />
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Lugares */}
        <h1 className='text-xl'>Lugares</h1>
        <div className='w-full flex py-4 gap-4 flex-wrap'>
          {(() => {
            const places = [
              {
                id: 1,
                search: "gasolineras",
                name: "Ver gasolineras",
                icon: <BsFillFuelPumpFill />,
              },
              { id: 2, search: "talleres mecanicos", name: "Ver talleres", icon: <BsTools /> },
              { id: 3, search: "autolavados", name: "Ver lavaderos", icon: <MdLocalCarWash /> },
              {
                id: 4,
                search: "estacionamientos",
                name: "Ver estacionamientos",
                icon: <LuParkingCircle />,
              },
            ]

            return places.map(({ id, search, name, icon }) => (
              <Button
                as={NextLink}
                key={id}
                radius='lg'
                href={`https://www.google.com/maps/search/${search}`}
                className='flex flex-col flex-center h-32 gap-2 shadow-md bg-poly text-primary-foreground min-w-max max-w-full grow'>
                <i className='text-4xl'>{icon}</i>
                <p>{name}</p>
              </Button>
            ))
          })()}
        </div>

        <InstallPWAButton />

        {/* Privacy Policy */}
        {/* <h1 className='text-xl'>
          Politica de privacidad
        </h1>
        <div className='w-full flex p-4 gap-4 flex-wrap'>
          
        </div> */}
      </div>
    </div>
  )
}
