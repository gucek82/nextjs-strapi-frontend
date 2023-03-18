import Page from '@/components/Page'
import { fetchJson } from '@/lib/api'
import React from 'react'
import { useQuery } from 'react-query'
import { useCart } from '../../hooks/cart'

function CartPage() {
  // const cart = useCart()
  const query = useQuery('cartItem', () => fetchJson('/api/cart'))
  const cartItems = query.data
  const status = query.status

  const total = []
  let result

  return (
    <Page title="Cart">
      {status === 'loading' && <p>Loading...</p>}
      {status === 'success' && (
        <>
          <table className="border-spacing-2 col-span-4 border">
            <thead className="font-bold border bg-slate-400">
              <tr>
                <td className="px-4 py-2">Name</td>
                <td className="px-4 py-2">Quantity</td>
                <td className="px-4 py-2">Price</td>
                <td className="px-4 py-2">Sum</td>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => {
                {
                  total.push(item.total)
                  result = total.reduce((a, b) => {
                    return a + b
                  }, 0)
                }
                return (
                  <tr key={item.id}>
                    <td className="px-4 py-2">{item.title}</td>
                    <td className="text-right px-4 py-2">{item.quantity} </td>
                    <td className="text-right px-4 py-2">
                      {' '}
                      ${item.price.toFixed(2)}
                    </td>
                    <td className="text-right px-4 py-2">
                      {' '}
                      ${item.total.toFixed(2)}
                    </td>
                  </tr>
                )
              })}
              <tr className="bg-slate-100">
                <td className="px-4 py-2 font-bold">Total</td>
                <td className="px-4 py-2"></td>
                <td className="px-4 py-2"></td>
                <td className="px-4 py-2 font-bold">
                  {result && `${result?.toFixed(2)}`}
                </td>
              </tr>
            </tbody>
          </table>
          <ul></ul>
        </>
      )}
    </Page>
  )
}

export default CartPage
