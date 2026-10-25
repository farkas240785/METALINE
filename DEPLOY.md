# Руководство по деплою METALINE Website

## Содержание

- [Общие требования](#общие-требования)
- [Vercel](#vercel)
- [Netlify](#netlify)
- [GitHub Pages](#github-pages)
- [Docker](#docker)
- [Традиционный хостинг](#традиционный-хостинг)
- [CI/CD](#cicd)

## Общие требования

Перед деплоем убедитесь, что:
- ✅ Проект собирается без ошибок: `npm run build`
- ✅ Все изображения доступны по URL
- ✅ Переменные окружения настроены (если используются)
- ✅ Доменное имя настроено (если требуется)

## Vercel

### Автоматический деплой через GitHub

1. Зайдите на [vercel.com](https://vercel.com)
2. Нажмите "New Project"
3. Импортируйте репозиторий GitHub
4. Vercel автоматически определит настройки Vite
5. Нажмите "Deploy"

### CLI деплой

```bash
# Установить Vercel CLI
npm install -g vercel

# Войти в аккаунт
vercel login

# Деплой
vercel

# Production деплой
vercel --prod
```

### Настройки vercel.json (опционально)

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

## Netlify

### Автоматический деплой через GitHub

1. Зайдите на [netlify.com](https://netlify.com)
2. Нажмите "Add new site" → "Import an existing project"
3. Выберите репозиторий
4. Настройки сборки:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Нажмите "Deploy site"

### CLI деплой

```bash
# Установить Netlify CLI
npm install -g netlify-cli

# Войти в аккаунт
netlify login

# Инициализация
netlify init

# Деплой
netlify deploy --prod --dir=dist
```

### Настройки netlify.toml (опционально)

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## GitHub Pages

### Настройка проекта

1. Откройте `vite.config.js` и добавьте:
   ```javascript
   export default defineConfig({
     base: '/repository-name/',
     // ... остальные настройки
   })
   ```

2. Создайте `.github/workflows/deploy.yml`:
   ```yaml
   name: Deploy to GitHub Pages

   on:
     push:
       branches: [main]

   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         
         - name: Setup Node
           uses: actions/setup-node@v3
           with:
             node-version: '18'
         
         - name: Install dependencies
           run: npm ci
         
         - name: Build
           run: npm run build
         
         - name: Deploy
           uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./dist
   ```

3. Запушьте изменения в ветку `main`
4. Включите GitHub Pages в настройках репозитория

## Docker

### Создание Dockerfile

```dockerfile
# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Копируем package files
COPY package*.json ./

# Устанавливаем зависимости
RUN npm ci

# Копируем исходный код
COPY . .

# Собираем production версию
RUN npm run build

# Production stage
FROM nginx:alpine

# Копируем собранные файлы
COPY --from=builder /app/dist /usr/share/nginx/html

# Копируем nginx конфигурацию
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Открываем порт
EXPOSE 80

# Запускаем nginx
CMD ["nginx", "-g", "daemon off;"]
```

### nginx.conf

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
}
```

### Сборка и запуск

```bash
# Сборка образа
docker build -t metaline-website .

# Запуск контейнера
docker run -d -p 80:80 --name metaline metaline-website

# Остановка
docker stop metaline

# Удаление
docker rm metaline
```

### Docker Compose

```yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "80:80"
    restart: unless-stopped
    environment:
      - NODE_ENV=production
```

```bash
# Запуск
docker-compose up -d

# Остановка
docker-compose down
```

## Традиционный хостинг

### FTP/SFTP загрузка

1. Соберите проект:
   ```bash
   npm run build
   ```

2. Подключитесь к хостингу через FTP/SFTP клиент (FileZilla, WinSCP)

3. Загрузите содержимое папки `dist/` в корневую директорию сайта

### cPanel / ISPmanager

1. Соберите проект: `npm run build`
2. Создайте ZIP-архив папки `dist/`
3. Загрузите архив через файловый менеджер
4. Распакуйте в корневую директорию сайта

### Настройка .htaccess (Apache)

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

# Кэширование
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/pdf "access plus 1 month"
  ExpiresByType text/javascript "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType application/x-javascript "access plus 1 month"
  ExpiresByType image/x-icon "access plus 1 year"
</IfModule>

# Gzip сжатие
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/plain
  AddOutputFilterByType DEFLATE text/html
  AddOutputFilterByType DEFLATE text/xml
  AddOutputFilterByType DEFLATE text/css
  AddOutputFilterByType DEFLATE application/xml
  AddOutputFilterByType DEFLATE application/xhtml+xml
  AddOutputFilterByType DEFLATE application/rss+xml
  AddOutputFilterByType DEFLATE application/javascript
  AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>
```

## CI/CD

### GitHub Actions

```yaml
name: Build and Deploy

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm test
    
    - name: Build
      run: npm run build
    
    - name: Deploy to production
      if: github.ref == 'refs/heads/main'
      env:
        VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
      run: |
        npm install -g vercel
        vercel --prod --token=$VERCEL_TOKEN
```

### GitLab CI

```yaml
stages:
  - build
  - deploy

build:
  stage: build
  image: node:18
  script:
    - npm ci
    - npm run build
  artifacts:
    paths:
      - dist/

deploy:
  stage: deploy
  image: alpine:latest
  script:
    - apk add --no-cache curl
    - curl -X POST "https://api.netlify.com/build_hooks/${NETLIFY_HOOK}"
  only:
    - main
```

## Проверка после деплоя

После деплоя проверьте:

- [ ] Сайт открывается по URL
- [ ] Все изображения загружаются
- [ ] Навигация работает корректно
- [ ] Форма обратной связи работает
- [ ] Мобильная версия отображается правильно
- [ ] SSL сертификат установлен (HTTPS)
- [ ] Скорость загрузки приемлемая (Google PageSpeed Insights)

## Полезные инструменты

- **Google PageSpeed Insights** — проверка скорости загрузки
- **GTmetrix** — детальный анализ производительности
- **SSL Labs** — проверка SSL конфигурации
- **Google Search Console** — индексация сайта
- **Google Analytics** — аналитика посещений

---

**Нужна помощь с деплоем?** Обратитесь к [README.md](./README.md) или создайте issue в репозитории.
