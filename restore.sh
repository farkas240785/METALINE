#!/bin/bash

# ═══════════════════════════════════════════════════════════════
# METALINE Website — Восстановление из репозитория
# ═══════════════════════════════════════════════════════════════
# 
# Самый простой способ восстановить сайт:
#
#   ./restore.sh
#
# Это всё! Скрипт автоматически:
#   ✓ Проверит зависимости
#   ✓ Установит пакеты
#   ✓ Соберёт проект
#   ✓ Запустит dev-сервер
#
# ═══════════════════════════════════════════════════════════════

# Цвета для красивого вывода
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Функция для вывода статуса
status() {
    echo -e "${BLUE}➜${NC} $1"
}

success() {
    echo -e "${GREEN}✓${NC} $1"
}

error() {
    echo -e "${RED}✗${NC} $1"
}

warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

# Начало
echo ""
echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║                                                            ║${NC}"
echo -e "${BLUE}║   🏗️  METALINE — Восстановление сайта из репозитория       ║${NC}"
echo -e "${BLUE}║                                                            ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""

# Проверка Node.js
status "Проверка Node.js..."
if ! command -v node &> /dev/null; then
    error "Node.js не установлен!"
    echo ""
    echo "Установите Node.js версии 18 или выше:"
    echo "  https://nodejs.org/"
    echo ""
    exit 1
fi
success "Node.js $(node -v)"

# Проверка npm
status "Проверка npm..."
if ! command -v npm &> /dev/null; then
    error "npm не установлен!"
    exit 1
fi
success "npm $(npm -v)"
echo ""

# Установка зависимостей
status "Установка зависимостей..."
if [ -d "node_modules" ]; then
    warning "node_modules уже существует"
    read -p "Переустановить? (y/N) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        rm -rf node_modules
        npm install
        success "Зависимости переустановлены"
    else
        success "Используем существующие зависимости"
    fi
else
    npm install
    success "Зависимости установлены"
fi
echo ""

# Сборка
status "Сборка production-версии..."
npm run build
success "Сборка завершена"
echo ""

# Информация
echo -e "${GREEN}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║                                                            ║${NC}"
echo -e "${GREEN}║   ✅ Сайт успешно восстановлен!                            ║${NC}"
echo -e "${GREEN}║                                                            ║${NC}"
echo -e "${GREEN}╠════════════════════════════════════════════════════════════╣${NC}"
echo -e "${GREEN}║                                                            ║${NC}"
echo -e "${GREEN}║   📁 Production-сборка: dist/                              ║${NC}"
echo -e "${GREEN}║                                                            ║${NC}"
echo -e "${GREEN}║   🚀 Следующие команды:                                    ║${NC}"
echo -e "${GREEN}║                                                            ║${NC}"
echo -e "${GREEN}║   npm run dev          # Запустить dev-сервер              ║${NC}"
echo -e "${GREEN}║   npm run preview      # Предпросмотр сборки               ║${NC}"
echo -e "${GREEN}║   npm run build        # Пересобрать проект                ║${NC}"
echo -e "${GREEN}║                                                            ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""

# Запуск dev-сервера
read -p "Запустить dev-сервер сейчас? (Y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Nn]$ ]]; then
    echo ""
    success "Готово! Запустите dev-сервер командой: npm run dev"
    echo ""
    exit 0
fi

echo ""
status "Запуск dev-сервера..."
echo ""
npm run dev
