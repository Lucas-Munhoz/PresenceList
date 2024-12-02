# PresenceList

## Descrição
O **PresenceList** é uma aplicação web desenvolvida como parte do projeto de extensão ELLP (Ensino Lúdico de Lógica e Programação). O objetivo principal da aplicação é facilitar o registro de presença dos alunos que participam das oficinas de ensino do projeto. 

## Grupo TDK Software

<img src="https://raw.githubusercontent.com/Lucas-Munhoz/PresenceList/refs/heads/main/assets/TDK-Logo.jpg" alt="TDK" width="100"/>

### Integrantes
- Lucas Munhoz
- Danilson Matsushita Junior

## Objetivos do Projeto
A aplicação tem como finalidade:
- Proporcionar um sistema simples e eficaz para o registro de presença e geração de certificados.
- Facilitar o acesso a informações sobre a participação dos alunos no workshops.

## Funcionalidades
- Cadastro e login de professores.
- Cadastro de workshop.
- Visualização e registro do histórico de listas de presença.
- Interface simples e amigável.

## Tecnologias Utilizadas
- **Frontend:** HTML, CSS, JavaScript.
- **Backend:** Node.js, Express, Nodemailer, Nodemon.
- **Testes:** Jest, Supertest.
- **Banco de Dados:** MySQL, Sequelize.

## Como Rodar a Aplicação Localmente
### Requisitos
- Node.js
- MySQL
- GIT

### Clonando o Repositório
Com o GIT instalado em sua máquina, rode o seguinte código para clonar o repositório:  
```bash 
  git clone https://github.com/Lucas-Munhoz/PresenceList.git
```

### Instalando as Dependências
Abra o terminal na raiz do projeto e execute o seguinte código node para instalar as dependências:
```bash
  npm install
```

### Configuração do Banco de Dados
Utilize os arquivos SQL disponibilizados em `/src/db` para criar tanto o banco de dados quanto valores para testes.  

Além disso, será necessário alterar o arquivo `connection.js` que também está localizado em `/src/db`, para tal, siga o exemplo:

```javascript
  const { Sequelize } = require('sequelize');

  const sequelize = new Sequelize('NOME-DO-BD', 'USUARIO-DO-BD', 'SENHA-DO-USUARIO', {
      host: 'localhost',
      dialect: 'mysql',
      dialectOptions: {
          charset: 'utf8mb4',
      }
  });

  module.exports = sequelize;
```

### Iniciar o Servidor
Com tudo pronto e localizado na pasta raiz do projeto, basta rodar o seguinte comando node em seu terminal:
```bash
  npm start run
```

### Rodando os Testes
Para executar os testes, primeiro deve possuir as dependências citadas anteriormente instaladas, após isso, basta estar localizado na pasta raíz do projeto e executar o seguinte comando node:
```bash
  npx jest tests
```

## Licença
Este projeto está licenciado sob a [MIT License](https://github.com/Lucas-Munhoz/PresenceList/blob/main/LICENSE). 
