"use client"

import Image from "next/image"
import Link from "next/link"
import StatusBarMargin from "@/components/StatusBarMargin"

import vehicles from "@/DB/vehicles" // temporal

import { useRouter } from "next/navigation"
import { userImage } from "@/public/assets"

import { FaPlus, FaChevronLeft } from "react-icons/fa"

const getVehicles = () => {
  //fetch vehicles
  return vehicles
}

const getUser = () => ({
  name: "Administrador",
  email: "admin@aranem.com",
  image: userImage.jpg,
  getVehicles: () => {
    return [
      { ...getVehicles().nissan.versa, year: 2018 },
      { ...getVehicles().ford.focus, year: 2016 },
    ]
  },
})

export default function userVehicles() {
  const user = getUser()
  const userVehicles = user.getVehicles()

  const router = useRouter()

  return (
    <div className='bg-background h-full'>
      <StatusBarMargin />
      <div className='text-primary text-2xl flex gap-4'>
        <button onClick={() => router.back()} className='center h-8 aspect-square'>
          <FaChevronLeft />
        </button>
        <h2>Mis vehículos</h2>
      </div>
      <ul className='list'>
        {userVehicles.map((vehicle, i) => (
          <>
            <li key={i}>
              <Link href='#' className='list-item align-center'>
                <div className='flex-center' style={{ height: "3rem" }}>
                  <Image
                    className='img-y'
                    src={vehicle.img}
                    alt={`${vehicle.name} image`}
                    height={192}
                    width={256}></Image>
                </div>
                <div>
                  <h5>{vehicle.name}</h5>
                  <p>{vehicle.year}</p>
                </div>
              </Link>
            </li>
            {i < userVehicles.length - 1 && <hr />}
          </>
        ))}
        <li className='list-item'>
          <Link
            href='#'
            className='flex-card bg-poly center w-full text-primary-foreground text-lg'>
            <i className='text-xl'>
              <FaPlus />
            </i>
            <h5>Añadir un nuevo vehículo</h5>
          </Link>
        </li>
      </ul>
    </div>
  )
}
