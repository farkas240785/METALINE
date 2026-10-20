# METALINE — Фабрика перегородок из алюминиевого профиля

Современный корпоративный сайт для фабрики METALINE, специализирующейся на производстве перегородок из алюминиевого профиля с закалённым стеклом.

![METALINE](https://img.shields.io/badge/METALINE-Factory-amber?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-6-purple?style=flat-square&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-cyan?style=flat-square&logo=tailwindcss)

## 📋 Содержание

- [Быстрый старт](#-быстрый-старт)
- [Требования](#-требования)
- [Структура проекта](#-структура-проекта)
- [Разделы сайта](#-разделы-сайта)
- [Скрипты автоматизации](#-скрипты-автоматизации)
- [Деплой](#-деплой)
- [Технологии](#-технологии)

## 🚀 Быстрый старт

### Вариант 1: Автоматическая установка (рекомендуется)

**Linux / macOS:**
```bash
# Клонировать репозиторий
git clone <repository-url>
cd metaline-website

# Сделать скрипт исполняемым
chmod +x setup.sh

# Запустить полную установку
./setup.sh all
```

**Windows:**
```cmd
:: Клонировать репозиторий
git clone <repository-url>
cd metaline-website

:: Запустить полную установку
setup.bat all
```

**С использованием Make (все платформы):**
```bash
git clone <repository-url>
cd metaline-website
make all
```

### Вариант 2: Ручная установка

```bash
# 1. Установить зависимости
npm install

# 2. Запустить dev-сервер
npm run dev

# 3. Открыть http://localhost:5173
```

### Вариант 3: Docker (если доступен Dockerfile)

```bash
docker build -t metaline-website .
docker run -p 5173:5173 metaline-website
```

## 📦 Требования

- **Node.js** версии 18 или выше
- **npm** версии 9 или выше
- **Git** (для клонирования репозитория)

Проверка установленных версий:
```bash
node -v    # Должна быть v18.x.x или выше
npm -v     # Должна быть 9.x.x или выше
git --version
```

## 📁 Структура проекта

```
metaline-website/
├── public/                 # Статические файлы
├── src/
│   ├── App.tsx            # Главный компонент приложения
│   ├── main.tsx           # Точка входа
│   └── index.css          # Глобальные стили
├── index.html             # HTML шаблон
├── package.json           # Зависимости и скрипты
├── tsconfig.json          # Конфигурация TypeScript
├── vite.config.js         # Конфигурация Vite
├── setup.sh               # Скрипт установки (Linux/macOS)
├── setup.bat              # Скрипт установки (Windows)
├── Makefile               # Makefile для универсального использования
├── .gitignore             # Исключения для Git
└── README.md              # Документация
```

## 🌐 Разделы сайта

| Раздел | Описание |
|--------|----------|
| **Главная** | Hero-секция с фоновым изображением, статистика компании |
| **Продукция** | 6 типов перегородок с изображениями и характеристиками |
| **Производство** | Этапы работы, оборудование, материалы |
| **Портфолио** | Реализованные проекты с фотографиями |
| **Тех. библиотека** | Документация, сертификаты, спецификации |
| **Заявка на расчёт** | Форма обратной связи для расчёта стоимости |
| **Контакты** | Контактная информация, карта |

## 🛠 Скрипты автоматизации

### setup.sh / setup.bat

Универсальный скрипт для быстрой работы с проектом:

```bash
# Полная установка и сборка
./setup.sh all

# Установка зависимостей
./setup.sh install

# Запуск dev-сервера
./setup.sh dev

# Сборка production-версии
./setup.sh build

# Предпросмотр production-сборки
./setup.sh preview

# Очистка временных файлов
./setup.sh clean

# Показать справку
./setup.sh help
```

### Makefile

Альтернативный способ управления проектом:

```bash
# Показать все команды
make help

# Полная установка
make all

# Разработка
make dev

# Сборка
make build

# Предпросмотр
make preview

# Очистка
make clean

# Полная очистка (включая node_modules)
make clean-all

# Деплой
make deploy

# Обновление зависимостей
make update

# Проверка безопасности
make audit
```

### npm скрипты

Стандартные npm команды:

```bash
npm install          # Установка зависимостей
npm run dev          # Запуск dev-сервера
npm run build        # Сборка production
npm run preview      # Предпросмотр сборки
```

## 🌍 Деплой

### Vercel (рекомендуется)

```bash
# Установить Vercel CLI
npm install -g vercel

# Деплой
vercel --prod
```

### Netlify

```bash
# Установить Netlify CLI
npm install -g netlify-cli

# Деплой
netlify deploy --prod --dir=dist
```

### GitHub Pages

```bash
# Добавить в vite.config.js:
# base: '/repository-name/'

# Собрать и запушить
npm run build
git add dist -f
git commit -m "Deploy"
git subtree push --prefix dist origin gh-pages
```

### Docker

```dockerfile
# Dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

```bash
docker build -t metaline-website .
docker run -p 80:80 metaline-website
```

### Простой хостинг

```bash
# Собрать проект
npm run build

# Загрузить содержимое папки dist/ на хостинг
# через FTP, SFTP или панель управления
```

## 🔧 Технологии

| Технология | Версия | Назначение |
|------------|--------|------------|
| React | 18 | UI библиотека |
| TypeScript | 5 | Типизация |
| Vite | 6 | Сборщик |
| Tailwind CSS | 4 | Стили |
| Font Awesome | 6 | Иконки |

## 📝 Разработка

### Добавление нового раздела

1. Откройте `src/App.tsx`
2. Добавьте новый элемент в массив `navItems`:
   ```typescript
   { id: 'new-section', label: 'Новый раздел' }
   ```
3. Создайте новую секцию:
   ```tsx
   <section id="new-section" className="py-20 bg-gray-900">
     {/* Содержимое */}
   </section>
   ```

### Изменение стилей

Все стили написаны с использованием Tailwind CSS. Основные цвета:
- `gray-900` — основной фон
- `gray-950` — тёмный фон секций
- `amber-400` — акцентный цвет
- `white` — текст

### Добавление изображений

Изображения загружаются по URL. Для использования локальных изображений:
1. Поместите файлы в папку `public/images/`
2. Используйте путь `/images/filename.jpg`

## 🤝 Вклад в проект

1. Форкните репозиторий
2. Создайте ветку для фичи (`git checkout -b feature/AmazingFeature`)
3. Закоммитьте изменения (`git commit -m 'Add AmazingFeature'`)
4. Запушьте в ветку (`git push origin feature/AmazingFeature`)
5. Откройте Pull Request

## 📄 Лицензия

© 2024 METALINE. Все права защищены.

## 📞 Контакты

- **Сайт:** [metaline.ru](https://metaline.ru)
- **Email:** info@metaline.ru
- **Телефон:** +7 (495) 123-45-67
- **Адрес:** г. Москва, ул. Промышленная, д. 12, стр. 5

---

**Разработано с ❤️ для METALINE**
