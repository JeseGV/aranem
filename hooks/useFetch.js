import { useState, useEffect } from "react"

const useFetch = (url, options) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, options)
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
        const data = await response.json()
        setData(data.results)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
    return () => {
      //  TODO add cleanup function
    }
  }, [])
  return { data, loading, error }
}

export default useFetch
