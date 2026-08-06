'use client'

// import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'

import { useNotification } from '../components/NotificationContext'
import NavLink from './NavLink'

export default function NavBar() {
  const { data: session } = useSession()
  const { showNotification } = useNotification()

  const handleLogout = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    showNotification('Logged out successfully')
    signOut()
  }

  return (
    <nav className="bg-gray-800 text-white px-6 flex items-center gap-4">
      <NavLink href={'/'}>home</NavLink>
      <NavLink href={'/blogs'}>blogs</NavLink>
      <NavLink href={'/users'}>users</NavLink>
      {session && <NavLink href={'/blogs/new'}>Add blog</NavLink>}
      <div className="ml-auto flex items-center gap-4">
        {session ? (
          <>
            <em>{session.user?.name} logged in</em>{' '}
            <button
              onClick={handleLogout}
              className="bg-gray-600 px-3 py-1 rounded text-sm"
            >
              logout
            </button>
            {/* <button onClick={() => signOut()}>logout</button> */}
          </>
        ) : (
          <>
            <NavLink href="/login">login</NavLink>
            <NavLink href="/register">register</NavLink>
          </>
        )}
      </div>
    </nav>
  )
}
