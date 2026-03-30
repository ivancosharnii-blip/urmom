import { type NextRequest, NextResponse } from 'next/server'

import {
  GUEST_BROWSE_COOKIE,
  guestBrowseMaxAgeSeconds,
} from '@/lib/guest-browse'

export async function GET(request: NextRequest) {
  const home = new URL('/', request.nextUrl.origin)
  const res = NextResponse.redirect(home)
  res.cookies.set(GUEST_BROWSE_COOKIE, '1', {
    httpOnly: true,
    path: '/',
    maxAge: guestBrowseMaxAgeSeconds,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  })
  return res
}
