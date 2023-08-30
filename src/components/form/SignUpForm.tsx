'use client'

import { useForm } from 'react-hook-form'
import { signUpSchema, TSignUpSchema } from '@/lib/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const SignUpForm = () => {
  const router = useRouter()
  const form = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema),
  })

  async function onSubmit(data: TSignUpSchema) {
    const response = await fetch('/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
      }),
    })
    if (response.ok) {
      router.push('/sign-in')
    } else {
      console.error(response.statusText)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-6'>
        <div className='space-y-6'>
          {/*Name Field */}
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem className='space-y-1'>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder='John Doe' type='name' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email Field */}
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem className='space-y-1'>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder='johndoe@email.com'
                    type='email'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Password Field */}
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem className='space-y-1'>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder='password' type='password' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Confirm Password Field */}
          <FormField
            control={form.control}
            name='confirmPassword'
            render={({ field }) => (
              <FormItem className='space-y-1'>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Confirm Password'
                    type='password'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type='submit' className='w-full mt-6'>
          Sign Up
        </Button>
      </form>
      <div className='mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'>
        or
      </div>
      <p className='text-center text-sm text-gray-800 mt-2'>
        If you already have an account, please&nbsp;&nbsp;
        <Link href='/sign-up' className='text-blue-500 hover:underline'>
          Sign In
        </Link>
      </p>
    </Form>
  )
}

export default SignUpForm
