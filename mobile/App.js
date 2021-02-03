import 'react-native-gesture-handler'
import * as React from 'react'

import { StatusBar } from 'expo-status-bar'
import Routes from './src/routes/index.routes'
import { View, StyleSheet } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { Provider } from 'react-redux'
import store from './src/store'
export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.app}>
        <Routes />
        <StatusBar style='dark' translucent={true} backgroundColor={'#fff'} />
      </View>
    </Provider>
  )
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    paddingTop: getStatusBarHeight(),
    backgroundColor: 'rgba(247, 247, 247, 0.95)',
  },
})
