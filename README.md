# PetroHost Help & Blog Portal

## Descrição
A plataforma web pública, focada nos clientes e visitantes da PetroHost. Este portal atua como o **Centro de Suporte** e a casa do **Blog Institucional**. Desenvolvido com extrema fidelidade ao manual de identidade visual da empresa (branding), providenciando navegação estruturada, fluída e responsiva.

## Tecnologias Principais
- **React 18 + Vite**: Para um carregamento instantâneo do cliente e transições extremamente fluídas ("SPA feel").
- **Tailwind CSS**: Estilização que aplica rigorosamente os design tokens institucionais (roxa `#5025d1`, azul escuro `#2f1c6a`).
- **TanStack Query (React Query)**: Fetching otimizado da `admin-api` para carregar artigos do Help Center e posts do Blog na máxima velocidade.
- **React Router DOM**: Gestão da árvore de rotas da aplicação (ex: `/help`, `/blog`, `/blog/:slug`).

## Características Principais
- **Header e Footer em Paridade Absoluta**: Componentes globais estáticos reconstruídos minuciosamente de forma a ficarem 100% idênticos (pixel a pixel e na estrutura do HTML) à página de aterragem (landing page) oficial em produção.
- **Páginas e Módulos Dedicados**: Segregação de código onde o ecossistema "Ajuda" (FAQs, artigos técnicos) não se cruza logicamente com o ecossistema de "Blogs" (Notícias da empresa, SEO).
- **Micro-interações Modernas**: Elementos como *hover states*, setas suspensas (*dropdown chevrons*) em harmonia para uma navegação premium.

## Como Executar
1. Instalar dependências necessárias:
   ```bash
   npm install
   ```
2. Inicializar a interface:
   ```bash
   npm run dev
   ```
3. Aceda no browser e navegue até às rotas `/help` e `/blog`.
