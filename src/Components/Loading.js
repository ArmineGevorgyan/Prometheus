import React, { Component } from 'react'
import { Text, View } from 'react-native'

export default class Loading extends Component {
    //send request to the controller to connect to Arduino
    //display the logo and a spinner and "Connecting..." 

  render() {
    return (
      <View>
        <Text> textInComponent </Text>
      </View>
    )
  }
}
