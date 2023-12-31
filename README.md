# Getting Started with NFT PAGE App

This project was bootstrapped with [Create React App]

## App Structure

### The "App" component:

It serves as the main container of the application.
It renders two child components: "SearchBar" and "NFTCardList".
It manages a piece of state called "searchValue" which is modified by the "SearchBar" and is used to filter the "NFTCardList".

### The "components" folder contains the following:

The "SearchBar" component
The "NftCard" component
The "NFTCardList" component is a responsive virtualized grid that displays multiple NFT cards, at first 20 then it loads more if you scroll to the bottom of the list.

### The "App.module.scss" file:

Contains all the styling of the application.

### The "api" folder contains the following:

The "nftDataService" file acts as a bridge between this application React components and the external data sources.

## Available Scripts

In the project directory, you can run:

### `npm install`

Please run this before trying to run the app.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).
