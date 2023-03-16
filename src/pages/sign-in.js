import Button from '@/components/Button'
import Field from '@/components/Field'
import Input from '@/components/Input'
import Page from '@/components/Page'
import { fetchJson } from '@/lib/api'
import React, { useState } from 'react'
import { useRouter } from 'next/router'

function SignInPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState({ loading: false, error: false })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus({ loading: true, error: false })
    try {
      const response = await fetchJson('api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      setStatus({ loading: false, error: false })
      console.log('sign in: ', response)
      router.push('/')
    } catch (err) {
      setStatus({ error: true, loading: false })
    }
  }

  return (
    <Page title="Sign In">
      <form onSubmit={handleSubmit}>
        <Field label="Email">
          <Input
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </Field>
        <Field label="Password">
          <Input
            type="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </Field>
        {status.error && <p className="text-red-700">Invalid Cridentials</p>}
        {status.loading ? (
          <p>Loading...</p>
        ) : (
          <Button type="submit">Sign In</Button>
        )}
      </form>
    </Page>
  )
}

export default SignInPage
