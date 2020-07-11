# Expenses terminal App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

** **
## Installing
**Version of `node` must be at least 12.18.2**

1. Run `npm install` for install all project dependecies;
2. **Create `.env` file in a root directory and put `REACT_APP_FIXER_API_KEY` variable with your Fixer api key there.**
** **
## Available commands inside the application
1. Add expense:<br />
`add [date] [number] [currency] [name]` where <br />
[date] ​ — ​ is the date when expense occurred, <br />
[number] ​ — ​ is an amount of money spent, <br />
[currency] ​ — ​ the currency in which expense occurred, <br />
[name] ​ — ​ is the name of product purchased.<br />
Example: `add 2017-04-25 12 USD Jogurt`.<br />
2. Clear expenses by date:<br />
`clear [date]` where<br />
[date] ​ — ​ is the date for which all expenses should be removed.
3. Show the list of all expenses sorted by date:<br />
`list`<br />
4. Calculate the total amount of money spent:<br />
`total [currency]` where<br />
[currency]​ — ​ is the currency in which total amount of expenses should be presented<br />
** **
## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
