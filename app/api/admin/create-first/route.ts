import { NextResponse } from 'next/server'
import { hash } from 'bcryptjs'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const json = await request.json()
    const { email, password } = json

    const existingAdmin = await prisma.admin.findFirst()
    if (existingAdmin) {
      return NextResponse.json(
        { error: 'Admin already exists' },
        { status: 400 }
      )
    }

    const hashedPassword = await hash(password, 12)
    
    const admin = await prisma.admin.create({
      data: {
        email,
        password: hashedPassword,
      },
    })

    return NextResponse.json({
      id: admin.id,
      email: admin.email,
    })
  } catch (error) {
    console.error('Error creating admin:', error)
    return NextResponse.json(
      { error: 'Failed to create admin' },
      { status: 500 }
    )
  }
}
