import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'

const Navbar = () => {
  return (
    <div className='bg-zinc-100 py-2 border-b border-s-zinc-200 fixed w-full z-10'>
      <div className='container flex items-center justify-between font-semibold md:font-bold text-xl md:text-2xl'>
        <Link href='/'>Logo</Link>

        <Link
          href='/sign-in'
          className={buttonVariants({ variant: 'default' })}
        >
          Signin
        </Link>
      </div>
    </div>
  )
}

export default Navbar
