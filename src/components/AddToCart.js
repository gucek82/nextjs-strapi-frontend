import { fetchJson } from '@/lib/api'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useMutation } from 'react-query'

function AddToCart({ product }) {
  const router = useRouter()
  const [qty, setQty] = useState(1)

  const mutation = useMutation(() =>
    fetchJson('/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product, qty }),
    })
  )

  const handleSubmit = async () => {
    await mutation.mutateAsync()
    router.push('/cart')
  }
  return (
    <div className="flex">
      <input
        type="number"
        value={qty}
        onChange={(e) => setQty(e.target.value)}
        className="border rounded px-3 py-1 w-20 mx-2"
      />
      {mutation.isLoading ? (
        <p>Loading....</p>
      ) : (
        <button
          type="submit"
          className="bg-green-800 px-4 py-2 my-2 text-gray-100 rounded hover:bg-green-700"
          onClick={handleSubmit}>
          Add To Cart
        </button>
      )}
    </div>
  )
}

export default AddToCart
