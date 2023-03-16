async function handleRevalidate(req, res) {
  const event = req.body
  if (event.mode === 'product') {
    const id = event.enter.id
    await Promise.all([res.revalidate('/'), res.revalidate(`/products/${id}`)])
    console.log(`revalidated product ${id}`)
  }
  res.status(204).end()
}

export default handleRevalidate
