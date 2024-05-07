import NextLink from "next/link"

import { Button, ButtonGroup } from "@nextui-org/button"

import { AiFillHome } from "react-icons/ai"
import { FaUserAlt } from "react-icons/fa"
import { IoSparkles } from "react-icons/io5"

const links = [
  {
    name: "services",
    href: "/services",
    icon: <IoSparkles />,
  },
  {
    name: "home",
    href: "/home",
    icon: <AiFillHome />,
  },
  {
    name: "user",
    href: "/user",
    icon: <FaUserAlt />,
  },
]

export default function NavBar() {
  return (
    <ButtonGroup radius='none' className='bg-background flex space-evenly shadow-standard z-30'>
      {links.map(({ name, href, icon }) => (
        <Button
          key={name}
          as={NextLink}
          href={href}
          replace
          className='bg-transparent h-12 center flex-1 text-primary text-2xl'
          isIconOnly>
          {icon}
        </Button>
      ))}
    </ButtonGroup>
  )
}
