
import { useState, useEffect } from "react"

interface UseApiState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

export function useApi<T>(apiFunction: () => Promise<T>, dependencies: any[] = []) {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    let isMounted = true

    const fetchData = async () => {
      try {
        setState((prev) => ({ ...prev, loading: true, error: null }))
        const result = await apiFunction()
        if (isMounted) {
          setState({ data: result, loading: false, error: null })
        }
      } catch (error: any) {
        if (isMounted) {
          setState({ data: null, loading: false, error: error.message })
        }
      }
    }

    fetchData()

    return () => {
      isMounted = false
    }
  }, dependencies)

  return state
}
