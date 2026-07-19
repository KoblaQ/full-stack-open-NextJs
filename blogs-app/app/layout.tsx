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
        {children}
      </body>
    </html>
  )
}
