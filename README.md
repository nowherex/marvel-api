

### Description

Simples aplicação para consumo da API - Marvel, implementado também back-end próprio para persistência de dados (herois e comiscs favoritas, usuários),
para acompanhar o desenvolvimento veja o branch: Develop.


<h2> Detalhes do projeto</h2>

<p>O projeto está separado em duas partes:</p>
<h3>Front-End</h3>
<h4>Utilizando o framework QuasarJs</h4>
<ul>
<li>- inclui Webpack e pré processador (SCSS)</li>
<li>- Baseado em Vue.js</li>
<li>Você obtém uma interface de usuário de última geração (que segue as Diretrizes de Materiais) para seus sites e aplicativos prontos para uso
O melhor suporte para navegadores de desktop e móveis (incluindo iOS Safari!) Pronto para uso e etc. saiba mais: https://quasar.dev/introduction-to-quasar</li>
</ul>
<ul>
 <b>Inclui tambem:<b>
<li>HTML/CSS/JS minification</li>
<li>Cache busting</li>
<li>Tree shaking</li>
<li>Source-mapping</li>
<li>Code-splitting with lazy loading</li>
<li>ES6 transpiling</li>
<li>Linting code</li>
<li>Accessibility features</li></ul>
<h3>Back-End:</h3>
<h4>NodeJs</h4>
<ul>
  <li> - Api com ExpressJs, Sequelize e MySQL</li>
  <li> - Rotas para inclusão de usuários</li>
   <li>Rotas para adicionar e remover favoritos dos usuários</li>
   <li>Senhas criptografadas com bcrypt e rotas protegidas com jwt (incluindo verificação de permissão, somente o próprio usuário pode remover/adicionar seus favoritos)</li>
   <li>Sequelize com migrations</li>
</ul>

<h4>Deploy - em produção</h4>
<ul>
  <li><b>Heroku</li>
</ul>
<hr>
<h2>Teste em Desenvolvimento</h2>
<p>Ordem de execução para teste:</p>
<p><b>1) Clone o repositório (develop)</b></p>
<p><b>2) Instale as dependencias:</b></p>
<p>npm ou yarn install nas pastas: server e app</p>
<p>certifique-se de ter o sequelize-cli e o quasar-cli</p>
<p><b>3) Configure o banco de dados</b></p>
<p>na pasta server/ consta o arquivo .env_example, troque para as credenciais do seu banco de dados. (remova o _example do nome)</p>
<p><b>4) Rode as migrations</b></p>
<p>Com o sequelize-cli instalado, dentro da pasta server, execute o comando:</p>
```bash
npx sequelize db:migrate
```
<p><b>5) Execute o servidor (pasta server)</b></p>
```bash
npm run dev
```
<p><b>6) Execute o front-end (pasta app)</b></p>
```bash
quasar dev
```
<p><b>7) Faça os testes</b></p>
Link para a collections de teste do postman:
https://www.getpostman.com/collections/2a460fc49e280ed17b0f


<hr>
Leonardo Guedes.

[![GitHub Badge](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/nowherex)
[![LinkedIn Badge](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/leo-guedes/)