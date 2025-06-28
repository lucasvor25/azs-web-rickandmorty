# Rick and Morty App

Este é um aplicativo React para explorar episódios e personagens da série Rick and Morty utilizando a API GraphQL oficial.

## Funcionalidades

- Listar todos os episódios da série.
- Buscar episódios pelo nome.
- Visualizar detalhes de um episódio, incluindo os personagens participantes.
- Marcar episódios como favoritos e como assistidos.
- Navegação entre páginas usando React Router.
- Experiência responsiva e rápida com Vite.

## Tecnologias Utilizadas

- **React** com **Vite** para desenvolvimento rápido e bundling eficiente.
- **TypeScript** para tipagem estática e maior segurança no código.
- **Apollo Client** para consumir a API GraphQL do Rick and Morty.
- **Jest** e **React Testing Library** para testes unitários e de integração.
- **Docker** para containerização e fácil deployment.

## Como Rodar Localmente

1. Clone o repositório e acesse a pasta do projeto:

2. Instale as dependências:

   npm install

3. Rode a aplicação em modo desenvolvimento:

   npm run dev

4. Acesse `http://localhost:5173` no seu navegador.

## Como Rodar com Docker

1. No diretório do projeto, crie a imagem Docker:

   docker build -t rick-and-morty-app .

2. Execute o container:

   docker run -it -p 3000:80 rick-and-morty-app

3. Abra `http://localhost:3000` no navegador para acessar a aplicação.
