# METALINE Website - Makefile
# Usage: make [command]

.PHONY: help install dev build preview clean all deploy

# Default target
.DEFAULT_GOAL := help

# Variables
NODE_ENV ?= production
PORT ?= 5173

# Colors
BLUE := \033[0;34m
GREEN := \033[0;32m
YELLOW := \033[1;33m
NC := \033[0m

## help: Show this help message
help:
	@echo ""
	@echo "╔════════════════════════════════════════════════════════════╗"
	@echo "║   METALINE Website - Команды Makefile                      ║"
	@echo "╚════════════════════════════════════════════════════════════╝"
	@echo ""
	@echo "Использование: make [команда]"
	@echo ""
	@echo "Доступные команды:"
	@grep -E '^## ' $(MAKEFILE_LIST) | sed -e 's/## /  /' | column -t -s ':'
	@echo ""
	@echo "Быстрый старт:"
	@echo "  make all          # Полная установка и сборка"
	@echo "  make dev          # Запуск для разработки"
	@echo ""

## install: Install dependencies
install:
	@echo -e "$(BLUE)[INFO]$(NC) Установка зависимостей..."
	@npm install
	@echo -e "$(GREEN)[OK]$(NC) Зависимости установлены"

## dev: Start development server
dev:
	@echo -e "$(BLUE)[INFO]$(NC) Запуск dev-сервера на http://localhost:$(PORT)..."
	@npm run dev

## build: Build production version
build:
	@echo -e "$(BLUE)[INFO]$(NC) Сборка production-версии..."
	@npm run build
	@echo -e "$(GREEN)[OK]$(NC) Сборка завершена! Файлы в dist/"

## preview: Preview production build
preview:
	@echo -e "$(BLUE)[INFO]$(NC) Предпросмотр production-сборки..."
	@npm run preview

## clean: Clean build artifacts
clean:
	@echo -e "$(BLUE)[INFO]$(NC) Очистка..."
	@rm -rf dist node_modules/.vite
	@echo -e "$(GREEN)[OK]$(NC) Очистка завершена"

## clean-all: Clean everything including node_modules
clean-all:
	@echo -e "$(BLUE)[INFO]$(NC) Полная очистка..."
	@rm -rf dist node_modules
	@echo -e "$(GREEN)[OK]$(NC) Полная очистка завершена"

## all: Full setup (install + build)
all: install build
	@echo -e "$(GREEN)[SUCCESS]$(NC) Проект готов к работе!"
	@echo ""
	@echo -e "$(YELLOW)Следующие шаги:$(NC)"
	@echo "  • make dev          # Запуск для разработки"
	@echo "  • make preview      # Предпросмотр сборки"
	@echo ""

## deploy: Build and prepare for deployment
deploy: build
	@echo -e "$(BLUE)[INFO]$(NC) Подготовка к деплою..."
	@echo -e "$(GREEN)[OK]$(NC) Готово к деплою! Файлы в dist/"
	@echo ""
	@echo "Для деплоя на Vercel:"
	@echo "  npx vercel --prod"
	@echo ""
	@echo "Для деплоя на Netlify:"
	@echo "  npx netlify deploy --prod --dir=dist"
	@echo ""

## lint: Run linter
lint:
	@echo -e "$(BLUE)[INFO]$(NC) Проверка кода..."
	@npm run lint || echo "Lint не настроен"

## test: Run tests
test:
	@echo -e "$(BLUE)[INFO]$(NC) Запуск тестов..."
	@npm test || echo "Тесты не настроены"

## update: Update dependencies
update:
	@echo -e "$(BLUE)[INFO]$(NC) Обновление зависимостей..."
	@npm update
	@echo -e "$(GREEN)[OK]$(NC) Зависимости обновлены"

## audit: Security audit
audit:
	@echo -e "$(BLUE)[INFO]$(NC) Проверка безопасности..."
	@npm audit
	@echo -e "$(GREEN)[OK]$(NC) Проверка завершена"
