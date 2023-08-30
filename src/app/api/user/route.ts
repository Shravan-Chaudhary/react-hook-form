import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { hash } from 'bcrypt'
import { signUpSchema } from '@/lib/types'

export async function POST(req: Request) {
  try {
    const body: unknown = await req.json()
    // Validating request body
    const validatedBody = signUpSchema.safeParse(body)
    if (!validatedBody.success) {
      return NextResponse.json(
        {
          user: null,
          message: validatedBody.error.message,
        },
        { status: 400 },
      )
    }
    const { name, email, password } = validatedBody.data

    // Check if email already exists
    const existingUserByEmail = await db.user.findUnique({
      where: {
        email: email,
      },
    })

    if (existingUserByEmail) {
      return NextResponse.json(
        {
          user: null,
          message: 'User with this email already exists',
        },
        { status: 409 },
      )
    }

    // Hashing Password before creating user
    const hashedPassword = await hash(password, 10)

    // Creating new User
    const newUser = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })

    //  Removing password from response
    const { password: newUserPassword, ...user } = newUser

    return NextResponse.json(
      {
        user: user,
        message: 'User Created Successfully',
      },
      { status: 201 },
    )
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { user: null, message: 'Something went wrong' },
      { status: 500 },
    )
  }
}
