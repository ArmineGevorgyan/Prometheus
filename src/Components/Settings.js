import React, { Component } from 'react'
import { Text, View } from 'react-native'

export default class Settings extends Component {
    static navigationOptions = {
        title: "Settings"
    };
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View>
        <Text> Settings Page </Text>
      </View>
    )
  }
}
