import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { HeaderBackButton } from 'react-navigation'

export default class Settings extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: "Settings",
        headerLeft: <HeaderBackButton onPress={() => navigation.navigate('Home')} />
    });
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
