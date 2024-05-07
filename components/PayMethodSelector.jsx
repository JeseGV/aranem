"use client"

import { BiMoney, BiCreditCard } from "react-icons/bi"
import { useState, useEffect } from "react"

import { Select, SelectItem } from "@nextui-org/select"

export default function PayMethodSelector({ setSpecs }) {
  const paymentMethods = [
    {
      name: "Pago en efectivo",
      icon: <BiMoney />,
    },
    {
      name: "Tarjeta de crédito",
      icon: <BiCreditCard />,
    },
  ]

  const handleSelectionChange = e => {
    setValue(new Set([e.target.value]))
    setSpecs(prev => [
      ...prev.filter(spec => spec.label != "Método de pago"),
      { label: "Método de pago", value: e.target.value },
    ])
  }

  const [value, setValue] = useState(new Set([paymentMethods[1].name]))
  const icon = paymentMethods.find(({ name }) => name == value.values().next().value).icon

  useEffect(() => {
    setSpecs(prev => [
      ...prev.filter(spec => spec.label != "Método de pago"),
      { label: "Método de pago", value: paymentMethods[1].name },
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
      items={paymentMethods}
      label='Método de pago'
      selectedKeys={value}
      defaultSelectedKeys={value}
      disallowEmptySelection
      startContent={<i className='text-[4.2rem]'>{icon}</i>}
      onChange={handleSelectionChange}>
      {paymentMethods.map(({ name, icon }) => (
        <SelectItem key={name} value={name} startContent={<i className='text-xl py-2'>{icon}</i>}>
          {name}
        </SelectItem>
      ))}
    </Select>
  )
}
