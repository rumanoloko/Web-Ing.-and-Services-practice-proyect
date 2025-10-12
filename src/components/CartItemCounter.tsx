'use client'
/*
import {useState, useEffect} from 'react'
interface CartItemCounterProps {
  userId: string
  productId: string
  value: number
}
export default function CartItemCounter(
  { userId, productId, value, }
  : CartItemCounterProps) {
  const router = useRouter()
  const [isUpdating, setIsUpdating] = useState(false)

  const onPlusBtnClick = async function () {
    setIsUpdating(true)
      try {
      await fetch(`/api/users/${userId}/cart/${productId}`, {
        method: 'PUT',
        body: JSON.stringify({
          qty: value + 1,
        }),
      })
      router.refresh()
    } finally {
      setIsUpdating(false)
    }
  }
  }
*/