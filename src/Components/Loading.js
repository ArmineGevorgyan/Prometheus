import React, { Component } from 'react'
import { Text, View } from 'react-native'
const connection = require("../Connection/connect.js");
const hasConnected = connection.hasConnected;


export default class Loading extends Component {

  connection.btSerial.inquire();
  render() {

    return (
      <View>
          { hasConnected() ? 
          (<Text> Connected! </Text>) :
          (<Text> Connecting to Arduino... </Text>) }
      </View>
    );
  }
}

const styles = StyleSheet.create({
});
