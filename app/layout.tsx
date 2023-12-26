
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import NextauthSession from './components/nextauthSession'
import Authprovider from './components/authprovider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'baraawo app',
  description: 'by me',
}
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // const session =  useSession();
  return (
    <html lang="en">
      <body className=
        {inter.className}>
          <NextauthSession>
            <Authprovider>

          {children}
            </Authprovider>

          </NextauthSession>


      </body>
    </html>
  )
}
