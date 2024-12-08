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
```git 
  git clone https://github.com/Lucas-Munhoz/PresenceList.git
```

### Instalando as Dependências
Abra o terminal na raiz do projeto e execute o seguinte código node para instalar as dependências:
```node
  npm install
```

### Configuração do Banco de Dados
Utilize os arquivos SQL disponibilizados em `/src/db` para criar o banco de dados padrão e o banco de dados de testes.  

Além disso, será necessário criar o arquivo `.env` que deve estar localizado na pasta raíz do projeto, e adicionar o seguinte conteúdo ao mesmo:

```bash
    # Banco de padrão
    DB_NAME=presencelistdb
    DB_USER=USUARIO_DO_BANCO
    DB_PASSWORD=SENHA_DO_USUARIO
    
    # Banco de testes
    TEST_DB_NAME=presencelistdb_test
    DB_USER=USUARIO_DO_BANCO
    DB_PASSWORD=SENHA_DO_USUARIO
```

### Iniciar o Servidor
Com as dependencias instaladas, `.env` configurado, bancos de dados criados, basta localizar-se na pasta raiz do projeto e rodar o seguinte comando node em seu terminal:
```node
  npm start
```

### Rodando os Testes
Para executar os testes, primeiro deve possuir as dependências citadas anteriormente instaladas, após isso, basta estar localizado na pasta raíz do projeto e executar o seguinte comando node:
```node
  npm test
```

Para executar os testes de maneira individual, é necessário referenciar corretamente o arquivo que deseja executar o teste, portanto, insira em seu terminal `npx jest CAMINHO_DO_ARQUIVO/NOME_DO_ARQUIVO.js`, segue um exemplo para a tela de cadastro de professores:
```node
  npx jest tests/backend/telaCadProf.spec.js
```

## Licença
Este projeto está licenciado sob a [MIT License](https://github.com/Lucas-Munhoz/PresenceList/blob/main/LICENSE). 
