import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const adminPassword = process.env.ADMIN_PASSWORD

  if (!adminPassword) {
    console.error('ADMIN_PASSWORD is not set')
    return NextResponse.json({ error: 'Admin access not configured' }, { status: 500 })
  }

  try {
    const { password } = await request.json()

    if (typeof password !== 'string' || password.length === 0) {
      return NextResponse.json({ valid: false }, { status: 400 })
    }

    if (password === adminPassword) {
      return NextResponse.json({ valid: true })
    }

    return NextResponse.json({ valid: false }, { status: 401 })
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }
}
