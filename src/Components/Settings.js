import React, { Component } from 'react'
import { Text, View, StyleSheet, ScrollView, TextInput, TouchableOpacity, ToastAndroid } from 'react-native'
import { HeaderBackButton } from 'react-navigation'
import BluetoothSerial from "react-native-bluetooth-serial"

export default class Settings extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Settings",
    headerLeft: <HeaderBackButton onPress={() => navigation.navigate('Loading', {
        goTo: 'Home'
      })} />
  });
  constructor(props) {
    super(props);
    this.state = {
      monday: this.props.navigation.getParam('monday', ''),
      tuesday: this.props.navigation.getParam('tuesday', ''),
      wednesday: this.props.navigation.getParam('wednesday', ''),
      thursday: this.props.navigation.getParam('thursday', ''),
      friday: this.props.navigation.getParam('friday', ''),
      saturday: this.props.navigation.getParam('saturday', ''),
      sunday: this.props.navigation.getParam('sunday', ''),
      mondayError: '',
      tuesdayError: '',
      wednesdayError: '',
      thursdayError: '',
      fridayError: '',
      saturdayError: '',
      sundayError: '',
      saveError: '',
      currSettings: {
        monday: this.props.navigation.getParam('monday', ''),
        tuesday: this.props.navigation.getParam('tuesday', ''),
        wednesday: this.props.navigation.getParam('wednesday', ''),
        thursday: this.props.navigation.getParam('thursday', ''),
        friday: this.props.navigation.getParam('friday', ''),
        saturday: this.props.navigation.getParam('saturday', ''),
        sunday: this.props.navigation.getParam('sunday', '')
      }
    };
  }
  
  validateTemp(val){
    if(!val){
      return "Input Must Not Be Empty!";
    }
    let temps = val.split(" ");
    if((temps.length % 2 === 1 && temps.length !== 1) || temps.length === 6 || temps.length > 8 || temps.lenght < 1){
      return "Please input 1, 2, 4 or 8 values";
    }
    let nums = true;
    let range = true;
    temps.map((temp) => {
      if(isNaN(Number(temp))){
        nums = false;
      }
      else{
        if(temp == '' || temp == ' ' || temp > 30 || temp < 0){
          range = false;
        }
      }
    });
    if(!nums){
      return "Please input numbers only!";
    }
    if(!range){
      return "Please input numbers between 1 and 30";
    }
    return '';
  }

  getSaveStr(val){
    let result = '';
    let temps = val.split(' ');
    if(temps.length === 8){
      result += val;
      return result;
    }
    else if(temps.length === 4){
      temps.map((temp) => {
        result += temp + ' ' + temp + ' ';
      });
    }
    else if(temps.length === 2){
      temps.map((temp) => {
        result += temp + ' ' + temp + ' ' + temp + ' ' + temp + ' ';
      });
    }
    else if(temps.length === 1){
      for( let i = 0; i < 8; i++){
        result += temps + ' ';
      }
    }
    else {
      let saveError = "Please make sure no inputs are empty!";
      this.setState({saveError});
      return;
    }
    console.log(result.slice(0, -1));
    return result.slice(0, -1); //remove last space
  }

  handleSave = async function (){
    if(this.state.mondayError || this.state.tuesdayError || this.state.wednesdayError || this.state.thurdayError || this.state.fridayError || this.state.saturdayError || this.state.sundayError){
      let saveError = "Please resolve all errors before saving!"
      this.setState({saveError});
      return;
    }
    if(!this.state.monday || !this.state.tuesday || !this.state.wednesday || !this.state.thursday || !this.state.friday || !this.state.saturday || !this.state.sunday){
      let saveError = "Please make sure no inputs are empty!"
      this.setState({saveError});
      return;
    }

    let saveError = "";
    this.setState({saveError});

    let sunday = 'i ' + this.getSaveStr(this.state.sunday) + '\n';
    let monday = 'j ' + this.getSaveStr(this.state.monday) + '\n';
    let tuesday = 'k ' + this.getSaveStr(this.state.tuesday) + '\n';
    let wednesday = 'l ' + this.getSaveStr(this.state.wednesday) + '\n';
    let thursday = 'm ' + this.getSaveStr(this.state.thursday) + '\n';
    let friday = 'n ' + this.getSaveStr(this.state.friday) + '\n';
    let saturday = 'o ' + this.getSaveStr(this.state.saturday) + '\n';

    //send to Arduino
    try {    
      if(!BluetoothSerial.isConnected()) {
        throw new Error("Device not Connected")
      } 
      await BluetoothSerial.write(sunday);
      await BluetoothSerial.write(monday);
      await BluetoothSerial.write(tuesday);
      await BluetoothSerial.write(wednesday);
      await BluetoothSerial.write(thursday);
      await BluetoothSerial.write(friday);
      await BluetoothSerial.write(saturday);
    }
    catch(error){
      console.log(error);
      ToastAndroid.show(
        `Something went wrong! Settings not Saved.`,
        ToastAndroid.LONG
      );
      this.handleReset();
      return;
    }
    ToastAndroid.show(
      `Settings Saved!`,
      ToastAndroid.SHORT
    );

    
    this.props.navigation.navigate('Loading', {
      goTo: 'Home'
    });
  }
  handleReset(){
    let monday = this.state.currSettings.monday;
    let tuesday = this.state.currSettings.tuesday;
    let wednesday = this.state.currSettings.wednesday;
    let thursday = this.state.currSettings.thursday;
    let friday = this.state.currSettings.friday;
    let saturday = this.state.currSettings.saturday;
    let sunday = this.state.currSettings.sunday;
    //erase all errors
    let mondayError = '';
    let tuesdayError = '';
    let wednesdayError = '';
    let thursdayError = '';
    let fridayError = '';
    let saturdayError = '';
    let sundayError = '';
    let saveError = '';

    this.setState({monday, tuesday, wednesday, thursday, friday, saturday, sunday, mondayError, tuesdayError, wednesdayError, thursdayError, fridayError, saturdayError, sundayError, saveError});
  }
 

  render() {

    return (
      <ScrollView style={styles.container}>
        <View style={styles.info}> 
          <Text style={styles.infoText}>Please insert 1, 2, 4 or 8 values to set the target temperatue for the whole day, every 12 hours, every 6 hours or every 3 hours respectively.</Text>
          <Text style={styles.infoText}>Separate the values by a space and don't forget to save when you're done!</Text>
        </View>
        <View>
          <Text style={styles.labelText}>Monday</Text>
          <TextInput
              style = {styles.inputStyle}
              placeholder = "Please insert target temperature(s)"
              maxLength = {50}
              defaultValue = {this.state.monday}
              onChangeText = {(monday) => {
                let mondayError = this.validateTemp(monday);
                this.setState({monday, mondayError});
                }
              }
            />
          <Text style={styles.errorText}>  {this.state.mondayError}</Text>

          <Text style={styles.labelText}>Tuesday</Text>
          <TextInput
              style = {styles.inputStyle}
              placeholder = "Please insert target temperature(s)"
              maxLength = {50}
              defaultValue = {this.state.tuesday}
              onChangeText = {(tuesday) => {
                let tuesdayError = this.validateTemp(tuesday);
                this.setState({tuesday, tuesdayError});
                }
              }
            />
          <Text style={styles.errorText}>  {this.state.tuesdayError}</Text>

          <Text style={styles.labelText}>Wednesday</Text>
          <TextInput
              style = {styles.inputStyle}
              placeholder = "Please insert target temperature(s)"
              maxLength = {50}
              defaultValue = {this.state.wednesday}
              onChangeText = {(wednesday) => {
                let wednesdayError = this.validateTemp(wednesday);
                this.setState({wednesday, wednesdayError});
                }
              }
            />
          <Text style={styles.errorText}>  {this.state.wednesdayError}</Text>

          <Text style={styles.labelText}>Thursday</Text>
          <TextInput
              style = {styles.inputStyle}
              placeholder = "Please insert target temperature(s)"
              maxLength = {50}
              defaultValue = {this.state.thursday}
              onChangeText = {(thursday) => {
                let thursdayError = this.validateTemp(thursday);
                this.setState({thursday, thursdayError});
                }
              }
            />
          <Text style={styles.errorText}>  {this.state.thursdayError}</Text>

          <Text style={styles.labelText}>Friday</Text>
          <TextInput
              style = {styles.inputStyle}
              placeholder = "Please insert target temperature(s)"
              maxLength = {50}
              defaultValue = {this.state.friday}
              onChangeText = {(friday) => {
                let fridayError = this.validateTemp(friday);
                this.setState({friday, fridayError});
                }
              }
            />
          <Text style={styles.errorText}>  {this.state.fridayError}</Text>

          <Text style={styles.labelText}>Saturday</Text>
          <TextInput
              style = {styles.inputStyle}
              placeholder = "Please insert target temperature(s)"
              maxLength = {50}
              defaultValue = {this.state.saturday}
              onChangeText = {(saturday) => {
                let saturdayError = this.validateTemp(saturday);
                this.setState({saturday, saturdayError});
                }
              }
            />
          <Text style={styles.errorText}>  {this.state.saturdayError}</Text>

          <Text style={styles.labelText}>Sunday</Text>
          <TextInput
              style = {styles.inputStyle}
              placeholder = "Please insert target temperature(s)"
              maxLength = {50}
              defaultValue = {this.state.sunday}
              onChangeText = {(sunday) => {
                let sundayError = this.validateTemp(sunday);
                this.setState({sunday, sundayError});
                }
              }
            />
          <Text style={styles.errorText}>  {this.state.sundayError}</Text>
        </View>
        <Text style={styles.errorText}>  {this.state.saveError}</Text>
        
        <View style={styles.buttons}>
          <TouchableOpacity onPress = {() => this.handleReset()}>
            <View style = {styles.saveWrap}>
              <Text style = {styles.save}>Reset</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress = {() => this.handleSave()}>
            <View style = {styles.saveWrap}>
              <Text style = {styles.save}>Save</Text>
            </View>
          </TouchableOpacity>
        </View>
        
      </ScrollView>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FF7C68",
  },
  info: {
    marginTop: '4%',
    marginLeft: '7%',
    marginRight: '7%',
    marginBottom: '2%',
    padding: 15,
    borderRadius: 25,
    backgroundColor: "#4a4a4a"  
  },
  infoText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: '1%',
  },
  labelText: {
    marginLeft: '15%',
    marginTop: '2%',
    marginBottom: '2%',
    fontWeight: "bold",
    fontSize: 22,
    color: "white"
  },
  inputStyle: {
    backgroundColor: "white",
    marginBottom: '1%',
    marginLeft: '10%',
    marginRight: '10%',
    padding: 15,
    paddingLeft: 20,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 30
  },
  errorText: {
    marginLeft: '15%',
    color: 'yellow',
    fontSize: 14,
  },
  saveWrap: {
    paddingLeft: "10%",
    paddingRight: "10%",
    marginTop: "7%",
    marginBottom: "10%",
    padding: 15,
    borderRadius: 50,
    backgroundColor: "#4a4a4a"    
  },
  save: {
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  }
});