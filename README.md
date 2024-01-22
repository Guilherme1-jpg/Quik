# Quik dev 

## Pré-requisitos

- Node.js (v18.x)
- npm ou yarn
- Docker e Docker Compose (para Prisma, se estiver usando um banco de dados Dockerizado)
- OpenSSL (para gerar chaves PEM)

## Pré-visualização

- https://drive.google.com/file/d/1NatOJQ7ctaA8VJmIBWJS-6q1_zVoKIOp/view?usp=drive_link
- Obs: Somente o mesmo usuario pode fazer alteração em seu comentário.
## Configuração do Ambiente

1. **Clone este repositório.**

    ```bash
    git clone https://github.com/guilherme1-jgp/delliv-repository.git
    ```

2. **Instale as dependências:**

 - Entre na pasta backend e depois frontend
    ```bash
    npm install
    ```
    ```

3. **Copie o arquivo de exemplo de configuração**

    ```bash
    cp .env.example
    ```

    Edite `/.env` conforme necessário.

4. **Inicialize o banco de dados com Prisma na pasta backend:**


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
    Entre na pasta /backend via console e digite 
       
       node generateKeys.js
     
    será gerado ambas chaves na raiz da pasta,
    Adicione ambas chaves no diretório keysAccess.


- Acesse a aplicação em [http://localhost:3000](http://localhost:3000).

## Comandos Úteis

- **Executar Testes:**

    ```bash
    npm run test:watch
    npm run test:cov
    ```
    ```

## Executando a Aplicação
- acesse a pasta /backend e digite
    ```bash
    npm run start:dev

- acesse a pasta /front e digite
    ```bash
    npm run start

## Executando a Aplicação DOCKER (opcional)
- acesse a pasta raiz
    ```bash
    docker-compose up

- Lembre-se de gerar as keysAccess antes
