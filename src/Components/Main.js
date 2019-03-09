import React, { Component } from 'react'
import { Text, View } from 'react-native'

export default class Main extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.weather}> Current Weather/Outside Temperature </Text>
        <View style={styles.controllerData}>
            <Text> Current Temperature </Text>
            <Text> Target Temperature </Text>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    weather: {
        flex: 1
    },
    controllerData: {
        flex:1,
        flexDirection: row
    }
});
