import { z } from 'zod'

export const signInSchema = z.object({
  email: z.string().email('Invalid Email').min(1, 'Email is required'),
  password: z.string().min(8, 'Password must be atleast 8 characters'),
})

export type TSignInSchema = z.infer<typeof signInSchema>
