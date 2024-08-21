<p align="center">
  <img src="./public/N7_final-blue.svg" alt="nrlogo" width="400" />
</p>

<h1 align="center">React-Javascript Framework</h1>

<p align="center">
  <b>A delightful way to building a React.js Application with beautiful code written in JavaScript.</b></br>
  <sub>Made with ❤️ by <a href="https://n7banking.com/">n7banking</a>,and <a href="">Team</a></sub>
</p>
<br />


## ❯ Why

Our main goal with this project is a feature complete Web application.

### Features

- **Testing** with included e2e testing.
- **Clear Structure** with different layers such as component, pages, context, hooks, services...
- **Integrated Testing Tool** thanks to [Jest](https://jestjs.io/docs/tutorial-react).
- **Basic Security Features** with contains basic security.

## ❯ Table of Contents

- [Getting Started](#-getting-started)
- [Scripts and Tasks](#-scripts-and-tasks)
- [Debugger in VSCode](#-debugger-in-vscode)
- [Project Structure](#-project-structure)
- [Further Documentations](#-further-documentations)

## ❯ Getting Started

### Step 1: Set up the Development Environment

You need to set up your development environment before you can do anything.

Install [Node.js and NPM](https://nodejs.org/en/download/)

### Step 2: Serve your App

Go to the project dir and start your app with this yarn script.

```bash
npm start
```

## ❯ Scripts and Tasks

All script are defined in the `package-json.js` file, but the most important ones are listed here.

### Install

- Install all dependencies with `npm install`

### Linting

- Run code quality analysis using `npm run lint`. This runs tslint.
- There is also a vscode task for this called `lint`.

### Tests

- Run the unit tests using `npm run test` (There is also a vscode task for this called `test`)

### Running in dev mode

- Run `npm run dev` to start nodemon with ts-node, to serve the app.
- The server address will be displayed to you as `http://0.0.0.0:3000`

### Building the project and run it

- Run `npm run build` to generated all JavaScript files from the TypeScript sources (There is also a vscode task for this called `build`).
- To start the builded app located in `public` use `npm run`.


## ❯ Debugger in VSCode

To debug your code run `npm run build` or hit <kbd>cmd</kbd> + <kbd>b</kbd> to build your app.
Then, just set a breakpoint and hit <kbd>F5</kbd> in your Visual Studio Code.

## ❯ Project Structure

| Name                              | Description |
| --------------------------------- | ----------- |
| **.vscode/**                      | VSCode tasks, launch configuration and some other settings |
| **public/**                       | Compiled source files will be placed here |
| **src/**                          | Source files |
| **src/component/v1/minor/**          | Contains smaller size of component like Buttons,Input, Checkbox etc.. |
| **src/component/v1/major/**          | Collections of minor components  |
| **src/i18n**                      | Translate application language |
| **src/pages**                     | Each page is associated with a route based on its file name |
| **src/services/**                 | Service layer |
| **src/store/**                    | Redux store |
| **src/styles**                    | Global styles |
| **src/utils**                     | Utils & constans |
| **src/.husky**                    | Pre-commit hooks scripts |

## ❯ Further Documentations

| Name & Link                       | Description                       |
| --------------------------------- | --------------------------------- |
| [React Js](https://reactjs.org/) | A JavaScript library for building user interfaces |
| [Next Js](https://nextjs.org/) | Next.js gives you the best developer experience with all the features you need for production |
| [React-Redux](https://react-redux.js.org/) | React Redux is the official React UI bindings layer for Redux |
| [ESLint](https://eslint.org/) | Find and fix problems in your JavaScript code |
| [Stylelint](https://stylelint.io/) | A mighty, modern linter that helps you avoid errors and enforce conventions in your styles |
| [i18next](https://react.i18next.com/) | react-i18next is a powerful internationalization framework for React/React-Native |
| [React Jest](https://jestjs.io/docs/tutorial-react) | Testing react app |
| [React Testing library](https://testing-library.com/docs/react-testing-library/intro/) | The React Testing Library is a very light-weight solution for testing React components |
