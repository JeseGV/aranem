"use client"

import { Select, SelectItem } from "@nextui-org/select"
import { useState, useEffect } from "react"

export default function MySelect({ items, label, setSpecs }) {
  const handleSelectionChange = e => {
    setValue(new Set([e.target.value]))
    setSpecs(prev => [
      ...prev.filter(spec => spec.label != label),
      { label, value: e.target.value },
    ])
  }

  const [value, setValue] = useState(new Set([items[0]]))

  useEffect(() => {
    setSpecs(prev => [...prev.filter(spec => spec.label != label), { label, value: items[0] }])
  }, [])

  return (
    <Select
      variant='flat'
      className='text-foreground'
      classNames={{ trigger: "bg-background shadow-md" }}
      items={items}
      label={label}
      onChange={handleSelectionChange}
      selectedKeys={value}
      disallowEmptySelection
      defaultSelectedKeys={value}>
      {items.map(item => (
        <SelectItem key={item} value={item}>
          {item}
        </SelectItem>
      ))}
    </Select>
  )
}
