import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, password } = body

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

    // Creating new User
    const newUser = await db.user.create({
      data: {
        name,
        email,
        password,
      },
    })

    // Where i left off: Created User, now encrypt the password using bcrypt

    return NextResponse.json(body)
  } catch (error) {}
}
