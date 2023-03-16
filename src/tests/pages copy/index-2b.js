// Option 2 fetch product on the client side (in useEffect)
// Fetchin from inernal API route

import Title from '@/components/Title'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { getProducts } from '@/lib/products'

export default function HomePage() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    ;(async () => {
      const response = await fetch('/api/products')
      const products = await response.json()
      setProducts(products)
    })()
  }, [])

  return (
    <>
      <Head>
        <title>Next Shop</title>
      </Head>
      <main className="px-6 py-4">
        <Title>Next Shop</Title>
        <ul>
          {products.map((product) => (
            <li key={product.id}>{product.title}</li>
          ))}
        </ul>
      </main>
    </>
  )
}
