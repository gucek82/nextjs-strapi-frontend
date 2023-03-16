// Option 1 fetch product on the sever side (in getStaticProps)
// Incremental Static Regeneration (in getStaticProps)

import Title from '@/components/Title'
import { getProducts } from '@/lib/products'
import Head from 'next/head'

export async function getStaticProps() {
  const products = await getProducts()
  return { props: { products }, revalidate: 30 }
}

export default function HomePage({ products }) {
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
