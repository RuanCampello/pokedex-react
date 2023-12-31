import type { Metadata } from 'next'
import { Fira_Sans } from 'next/font/google'
import './globals.css'

const firaSans = Fira_Sans({ weight: ['400', '500', '600', '700'], subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Pokedex',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={firaSans.className}>{children}</body>
    </html>
  )
}
