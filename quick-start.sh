#!/bin/bash

# ═══════════════════════════════════════════════════════════════
# METALINE Website — Быстрое восстановление из репозитория
# ═══════════════════════════════════════════════════════════════
# 
# Использование:
#   ./quick-start.sh              # Полное восстановление и запуск
#   ./quick-start.sh --no-run     # Только восстановление, без запуска
#   ./quick-start.sh --help       # Показать справку
#
# Этот скрипт:
#   1. Проверяет наличие Node.js
#   2. Устанавливает зависимости
#   3. Собирает production-версию
#   4. Запускает dev-сервер
#
# ═══════════════════════════════════════════════════════════════

set -e

# Цвета
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Флаги
RUN_SERVER=true

# Парсинг аргументов
for arg in "$@"; do
    case $arg in
        --no-run)
            RUN_SERVER=false
            shift
            ;;
        --help|-h)
            echo ""
            echo "METALINE Website — Быстрое восстановление"
            echo ""
            echo "Использование:"
            echo "  ./quick-start.sh              # Восстановление + запуск"
            echo "  ./quick-start.sh --no-run     # Только восстановление"
            echo "  ./quick-start.sh --help       # Эта справка"
            echo ""
            exit 0
            ;;
    esac
done

echo ""
echo -e "${BLUE}╔══════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║                                                          ║${NC}"
echo -e "${BLUE}║   🏗️  METALINE — Быстрое восстановление сайта            ║${NC}"
echo -e "${BLUE}║                                                          ║${NC}"
echo -e "${BLUE}╚══════════════════════════════════════════════════════════╝${NC}"
echo ""

# Шаг 1: Проверка Node.js
echo -e "${BLUE}[1/4]${NC} Проверка Node.js..."
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js не найден!${NC}"
    echo "Установите Node.js: https://nodejs.org/"
    exit 1
fi
echo -e "${GREEN}✅ Node.js $(node -v)${NC}"

# Шаг 2: Установка зависимостей
echo ""
echo -e "${BLUE}[2/4]${NC} Установка зависимостей..."
if [ -d "node_modules" ]; then
    echo -e "${YELLOW}⚡ node_modules уже существует, пропускаем установку${NC}"
else
    npm install --silent
    echo -e "${GREEN}✅ Зависимости установлены${NC}"
fi

# Шаг 3: Сборка
echo ""
echo -e "${BLUE}[3/4]${NC} Сборка production-версии..."
npm run build --silent
echo -e "${GREEN}✅ Сборка завершена (папка dist/)${NC}"

# Шаг 4: Запуск
if [ "$RUN_SERVER" = true ]; then
    echo ""
    echo -e "${BLUE}[4/4]${NC} Запуск dev-сервера..."
    echo ""
    echo -e "${GREEN}╔══════════════════════════════════════════════════════════╗${NC}"
    echo -e "${GREEN}║                                                          ║${NC}"
    echo -e "${GREEN}║   ✅ Сайт успешно восстановлен и запущен!                ║${NC}"
    echo -e "${GREEN}║                                                          ║${NC}"
    echo -e "${GREEN}║   🌐 Откройте: http://localhost:5173                     ║${NC}"
    echo -e "${GREEN}║                                                          ║${NC}"
    echo -e "${GREEN}║   Для остановки нажмите Ctrl+C                           ║${NC}"
    echo -e "${GREEN}║                                                          ║${NC}"
    echo -e "${GREEN}╚══════════════════════════════════════════════════════════╝${NC}"
    echo ""
    npm run dev
else
    echo ""
    echo -e "${GREEN}╔══════════════════════════════════════════════════════════╗${NC}"
    echo -e "${GREEN}║                                                          ║${NC}"
    echo -e "${GREEN}║   ✅ Сайт успешно восстановлен!                          ║${NC}"
    echo -e "${GREEN}║                                                          ║${NC}"
    echo -e "${GREEN}║   📁 Production-сборка: dist/                            ║${NC}"
    echo -e "${GREEN}║                                                          ║${NC}"
    echo -e "${GREEN}║   🚀 Запустить dev-сервер: npm run dev                   ║${NC}"
    echo -e "${GREEN}║   👀 Предпросмотр сборки: npm run preview                ║${NC}"
    echo -e "${GREEN}║                                                          ║${NC}"
    echo -e "${GREEN}╚══════════════════════════════════════════════════════════╝${NC}"
    echo ""
fi
