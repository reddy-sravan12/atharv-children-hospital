import type { Metadata } from 'next'
import { DM_Sans, Playfair_Display } from 'next/font/google'
import Providers from './Providers'
import '../styles/globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['500', '700'],
  style: ['normal', 'italic'],
  variable: '--font-heading',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Atharva Children's Hospital | Expert Healthcare",
  description:
    "Atharva Children's Hospital – Compassionate Care, Advanced Medicine. Book appointments with top specialists.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      </head>
      <body className={`${dmSans.variable} ${playfair.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}