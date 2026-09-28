# Teste da integração Front-end + Backend

1. Backend: `node app.js` na pasta do backend.
2. Front-end: `npm install` e `npm run dev`.
3. Acesse `/atendente/login`.
4. Use o e-mail e senha do atendente cadastrados no backend.
5. O Front chama `POST /atendentes/login`, salva o JWT em `localStorage` e vai para `/atendente`.
6. As requisições seguintes enviam `Authorization: Bearer TOKEN` automaticamente.

URL padrão do backend: `http://localhost:4001`.
