# Marvel Web - API

### Descrição

Simples aplicação para consumo da API - Marvel, implementado também back-end próprio para persistência de dados (herois e comiscs favoritas, usuários).


<h2> Detalhes do projeto</h2>

<p>O projeto está separado em duas partes:</p>
<h3>Front-End</h3>
<h4>Utilizando o framework QuasarJs</h4>
<ul>
<li>- inclui Webpack e pré processador (SCSS)</li>
<li>- Baseado em Vue.js</li>
<li>Você obtém uma interface de usuário de última geração (que segue as Diretrizes de Materiais) para seus sites e aplicativos prontos para uso
O melhor suporte para navegadores de desktop e móveis (incluindo iOS Safari!) Pronto para uso e etc. saiba mais: https://quasar.dev/introduction-to-quasar</li>
</ul><p><b>Inclui tambem:</b><p>
<ul> <li>HTML/CSS/JS minification</li>
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
  <p>
  link: https://marvel-api-web.herokuapp.com/
  </p>
</ul>
<hr>
<h2>Teste em Desenvolvimento</h2>
<p>Ordem de execução para teste:</p>
<p><b>1) Clone o repositório</b></p>
<p><b>2) Instale as dependencias:</b></p>
<p>npm ou yarn install nas pastas: server e app</p>
```
server/ e app/

npm install 
or
yarn install
```
<p>certifique-se de ter o, nodeJs, sequelize-cli e o quasar-cli instalados</p>
<p><b>3) Configure o banco de dados</b></p>
<p>na pasta server/, consta o arquivo .env_example, troque para as credenciais para a do seu banco de dados. (remova o _example do nome)</p>
<p><b>4) Rode as migrations</b></p>
<p>Com o sequelize-cli instalado, dentro da pasta server, execute o comando:</p>
```bash
server/

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
<p>Obs: a Pasta app/ contem dois arquivos de variaveis de ambientes, ambos ja preenchidos com minha key e url da api em produção para facilitar os testes. Irei deletar a key posteriomente.</p>
<p><b>7) Faça os testes</b></p>
Link para a collections de teste no postman:
https://www.getpostman.com/collections/2a460fc49e280ed17b0f

<hr>

#####Algumas imagens:
Home 01
![Home 01](https://uploaddeimagens.com.br/images/003/268/477/full/01.JPG?1622520939 "Home 01")

Home 02
![Home 01](https://uploaddeimagens.com.br/images/003/268/478/full/02.JPG?1622521016 "Home 02")

Comics
![Home 01](https://uploaddeimagens.com.br/images/003/268/479/full/03.JPG?1622521057 "Comics")

Herois
![Home 01](https://uploaddeimagens.com.br/images/003/268/480/full/04.JPG?1622521092 "Herois")

Favoritos
![Home 01](https://uploaddeimagens.com.br/images/003/268/481/full/05.JPG?1622521167 "Favoritos")

Modal
![Home 01](https://uploaddeimagens.com.br/images/003/268/482/full/06.JPG?1622521193 "Favoritos")

Login
![Home 01](https://uploaddeimagens.com.br/images/003/268/483/full/07.JPG?1622521222 "Login")

<hr>
Leonardo Guedes.

[![GitHub Badge](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/nowherex)
[![LinkedIn Badge](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/leo-guedes/)
