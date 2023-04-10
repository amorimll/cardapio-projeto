# API de gerencimento de cardápio.

Repositório criado para a minha API para o teste de desenvolvedor Node.js, da Fábrica de Startups. <br/> Contato: [gabrielmaia.amorim01@gmail.com](mailto:gabrielmaia.amorim01@gmail.com?subject=[GitHub]%20Source%20Han%20Sans), https://www.linkedin.com/in/gabriel-amorim-45935b1a3/

## Deploy

- Deploy do projeto: https://cardapio-projeto-production.up.railway.app/product

## Rodar localmente

1. Use o comando `git clone https://github.com/amorimll/cardapio-projeto`
2. Entre na pasta "server", e execute o comando `npm install`.
3. Crie um arquivo .env na pasta "server", e crie as seguinte variáveis, `MONGO_URL="mongodb://localhost/cardapio-backend"`, `JWT_SECRET="CARDAPIOJWTPASS"` e `PORT=3001`
4. Após instaladas as depedências, execute o comando `npm run start`, e a aplicação vai iniciar.

## Comandos

Rodar a aplicação: `npm run start`
Rodar os testes: `npm run test`

## Portas

Server: `localhost:3001`

## Tecnologias Usadas

### Back end: 
- [![My Skills](https://skillicons.dev/icons?i=ts)](https://skillicons.dev), utilizei o Typescript para previnir erros comuns e de tipagem, e tonar o código mais de fácil de escalar.
- [![My Skills](https://skillicons.dev/icons?i=nodejs)](https://skillicons.dev), utilizei o Node.js por ser a melhor ferramenta para executar Typescript/Javascript no lado do servidor.
- [![My Skills](https://skillicons.dev/icons?i=express)](https://skillicons.dev), utilizei o Express.js para facilitar a criação do código no Node.js.
### Testes:
- [![My Skills](https://skillicons.dev/icons?i=jest)](https://skillicons.dev), utilizei o Jest pela praticidade de se escrever testes de forma fácil e eficiente.
### Servidor: 
- [![My Skills](https://skillicons.dev/icons?i=mongodb)](https://skillicons.dev), utilizei o MongoDB pela alta escalabilidade, versatilidade e praticidade em armazenamento de dados e consultas.
### Pacotes, Bibliotecas e Outros:
- nodemon, mongoose, express-validator, dotenv, jsonwebtoken.

## Documentação

As rotas com `*` necessitam de autenticação.

### POST `/auth/login`
  Retorna um token de autenticação.
   ```json
    {
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2ODExNDc1NDEsImV4cCI6MTY4MTIzMzk0MX0.R4-5lLaBBIMHCIBS2hqwCh69Bkz7ItqxV4IqT1O55Ig"
}
  ```
### GET `/product *`
  Retorna todos os produtos cadastrados no banco de dados.
  ```json
    [
		{
          "_id": "643423b4ca39d94d0193cf60",
          "id": "2",
          "categories": [
              "Lanche",
              "Comida"
          ],
          "name": "Hamburguer",
          "qty": 100,
          "price": 17,
          "__v": 0
		},
		{
          "_id": "643423c3ca39d94d0193cf63",
          "id": "1",
          "categories": [
              "Comida",
              "Lanche"
          ],
          "name": "Pizza",
          "qty": 100,
          "price": 50,
          "__v": 0
		}
    ]
  ```
### GET `/product?id={id} *`
  Retorna os dados de um produto específico.
  ```json
  {
      "_id": "643423c3ca39d94d0193cf63",
      "id": "1",
      "categories": [
          "Comida",
          "Lanche"
      ],
      "name": "Pizza",
      "qty": 100,
      "price": 50,
      "__v": 0
  }
  ```
### POST `/product *`
  Cadastra um produto no banco de dados.
  
  ```json
  {
    "categories": [],
    "name": "Coxinha",
    "qty": "100",
    "price": "5"
  }
  ```
  
  ```json
  {
	"responseMessage": "Product successfully created.",
	"product": {
		"id": "1",
		"categories": [],
		"name": "Coxinha",
		"qty": 100,
		"price": 5,
		"_id": "6434534daeb1d75788619e4c",
		"__v": 0
	}
}
  ```

### PATCH `/product/{id} *`
 Atualiza um produto específico.
 
   ```json
  {
    "categories": [],
    "name": "Pizza",
    "qty": "150",
    "price": "50"
  }
  ```
  
  ```json
  {
	"responseMessage": "Product successfully updated."
  }
  ```

### DELETE `/product?id={id} *`
  Deleta um produto específico.
  
  ```json
  {
	"responseMessage": "Product successfully deleted."
  }
  ```
