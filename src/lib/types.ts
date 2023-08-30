import { z } from 'zod'

export const signInSchema = z.object({
  email: z.string().email('Invalid Email').min(1, 'Email is required'),
  password: z.string().min(8, 'Password must be atleast 8 characters'),
})

export const signUpSchema = z
  .object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid Email').min(1, 'Email is required'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must be atleast 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  })

export type TSignUpSchema = z.infer<typeof signUpSchema>
export type TSignInSchema = z.infer<typeof signInSchema>
