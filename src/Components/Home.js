import React, { Component } from 'react';
import { Image, Text, StyleSheet, View, Button, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getLocation, getData } from 'react-native-weather-api';

export default class Home extends Component {
  static navigationOptions = {
    title: "Prometheus",
    headerLeft: <Image/>,
  };
  constructor(props) {
    super(props);
    // var cityName = '';
    // var temperature = '';
    // var windSpeed = '';
    // var humidity = '';
    // var condition = '';
    this.state = {
      cityName: '...',
      temperature: '...',
      windSpeed: '...',
      humidity: '...',
      condition: '...',
      currentTemp: this.props.navigation.getParam('currentTemp', '...'),
      targetTemp: this.props.navigation.getParam('targetTemp', '...'),
    };
  }

 
  render() {
    getLocation();  
    setTimeout(()=>{    
      let data = new getData();
      console.log(data);
      console.log(this.state.cityName);
      var cityName = data.city;
      var temperature = data.tempC;
      var windSpeed = data.windKph;
      var humidity = data.humidity;
      var condition = data.condition;
      this.setState({
        cityName,
        temperature,
        windSpeed,
        humidity,
        condition
      });  
    }, 2000);
    

    return (
      <View style={styles.container}>
        <View style={styles.weather}>
         <Text style={styles.city}>{this.state.cityName}</Text>
         <Text style={styles.tempTitle}> {this.state.condition}</Text>
         <Text style={styles.tempValue}> {this.state.temperature}<Text style={styles.celcius}> C°</Text></Text>
         <Text style={styles.tempTitle}> Wind Speed: <Text>{this.state.windSpeed}</Text> <Text style={styles.celcius}>Km/h</Text></Text>
         <Text style={styles.tempTitle}> Humidity: <Text>{this.state.humidity}</Text> <Text style={styles.celcius}>%</Text></Text>
        </View>
        <View style={styles.controllerData}>
          <View style={styles.tempContainer}>
            <Text style={styles.tempTitle}> Current Temperature </Text>
            <Text style={styles.tempValue}>{this.state.currentTemp}<Text style={styles.celcius}> C°</Text></Text>
          </View>
          <View style={styles.tempContainer}>
            <Text style={styles.tempTitle}> Target Temperature </Text>
            <Text style={styles.tempValue}>{this.state.targetTemp}<Text style={styles.celcius}> C°</Text></Text>
          </View>
        </View>
        <View style={styles.buttonRow}>
          <Text style={styles.button}><Icon name="arrow-left" size={15} color="#4A4A4A" />   Statistics</Text>
          <TouchableOpacity onPress = {() => this.props.navigation.navigate('Loading', { goTo: 'Settings' }) }>
            <Text style={styles.button}>Settings   <Icon name="arrow-right" size={15} color="#4A4A4A" /></Text>
          </TouchableOpacity>
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
      flex: 4,
      backgroundColor: '#4A4A4A',
      borderRadius: 25,
      marginLeft: '10%',
      marginRight: '10%',
      marginTop: '5%',
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
      fontSize: 17,
      margin: 5
    },
    city: {
      color: '#FFF',
      fontSize: 40,
      fontWeight: "bold",
      marginTop: '5%',
      marginBottom: '5%',
      textAlign: "center"
      
    }
});
