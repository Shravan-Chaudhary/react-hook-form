import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'

const Navbar = () => {
  return (
    <div className='bg-zinc-100 py-2 border-b border-s-zinc-200 fixed w-full z-10'>
      <div className='container flex items-center justify-between'>
        <Link href='/'>Logo</Link>

        <Link
          href='/sign-in'
          className={buttonVariants({ variant: 'default' })}
        >
          Login
        </Link>
      </div>
    </div>
  )
}

export default Navbar
