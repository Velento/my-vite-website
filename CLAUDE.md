# CLAUDE.md — Правила для AI-агента

Этот файл читается Claude Code и AI-агентом автоматически.
Все правила **обязательны** — нарушение блокирует PR.

---

## Стек проекта

- **React 18** + JSX (миграция на TypeScript в процессе)
- **Vite 5** — сборщик
- **i18next + react-i18next** — интернационализация (5 языков: ru, ua, pl, en, by)
- **Vitest + React Testing Library** — тесты
- **ESLint + Prettier** — линтинг и форматирование
- **GitHub Actions** — CI/CD → GitHub Pages

---

## Архитектурные правила

### Структура файлов
```
src/
  services/        ← ВСЕ API-вызовы только здесь
  features/        ← Feature-модули (UI + хук + тест)
  Components/      ← Существующие компоненты (legacy, рефакторинг постепенно)
  test/            ← Настройка тестов
```

### Разделение ответственности
- **Компоненты** — только отображение (JSX + стили)
- **Hooks (use*.js)** — бизнес-логика, состояние, обработчики
- **Services (src/services/)** — API-вызовы, внешние сервисы

---

## ЗАПРЕЩЕНО (нарушение = fail CI)

```javascript
// ❌ Хардкодить секреты
const token = '7468472524:AAH...';

// ❌ API запросы в компонентах напрямую
fetch('https://api.telegram.org/...'); // в .jsx файле

// ❌ eval или динамический код
eval(userCode);
new Function(str)();

// ❌ console.log в продакшн коде
console.log('debug');  // используй console.error для ошибок

// ❌ var
var x = 1;  // используй const/let

// ❌ == вместо ===
if (x == null)  // используй ===
```

---

## ОБЯЗАТЕЛЬНО

```javascript
// ✅ Секреты только через env
const token = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;

// ✅ API вызовы только в src/services/
// src/services/telegram.js → sendLeadToTelegram()

// ✅ Тексты только через i18n
const { t } = useTranslation();
<h1>{t('section.title')}</h1>

// ✅ aria-атрибуты для интерактивных элементов
<button aria-label="Закрыть меню">×</button>

// ✅ Тест рядом с файлом
// Feature.jsx → Feature.test.jsx

// ✅ prefer const
const value = computeValue();
```

---

## Для создания новой фичи

1. Создать папку `src/features/<name>/`
2. Файлы:
   - `<Name>.jsx` — компонент (только UI)
   - `use<Name>.js` — хук (логика)
   - `<Name>.test.jsx` — тесты
3. Добавить переводы в `src/i18n.js` (ключи для всех 5 языков)
4. Запустить: `npm run lint && npm test && npm run build`

---

## Переменные окружения

| Переменная | Описание | Где взять |
|-----------|----------|-----------|
| `VITE_TELEGRAM_BOT_TOKEN` | Токен Telegram-бота | @BotFather |
| `VITE_TELEGRAM_CHAT_ID` | ID чата для заявок | @userinfobot |

Создать `.env.local` из `.env.example`. **Никогда не коммитить `.env.local`!**

---

## Команды проверки (запускать перед каждым PR)

```bash
npm run lint          # ESLint
npm run format:check  # Prettier
npm test              # Vitest
npm run build         # Проверка сборки
```

---

## Git workflow

- Работай в `feature/*` ветках
- Основная ветка: `my-vite-website`
- PR → CI должен быть зелёным перед мержем
- Коммиты: `feat:`, `fix:`, `refactor:`, `test:`, `chore:`
