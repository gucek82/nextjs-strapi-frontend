import { fetchJson } from '@/lib/api'
import { useMutation, useQuery, useQueryClient } from 'react-query'

const CART_QUERY_KEY = 'cart'

export function useCart() {
  const query = useQuery(
    CART_QUERY_KEY,
    async () => {
      try {
        return await fetchJson('/api/cart')
      } catch (err) {
        return undefined
      }
    },
    {
      cacheTime: Infinity,
      staleTime: 0,
    }
  )
  const { data, status } = query
  return { data, status }
}
