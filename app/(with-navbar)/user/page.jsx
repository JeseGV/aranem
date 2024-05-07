import Image from "next/image"
import Link from "next/link"
import StatusBarMargin from "@/components/StatusBarMargin"
import { userImage } from "@/public/assets"

import { FaCar, FaCog } from "react-icons/fa"
import { IoWallet } from "react-icons/io5"
import { HiPencil } from "react-icons/hi"
import { BiLogOut } from "react-icons/bi"
import { AiOutlineUserSwitch } from "react-icons/ai"

const getUserSettings = () => {
  return [
    {
      name: "Métodos de pago",
      icon: <IoWallet />,
      href: "#",
    },
    {
      name: "Vehículos",
      icon: <FaCar />,
      href: "user/vehicles",
    },
    {
      name: "Ajustes",
      icon: <FaCog />,
      href: "#",
    },
  ]
}

const getUser = () => ({
  name: "Administrador",
  email: "admin@aranem.com",
  image: userImage.jpg,
})

export default function Home() {
  const userSettings = getUserSettings()
  const user = getUser()

  return (
    <div className='h-full bg-background p-4 flex flex-col gap-4'>
      <StatusBarMargin />
      <h2 className='text-primary text-2xl'>Opciones de usuario</h2>
      <ul className='list'>
        <li className='list-item'>
          <div>
            <Image
              className='h-12 w-12 aspect-square rounded-full'
              src={user.image}
              alt='user image'
              height={256}
              width={256}></Image>
          </div>
          <div className='flex-grow'>
            <h5 className='text-lg'>{user.name}</h5>
            <p className='text-foreground-100'>{user.email}</p>
          </div>
          <Link href='#' className='p-4 center text-2xl text-primary'>
            <HiPencil />
          </Link>
        </li>
        {userSettings.map(({ name, icon, href }) => (
          <>
            <hr />
            <li className='w-full'>
              <Link className='list-item' href={href}>
                <i className='center text-primary'>{icon}</i>
                <h5>{name}</h5>
              </Link>
            </li>
          </>
        ))}
        <li className='list-item flex-col'>
          <button className='center flex-card bg-poly w-full text-primary-foreground text-lg'>
            <i className='text-xl'>
              <BiLogOut />
            </i>
            <h5>Cerrar sesión</h5>
          </button>
          <button className='center flex-card bg-poly w-full text-primary-foreground text-lg'>
            <i className='text-xl'>
              <AiOutlineUserSwitch />
            </i>
            <h5>Usar otra cuenta</h5>
          </button>
        </li>
      </ul>
    </div>
  )
}
