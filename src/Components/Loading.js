import React, { Component } from 'react';
import { Text, StyleSheet, View, ActivityIndicator } from 'react-native';
import BluetoothSerial from "react-native-bluetooth-serial";

export default class Loading extends Component {
  constructor(props) {
    super(props);
    var hasData = false;
    var currentTemp = "";
    var targetTemp = "";
  }

  getData(command){
    return new Promise( async function(resolve, reject){
      try{
        await BluetoothSerial.write(command);
        let input ='';
        let interval = setInterval(async function() {
          const data = await BluetoothSerial.readFromDevice();
          input += data.trim();
          if(data!="" && (data.trim() === '~' || input.endsWith("~"))){
            input = input.slice(0,-1);
            clearInterval(interval);
            resolve(input);
          }
        }, 10);
      }
      catch{
        reject();
      }
      
    });
  }

  // getData(command){
  //   BluetoothSerial.write(command);
  //   let input='';
  //   let interval = setInterval(() => {
  //     BluetoothSerial.readFromDevice().then((data) => {
  //       input += data.trim();
  //       if(data!="" && (data.trim() === '~'|| String.prototype.endsWith(input, "~"))){
  //         console.log(String.prototype.endsWith(input, '~'));
  //         console.log(input.slice(0,-1));
  //         clearInterval(interval);
  //         return input.slice(0,-1);
  //       }
  //     });
  //   }, 10);
  // }
  render() {
    // this.props.currentTemp = this.getData("Please send me the current temperature\n");
    // this.props.targetTemp = this.getData("Please send me the target temperature\n");
    
    this.getData("Please send me the current temperature\n")
    .then((result)=>{
      console.log(result);
      this.currentTemp = result;
      console.log("currentTemp is " + this.currentTemp);
    })
    .then(() => {
      this.getData("Please send me the target temperature\n")
      .then((result)=>{
        console.log(result);
        this.targetTemp = result;
        console.log("targetTemp is " + this.targetTemp); 
        if(this.currentTemp && this.targetTemp){
          this.props.navigation.navigate('Home', {
            currentTemp: this.currentTemp,
            targetTemp: this.targetTemp
          });
        }
        });
    })
    .catch();
    

    return (
      <View style = {styles.container}>
        <ActivityIndicator size="large" color="#FFF"/>
        <Text style = {styles.fetchText}> Fetching Data From Arduino... </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FF7C68",
    paddingTop: 100
  },
  fetchText: {
    marginTop: 30,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
    flex: 1
  },
});
