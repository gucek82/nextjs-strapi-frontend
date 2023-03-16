import Title from '@/components/Title'
import { getProducts } from '@/lib/products'
import Head from 'next/head'

export async function getStaticProps() {
  const products = await getProducts()
  return { props: { products }, revalidate: 5 * 60 }
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
