@echo off
chcp 65001 >nul
echo.
echo ============================================
echo   🏰 Dungeon Idle Conquest - Deploy
echo ============================================
echo.

cd /d "C:\Users\arthu\OneDrive\Desktop\Projeto Dungeon Idle Conquest\gamedev\dungeon-idle-conquest"

echo 📦 Adicionando arquivos...
git add .

echo.
echo 📝 Digite a mensagem da atualização:
set /p MENSAGEM="> "

if "%MENSAGEM%"=="" (
    echo ❌ Mensagem não pode estar vazia!
    pause
    exit /b 1
)

echo.
echo 💾 Fazendo commit...
git commit -m "%MENSAGEM%"

echo.
echo 🚀 Enviando para o GitHub...
git push origin main

if %errorlevel% equ 0 (
    echo.
    echo ============================================
    echo   ✅ Deploy enviado com sucesso!
    echo   🌐 Jogo atualizado em ~2-3 minutos
    echo   🔗 https://dungeon-idle-conquest.onrender.com
    echo ============================================
) else (
    echo.
    echo ❌ Erro ao enviar! Verifique sua conexão e tente novamente.
)

echo.
pause
