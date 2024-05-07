"use client"

import { Button } from "@nextui-org/button"
import useLocalStorage from "@/hooks/useLocalStorage"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function RequestButton({ service, specs }) {
  const router = useRouter()
  const [activeServices, setActiveServices] = useLocalStorage("activeServices", [])

  useEffect(() => {
    console.log(specs)
  }, [specs])

  return (
    <Button
      onClick={() => {
        if (activeServices.find(activeService => activeService.id == service.id)) {
          alert("Ya tienes un servicio activo de este tipo")
          return
        }
        setActiveServices(prev => [...prev, { id: service.id, specs }])
        router.push(`/services/${service.id}/request`)
      }}
      color='primary'
      className='flex-card h-[4rem] bg-gradient center text-primary-foreground'>
      <h4 className='text-xl'>Solicitar</h4>
    </Button>
  )
}
