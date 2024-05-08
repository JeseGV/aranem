"use client"

import { useParams } from "next/navigation"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import useLocalStorage from "@/hooks/useLocalStorage"

import { FaMapMarkerAlt } from "react-icons/fa"
import { Card, CardBody } from "@nextui-org/card"
import { Progress } from "@nextui-org/progress"
import { User } from "@nextui-org/user"
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react"
import { FaUser } from "react-icons/fa"
import { RiAlarmWarningFill } from "react-icons/ri"
import { TiCancel } from "react-icons/ti"
import Image from "next/image"

import services from "@/DB/services" // temporal

const getServices = () => {
  //fetch services
  return services
}

export default function activeService() {
  const router = useRouter()
  const services = getServices()
  const params = useParams()
  const service = services.find(service => service.id == params.id)
  const [activeServices, setActiveServices] = useLocalStorage("activeServices", [])
  const specs = activeServices.find(activeService => activeService.id == service.id)?.specs
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

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
      <div className='rounded-t-3xl bg-background p-4 flex flex-col gap-4 z-10 relative min-h-[50vh]'>
        <div className='center gap-4 justify-between'>
          <h4 className='text-primary text-2xl'>{service.name}</h4>
        </div>
        <Progress isStriped color='primary' isIndeterminate className='max-w-md' />
        <div className='flex justify-between gap-4'>
        <div>
        <h4>Total a pagar</h4>
        <h4 className='text-primary'>{`$${price}`}</h4>
        </div>
          <Button className='text-3xl text-opacity-50' onPress={onOpen} radius='full' isIconOnly>
            <TiCancel />
          </Button>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
              {onClose => (
                <>
                  <ModalHeader className='flex flex-col gap-1'>¿Cancelar servicio?</ModalHeader>
                  <ModalBody>
                    <p>Esto generará una penalización</p>
                  </ModalBody>
                  <ModalFooter>
                    <Button variant='light' onPress={onClose}>
                      No
                    </Button>
                    <Button
                      onPress={() => {
                        router.replace("/services")
                        setActiveServices(prev => prev.filter(service => service.id != params.id))
                        onClose()
                      }}
                      color='primary'
                      variant='shadow'>
                      Sí, cancelar
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>

        <hr />
        <div className='w-full flex gap-4 gap-x-8 flex-wrap'>
          {specs &&
            specs.map(item =>
              item.img ? (
                <Card shadow='sm' className='flex-grow flex flex-row pl-4'>
                  <Image className='scale-125' width={92} height={92} src={item.img} />
                  <CardBody className='flex flex-col min-w-max'>
                    
                    <p className='pl-2'>{item.value}</p>
                  </CardBody>
                </Card>
              ) : (
                <div className='flex-grow flex flex-col min-w-max'>
                  <h1 className='text-xs opacity-75'>{item.label}</h1>
                  <p className='text-sm pl-2'>{item.value}</p>
                </div>
              )
            )}
        </div>

        <hr />
        <div className='flex flex-col gap-4 p-6 center'>
          <Button
            onClick={() => {
              alert("Se ha enviado una alerta de pánico")
            }}
            color='danger'
            variant='shadow'
            radius='full'
            isIconOnly
            size='lg'
            className='aspect-square h-20 w-20 text-3xl'>
            <RiAlarmWarningFill />
          </Button>
          <h2>Botón de pánico</h2>
        </div>
      </div>
    </div>
  )
}
