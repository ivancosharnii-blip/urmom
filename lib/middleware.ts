import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

import { GUEST_BROWSE_COOKIE } from '@/lib/guest-browse'
import { getServerSupabaseKey, getServerSupabaseUrl } from '@/lib/supabase-env'

function copyCookies(from: NextResponse, to: NextResponse) {
  from.cookies.getAll().forEach(({ name, value }) => {
    to.cookies.set(name, value)
  })
}

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const serverUrl = getServerSupabaseUrl()
  const serverKey = getServerSupabaseKey()
  if (!serverUrl || !serverKey) {
    console.error(
      '[supabase] Нет SUPABASE_URL/SUPABASE_* или NEXT_PUBLIC_* на сервере. Добавь переменные в Vercel → Settings → Environment Variables и сделай Redeploy.'
    )
    return NextResponse.next({ request })
  }

  // With Fluid compute, don't put this client in a global environment
  // variable. Always create a new one on each request.
  const supabase = createServerClient(
    serverUrl,
    serverKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Do not run code between createServerClient and
  // supabase.auth.getClaims(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  // IMPORTANT: If you remove getClaims() and you use server-side rendering
  // with the Supabase client, your users may be randomly logged out.
  const { data } = await supabase.auth.getClaims()
  const user = data?.claims

  const path = request.nextUrl.pathname
  const guestBrowse =
    request.cookies.get(GUEST_BROWSE_COOKIE)?.value === '1'
  const isPublic =
    path === '/' ||
    path.startsWith('/auth') ||
    path.startsWith('/login')

  /** Гость на главной — регистрация, если не выбрано «продолжить как гость» */
  if (!user && path === '/' && !guestBrowse) {
    const url = request.nextUrl.clone()
    url.pathname = '/auth/sign-up'
    url.search = ''
    const redirectResponse = NextResponse.redirect(url)
    copyCookies(supabaseResponse, redirectResponse)
    return redirectResponse
  }

  if (!user && !isPublic) {
    const url = request.nextUrl.clone()
    url.pathname = '/auth/login'
    const redirectResponse = NextResponse.redirect(url)
    copyCookies(supabaseResponse, redirectResponse)
    return redirectResponse
  }

  // IMPORTANT: You *must* return the supabaseResponse object as it is.
  // If you're creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!

  return supabaseResponse
}
