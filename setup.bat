@echo off
chcp 65001 >nul 2>&1
setlocal enabledelayedexpansion

:: METALINE Website - Quick Setup Script for Windows
:: Usage: setup.bat [command]
:: Commands: install, dev, build, preview, clean, all

:: Print banner
:print_banner
echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║                                                            ║
echo ║   ███╗   ███╗███████╗████████╗ █████╗ ██╗     ██╗███████╗  ║
echo ║   ████╗ ████║██╔════╝╚══██╔══╝██╔══██╗██║     ██║██╔════╝  ║
echo ║   ██╔████╔██║█████╗     ██║   ███████║██║     ██║███████╗  ║
echo ║   ██║╚██╔╝██║██╔══╝     ██║   ██╔══██║██║     ██║╚════██║  ║
echo ║   ██║ ╚═╝ ██║███████╗   ██║   ██║  ██║███████╗██║███████║  ║
echo ║   ╚═╝     ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝╚══════╝╚═╝╚══════╝  ║
echo ║                                                            ║
echo ║   Фабрика перегородок из алюминиевого профиля              ║
echo ║                                                            ║
echo ╚════════════════════════════════════════════════════════════╝
echo.
goto :eof

:: Check prerequisites
:check_prerequisites
echo [INFO] Проверка зависимостей...

:: Check Node.js
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js не установлен!
    echo Установите Node.js версии 18 или выше: https://nodejs.org/
    exit /b 1
)

for /f "tokens=1 delims=v" %%v in ('node -v') do set NODE_VERSION=%%v
echo [OK] Node.js установлен
echo [OK] npm установлен
echo.
goto :eof

:: Install dependencies
:install_deps
echo [INFO] Установка зависимостей...
call npm install
if %errorlevel% neq 0 (
    echo [ERROR] Ошибка установки зависимостей
    exit /b 1
)
echo [OK] Зависимости установлены
echo.
goto :eof

:: Development server
:run_dev
echo [INFO] Запуск dev-сервера...
echo [OK] Сервер запущен на http://localhost:5173
call npm run dev
goto :eof

:: Build production
:run_build
echo [INFO] Сборка production-версии...
call npm run build
if %errorlevel% neq 0 (
    echo [ERROR] Ошибка сборки
    exit /b 1
)
echo [OK] Сборка завершена!
echo [INFO] Файлы находятся в папке dist\
echo.
goto :eof

:: Preview production build
:run_preview
echo [INFO] Предпросмотр production-версии...
call npm run preview
goto :eof

:: Clean build artifacts
:clean
echo [INFO] Очистка...
if exist dist rmdir /s /q dist
if exist node_modules\.vite rmdir /s /q node_modules\.vite
echo [OK] Очистка завершена
echo.
goto :eof

:: Full setup
:full_setup
call :print_banner
call :check_prerequisites
call :install_deps
call :run_build
echo [SUCCESS] Проект готов к работе!
echo.
echo Следующие шаги:
echo   • Запустить dev-сервер:    setup.bat dev
echo   • Предпросмотр сборки:     setup.bat preview
echo.
goto :eof

:: Show help
:show_help
call :print_banner
echo Использование: setup.bat [команда]
echo.
echo Доступные команды:
echo   install    - Установка зависимостей
echo   dev        - Запуск dev-сервера (http://localhost:5173)
echo   build      - Сборка production-версии
echo   preview    - Предпросмотр production-сборки
echo   clean      - Очистка временных файлов
echo   all        - Полная установка и сборка
echo   help       - Показать эту справку
echo.
echo Быстрый старт:
echo   setup.bat all          ^# Полная установка
echo   setup.bat dev          ^# Запуск для разработки
echo.
goto :eof

:: Main command handler
if "%1"=="" goto full_setup
if "%1"=="install" (
    call :check_prerequisites
    call :install_deps
    goto :eof
)
if "%1"=="dev" (
    call :check_prerequisites
    call :run_dev
    goto :eof
)
if "%1"=="build" (
    call :check_prerequisites
    call :run_build
    goto :eof
)
if "%1"=="preview" (
    call :run_preview
    goto :eof
)
if "%1"=="clean" (
    call :clean
    goto :eof
)
if "%1"=="all" (
    call :full_setup
    goto :eof
)
if "%1"=="help" goto show_help
if "%1"=="--help" goto show_help
if "%1"=="-h" goto show_help

echo [ERROR] Неизвестная команда: %1
call :show_help
exit /b 1
