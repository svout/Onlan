# Predictable Benefits Public Website

Проект переведен на `Next.js` с режимом статической сборки (`output: 'export'`).

## Команды

- `npm run dev` — локальная разработка
- `npm run build` — production build + статический экспорт в `out/`
- `npm run preview` — локальный просмотр статического `out/`
- `npm run lint` — eslint

## Переменные окружения

- `NEXT_PUBLIC_GTM_ID` — GTM ID для клиентской инициализации
- `NEXT_PUBLIC_CONTACT_FORM_URL` или `NEXT_PUBLIC_CONTACT_EMAIL` — куда отправлять форму на странице контактов (см. `.env.example`)

## Структура

- `app/` — маршруты Next.js
- `src/` — UI-компоненты и бизнес-логика
- `public/` — статические ассеты
