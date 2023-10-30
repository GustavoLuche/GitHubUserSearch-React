# GitHub User Search - React

Este projeto é uma aplicação web desenvolvida em React que permite aos usuários pesquisar e visualizar informações de perfil de usuários do GitHub, bem como seus repositórios. Ele utiliza a API do GitHub para recuperar os dados do usuário e seus repositórios.

A aplicação fornece uma interface amigável que permite aos usuários pesquisar por nomes de usuário do GitHub, exibir informações do perfil do usuário e listar seus repositórios. Além disso, você pode filtrar e classificar os repositórios.

Acesse a versão final do projeto em [GitHub User Search - React](https://GustavoLuche.github.io/GitHubUserSearch-React/).

## Organização de Arquivos

O projeto está organizado da seguinte forma:

  ```bash
  src/
  |-- components/
  | |-- ErrorMessage.js
  | |-- Footer.js
  | |-- Header.js
  | |-- LanguageSelect.js
  | |-- Paginator.js
  | |-- RepositorySearch.js
  | |-- Search.js
  | |-- SortSelect.js
  | |-- SpinnerLoading.js
  | |-- UserInfo.js
  | |-- UserRepos.js
  |-- context/
  | |-- GithubContext.js
  |-- services/
  | |-- githubService.js
  |-- App.css
  |-- App.js
  |-- index.js
  ```

- `components/`: Este diretório contém componentes React reutilizáveis que compõem a interface do usuário da aplicação.

- `context/`: Aqui, você encontrará o contexto da aplicação que gerencia o estado global da aplicação e fornece funções e dados para os componentes.

- `services/`: Este diretório contém um serviço que lida com as chamadas à API do GitHub.

- `App.css`: Arquivo CSS que fornece estilos personalizados para a aplicação.

- `App.js`: O componente principal da aplicação que renderiza a interface do usuário.

- `index.js`: O ponto de entrada da aplicação que renderiza o aplicativo React no elemento `root` do DOM.

## Tecnologias usadas

- [React](https://react.dev/): Uma biblioteca JavaScript para construção de interfaces de usuário.
- [React Bootstrap](https://react-bootstrap.netlify.app/): Uma biblioteca que fornece componentes Bootstrap para React.
- [Bootstrap](https://getbootstrap.com/): Uma estrutura front-end para web design responsivo.
- [API REST do GitHub](https://docs.github.com/pt/rest?apiVersion=2022-11-28): Para criar integrações, recuperar dados e automatizar seus fluxos de trabalho, crie com a API REST de GitHub.

## Como Executar Localmente

Para executar o projeto localmente, siga estas etapas:

1. Certifique-se de ter o [Node.js](https://nodejs.org/) instalado em seu sistema.

2. Clone este repositório para o seu computador:

  ```bash
  git clone https://github.com/GustavoLuche/GitHubUserSearch-React.git
  ```

3. Navegue até o diretório do projeto:

  ```bash
  cd GitHubUserSearch-React/github-user-search/
  ```
4. Instale as dependências usando o npm:

  ```bash
  npm install
  ```
  
5. Inicie a aplicação:

  ```bash
  npm start
  ```


A aplicação será executada no modo de desenvolvimento. Abra seu navegador e acesse [http://localhost:3000](http://localhost:3000) para visualizar a aplicação.

## Como Contribuir

Se desejar contribuir para este projeto, siga estas etapas:

1. Faça um fork deste repositório.

2. Clone o repositório forkado para o seu computador.

3. Crie uma branch com a sua feature: `git checkout -b minha-feature`

4. Faça commit das suas alterações: `git commit -m 'Adicionei uma nova feature'`

5. Faça push da branch: `git push origin minha-feature`

6. Envie um pull request para este repositório.

Agradecemos as contribuições!

## Agradecimentos

Este projeto foi desenvolvido como parte de um aprendizado em React e JavaScript, e incorpora conceitos como componentização, gerenciamento de estado e consumo de APIs. Agradecemos ao GitHub pela disponibilização da API.

---

Desenvolvido por [GustavoLuche](https://github.com/GustavoLuche)


