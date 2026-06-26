Проект переведен на `Next.js` с режимом статической сборки (`output: 'export'`).

## Команды

- `npm run dev` — локальная разработка
- `npm run build` — production build (`.next/`, for `next start`)
- `npm run build:static` — static export to `out/` (used for cPanel deployment)
- `npm run export` — alias for `build:static`
- `npm run preview` — локальный просмотр статического `out/`
- `npm run lint` — eslint

## Переменные окружения

- `NEXT_PUBLIC_GTM_ID` — GTM ID для клиентской инициализации
- `NEXT_PUBLIC_CONTACT_FORM_URL` или `NEXT_PUBLIC_CONTACT_EMAIL` — куда отправлять форму на странице контактов (см. `.env.example`)

## Структура

- `app/` — маршруты Next.js
- `src/` — UI-компоненты и бизнес-логика
- `public/` — статические ассеты

## Деплой на cPanel (Git)

1. У файле `.cpanel.yml` замените `USERNAME` на имя вашего cPanel-аккаунта в `DEPLOYPATH` (обычно `/home/ваш_логин/public_html/`).
2. Закоммитьте и запушьте `.cpanel.yml` в репозиторий, который подключён в cPanel.
3. В cPanel → **Git Version Control** нажмите **Update from Remote**, затем **Deploy HEAD Commit**.
4. Если появляется ошибка *«No uncommitted changes»* — на **сервере** в клоне репозитория не должно быть локальных правок. Сбросьте их (discard) или сделайте pull без изменений в рабочей копии на хостинге.

Локально перед push: `git status` должен показывать *working tree clean*.
