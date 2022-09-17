# mentora-me

## [Conteúdo](#Conteudo)

- [Sobre o Projeto](#Sobre)
- [Documentação](#Documentacao)
- [Instalação](#Instalacao)
- [Uso da API](#Uso)
- [Tecnologias e Recursos](#Tecnologias)
- [Equipe](#Equipe)
- [Agradecimentos](#Agradecimentos)

## [Sobre o projeto](#Sobre)

**Projeto Integrador** do curso de back-end da [Digital House](https://www.digitalhouse.com/br) em parceria com o iFood através do Potência Tech.

Esta API tem como objetivo atender a requisições em um sistema que fará a conexão entre alunos e mentores através de um _match_ (combinação) que leva em consideração os interesses do cliente/aluno e retorna as informações do profissional/mentor mais adequado para seu perfil.
Dessa maneira, a _Mentora-me_ é uma plataforma desenvolvida para auxiliar indivíduos que buscam praticidade e a melhor solução para o crescimento em suas carreiras.

## [Documentação](#Documentacao)

- [Mentora-me](https://mentora-me.herokuapp.com/documentation/)

## [Instalação](#Instalacao)

Utilize o _mentora-me_ localmente com o npm.

```
  git clone git@github.com:getwlad/mentora-me.git
  cd mentora-me
  npm i
  # instalar dependências
  cp .env.example .env
  # modificar variáveis de ambiente no .env
  npm start
```

## [Uso da API](#Uso)

#### Criar um novo usuário (ex.: Student):

```
  POST /user/
```

| Parametro   | Tipo     | Descrição                                        |
| :---------- | :------- | :----------------------------------------------- |
| `email`     | `string` | **Required**. Email do usuário                   |
| `password`  | `string` | **Required**. Senha do usuário                   |
| `user_type` | `string` | **Required**. Tipo de usuário (mentor / student) |

#### Cadastro do aluno:

```
  POST /student/
```

| Parametro | Tipo     | Descrição                       |
| :-------- | :------- | :------------------------------ |
| `name`    | `string` | **Required**. Nome do aluno     |
| `cpf`     | `string` | **Required**. CPF do aluno      |
| `phone`   | `string` | **Required**. Telefone do aluno |

#### Cadastro da Área de Interesse:

```
  POST /student/interest
```

| Parametro       | Tipo     | Descrição                                                     |
| :-------------- | :------- | :------------------------------------------------------------ |
| `mentoringArea` | `string` | **Required**. Nome da área de interesse (ex.: Banco de Dados) |

#### Cadastro das caracteristicas do aluno:

```
  POST /student/particulars
```

Valores de 1 a 3 para determinar o quanto cada característica deve ser priorizada no _match_.

| Parametro  | Tipo     | Descrição              |
| :--------- | :------- | :--------------------- |
| `theory`   | `string` | **Required**. (ex.: 1) |
| `practice` | `string` | **Required**. (ex.: 3) |
| `...`      | `string` | ...                    |

#### Match:

```
  GET student/match/
```

Retorna o mentor com mais compatibilidade.

## [Tecnologias e Recursos Utilizados](#Tecnologias)

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Nodejs](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MySQL](https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)
![Heroku](https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white)
![Git](https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)

## [Equipe](#Equipe)

- Ludmila
  - [Email](mailto:ghansth@gmail.com) | [Github](https://github.com/ludmila-chagas) | [LinkedIn](https://www.linkedin.com/in/thayna-rdg/)
- Thayná
  - [Email](mailto:thna.rdg@gmail.com) | [Github](https://github.com/thnardg) | [LinkedIn](https://www.linkedin.com/in/ludmila-chagas-273548187/)
- Wladmir
  - [Email](mailto:wladmcd@gmail.com) | [Github](https://github.com/getwlad) | [LinkedIn](https://www.linkedin.com/in/wladmir-rodrigues/)

## [Agradecimentos](#Agradecimentos)

[iFood](https://institucional.ifood.com.br/?utm_source=site_ifood) | [Digital House](https://www.digitalhouse.com/br) | [Potência Tech](https://potenciatech.com.br/)

![BuiltWith](https://ForTheBadge.com/images/badges/built-with-love.svg)

**[⬆ voltar ao início](#Conteudo)**
