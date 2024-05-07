import { useState, useEffect } from "react"

const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(initialValue)
  const [firstRender, setFirstRender] = useState(true)
  // const [value, setValue] = useState(
  //   window?.localStorage?.getItem(key)
  //     ? JSON.parse(window?.localStorage?.getItem(key))
  //     : initialValue
  // )
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window?.localStorage?.getItem(key) && firstRender) {
        setValue(JSON.parse(window?.localStorage?.getItem(key)))
        setFirstRender(false)
      }
      const item = JSON.stringify(value)
      window?.localStorage?.setItem(key, item)
    }
  }, [value])
  return [value, setValue]
}

export default useLocalStorage
