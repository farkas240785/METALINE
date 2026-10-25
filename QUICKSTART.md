# 🚀 Быстрый старт METALINE Website

## Восстановление сайта из репозитория за 30 секунд

### Способ 1: Один скрипт (самый простой)

```bash
# Linux / macOS
chmod +x restore.sh && ./restore.sh

# Windows
restore.bat
```

### Способ 2: Через setup.sh

```bash
# Linux / macOS
chmod +x setup.sh && ./setup.sh all

# Windows
setup.bat all
```

### Способ 3: Через Make

```bash
make all
```

### Способ 4: Вручную

```bash
npm install
npm run build
npm run dev
```

---

## Что произойдёт при восстановлении

1. ✅ Проверка Node.js (требуется версия 18+)
2. ✅ Установка зависимостей (`npm install`)
3. ✅ Сборка production-версии (`npm run build`)
4. ✅ Запуск dev-сервера (`npm run dev`)
5. ✅ Открытие сайта на `http://localhost:5173`

---

## Структура скриптов

| Скрипт | Назначение | Платформа |
|--------|-----------|-----------|
| `restore.sh` | Восстановление + запуск | Linux/macOS |
| `restore.bat` | Восстановление + запуск | Windows |
| `setup.sh` | Расширенное управление | Linux/macOS |
| `setup.bat` | Расширенное управление | Windows |
| `quick-start.sh` | Быстрое восстановление | Linux/macOS |
| `quick-start.bat` | Быстрое восстановление | Windows |
| `Makefile` | Универсальное управление | Все |

---

## Команды для разработки

```bash
# Запустить dev-сервер
npm run dev

# Собрать production
npm run build

# Предпросмотр production
npm run preview

# Очистка
npm run clean
```

---

## Деплой

```bash
# Vercel
npx vercel --prod

# Netlify
npx netlify deploy --prod --dir=dist

# Docker
docker build -t metaline .
docker run -p 80:80 metaline
```

Подробная инструкция: [DEPLOY.md](./DEPLOY.md)

---

## Документация

| Файл | Описание |
|------|----------|
| [README.md](./README.md) | Полная документация проекта |
| [DEPLOY.md](./DEPLOY.md) | Руководство по деплою |
| [CONTRIBUTING.md](./CONTRIBUTING.md) | Как внести вклад |
| [CHANGELOG.md](./CHANGELOG.md) | История изменений |

---

## Требования

- **Node.js** 18+
- **npm** 9+
- **Git** (для клонирования)

---

## Проблемы?

1. Удалите `node_modules` и `package-lock.json`
2. Запустите `npm install` заново
3. Если не помогло — создайте issue в репозитории

---

**Готово! Сайт восстановлен и работает 🎉**
