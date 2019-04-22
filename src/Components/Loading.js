import React, { Component } from 'react';
import { Text, StyleSheet, View, ActivityIndicator } from 'react-native';
import BluetoothSerial from "react-native-bluetooth-serial";

export default class Loading extends Component {
  constructor(props) {
    super(props);
    var hasData = false;
    var currentTemp = '';
    var targetTemp = '';
    var monday = '';
    var tuesday = '';
    var wednesday = '';
    var thursday = '';
    var friday = '';
    var saturday = '';
    var sunday = '';
  }

  getData(command){
    return new Promise( async function(resolve, reject){
      try{
        await BluetoothSerial.write(command);
        let input ='';
        let interval = setInterval(async function() {
          const data = await BluetoothSerial.readFromDevice();
          input += data.trim();
          if(data!="" && (data.trim() === '%' || input.endsWith("%"))){
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

  render() {
    const goTo = this.props.navigation.getParam('goTo', 'Home');

    
    if(goTo==='Settings'){ 
      //week starts from sunday!
      this.getData("w\n") //send the settings
      .then((result)=>{
        console.log(result);
        result = result.split(/\r?\n/); 
        //parse into daily settings
        this.sunday = result[0];
        this.monday = result[1];
        this.tuesday = result[2];
        this.wednesday = result[3];
        this.thursday = result[4];
        this.friday = result[5];
        this.saturday = result[6];
      })
      .then(()=>{
        this.props.navigation.navigate('Settings', {
          monday: this.monday,
          tuesday: this.tuesday,
          wednesday: this.wednesday,
          thursday: this.thursday,
          friday: this.friday,
          saturday: this.saturday,
          sunday: this.sunday
        });
      })

      //For Testing
//       let result = `18 20 20 20 20 20 15 15
// 15 15 15 15 15 15 15 15
// 15 15 15 15 15 15 15 15
// 15 15 15 15 15 15 15 15
// 15 15 15 15 15 15 15 15
// 15 15 15 15 15 15 15 15
// 18 20 20 20 20 21 20 18`;
//       result = result.split(/\r?\n/); 
//       this.sunday = result[0];
//       this.monday = result[1];
//       this.tuesday = result[2];
//       this.wednesday = result[3];
//       this.thursday = result[4];
//       this.friday = result[5];
//       this.saturday = result[6];
//       this.props.navigation.navigate('Settings', {
//         monday: this.monday,
//         tuesday: this.tuesday,
//         wednesday: this.wednesday,
//         thursday: this.thursday,
//         friday: this.friday,
//         saturday: this.saturday,
//         sunday: this.sunday
//       });

    // let result = `HomeT:0.0
    // TargetT:20.0
    // AlarmT:10.0
    // 21:03 21.04.2019 Sunday`;
    //         result = result.split(/\r?\n/); //split by newline (hopefully)
    //         this.currentTemp = result[0].replace('HomeT:','');
    //         this.currentTemp = this.currentTemp.substring(0, this.currentTemp.indexOf('.'));
    //         this.targetTemp = result[1].replace('TargetT:','');
    //         this.targetTemp = this.targetTemp.substring(0, this.targetTemp.indexOf('.'));
    //         console.log("currentTemp is " + this.currentTemp);
    //         console.log("targetTemp is " + this.targetTemp);
    //         if(this.currentTemp && this.targetTemp){
    //           this.props.navigation.navigate('Home', {
    //             currentTemp: this.currentTemp,
    //             targetTemp: this.targetTemp
    //           });
    //         } 

    }
    else if(goTo==='Stats'){

    }
    else if(goTo==='Home'){

      //put \n at the end of each command
      
      this.getData("d\n") //get HomeT, TargetT, AlarmT & Time
      .then((result)=>{
        console.log(result);
        result = result.split(/\r?\n/); //split by newline (hopefully)
        this.currentTemp = result[0].replace('HomeT:','');
        this.currentTemp = this.currentTemp.substring(0, this.currentTemp.indexOf('.'));
        this.targetTemp = result[1].replace('TargetT:','');
        this.targetTemp = this.targetTemp.substring(0, this.targetTemp.indexOf('.'));
        console.log("currentTemp is " + this.currentTemp);
        console.log("targetTemp is " + this.targetTemp); 
      })
      .then(() => {
        if(this.currentTemp && this.targetTemp){
          this.props.navigation.navigate('Home', {
            currentTemp: this.currentTemp,
            targetTemp: this.targetTemp
          });
        }
      })
      .catch();      
    }
    

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
