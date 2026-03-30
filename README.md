# Проект

Next.js-приложение в **корне** репозитория (удобно для Vercel: без подпапки и без `builds` в `vercel.json`).

## Деплой на Vercel

1. Подключи репозиторий: **Add New Project** → Import.
2. **Root Directory** оставь **пустым** (`.`). Framework: **Next.js** (определится по `package.json`).
3. **Environment Variables** — как в [`.env.example`](.env.example): `NEXT_PUBLIC_SUPABASE_*`, `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY` (или `SUPABASE_ANON_KEY`) для Production и Preview.
4. **Deploy**.

### Если снова 404 или «NOT_FOUND»

1. **Deployments** → открой последний деплой → вкладка **Building** / **Build Logs**. Если сборка красная — исправь ошибку из лога (часто не хватает переменных на этапе `next build`).
2. **Settings → Environment Variables** — для **Production** и **Preview** должны быть заданы все ключи из [`.env.example`](.env.example). После добавления переменных обязателен **Redeploy** (старый билд их не подхватит).
3. **Settings → General → Root Directory** — поле **пустое** (корень репозитория). Если там написано `my-app` — очисти и сохрани.
4. Открывай URL из карточки **Production** или **Preview** в разделе **Deployments**, а не старый закладочный адрес от удалённого деплоя.

### Supabase

В Dashboard → **Authentication → URL Configuration** добавь `https://<проект>.vercel.app/auth/confirm` в **Redirect URLs** и выставь **Site URL** на тот же хост.

### Локально

```bash
pnpm install
pnpm dev
```
