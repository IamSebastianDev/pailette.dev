<!-- @format -->

# Get started with the development

Great that you want to contribute! Nice to have you onboard! 👽 To get started, follow this contributing guideline to set up the project and work with us!

> Note: Read more about [running the app in production](#production---deployment) here

## Necessary software & tools

The following tools and softwares are necessary to develop this application:

| name    | version             | link                                                  |
| ------- | ------------------- | ----------------------------------------------------- |
| Node.js | ^18.x (recommended) | [Node.js v18](https://nodejs.org/en/)                 |
| yarn    | ^1.22.x             | [yarn](https://yarnpkg.com/getting-started)           |
| Docker  | ^20.10.x            | [Docker Desktop](https://docs.docker.com/get-docker/) |

After installing the necessary tools, you can run the commands below to start developing.

## Development - Setting Up The Repository

-   clone the repository by running `git clone {{repository url}} .` in your terminal or shell to clone the repo into the current directory.
-   run `yarn` or `yarn install` to install the dependencies. This will also install the necessary husky scripts as a `postinstall` command.

## Development - CLI Commands

-   `yarn preci`: Removes all files inside the node_modules folder. Is part of the repository setup.
-   `yarn ci`: Installs all dependencies without generating a lockfile and throws and error if an update is needed.
-   `yarn postinstall`: Installs husky and the hooks
-   `yarn build`: Builds the front- and backend resources
-   `yarn build:production`: Builds the front- and backend resources and minifies them.
-   `yarn dev`: Builds the front- and backend resources in watch mode.
-   `yarn dev:dockerized`: Starts the development environment inside a docker container. You can reach in on the port specified in the .env file.
-   `yarn serve`: Starts the server in watch mode and serves the frontend to the port specified in the .env file.
-   `yarn start`: Starts the server in prod mode.
-   `yarn lint`: Runs alex and stylelint to check for code conformity and inclusiveness.
-   `yarn test`: Runs [ava](https://github.com/avajs/ava) with the tests supplied in the `tests` directory
-   `yarn test:coverage`: Runs [ava](https://github.com/avajs/ava) and uses [c8](https://github.com/bcoe/c8) to calculate test coverage after running the tests

There a handful commands that can be used to interact with Docker to simplify development.

-   `yarn docker:build`: Build the production docker image.
-   `yarn docker:up`: Starts the docker dev environment. The app is still accessible on the port defined in your .env file, but completely dockerized.
-   `yarn docker:down`: Downs the docker dev environment.
-   `yarn docker:stop`: Stops the docker dev environment.
-   `yarn db:up`: Starts only the surrealdb database image in a docker container.
-   `yarn db:down`: Downs the surrealdb database instance.
-   `yarn db:stop`: Stops the surrealdb database instance.
-   `yarn docker:deploy`: Builds the production image and spins up the service.
-   `yarn docker:destroy`: Composes down the production service.

## Development - Project Structure

-   TBD

## Development - Enforcing Code Standards

This project uses multiple tools to enforce code quality:

### Conventional commits

The project uses [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) to ensure a certain commit message style.

-   `feat`: Used when adding features to the application.
-   `fix`: Used when fixing a bug or issue.
-   `refactor`: Used when changing or improving code that is not a new feature or bug.
-   `chore`: Used when updating non application related code.

### Formatting

The project uses [prettier](https://prettier.io/) to format the code to conform to a certain style. Formatting is enforced using [pretty-quick](https://www.npmjs.com/package/pretty-quick) as a pre-commit hook.

### Inclusiveness

The project uses [alex](https://alexjs.com) to check documentation and text files for inclusive language. For example, when `We’ve confirmed his identity` is given, alex will warn you and suggest using `their` instead of `his`. Alex runs as part of the precommit linting.

### Stylelint

The project uses [stylelint](https://stylelint.io) to check css & scss for style problems. Stylelint runs as part of the precommit linting.

## Development - Git Structure

To develop a feature, checkout a new Branch from `development` and prefix it with the correct branch type. The project currently differentiates between two branch types, `feature` and `bugfix`. For example, a branch to fix a bug would be created like this:

```bash
$ git checkout development
# checkout development as basis for development
$ git checkout -b bugfix/bug-to-fix
# creates a new branch with the correct branch type prefixed
```

## Development - Github Actions

-   TBD

## Development - Docker

The project uses [docker](https://www.docker.com/) to virtualize the development environment if desired. For production, a complete docker image is build by running `yarn docker:build`. For convenience, two different docker-compose files exist:

-   `docker-compose.db.yml`: Starts docker with the [surrealdb](https://surrealdb.com/app) image exposed on the port specified in your `.env` file.
-   `docker-compose.yml`: Starts a complete node app dockerized, reachable on the port specified in your `.env` file.

The `package.json` contains multiple commands to make working with docker easier. Read more about the commands [here](#development---cli-commands)

## Project - Dependencies

-   TBD

## Production - Deployment

To deploy the application, build the image and then use the `production docker-compose` file to start the app.

```bash
# Build the image
yarn run docker:build

# Start the service
docker compose -f docker-compose.prod.yml up

# Alternatively, you can use the yarn command if desired
yarn run docker:deploy
```
