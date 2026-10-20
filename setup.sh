#!/bin/bash

# METALINE Website - Quick Setup Script
# Usage: ./setup.sh [command]
# Commands: install, dev, build, preview, clean, all

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Print banner
print_banner() {
    echo -e "${BLUE}"
    echo "╔════════════════════════════════════════════════════════════╗"
    echo "║                                                            ║"
    echo "║   ███╗   ███╗███████╗████████╗ █████╗ ██╗     ██╗███████╗  ║"
    echo "║   ████╗ ████║██╔════╝╚══██╔══╝██╔══██╗██║     ██║██╔════╝  ║"
    echo "║   ██╔████╔██║█████╗     ██║   ███████║██║     ██║███████╗  ║"
    echo "║   ██║╚██╔╝██║██╔══╝     ██║   ██╔══██║██║     ██║╚════██║  ║"
    echo "║   ██║ ╚═╝ ██║███████╗   ██║   ██║  ██║███████╗██║███████║  ║"
    echo "║   ╚═╝     ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝╚══════╝╚═╝╚══════╝  ║"
    echo "║                                                            ║"
    echo "║   Фабрика перегородок из алюминиевого профиля              ║"
    echo "║                                                            ║"
    echo "╚════════════════════════════════════════════════════════════╝"
    echo -e "${NC}"
}

# Check prerequisites
check_prerequisites() {
    echo -e "${BLUE}[INFO]${NC} Проверка зависимостей..."
    
    # Check Node.js
    if ! command -v node &> /dev/null; then
        echo -e "${RED}[ERROR]${NC} Node.js не установлен!"
        echo "Установите Node.js версии 18 или выше: https://nodejs.org/"
        exit 1
    fi
    
    NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -lt 18 ]; then
        echo -e "${RED}[ERROR]${NC} Требуется Node.js версии 18 или выше"
        echo "Текущая версия: $(node -v)"
        exit 1
    fi
    
    echo -e "${GREEN}[OK]${NC} Node.js $(node -v)"
    
    # Check npm
    if ! command -v npm &> /dev/null; then
        echo -e "${RED}[ERROR]${NC} npm не установлен!"
        exit 1
    fi
    
    echo -e "${GREEN}[OK]${NC} npm $(npm -v)"
    echo ""
}

# Install dependencies
install_deps() {
    echo -e "${BLUE}[INFO]${NC} Установка зависимостей..."
    npm install
    echo -e "${GREEN}[OK]${NC} Зависимости установлены"
    echo ""
}

# Development server
run_dev() {
    echo -e "${BLUE}[INFO]${NC} Запуск dev-сервера..."
    echo -e "${GREEN}[OK]${NC} Сервер запущен на http://localhost:5173"
    npm run dev
}

# Build production
run_build() {
    echo -e "${BLUE}[INFO]${NC} Сборка production-версии..."
    npm run build
    echo -e "${GREEN}[OK]${NC} Сборка завершена!"
    echo -e "${YELLOW}[INFO]${NC} Файлы находятся в папке dist/"
    echo ""
}

# Preview production build
run_preview() {
    echo -e "${BLUE}[INFO]${NC} Предпросмотр production-версии..."
    npm run preview
}

# Clean build artifacts
clean() {
    echo -e "${BLUE}[INFO]${NC} Очистка..."
    rm -rf dist node_modules/.vite
    echo -e "${GREEN}[OK]${NC} Очистка завершена"
    echo ""
}

# Full setup
full_setup() {
    print_banner
    check_prerequisites
    install_deps
    run_build
    echo -e "${GREEN}[SUCCESS]${NC} Проект готов к работе!"
    echo ""
    echo -e "${YELLOW}Следующие шаги:${NC}"
    echo "  • Запустить dev-сервер:    ./setup.sh dev"
    echo "  • Предпросмотр сборки:     ./setup.sh preview"
    echo ""
}

# Show help
show_help() {
    print_banner
    echo -e "${YELLOW}Использование:${NC} ./setup.sh [команда]"
    echo ""
    echo -e "${YELLOW}Доступные команды:${NC}"
    echo "  ${GREEN}install${NC}    - Установка зависимостей"
    echo "  ${GREEN}dev${NC}        - Запуск dev-сервера (http://localhost:5173)"
    echo "  ${GREEN}build${NC}      - Сборка production-версии"
    echo "  ${GREEN}preview${NC}    - Предпросмотр production-сборки"
    echo "  ${GREEN}clean${NC}      - Очистка временных файлов"
    echo "  ${GREEN}all${NC}        - Полная установка и сборка"
    echo "  ${GREEN}help${NC}       - Показать эту справку"
    echo ""
    echo -e "${YELLOW}Быстрый старт:${NC}"
    echo "  ./setup.sh all          # Полная установка"
    echo "  ./setup.sh dev          # Запуск для разработки"
    echo ""
}

# Main command handler
case "${1:-all}" in
    install)
        check_prerequisites
        install_deps
        ;;
    dev)
        check_prerequisites
        run_dev
        ;;
    build)
        check_prerequisites
        run_build
        ;;
    preview)
        run_preview
        ;;
    clean)
        clean
        ;;
    all)
        full_setup
        ;;
    help|--help|-h)
        show_help
        ;;
    *)
        echo -e "${RED}[ERROR]${NC} Неизвестная команда: $1"
        show_help
        exit 1
        ;;
esac
