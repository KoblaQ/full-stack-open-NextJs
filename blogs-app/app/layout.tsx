import Link from 'next/link'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Link href={'/'}>home</Link>
        {' | '}
        <Link href={'/blogs'}>blogs</Link>
        {' | '}
        <Link href={'/users'}>users</Link>
        {' | '}
        <Link href={'/blogs/new'}>Add blog</Link>
        {children}
      </body>
    </html>
  )
}
