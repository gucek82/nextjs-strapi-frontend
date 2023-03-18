import { fetchJson } from '@/lib/api'

const CMS_URL = process.env.CMS_URL

async function handleGetCart(req, res) {
  const { jwt } = req.cookies
  if (!jwt) {
    res.status(401).end()
    return
  }
  try {
    const cart = await fetchJson(`${CMS_URL}/cart-items`, {
      headers: { Authorization: `Bearer ${jwt}` },
    })
    res.status(200).json(
      cart.map((item) => ({
        id: item.id,
        productId: item.product.id,
        title: item.product.title,
        price: item.product.price,
        quantity: item.quantity,
        total: item.quantity * item.product.price,
      }))
    )
  } catch (err) {
    res.status(401).end()
  }
}

async function handlePostCart(req, res) {
  const { jwt } = req.cookies
  if (!jwt) {
    res.status(401).end()
    return
  }
  const { productId, quantity } = req.body
  console.log(jwt, req.body)
  try {
    await fetchJson(`${CMS_URL}/cart-items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({ product: productId, quantity }),
    })
    res.status(200).json({})
  } catch (err) {
    res.status(401).end()
  }
}

async function handleCart(req, res) {
  switch (req.method) {
    case 'GET':
      return handleGetCart(req, res)
    case 'POST':
      return handlePostCart(req, res)
    default:
      res.status(405).end()
  }
}

export default handleCart
