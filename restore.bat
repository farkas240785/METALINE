@echo off
chcp 65001 >nul 2>&1
setlocal enabledelayedexpansion

:: ═══════════════════════════════════════════════════════════════
:: METALINE Website — Восстановление из репозитория (Windows)
:: ═══════════════════════════════════════════════════════════════

echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║                                                            ║
echo ║   🏗️  METALINE — Восстановление сайта из репозитория       ║
echo ║                                                            ║
echo ╚════════════════════════════════════════════════════════════╝
echo.

:: Проверка Node.js
echo ➜ Проверка Node.js...
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo ✗ Node.js не установлен!
    echo.
    echo Установите Node.js версии 18 или выше:
    echo   https://nodejs.org/
    echo.
    pause
    exit /b 1
)
echo ✓ Node.js установлен
echo.

:: Установка зависимостей
echo ➜ Установка зависимостей...
if exist node_modules (
    echo ⚠ node_modules уже существует
    set /p REINSTALL="Переустановить? (y/N) "
    if /i "!REINSTALL!"=="y" (
        rmdir /s /q node_modules
        call npm install
        echo ✓ Зависимости переустановлены
    ) else (
        echo ✓ Используем существующие зависимости
    )
) else (
    call npm install
    echo ✓ Зависимости установлены
)
echo.

:: Сборка
echo ➜ Сборка production-версии...
call npm run build
echo ✓ Сборка завершена
echo.

:: Информация
echo ╔════════════════════════════════════════════════════════════╗
echo ║                                                            ║
echo ║   ✅ Сайт успешно восстановлен!                            ║
echo ║                                                            ║
echo ╠════════════════════════════════════════════════════════════╣
echo ║                                                            ║
echo ║   📁 Production-сборка: dist\                              ║
echo ║                                                            ║
echo ║   🚀 Следующие команды:                                    ║
echo ║                                                            ║
echo ║   npm run dev          Запустить dev-сервер                ║
echo ║   npm run preview      Предпросмотр сборки                 ║
echo ║   npm run build        Пересобрать проект                  ║
echo ║                                                            ║
echo ╚════════════════════════════════════════════════════════════╝
echo.

:: Запуск dev-сервера
set /p RUN="Запустить dev-сервер сейчас? (Y/n) "
if /i "!RUN!"=="n" (
    echo.
    echo ✓ Готово! Запустите dev-сервер командой: npm run dev
    echo.
    pause
    exit /b 0
)

echo.
echo ➜ Запуск dev-сервера...
echo.
call npm run dev
