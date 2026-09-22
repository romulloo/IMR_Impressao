@echo off
chcp 65001 > nul
title IMR IMPRESSÃO 3D - SERVIDOR HÍBRIDO NODE.JS + PYTHON
color 0B

echo ===============================================================================
echo          IMR IMPRESSÃO 3D - SISTEMA HÍBRIDO WEB (NODE.JS + PYTHON)
echo          Catálogo Oficial & Motor de Manufatura Digital Bambu Lab A1
echo ===============================================================================
echo.

:: Garante navegação para a pasta do projeto
cd /d "C:\Users\User\OneDrive\Área de Trabalho\IMR Impressao\catalogo_imr_fullstack"

echo [1/4] Verificando ambiente Node.js...
where node >nul 2>nul
if %errorlevel% neq 0 (
    color 0C
    echo [ERRO] Node.js não foi encontrado no PATH do sistema.
    echo Por favor, instale o Node.js em https://nodejs.org/
    pause
    exit /b 1
)
for /f "tokens=*" %%v in ('node -v') do echo       Node.js ativo: %%v

echo [2/4] Verificando ambiente Python...
where python >nul 2>nul
if %errorlevel% neq 0 (
    color 0C
    echo [ERRO] Python não foi encontrado no PATH do sistema.
    echo Por favor, instale o Python em https://python.org/
    pause
    exit /b 1
)
for /f "tokens=*" %%v in ('python --version') do echo       Python ativo: %%v

echo [3/4] Verificando dependências npm...
if not exist "node_modules\" (
    echo       Instalando pacotes npm necessários (express, cors, multer)...
    call npm install
) else (
    echo       Dependências já instaladas com sucesso.
)

echo [4/4] Inicializando Plataforma IMR Impressão...
echo.
echo       🌐 Servidor Node.js: http://localhost:3000
echo       ⚙️  Motor 3D Python: engine_3d.py
echo       🚀 Abrindo o navegador automaticamente em 2 segundos...
echo.
echo ===============================================================================
echo   DICA: Mantenha esta janela aberta enquanto estiver utilizando o sistema!
echo   Para encerrar o servidor, feche esta janela ou pressione Ctrl + C.
echo ===============================================================================
echo.

:: Abrir navegador automaticamente
start "" cmd /c "timeout /t 2 /nobreak >nul & start http://localhost:3000"

:: Executar o servidor Express
node server.js

pause
