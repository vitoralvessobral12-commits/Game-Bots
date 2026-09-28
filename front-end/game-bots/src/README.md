# Robot Arena — Front-end

Front-end inicial do Robot Arena feito com React + Vite + React Router.

## Telas

- `/` — Home / Landing Page
- `/login` — Login
- `/cadastro` — Cadastro
- `/perfil` — Perfil do jogador
- `/ranking` — Ranking
- `/historico` — Histórico de partidas
- `/atendente` — Painel do atendente
- `/atendente/partida` — Registro de partida

## Instalação

Dentro da pasta do projeto:

```bash
npm install
npm run dev
```

## Próxima etapa

Os formulários ainda são visuais. Depois conectaremos cada ação ao backend Express usando `fetch()`.

Exemplos:
- Cadastro → `POST /clientes`
- Busca de cliente → `GET /clientes/:id`
- Ranking → endpoint de ranking
- Histórico → endpoint de partidas
- Registro de partida → `POST /partidas`
