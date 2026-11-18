import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

const Header = ({ children, className }: HeaderProps) => {
  return (
    <div className={cn("header", className)}>
      <Link href='/' className="brand-link" aria-label="LiveDocs home">
        <Image 
          src="/assets/icons/logo.svg"
          alt="LiveDocs"
          width={120}
          height={32}
          className="brand-logo"
        />
        <Image 
          src="/assets/icons/logo-icon.svg"
          alt="Logo"
          width={32}
          height={32}
          className="mr-2 md:hidden"
        />
      </Link>
      {children}
    </div>
  )
}

export default Header