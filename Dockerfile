# ==============================================================================
# IMR IMPRESSÃO 3D - DOCKERFILE DE PRODUÇÃO OTIMIZADO
# Plataforma Híbrida Node.js 20 LTS + Python 3 (Bambu Lab 3D Engine)
# Compatível com Dokploy, Traefik, Docker Compose e Kubernetes
# ==============================================================================

FROM node:20-bookworm-slim

# Metadados
LABEL maintainer="IMR Impressão 3D <contato@imrimpressao.com>"
LABEL description="Catálogo Oficial e Motor de Manufatura Digital 3D - IMR Impressão"

# Instalação limpa do Python 3 e curl (para verificação de integridade/healthcheck)
RUN apt-get update && \
    apt-get install -y --no-install-recommends python3 curl && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Diretório de trabalho padrão
WORKDIR /app

# Variáveis de ambiente de produção
ENV NODE_ENV=production \
    PORT=3000 \
    PYTHON_PATH=python3

# Copiar manifestos de pacotes primeiro para cache eficiente
COPY package*.json ./

# Instalar dependências estritamente de produção
RUN npm ci --omit=dev

# Copiar o restante da aplicação
COPY . .

# Criação do diretório de uploads e definição de permissões de leitura/escrita
RUN mkdir -p /app/uploads && \
    chown -R node:node /app && \
    chmod -R 775 /app/uploads

# Executar como usuário não-root 'node' por segurança
USER node

# Exposição da porta de comunicação HTTP
EXPOSE 3000

# Healthcheck integrado consultando a rota de integridade da API (/api/health)
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:3000/api/health || exit 1

# Inicialização do servidor híbrido Node.js
CMD ["node", "server.js"]
