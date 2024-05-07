"use client"

import useLocalStorage from "@/hooks/useLocalStorage"
import { Button } from "@nextui-org/button"
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover"

import NextLink from "next/link"
import StatusBarMargin from "@/components/StatusBarMargin"
import Image from "next/image"
import { FaInfo } from "react-icons/fa"

import services from "@/DB/services" // temporal
const getServices = () => {
  //fetch services
  return services
}

export default function Home() {
  const services = getServices()
  const [activeServices, setActiveServices] = useLocalStorage("activeServices", [])

  return (
    <div className='bg-poly min-h-full flex flex-col'>
      <header className='h-[91svh]'>
        <StatusBarMargin />
        <div className='p-4'>
          <div className='sticky top-0'>
            {activeServices &&
              activeServices.map(({ id, specs }) => (
                <Button
                  color='primary'
                  radius='md'
                  as={NextLink}
                  href={`/services/${id}/request`}
                  className='w-full flex-row bg-background text-foreground shadow-md h-unit-18'>
                  <Image
                    src={`/assets/img/services/${
                      services.find(service => service.id == id).img
                    }.jpg`}
                    width={192}
                    height={192}
                  />
                  <div className='p-2 gap-2 flex flex-col justify-center'>
                    <h2 className='text-xs'>{services.find(service => service.id == id).name}</h2>
                    <p className='text-xs opacity-75'>
                      {specs.find(spec => spec.label === "Vehículo").value}
                    </p>
                  </div>
                </Button>
              ))}
          </div>
        </div>
      </header>
      <div className='bg-background p-4 pb-8 gap-4 rounded-t-3xl flex-grow flex flex-col items-center'>
        <div className='w-1/2 rounded-full bg-foreground h-2 opacity-20' />
        {services.map(({ id, img, name, description }) => (
          <Button
            variant='light'
            color='primary'
            as={NextLink}
            key={id}
            href={`services/${id}`}
            className='h-max w-full flex flex-col p-0 gap-0'>
            <Image
              className='w-full rounded-lg'
              src={`/assets/img/services/${img}.jpg`}
              alt={`imagen de ${name}`}
              height={192}
              width={192}
            />
            <div className='p-2 px-4 text-lg uppercase w-full text-start flex items-center justify-between'>
              <p>{name}</p>
              <Popover placement='bottom' showArrow={true}>
                <PopoverTrigger>
                  <Button
                    onClick={e => e.preventDefault()}
                    variant='ghost'
                    color='primary'
                    isIconOnly
                    radius='full'
                    size='sm'
                    className='p-0 text-sm'>
                    <FaInfo />
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <div className='px-1 py-2'>
                    <div className='text-small font-bold'>{name}</div>
                    <div className='text-tiny'>{description}</div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </Button>
        ))}
      </div>
    </div>
  )
}
