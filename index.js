/**
 * @format
 */

import { AppRegistry } from 'react-native';
// import App from './App';
import { name as appName } from './app.json';

// import Setup from './src/pages/Entry/Setup.js';
// import WelcomePage from 'pages/Entry/WelcomePage';
// import AppNavigator from 'navigator/AppNavigator'

import App from './src/App'

AppRegistry.registerComponent(appName, () => App);
