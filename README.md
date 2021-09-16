# Campfire (MERN APP)

# Client Side

## Prerequisites

- NodeJS
- Global node modules
  - react-devtools
  - eslint
- recommended (optional)
  - nvm (to install multiple node versions)

## VSCode Plugins

- flowtype.flow-for-vscode
- dbaeumer.vscode-eslint
- gcazaciuc.vscode-flow-ide
- stevencl.adddoccomments
- donjayamanne.githistory
- ericamodio.gitlens
- prettier.prettier-codeformatter
- gruntfuggly.todo-tree

## Run the app locally

1. `cd client`
2. Run command `yarn install` to install modules
3. Run command `yarn start` to run the app in the development mode.
4. Open http://localhost:3000 to view it in the browser.

## Run the storybook
5. Run command `yarn storybook` to run the storybook.

## Run Campfire API docs

1. Navigate to todo-list directory ```cd client```
2. Install the dependencies ```yarn install```. Make sure yarn is already installed, if not you can refer here https://classic.yarnpkg.com/en/docs/install/#mac-stable
3. It is recommended to install ```docsify-cli``` globally, which helps initializing and previewing the website locally. Run ```npm i docsify-cli -g``` to install it globally.
4. Run the local server with the command ```yarn docs```.

## Something To Learn

- [Atomic Web Design](https://bradfrost.com/blog/post/atomic-web-design/)
- [Ant Design](https://ant.design/docs/react/introduce)
- [Storybook](https://storybook.js.org/docs/react/get-started/introduction)
- [JSX - Typescript](https://www.typescriptlang.org/docs/handbook/jsx.html)
- [React Router](https://reactrouter.com/web/guides/quick-start)
- [Application State Management with React](https://kentcdodds.com/blog/application-state-management-with-react)
- [React Hooks](https://reactjs.org/docs/hooks-reference.html)
- [React Context Api](https://reactjs.org/docs/context.html)

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

# Server Side

## Run the development server

1. Navigate to `server` directory. Run command 1. `cd server`
2. Run `yarn install` to install the needed dependencies. Make sure yarn is already installed in your machine if not you may refer [here](https://classic.yarnpkg.com/en/docs/install#mac-stable).
3. After installing modules run command `yarn start`.
4. Open [http://localhost:5000](http://localhost:5000) to view it in the browser. Then you may use rest client to test all available routes.
