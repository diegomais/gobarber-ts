<h1 align="center">
    <img alt="GoBarber" src="./frontend/src/assets/logo.svg" width="231px" /><br>
    <b>GoBarber: Barber shop booking</b> 💈
</h1>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/diegomais/gobarber-ts?style=for-the-badge">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/diegomais/gobarber-ts?style=for-the-badge">
  <img alt="JavaScript Style Guide" src="https://img.shields.io/badge/JavaScript%20Style%20Guide-Airbnb-red?style=for-the-badge">
  <img alt="GitHub license" src="https://img.shields.io/github/license/diegomais/gobarber-ts?style=for-the-badge">
  <img alt="Backend CI" src="https://img.shields.io/github/workflow/status/diegomais/gobarber-ts/Backend%20CI?label=Backend%20CI&style=for-the-badge">
  <img alt="Mobile App CI" src="https://img.shields.io/github/workflow/status/diegomais/gobarber-ts/Mobile%20App%20CI?label=Mobile%20App%20CI&style=for-the-badge">
  <img alt="Frontend CI" src="https://img.shields.io/github/workflow/status/diegomais/gobarber-ts/Frontend%20CI?label=Frontend%20CI&style=for-the-badge">
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

### Prerequisites

You will need to install [Git](https://git-scm.com/downloads), [Docker Desktop](https://www.docker.com/products/docker-desktop) and [Docker Compose](https://docs.docker.com/compose/install/) before following the instructions below.

### Setting up the development environment

The following steps need to be performed inside a terminal window (Windows user may prefer to use the [Windows Terminal](https://aka.ms/windowsterminal) but the Command Prompt will also work).

Clone the repository and build Docker images:

```shell
# Clone repository
git clone https://github.com/diegomais/gobarber-ts.git

# Change directory
cd gobarber-ts

# Build Docker images
docker-compose build

# Create .env from example file
if [ ! -f $PWD/backend/.env ]; then cp $PWD/backend/.env.example $PWD/backend/.env; fi

# Apply database migrations
docker-compose run --rm backend yarn typeorm migration:run
```

### Running application containers

Use the following command to run all GoBarber containers (from within the gobarber-ts directory):

```shell
# Start containers
docker-compose up
```

### Mobile

#### Prerequisites

The project can be built with npm or Yarn, so choose one of the approach bellow in case you don't have any installed on your system.

- **npm** is distributed with Node.js which means that when you download Node.js, you automatically get npm installed on your computer. [Download Node.js](https://nodejs.org/en/download/).
- **Yarn** is a package manager built by Facebook Team and seems to be faster than npm in general. [Download Yarn](https://yarnpkg.com/en/docs/install).

#### Setting up the development environment

Follow the instructions for React Native CLI available in the official [React Native Documentation](https://reactnative.dev/docs/environment-setup).

#### Installing dependencies and running the mobile application

Run the instructions bellow inside `mobile` directory:

```shell
npm install
npm start
```

or

```shell
yarn install
yarn start
```

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
