# Quik dev 

## Pré-requisitos

- Node.js (v18.x)
- npm ou yarn
- Docker e Docker Compose (para Prisma, se estiver usando um banco de dados Dockerizado)
- OpenSSL (para gerar chaves PEM)

## Configuração do Ambiente

1. **Clone este repositório.**

    ```bash
    git clone https://github.com/guilherme1-jgp/delliv-repository.git
    ```

2. **Instale as dependências:**

    ```bash
    npm install
    ```

    ou

    ```bash
    yarn
    ```

3. **Copie o arquivo de exemplo de configuração**

    ```bash
    cp .env.example
    ```

    Edite `/.env` conforme necessário.

4. **Inicialize o banco de dados com Prisma:**

    ```bash
    npx prisma db push
    ```

## Gerando Chaves PEM

Para autenticação segura, você precisará de um par de chaves privada e pública no formato PEM. Use o OpenSSL para gerar essas chaves.

1. **Gere uma chave privada (private.pem):**

    ```bash
    openssl genpkey -algorithm RSA -out private.pem
    ```

2. **Extraia a chave pública correspondente (public.pem):**

    ```bash
    openssl rsa -pubout -in private.pem -out public.pem
    ```
    Adicione ambas chaves no diretório keysAccess.

3. **Metodo indicado:**
    Entre na pasta /backend via console
       ```node generateKeys.js
    ```
    será gerado ambas chaves na raiz da pasta,
    Adicione ambas chaves no diretório keysAccess.
## Executando a Aplicação

- **Inicie a aplicação:**

    ```bash
    npm run start
    ```

    ou

    ```bash
    yarn start
    ```

- Acesse a aplicação em [http://localhost:3000](http://localhost:3000).

## Comandos Úteis

- **Executar Testes:**

    ```bash
    npm run test:watch
    ```

 **Construa as imagens e inicie os contêineres:**

    ```bash
    docker-compose up
    ```
