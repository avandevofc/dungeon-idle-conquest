# 🚀 Guia de Deploy — Dungeon Idle Conquest

## Pré-requisitos
- [Git](https://git-scm.com/) instalado
- Conta no [GitHub](https://github.com/)
- Conta no [Render.com](https://render.com/)

---

## Passo 1: Criar repositório no GitHub

1. Acesse https://github.com
2. Clique no ícone **+** → **New repository**
3. Nome: `dungeon-idle-conquest`
4. Seja **Público** (gratuito)
5. Clique **Create repository**

---

## Passo 2: Enviar código para o GitHub

Abra o terminal na pasta do projeto e execute:

```bash
cd "C:\Users\arthu\OneDrive\Desktop\Projeto Dungeon Idle Conquest\gamedev\dungeon-idle-conquest"

git init
git add .
git commit -m "Versão inicial do Dungeon Idle Conquest"

git branch -M main
git remote add origin https://github.com/SEU-USERNAME/dungeon-idle-conquest.git
git push -u origin main
```

> ⚠️ Substitua `SEU-USERNAME` pelo seu nome de usuário no GitHub

---

## Passo 3: Criar conta no Render.com

1. Acesse https://render.com
2. Clique **Get Started for Free**
3. Faça login com sua conta do GitHub

---

## Passo 4: Criar Web Service

1. No dashboard do Render, clique **New +**
2. Selecione **Web Service**
3. Clique **Build a new web service**
4. Conecte seu repositório GitHub

---

## Passo 5: Configurar o Deploy

Preencha os campos:

| Campo | Valor |
|-------|-------|
| **Name** | `dungeon-idle-conquest` |
| **Region** | Oregon (US West) |
| **Branch** | main |
| **Runtime** | Node |
| **Build Command** | `npm install && npm run build` |
| **Start Command** | `node dist/server.cjs` |
| **Plan** | Free |

---

## Passo 6: Variáveis de Ambiente

Clique em **Advanced** → **Add Environment Variable**:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |

---

## Passo 7: Criar o Serviço

1. Clique **Create Web Service**
2. O Render vai fazer o deploy automaticamente
3. Aguarde 3-5 minutos

---

## Passo 8: Acessar o Jogo

Depois do deploy, acesse:
```
https://dungeon-idle-conquest.onrender.com
```

---

## ⚠️ Limitações do Plano Gratuito

| Limitação | Descrição |
|-----------|-----------|
| **Sleep** | O servidor dorme após 15 min sem acesso |
| **Cold Start** | Demora ~30s para acordar quando alguém acessa |
| **Dados** | O banco SQLite é temporário (reseta a cada deploy) |

---

## 🔄 Deploy de Atualizações

Quando fizer mudanças no código:

```bash
git add .
git commit -m "Descrição da mudança"
git push
```

O Render vai fazer deploy automaticamente!

---

## 🛠️ Solução de Problemas

### Build falhou
- Verifique se o `npm run build` funciona localmente
- Verifique os logs no Render dashboard

### Serviço não inicia
- Verifique se o `node dist/server.cjs` funciona localmente
- Verifique as variáveis de ambiente

### WebSocket não conecta
- O Render suporta WebSockets nativamente
- Verifique se o Socket.IO está configurado corretamente

---

## 📊 Comandos Úteis

```bash
# Build local
npm run build

# Testar em produção local
NODE_ENV=production node dist/server.cjs

# Verificar logs no Render
# Acesse o dashboard → Seu serviço → Logs
```

---

## 🎉 Pronto!

Seu jogo está hospedado gratuitamente no navegador!
Acesse: https://dungeon-idle-conquest.onrender.com
