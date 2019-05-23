/**
 * @format
 */

import {AppRegistry} from 'react-native';
// import App from './App';
import {name as appName} from './app.json';

import Setup from './src/pages/Entry/Setup.js';

AppRegistry.registerComponent(appName, () => Setup);
