/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Home from './src/Components/Home.js';
import Connect from './src/Components/Connect.js';
import Settings from './src/Components/Settings.js';
import Loading from './src/Components/Loading.js';
import { createStackNavigator, createAppContainer } from "react-navigation";

class App extends Component<Props> {
  render() {
    return <AppContainer />;
  }
}

const AppNavigator = createStackNavigator({
    Home: { screen: Home },
    Connect: { screen: Connect },
    Settings: { screen: Settings },
    Loading: { screen: Loading }
  },
  {
    initialRouteName: "Connect"
  }
);

export default createAppContainer(AppNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  }
});
