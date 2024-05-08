"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import people from "@/DB/people"

import { Select, SelectItem } from "@nextui-org/select"

export default function PeopleSelector({ setSpecs }) {
  const userpeople = [
    { ...people.p1 },
    { ...people.p2 }
  ]
  const handleSelectionChange = e => {
    setValue(new Set([e.target.value]))
    setSpecs(prev => prev.filter(spec => spec.label != "people1"))
    setSpecs(prev => [
      ...prev.filter(spec => spec.label != "people"),
      {
        label: "people",
        value: e.target.value,
        img: userpeople.find(people => people.name == e.target.value).img,
      },
    ])
  }

  const [value, setValue] = useState(new Set([userpeople[0].name]))
  const img = userpeople.find(({ name }) => name == value.values().next().value).img

  useEffect(() => {
    setSpecs(prev => [
      ...prev.filter(spec => spec.label != "people"),
      { label: "people", value: userpeople[0].name, img },
    ])
  }, [])

  return (
    <Select
      className='text-primary-foreground'
      variant='flat'
      labelPlacement='outside'
      classNames={{
        base: "pt-[2rem]",
        trigger: "bg-gradient h-[5rem]",
        label: "pb-[1rem]",
      }}
      size='lg'
      items={userpeople}
      label='Mecanico'
      selectedKeys={value}
      defaultSelectedKeys={value}
      disallowEmptySelection
      startContent={
        <i className='aspect-square bg-primary-foreground bg-opacity-10 h-16 center mr-2 rounded-md'>
          <Image className='scale-125' width={92} height={92} src={img} />
        </i>
      }
      onChange={handleSelectionChange}>
      {userpeople.map(({ name, img }) => (
        <SelectItem
          key={name}
          value={name}
          startContent={<Image width={92} height={92} src={img} />}>
          {name}
        </SelectItem>
      ))}
    </Select>
  )
}
