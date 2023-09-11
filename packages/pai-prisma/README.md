<!-- @format -->

# @pai/prisma

The database package is used to create, manage and maintain [Prisma migrations](https://www.prisma.io/docs). A additional package ([Prisma Import](https://github.com/ajmnz/prisma-import)) is used to split migrations into maintainable chunks.

## Setting up the environment variables

The `.env` file from the root of the project needs to be copied or symlinked for `Prisma` to pick it up. If you're using VSCode, there is a handy extension for that: [`vscode-symlink`](https://marketplace.visualstudio.com/items?itemName=anbuselvan.vscode-symlink)

## Using the client

To use the client in the application, import it into the application.

```ts
import { client } from '@pai/prisma';

// do things with the client
client.user.findUnique();
```

## Creating a Migration

Create a new File in `prisma/schemas/<migration-name>.schema.prisma`. Then run `yarn db:migrate:dev` in the root directory of the project to start the migration. This will import all split migrations and create the main `schema.prisma`.

## Dependencies

There are two runtime dependencies:

-   `@prisma/client`: The Prisma client for database queries, version `^5.0.0`.
-   `dotenv`: A zero-dependency module that loads environment variables from a `.env` file, version `^16.3.1`.

## Development Dependencies

The package uses multiple development dependencies to aid in building, bundling and testing:

-   `@rollup/plugin-commonjs`: Allows Rollup to convert CommonJS modules to ES6, version `^25.0.3`.
-   `@rollup/plugin-json`: Converts `.json` files to ES6 modules, version `^6.0.0`.
-   `@rollup/plugin-node-resolve`: Locates modules using the Node resolution algorithm, version `^15.1.0`.
-   `@rollup/plugin-terser`: Minifies generated ES bundle, version `^0.4.3`.
-   `esbuild`: An extremely fast JavaScript bundler and minifier, version `^0.18.16`.
-   `prisma`: Next-generation Node.js and TypeScript ORM, version `^5.0.0`.
-   `prisma-import`: Enables splitting migrations into multiple files, version `^1.0.4`.
-   `rollup`: A module bundler for JavaScript, version `^3.26.3`.
-   `rollup-plugin-cleanup`: Plugin to cleanup files before creating a bundle, version `^3.2.1`.
-   `rollup-plugin-dts`: Rollup plugin to generate .d.ts files, version `^5.3.0`.
-   `rollup-plugin-esbuild`: Integrates the `esbuild` JavaScript bundler into Rollup, version `^5.0.0`.
-   `tsx`: TypeScript for Node.js, version `^3.12.7`.
-   `typescript`: A superset of JavaScript that adds static types, version `^5.1.6`.

## Commands

-   `build`: Builds the project using the Rollup configuration found at `.config/rollup.config.js`.
-   `dev`: Watches for file changes and builds the project when a change is detected.
-   `migrate`: Forces a Prisma import and then runs Prisma migrations.
-   `migrate:dev`: Forces a Prisma import and then runs Prisma migrations in development mode.

> Note: All scripts should be run using `turbo` from the root of the project.

## Prisma

This package uses Prisma for data modelling, ORM, and migrations. The seed script can be found at `prisma/seed.ts`. The Prisma schema file is `./prisma/schema.prisma`. The Prisma import mechanism is configured to take in all `.prisma` files under `./prisma/schemas/` and output a single Prisma schema file at `./prisma/schema.prisma`.

## Schemas
