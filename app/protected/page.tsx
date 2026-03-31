import { redirect } from 'next/navigation'

import { LogoutButton } from '@/components/logout-button'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export default async function ProtectedPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getClaims()
  if (error || !data?.claims) {
    redirect('/auth/login')
  }

  return (
    <div className="flex h-svh w-full flex-col items-center justify-center gap-4 px-4">
      <div className="text-center">
        <h1 className="text-xl font-semibold text-foreground">Личный кабинет</h1>
        <p className="text-muted-foreground mt-1">{data.claims.email}</p>
        <p className="text-sm text-muted-foreground mt-4 max-w-sm">
          Фотографии на сайте задаются в коде: файл{' '}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">
            components/masonry-gallery.tsx
          </code>
          , сами файлы — в{' '}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">public/photos/</code>.
        </p>
      </div>
      <LogoutButton />
    </div>
  )
}
