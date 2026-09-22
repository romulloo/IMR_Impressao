@echo off
chcp 65001 >nul
title IMR Impressão 3D - Auto-Deploy GitHub & Dokploy
color 0B

echo ==============================================================================
echo       IMR IMPRESSAO 3D - ASSISTENTE DE DEPLOY GITHUB & AUTO-DEPLOY DOKPLOY
echo ==============================================================================
echo  Este assistente sincroniza seu codigo com o GitHub e dispara o auto-deploy
echo  no Dokploy para colocar o catalogo e o motor 3D no ar automaticamente!
echo ==============================================================================
echo.

rem Localizacao automatica da pasta do projeto
set "PROJECT_DIR="
if exist "%~dp0package.json" (
    set "PROJECT_DIR=%~dp0"
) else if exist "%~dp0catalogo_imr_fullstack\package.json" (
    set "PROJECT_DIR=%~dp0catalogo_imr_fullstack"
) else if exist "%~dp0IMR Impressao\catalogo_imr_fullstack\package.json" (
    set "PROJECT_DIR=%~dp0IMR Impressao\catalogo_imr_fullstack"
) else if exist "C:\Users\User\OneDrive\Área de Trabalho\IMR Impressao\catalogo_imr_fullstack\package.json" (
    set "PROJECT_DIR=C:\Users\User\OneDrive\Área de Trabalho\IMR Impressao\catalogo_imr_fullstack"
)

if "%PROJECT_DIR%"=="" (
    color 0C
    echo [ERRO] Nao foi possivel localizar a pasta 'catalogo_imr_fullstack'.
    echo Verifique se o caminho esta correto.
    pause
    exit /b 1
)

cd /d "%PROJECT_DIR%"
echo [DIRETORIO DO PROJETO]: %PROJECT_DIR%
echo.

rem Verifica instalacao do Git
where git >nul 2>&1
if %errorlevel% neq 0 (
    color 0C
    echo [ERRO] Git nao encontrado no sistema!
    echo Instale o Git para Windows em: https://git-scm.com/download/win
    pause
    exit /b 1
)

rem Garante branch 'main'
git branch -M main >nul 2>&1

rem Verifica se ja existe remote 'origin' configurado
git remote get-url origin >nul 2>&1
if %errorlevel% equ 0 (
    for /f "tokens=*" %%i in ('git remote get-url origin') do set "CURRENT_ORIGIN=%%i"
    echo [STATUS] Repositorio remoto conectado:
    echo  URL: %CURRENT_ORIGIN%
    echo  Branch: main
    echo.
    echo Escolha o que deseja fazer:
    echo  [1] Enviar codigo agora para o GitHub (git add, commit e push)
    echo  [2] Alterar/Atualizar a URL do repositorio remoto
    echo  [3] Apenas verificar status local e sair
    echo.
    set /p CHOICE="Digite o numero da opcao desejada (1, 2 ou 3): "
    if "%CHOICE%"=="2" goto CONFIG_REMOTE
    if "%CHOICE%"=="3" goto SHOW_STATUS
    goto PUSH_PROCESS
)

