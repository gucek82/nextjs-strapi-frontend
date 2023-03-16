import Page from '@/components/Page'
import ProductCard from '@/components/ProductCard'
import { getProducts } from '@/lib/products'

export async function getStaticProps() {
  const products = await getProducts()
  return { props: { products } }
}

export default function HomePage({ products }) {
  return (
    <Page title="Indor Plants">
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </Page>
  )
}
