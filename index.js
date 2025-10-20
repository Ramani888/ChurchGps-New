/**
 * @format
 */

import { AppRegistry, LogBox } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

LogBox.ignoreLogs([
  'A props object containing a "key" prop is being spread into JSX',
]);

AppRegistry.registerComponent(appName, () => App);