:CONFIG_REMOTE
echo.
echo ==============================================================================
echo  PASSO A PASSO PARA CONECTAR AO SEU GITHUB:
echo ==============================================================================
echo   1. Acesse: https://github.com/new
echo   2. Nome do repositorio sugerido: 'catalogo-imr' ou 'imr-catalogo'
echo   3. Selecione Publico ou Privado (o Dokploy suporta ambos)
echo   4. DEIXE DESMARCADO: 'Add a README file' (o projeto ja contem arquivos)
echo   5. Clique no botao verde 'Create repository'
echo   6. Copie a URL HTTPS (ex: https://github.com/SEU_USUARIO/catalogo-imr.git)
echo ==============================================================================
echo.

:ASK_URL
set "REPO_URL="
set /p REPO_URL="Cole a URL HTTPS do repositorio GitHub: "

if "%REPO_URL%"=="" (
    echo [AVISO] Nenhuma URL digitada. Tente novamente ou pressione Ctrl+C para sair.
    goto ASK_URL
)

rem Remove remote origin antigo se existir para evitar erro
git remote remove origin >nul 2>&1

echo.
echo Configurando remote 'origin' -> %REPO_URL%
git remote add origin %REPO_URL%
if %errorlevel% neq 0 (
    color 0C
    echo [ERRO] Falha ao adicionar o remote origin.
    pause
    exit /b 1
)
git branch -M main

:PUSH_PROCESS
echo.
echo ==============================================================================
echo [1/3] Preparando arquivos e sincronizando...
echo ==============================================================================
git add -A

rem Verifica se ha alteracoes para commit
git status --porcelain | findstr /R "." >nul 2>&1
if %errorlevel% equ 0 (
    echo [2/3] Criando commit das alteracoes...
    set "COMMIT_MSG=feat: catalogo fullstack com engine 3d e auto-deploy Dokploy"
    echo.
    echo Mensagem padrao de commit: "%COMMIT_MSG%"
    set /p USER_MSG="Pressione ENTER para manter ou digite uma mensagem personalizada: "
    if not "%USER_MSG%"=="" set "COMMIT_MSG=%USER_MSG%"
    
    git commit -m "%COMMIT_MSG%"
) else (
    echo [2/3] Todos os arquivos ja estao commitados.
)

echo.
echo ==============================================================================
echo [3/3] Enviando para o GitHub (branch 'main')...
echo ==============================================================================
echo (Se for a primeira vez, o Windows Git Credential Manager abrira seu navegador
echo para autenticar na sua conta GitHub com 1 clique.)
echo.

git push -u origin main

if %errorlevel% equ 0 (
    color 0A
    echo.
    echo ==============================================================================
    echo  🎉 SUCESSO TOTAL! Codigo enviado para o GitHub com sucesso!
    echo ==============================================================================
    echo.
    echo  CONFIGURACAO DO AUTO-DEPLOY NO DOKPLOY (FEITO UMA UNICA VEZ):
    echo  --------------------------------------------------------------------------
    echo  OPCAO A (RECOMENDADA - WEBHOOK NATIVO):
    echo    1. No painel Dokploy: Va em Projects -^> IMR -^> Aplicacao 'imr-catalogo'
    echo    2. Na aba 'Deployments' ou 'Auto Deploy', copie o 'Webhook URL'
    echo    3. No GitHub: Va em Settings -^> Webhooks -^> Add Webhook
    echo       - Payload URL: Cole a URL copiada do Dokploy
    echo       - Content type: application/json
    echo       - Clique em 'Add webhook'
    echo.
    echo  OPCAO B (VIA GITHUB ACTIONS SECRET):
    echo    1. No GitHub: Settings -^> Secrets and variables -^> Actions
    echo    2. Crie a Secret 'DOKPLOY_WEBHOOK_URL' com a URL do webhook do Dokploy.
    echo  --------------------------------------------------------------------------
    echo  A partir de agora, qualquer 'git push' atualiza o site na nuvem sozinho!
    echo ==============================================================================
    echo.
    goto MENU_FINAL
) else (
    color 0C
    echo.
    echo ==============================================================================
    echo  [ATENCAO] O git push nao foi concluido.
    echo ==============================================================================
    echo  Possiveis motivos:
    echo   1. Credenciais do GitHub pendentes ou canceladas no navegador.
    echo   2. Repositorio remoto no GitHub ja possui commits diferentes (use git pull).
    echo   3. Permissao de escrita insuficiente no repositorio.
    echo ==============================================================================
    echo.
    goto MENU_FINAL
)

:SHOW_STATUS
echo.
git status
echo.

:MENU_FINAL
echo Deseja abrir o Guia de Auto-Deploy do Dokploy?
echo  [1] Sim, abrir Guia Completo (CONFIGURACAO_AUTO_DEPLOY_DOKPLOY.md)
echo  [2] Sair
echo.
set /p GUIA_OPT="Escolha (1 ou 2): "
if "%GUIA_OPT%"=="1" (
    if exist "%~dp0..\CONFIGURACAO_AUTO_DEPLOY_DOKPLOY.md" (
        start notepad "%~dp0..\CONFIGURACAO_AUTO_DEPLOY_DOKPLOY.md"
    ) else if exist "C:\Users\User\OneDrive\Área de Trabalho\IMR Impressao\CONFIGURACAO_AUTO_DEPLOY_DOKPLOY.md" (
        start notepad "C:\Users\User\OneDrive\Área de Trabalho\IMR Impressao\CONFIGURACAO_AUTO_DEPLOY_DOKPLOY.md"
    )
)

echo.
echo Processo finalizado. Pressione qualquer tecla para fechar.
pause >nul
