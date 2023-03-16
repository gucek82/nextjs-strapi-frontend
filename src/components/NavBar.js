import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { fetchJson } from '@/lib/api'

function NavBar() {
  const [user, setUser] = useState()

  useEffect(() => {
    ;(async () => {
      try {
        const user = await fetchJson('/api/user')
        setUser(user)
      } catch (err) {
        // not sign in
      }
    })()
  }, [])

  const handleSignOut = async () => {
    await fetchJson('api/logout')
    setUser(undefined)
  }

  console.log(user)
  return (
    <nav className="px-2 py-1">
      <ul className="flex gap-2">
        <li className="text-lg font-extrabold">
          <Link href="/">Next Shop</Link>
        </li>
        <li role="separator" className="flex-1" />
        {user ? (
          <>
            <li>{user.name}</li>
            <li>
              <button onClick={handleSignOut}>Sign Out</button>
            </li>
          </>
        ) : (
          <li>
            <Link href="/sign-in">Sign In</Link>
          </li>
        )}
      </ul>
    </nav>
  )
}

export default NavBar
