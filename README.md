<h1 align="center">
    <img alt="GoBarber" src="./web/src/assets/logo.svg" width="231px" /><br>
    <b>GoBarber: Barber shop booking</b> 💈
</h1>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/diegomais/gobarber-ts?style=for-the-badge">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/diegomais/gobarber-ts?style=for-the-badge">
  <img alt="GitHub license" src="https://img.shields.io/github/license/diegomais/gobarber-ts?style=for-the-badge">
  <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/diegomais/gobarber-ts?style=for-the-badge">
</p>

<p align="center">
  <a href="#rocket-technologies">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#seat-getting-started">Getting started</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#thinking-how-to-contribute">How to contribute</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-license">License</a>
</p>

## :rocket: Technologies

This project was developed with the following technologies:

- [Node.js](https://nodejs.org)
- [React](https://reactjs.org)
- [React Native](https://facebook.github.io/react-native/)

Extras:

- Main Libs
  - [Express](https://expressjs.com)
  - [TypeORM](https://typeorm.io)
  - [styled-components](https://styled-components.com)
  - [Unform](https://unform.dev)
- Style
  - [EditorConfig](https://editorconfig.org)
  - [ESLint](https://eslint.org)
  - [Prettier](https://prettier.io)

## :seat: Getting started

These instructions will get you a copy of the full project up and running on your local machine for development and testing purposes.

#### Setting up the development environment

The project is developed using Git. Git is a free and open source distributed version control system. [Download Git](https://git-scm.com/downloads).

The project can be built with npm or Yarn, so choose one of the approach bellow in case you don't have any installed on your system.

- **npm** is distributed with Node.js which means that when you download Node.js, you automatically get npm installed on your computer. [Download Node.js](https://nodejs.org/en/download/).
- **Yarn** is a package manager built by Facebook Team and seems to be faster than npm in general. [Download Yarn](https://yarnpkg.com/en/docs/install).

#### Cloning the project

You can obtain the project by running the instruction bellow on your terminal:

`git clone https://github.com/diegomais/gobarber-ts.git`

#### Setting up Databases and Services

The project uses [PostgreSQL](https://www.postgresql.org), [MongoDB](https://www.mongodb.com) and [Redis](https://redis.io).

We recommend use [Docker](https://www.docker.com) to install and run the databases and services above.

1. Install [Docker Desktop](https://www.docker.com/get-started).
2. Start a PostgreSQL instance:
   `docker run --name gobarber-pg -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 -d postgres`

### API

#### Installing dependencies and running the server

Run the instructions bellow inside `api` directory:

1. `npm install`
2. `npm run dev:server`

or

1. `yarn install`
2. `yarn dev:server`

### Web

#### Installing dependencies and running the web application

Run the instructions bellow inside `web` directory:

1. `npm install`
2. `npm start`

or

1. `yarn install`
2. `yarn start`

### Mobile

#### Setting up the development environment

Follow the instructions for React Native CLI available in the official [React Native Documentation](https://reactnative.dev/docs/environment-setup).

#### Installing dependencies and running the mobile application

Run the instructions bellow inside `mobile` directory:

1. `npm install`
2. `npm start`

or

1. `yarn install`
2. `yarn start`

## :thinking: How to contribute

- Fork this repository;
- Create a branch with your feature: `git checkout -b my-feature`;
- Commit your changes: `git commit -m '[feat](scope) My new feature'`;
- Push to your branch: `git push origin my-feature`.

After the merge of your pull request is done, you can delete your branch.

## :memo: License

This project is under the MIT license. See the [LICENSE](LICENSE) for more details.

---

Made with :heart: by [Diego Mais](https://diegomais.github.io/) :wave:.
