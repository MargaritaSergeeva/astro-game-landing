# TWILIGHTHAVEN Landing

Статический лендинг игровой студии TWILIGHTHAVEN на Astro.

## Требования

- Node.js `>=24.18.0 <25`
- Yarn `4.17.0`

Если используется `nvm`:

```bash
nvm use
```

## Установка

```bash
corepack enable
yarn install
```

`corepack` нужен, чтобы проект использовал Yarn той версии, которая указана в `package.json`:

```json
"packageManager": "yarn@4.17.0"
```

После `corepack enable` можно запускать обычные команды `yarn ...`, не устанавливая Yarn глобально вручную.

## Запуск локально

```bash
yarn dev
```

Сайт откроется на локальном адресе Astro, обычно `http://localhost:4321`.

## Проверка проекта

```bash
yarn validate
```

Команда проверяет форматирование, ESLint, Stylelint и Astro types/check.

## Сборка

```bash
yarn build
```

Готовая статическая версия собирается в папку `dist`.

## Переменные окружения

Можно создать локальный `.env` по примеру `.env.example`.

Основные переменные:

- `SITE_URL` — домен сайта обязательно нужен для canonical, sitemap и OG-ссылок.
- `SITE_NOINDEX=true` — закрывает сборку от индексации поисковиками. Используется для тестового домена.

Пример production-сборки:

```bash
SITE_URL=https://example.com yarn build
```

Пример test/staging-сборки:

```bash
SITE_URL=https://test.example.com SITE_NOINDEX=true yarn build
```
