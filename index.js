/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
// enable gesture-handler in app.
import 'react-native-gesture-handler';

AppRegistry.registerComponent(appName, () => App);
