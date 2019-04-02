import React, { Component } from 'react'
import { Text, StyleSheet, View, Button } from 'react-native'

export default class Home extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { navigation } = this.props;
    const currentTemp = navigation.getParam('currentTemp', 'Not Available');
    const targetTemp = navigation.getParam('targetTemp', 'Not Available');
    return (
      <View style={styles.container}>
        <Text style={styles.weather}> Current Weather/Outside Temperature </Text>
        <View style={styles.controllerData}>
          <View>
            <Text> Current Temperature </Text>
            <Text> {currentTemp} </Text>
          </View>
          <View>
            <Text> Target Temperature </Text>
            <Text> {targetTemp} </Text>
          </View>
        </View>
        <View style={styles.buttonRow}>
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
      backgroundColor: "#FF7C68"
    },
    weather: {
      flex: 2
    },
    controllerData: {
      flex:1,
      flexDirection: 'row'
    },
    buttonRow: {

    }
});
