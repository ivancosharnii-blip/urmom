/**
 * Supabase env:
 * - Сервер (proxy, Server Components): SUPABASE_* читаются в runtime при `next start` / на Vercel.
 *   NEXT_PUBLIC_* в серверном бандле могут быть «зашиты» пустыми, если билд без .env.
 * - Клиент: только NEXT_PUBLIC_* (подставляются при сборке).
 */

/** URL для Node-сервера и proxy */
export function getServerSupabaseUrl(): string {
  return (
    process.env.SUPABASE_URL ??
    process.env.NEXT_PUBLIC_SUPABASE_URL ??
    ""
  ).trim();
}

/** Ключ для Node-сервера и proxy (anon / publishable) */
export function getServerSupabaseKey(): string {
  return (
    process.env.SUPABASE_ANON_KEY ??
    process.env.SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
    ""
  ).trim();
}

/** URL в браузере */
export function getBrowserSupabaseUrl(): string {
  return (process.env.NEXT_PUBLIC_SUPABASE_URL ?? "").trim();
}

/** Ключ в браузере */
export function getBrowserSupabaseKey(): string {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
    ""
  ).trim();
}

export function assertSupabaseServerEnv(): void {
  const url = getServerSupabaseUrl();
  const key = getServerSupabaseKey();
  if (!url || !key) {
    throw new Error(
      "Задайте в .env.local переменные SUPABASE_URL и SUPABASE_ANON_KEY " +
        "(или SUPABASE_PUBLISHABLE_KEY), либо NEXT_PUBLIC_* и пересоберите проект. " +
        "Для `pnpm preview` / production без пересборки нужны SUPABASE_* (см. .env.example). " +
        "https://supabase.com/dashboard/project/_/settings/api"
    );
  }
}

export function assertSupabaseBrowserEnv(): void {
  const url = getBrowserSupabaseUrl();
  const key = getBrowserSupabaseKey();
  if (!url || !key) {
    throw new Error(
      "Задайте NEXT_PUBLIC_SUPABASE_URL и публичный ключ в .env.local и выполните next build."
    );
  }
}
