import React from 'react'
import Link from 'next/link'
import { useSignOut, useUser } from '../../hooks/user'
import { useRouter } from 'next/router'

function NavBar() {
  const user = useUser()
  const singOut = useSignOut()
  const router = useRouter()

  const handleLogOut = () => {
    singOut()
    router.push('/')
  }
  return (
    <nav className="px-2 py-1">
      <ul className="flex gap-2">
        <li className="text-lg font-extrabold">
          <Link href="/">Next Shop</Link>
        </li>
        <li role="separator" className="flex-1" />
        {user ? (
          <>
            <li>
              <Link href="/cart">Cart</Link>
            </li>
            <li>{user.name}</li>
            <li>
              <button onClick={handleLogOut}>Sign Out</button>
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
