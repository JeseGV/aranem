"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

const checkAuth = () => true //check if user is authenticated

export default function Page() {
  const router = useRouter()

  useEffect(() => {
    if (checkAuth()) router.replace("/home")
  }, [])

  return <div></div>
}
