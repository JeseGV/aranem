"use client"

import { Button } from "@nextui-org/button"
import { HiDownload } from "react-icons/hi"

import NextLink from "next/link"

import { useState, useEffect } from "react"

export default function InstallPWAButton() {
  const [isOnPWA, setIsOnPWA] = useState(true)
  const [installPrompt, setInstallPrompt] = useState(null)
  const [installButton, setInstallButton] = useState(null)

  useEffect(() => {
    setInstallButton(document.getElementById("install-button"))
    if (!window.matchMedia("(display-mode: standalone)").matches) {
      setIsOnPWA(false)

      const promptEvent = window.addEventListener("beforeinstallprompt", event => {
        event.preventDefault()
        setInstallPrompt(event)
      })

      if (installButton) {
        installButton.addEventListener("click", async () => {
          if (!installPrompt) {
            return
          }
          const result = await installPrompt.prompt()
          console.log(`Install prompt was: ${result.outcome}`)
        })
      }

      return () => {
        window.removeEventListener("beforeinstallprompt", promptEvent)
      }
    }
  }, [installButton, installPrompt])

  return isOnPWA ? null : (
    <>
      <h1 className='text-xl py-4'>¿Usando Aranem desde tu navegador?</h1>
      <Button
        id='install-button'
        className='h-16 flex-card w-full text-xl bg-poly center text-primary-foreground'>
        <i className='text-2xl'>
          <HiDownload />
        </i>
        ¡Descarga la App!
      </Button>
    </>
  )
}
