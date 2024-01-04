'use client'
import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { withErrorHandlingAsync } from '@/utils/errHandling'
import { ToastStatus, useToast } from '@/contexts/ToastContext'

export const useAsyncAction = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [isPending, startTransition] = useTransition()
  const [isCalledOnce, setIsCalledOnce] = useState(false)
  const { addToast } = useToast()

  const router = useRouter()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const runAsync = async <T>(asyncFunction: (...args: any) => Promise<T>) => {
    try {
      setIsCalledOnce(true)
      setLoading(true)
      setError(null)
      await withErrorHandlingAsync(asyncFunction)

      startTransition(() => {
        // Refresh the current route and fetch new data from the server without
        // losing client-side browser or React state.
        router.refresh()
      })
    } catch (e) {
      if (e instanceof Error) {
        setError(e)
        addToast(String(e), ToastStatus.INVALID)
      }
    } finally {
      setLoading(false)
    }
  }

  return { runAsync, loading: loading || isPending, error, isCalledOnce }
}
