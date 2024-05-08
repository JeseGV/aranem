"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import vehicles from "@/DB/vehicles"

import { Select, SelectItem } from "@nextui-org/select"

export default function VehicleSelector({ setSpecs }) {
  const userVehicles = [
    { ...vehicles.nissan.versa, year: 2018 },
    { ...vehicles.ford.focus, year: 2016 },

  ]
  const handleSelectionChange = e => {
    setValue(new Set([e.target.value]))
    setSpecs(prev => prev.filter(spec => spec.label != "Vehículo"))
    setSpecs(prev => [
      ...prev.filter(spec => spec.label != "Vehículo"),
      {
        label: "Vehículo",
        value: e.target.value,
        img: userVehicles.find(vehicle => vehicle.name == e.target.value).img,
      },
    ])
  }

  const [value, setValue] = useState(new Set([userVehicles[0].name]))
  const img = userVehicles.find(({ name }) => name == value.values().next().value).img

  useEffect(() => {
    setSpecs(prev => [
      ...prev.filter(spec => spec.label != "Vehículo"),
      { label: "Vehículo", value: userVehicles[0].name, img },
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
      items={userVehicles}
      label='Vehículo'
      selectedKeys={value}
      defaultSelectedKeys={value}
      disallowEmptySelection
      startContent={
        <i className='aspect-square bg-primary-foreground bg-opacity-10 h-16 center mr-2 rounded-md'>
          <Image className='scale-125' width={92} height={92} src={img} />
        </i>
      }
      onChange={handleSelectionChange}>
      {userVehicles.map(({ name, img }) => (
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
