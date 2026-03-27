@echo off
REM Build script for Windows
REM Usage: build-all.bat

setlocal enabledelayedexpansion

echo ======================================
echo Glagolitic Converter - Build Script
echo ======================================
echo.

cd /d "%~dp0"

:check_node
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed
    exit /b 1
)
echo [OK] Node.js found

:check_npm
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] npm is not installed
    exit /b 1
)
echo [OK] npm found

:check_rust
where cargo >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Rust/Cargo is not installed
    exit /b 1
)
echo [OK] Rust/Cargo found

echo.
echo [INFO] Installing dependencies...
call npm ci
if %errorlevel% neq 0 (
    echo [ERROR] Failed to install dependencies
    exit /b 1
)

echo.
echo [INFO] Building frontend...
call npm run build
if %errorlevel% neq 0 (
    echo [ERROR] Failed to build frontend
    exit /b 1
)

echo.
echo [INFO] Building Tauri app...
call npm run tauri build
if %errorlevel% neq 0 (
    echo [ERROR] Failed to build Tauri app
    exit /b 1
)

echo.
echo ======================================
echo Build completed successfully!
echo ======================================

endlocal
