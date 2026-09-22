@echo off
chcp 65001 >nul
title IMR Impressão - Assistente de Envio para o GitHub (Dokploy)
color 0B

echo ==============================================================================
echo       IMR IMPRESSAO 3D - CONEXAO DO REPOSITORIO GITHUB PARA O DOKPLOY
echo ==============================================================================
echo.
echo  Este assistente vai conectar o projeto do catalogo ao seu GitHub para que o
echo  Dokploy possa clonar, construir e atualizar o site automaticamente com 1 clique!
echo.
echo ==============================================================================

cd /d "%~dp0"

echo [1/4] Verificando status do Git local...
git status --short
echo.

rem Verifica se ja existe um remote origin configurado
git remote -v | findstr "origin" >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] Remote 'origin' ja detectado:
    git remote -v
    echo.
    echo Escolha uma opcao:
    echo  [1] Enviar novas alteracoes agora (git add, commit e push)
    echo  [2] Trocar a URL do repositorio remoto GitHub
    echo  [3] Apenas verificar status e sair
    echo.
    set /p OPT="Digite a opcao (1/2/3): "
    if "%OPT%"=="2" goto CONFIGURE_REMOTE
    if "%OPT%"=="3" goto FIM
    goto COMMIT_AND_PUSH
)

:CONFIGURE_REMOTE
echo.
echo ------------------------------------------------------------------------------
echo  PASSO A PASSO PARA O GITHUB:
echo   1. Acesse https://github.com/new
echo   2. Crie um repositorio (ex: 'imr-catalogo-fullstack' ou 'catalogo-imr')
echo   3. Copie a URL HTTPS (ex: https://github.com/SEU_USUARIO/imr-catalogo.git)
echo ------------------------------------------------------------------------------
echo.
set /p REPO_URL="Cole a URL do seu repositorio GitHub aqui: "

if "%REPO_URL%"=="" (
    echo [ERRO] Nenhuma URL informada. Operacao cancelada.
    pause
    exit /b 1
)

rem Remove remote antigo se existir para evitar erro de duplicidade
git remote remove origin >nul 2>&1

echo.
echo Configurando remote origin para: %REPO_URL%
git remote add origin %REPO_URL%
git branch -M main

:COMMIT_AND_PUSH
echo.
echo [2/4] Preparando arquivos para commit...
git add .

set COMMIT_MSG=feat: atualizacao da infraestrutura dokploy e docker production
echo.
echo Mensagem do commit padrao: "%COMMIT_MSG%"
set /p USER_MSG="Deseja personalizar a mensagem de commit? (Pressione ENTER para manter): "
if not "%USER_MSG%"=="" set COMMIT_MSG=%USER_MSG%

echo.
echo [3/4] Criando commit local...
git commit -m "%COMMIT_MSG%" 2>nul || echo Nenhum arquivo novo para comitar.

echo.
echo [4/4] Enviando codigo para o branch 'main' no GitHub...
echo (Se for o primeiro envio, o GitHub pode abrir uma janela para login)
git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo ==============================================================================
    echo  [SUCESSO] Codigo enviado para o GitHub com sucesso!
    echo ==============================================================================
    echo.
    echo  PROXIMO PASSO NO DOKPLOY:
    echo   1. Abra o painel do Dokploy (ex: http://SEU_IP:3000 ou painel configurado)
    echo   2. Va em Applications -> Create Application
    echo   3. Selecione 'Git Provider' (GitHub) e aponte para este repositorio
    echo   4. Branch: 'main'
    echo   5. Build Type: 'Dockerfile'
    echo   6. Port: 3000
    echo   7. Clique em 'Deploy' -> O site estara no ar em menos de 2 minutos!
    echo.
) else (
    echo.
    echo ==============================================================================
    echo  [ATENCAO] Houve um problema ao enviar para o GitHub.
    echo  Verifique sua conexao, credenciais ou permissao de escrita no repositorio.
    echo ==============================================================================
)

:FIM
echo.
pause
