import React, { Component } from 'react';
import { Image, Text, StyleSheet, View, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getLocation, getData } from 'react-native-weather-api';

export default class Home extends Component {
  static navigationOptions = {
    title: "Prometheus",
    headerLeft: <Image/>,
  };
  constructor(props) {
    super(props);
  }

 
  render() {
    const { navigation } = this.props;
    const currentTemp = navigation.getParam('currentTemp', 'Null');
    const targetTemp = navigation.getParam('targetTemp', 'Null');
    getLocation();  

    let cityName = ""; 
    let temperature = "";
    let windSpeed = "";
    let humidity = "";

    setTimeout(function() {    
    let data = new getData();
    cityName = data.city;
    temperature = data.tempC;
    windSpeed = data.windKph;
    console.log(data);
        
    },5000);
    return (
      <View style={styles.container}>
        <Text style={styles.weather}> <Text> Current Weather/Outside Temperature </Text><Text>{temperature}</Text></Text>
        <View style={styles.controllerData}>
          <View style={styles.tempContainer}>
            <Text style={styles.tempTitle}> Current Temperature </Text>
            <Text style={styles.tempValue}> {currentTemp}<Text style={styles.celcius}>C°</Text></Text>
          </View>
          <View style={styles.tempContainer}>
            <Text style={styles.tempTitle}> Target Temperature </Text>
            <Text style={styles.tempValue}> {targetTemp} <Text style={styles.celcius}>C°</Text></Text>
          </View>
        </View>
        <View style={styles.buttonRow}>
          <Text style={styles.button}><Icon name="arrow-left" size={15} color="#4A4A4A" />   Statistics</Text>
          <Text style={styles.button}>Settings   <Icon name="arrow-right" size={15} color="#4A4A4A" /></Text>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#FF7C68"
    },
    weather: {
      flex: 4
    },
    controllerData: {
      flex: 3,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row'
    },
    buttonRow: {
      flex: 1,
      marginLeft: '10%',
      marginRight: '10%',
      marginBottom: '5%',
      marginTop: '2%',
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'space-between'
    },
    button:{
      backgroundColor: '#FFF',
      color: '#4A4A4A',
      borderRadius: 20,
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 25,
      paddingRight: 25
    },
    tempContainer: {
      width: '40%',
      backgroundColor: '#4A4A4A',
      borderRadius: 25,
      margin: 5,
      padding: 10,
      paddingTop: 15
    },
    tempTitle: {
      color: '#FFF',
      fontSize: 17,
      fontWeight: "bold",
      textAlign: "center"
    },
    tempValue: {
      color: '#FFF',
      fontSize: 60,
      fontWeight: "bold",
      textAlign: "center"
    },
    celcius: {
      fontSize: 17
    }
});
