import Button from '@/components/Button'
import Field from '@/components/Field'
import Input from '@/components/Input'
import Page from '@/components/Page'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useSignIn } from '../../hooks/user'

function SignInPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { signIn, signInError, signInLoading } = useSignIn()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const valid = await signIn(email, password)
    if (valid) {
      router.push('/')
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
        {signInError && <p className="text-red-700">Invalid Cridentials</p>}
        {signInLoading ? (
          <p>Loading...</p>
        ) : (
          <Button type="submit">Sign In</Button>
        )}
      </form>
    </Page>
  )
}

export default SignInPage
