# Default Empty Project

Чистий шаблон проекту з React + Vite + TypeScript.

## Структура проекту

```
src/
  ├── main.tsx                    # Точка входу
  ├── App.tsx                     # Головний компонент з роутингом
  ├── index.css                   # Глобальні стилі + normalize
  ├── vite-env.d.ts              # Типи для Vite
  ├── pages/                      # Сторінки
  │   ├── Home/
  │   │   └── Home.tsx
  │   └── About/
  │       └── About.tsx
  ├── components/                 # Компоненти
  │   └── ExampleComponent/
  │       └── ExampleComponent.tsx
  ├── assets/                     # Статичні файли
  │   ├── images/                 # Картинки
  │   └── icons/                  # Іконки
  └── styles/                     # Стилі
      └── variables.css           # CSS змінні для кольорів
```

## Встановлення

```bash
npm install
```

## Запуск

```bash
npm run dev
```

## Білд

```bash
npm run build
```

## Перегляд білду

```bash
npm run preview
```

## Лінт

```bash
npm run lint
```

## Особливості

- ✅ React 18
- ✅ Vite
- ✅ TypeScript
- ✅ React Router
- ✅ Normalize CSS
- ✅ CSS змінні для кольорів
- ✅ ESLint
- ✅ Prettier

## Створення нового компонента

Використовуйте `ExampleComponent` як шаблон для створення нових компонентів.

## Створення нової сторінки

1. Створіть папку в `src/pages/`
2. Створіть компонент сторінки
3. Додайте роут в `src/App.tsx`

## Кольори

Кольори визначені в `src/styles/variables.css` як CSS змінні. Використовуйте їх через `var(--color-primary)`.

## Статичні файли

- Картинки: `src/assets/images/`
- Іконки: `src/assets/icons/`
