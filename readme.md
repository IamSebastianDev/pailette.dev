<!-- @format -->

# TypeScript Svelte Express SCSS Template

This template can be used as a opinionated starting point for a typescript svelte based app. It uses several tools to enhance the dx aspect of creating an application. Read more about how the different aspects of the template in the [`Contributing Guidelines`](./contributing.md).

## Tools used in the template

-   [yarn](https://yarnpkg.com/getting-started)
-   [TypeScript](https://www.typescriptlang.org)
-   [SCSS](https://sass-lang.com)
-   [Svelte](https://svelte.dev)
-   [Rollup](https://rollupjs.org/guide/en/) as bundler, using esbuild to transpile TypeScript to JavaScript
-   [ava](https://github.com/avajs/ava) as test-runner
-   [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) to ensure commit standards
-   [Prettier](https://prettier.io) & [Pretty-quick](https://www.npmjs.com/package/pretty-quick) to format the code
-   [Stylelint](https://stylelint.io) To lint scss
-   [alex](https://alexjs.com) for linting the documentation

## Dependencies used in the template

| Name                            | Type | Description                                                                                |
| ------------------------------- | ---- | ------------------------------------------------------------------------------------------ |
| @commitlint/cli                 | dev  | A tool for linting commit messages according to a specified format (conventional commits). |
| @commitlint/config-conventional | dev  | Configuration preset for commitlint to enforce conventional commit message format.         |
| @rollup/plugin-commonjs         | dev  | A Rollup plugin to convert CommonJS modules to ES Modules.                                 |
| @rollup/plugin-json             | dev  | A Rollup plugin to import JSON files as ES modules.                                        |
| @rollup/plugin-node-resolve     | dev  | A Rollup plugin to resolve and include external modules from node_modules.                 |
| @rollup/plugin-replace          | dev  | A Rollup plugin to replace strings in files while bundling.                                |
| @tsconfig/svelte                | dev  | Configuration file for Svelte projects using TypeScript.                                   |
| @types/compression              | dev  | Type definitions for the 'compression' package.                                            |
| @types/cors                     | dev  | Type definitions for the 'cors' package.                                                   |
| @types/express                  | dev  | Type definitions for the 'express' package.                                                |
| alex                            | dev  | A natural language linter for detecting insensitive, inconsiderate writing.                |
| ava                             | dev  | A JavaScript test runner.                                                                  |
| c8                              | dev  | A code coverage tool for Node.js.                                                          |
| esbuild                         | dev  | A JavaScript bundler and minifier.                                                         |
| husky                           | dev  | A tool for adding Git hooks.                                                               |
| nodemon                         | dev  | A utility that automatically restarts Node.js applications.                                |
| prettier                        | dev  | An opinionated code formatter.                                                             |
| pretty-quick                    | dev  | A tool for running Prettier on only the changed files.                                     |
| rollup                          | dev  | A module bundler for JavaScript.                                                           |
| rollup-plugin-cleanup           | dev  | A Rollup plugin to remove debugger statements and console.\* calls.                        |
| rollup-plugin-esbuild           | dev  | A Rollup plugin to bundle JavaScript files using esbuild.                                  |
| rollup-plugin-rld               | dev  | A Rollup plugin to reload the browser when files change.                                   |
| rollup-plugin-scss              | dev  | A Rollup plugin to compile SCSS files.                                                     |
| rollup-plugin-svelte            | dev  | A Rollup plugin to compile Svelte components.                                              |
| rollup-plugin-terser            | dev  | A Rollup plugin to minify JavaScript files using Terser.                                   |
| sass                            | dev  | A CSS preprocessor.                                                                        |
| stylelint                       | dev  | A linter for enforcing consistent styles in CSS files.                                     |
| stylelint-config-prettier       | dev  | Configuration preset for Stylelint to avoid conflicts with Prettier.                       |
| stylelint-config-prettier-scss  | dev  | Configuration preset for Stylelint to avoid conflicts with Prettier in SCSS files.         |
| stylelint-config-standard       | dev  | Configuration preset for Stylelint following the standard style rules.                     |
| stylelint-config-standard-scss  | dev  | Configuration preset for Stylelint following the standard style rules in SCSS files.       |
| svelte                          | dev  | A JavaScript framework for building user interfaces.                                       |
| svelte-check                    | dev  | A tool to check Svelte components for errors and unused CSS.                               |
| svelte-preprocess               | dev  | A preprocessor for Svelte that allows using features like SCSS, TypeScript, and more.      |
| ts-node                         | dev  | TypeScript execution environment and REPL for Node.js.                                     |
| typescript                      | dev  | A superset of JavaScript that adds static type-checking to the language.                   |
| compression                     | prod | Middleware for compressing HTTP responses in Express.js.                                   |
| cors                            | prod | Middleware for enabling Cross-Origin Resource Sharing (CORS) in Express.js.                |
| dotenv                          | prod | Loads environment variables from a .env file into process.env.                             |
| express                         | prod | A fast and minimalist web framework for Node.js.                                           |
| helmet                          | prod | Middleware for securing HTTP headers in Express.js applications.                           |

Note: The table includes both development dependencies (dev) and production dependencies (prod).

## Getting started

To get started, clone the repository and recreate the git repository to start with a clean template.

```bash
git clone https://github.com/IamSebastianDev/template-svelte-express.git <your-app-name>

cd <your-app-name>

# Reset the git repository
yarn reset

# This will leave you with two branches, main & development as well as an initial commit.
```

After creating a new repository, fill out the remaining information in the `package.json` and install the dev-dependencies. You should use the defaults already set in the `package.json` and only change the not already set meta information.

```bash
# fill out the package.json
yarn init
# do a clean install of the dependencies
yarn ci
# install githooks
yarn setup
```

## Development

Checkout the [`Contributing Guidelines`](./contributing.md) to find out how to develop within your newly created repository.
