@echo off
chcp 65001 >nul 2>&1
setlocal enabledelayedexpansion

:: ═══════════════════════════════════════════════════════════════
:: METALINE Website — Быстрое восстановление из репозитория (Windows)
:: ═══════════════════════════════════════════════════════════════

echo.
echo ╔══════════════════════════════════════════════════════════╗
echo ║                                                          ║
echo ║   🏗️  METALINE — Быстрое восстановление сайта            ║
echo ║                                                          ║
echo ╚══════════════════════════════════════════════════════════╝
echo.

:: Шаг 1: Проверка Node.js
echo [1/4] Проверка Node.js...
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js не найден!
    echo Установите Node.js: https://nodejs.org/
    exit /b 1
)
echo ✅ Node.js установлен
echo.

:: Шаг 2: Установка зависимостей
echo [2/4] Установка зависимостей...
if exist node_modules (
    echo ⚡ node_modules уже существует, пропускаем установку
) else (
    call npm install --silent
    echo ✅ Зависимости установлены
)
echo.

:: Шаг 3: Сборка
echo [3/4] Сборка production-версии...
call npm run build --silent
echo ✅ Сборка завершена ^(папка dist^/)
echo.

:: Шаг 4: Запуск
echo [4/4] Запуск dev-сервера...
echo.
echo ╔══════════════════════════════════════════════════════════╗
echo ║                                                          ║
echo ║   ✅ Сайт успешно восстановлен и запущен!                ║
echo ║                                                          ║
echo ║   🌐 Откройте: http://localhost:5173                     ║
echo ║                                                          ║
echo ║   Для остановки нажмите Ctrl+C                           ║
echo ║                                                          ║
echo ╚══════════════════════════════════════════════════════════╝
echo.
call npm run dev
