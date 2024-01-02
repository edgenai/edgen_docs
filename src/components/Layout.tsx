'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Logo } from '@/components/Logo'
import { Navigation } from '@/components/Navigation'
import { type Section, SectionProvider } from '@/components/SectionProvider'

export function Layout({
  children,
  allSections,
}: {
  children: React.ReactNode
  allSections: Record<string, Array<Section>>
}) {
  let pathname = usePathname()

  return (
    <SectionProvider sections={allSections[pathname] ?? []}>
      <div className="h-full clg:ml-72 xl:ml-80">
        <motion.header
          layoutScroll
          className="contents clg:pointer-events-none clg:fixed clg:inset-0 clg:z-40 clg:flex"
        >
          <div className="contents clg:pointer-events-auto clg:block clg:w-72 clg:overflow-y-auto clg:border-r clg:border-zinc-900/10 clg:px-6 clg:pb-8 clg:pt-4 clg:dark:border-white/10 xl:w-80">
            <div className="hidden clg:flex clg:mt-2">
              <Link href="/" aria-label="Home">
                <Logo className="h-14" />
              </Link>
            </div>
            <Header />
            <Navigation className="hidden clg:mt-7 clg:block" />
          </div>
        </motion.header>
        <div className="relative flex h-full flex-col px-4 pt-14 sm:px-6 clg:px-8">
          <main className="flex-auto">{children}</main>
          <Footer />
        </div>
      </div>
    </SectionProvider>
  )
}
