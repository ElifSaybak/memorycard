/**
 * @format
 */

import { AppRegistry } from 'react-native'
import App from './App'
import { name as appName } from './app.json'
import './src/util/ReactotronConfig' // ReactotronConfig.ts dosyası içe aktarılır.

AppRegistry.registerComponent(appName, () => App)
