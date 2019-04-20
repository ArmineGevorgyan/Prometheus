import React, { Component } from 'react'
import { Text, View, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import { HeaderBackButton } from 'react-navigation'
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native"

export default class Settings extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Settings",
    headerLeft: <HeaderBackButton onPress={() => navigation.navigate('Home')} />
  });
  constructor(props) {
    super(props);
    const currSettings = {
      monday: 'placeholder',
      tuesday: '',
      wednesday: '',
      thursday: '',
      friday: '',
      saturday: '',
      sunday: '',
    };
    this.state = {
      monday: '',
      tuesday: '',
      wednesday: '',
      thursday: '',
      friday: '',
      saturday: '',
      sunday: '',
      mondayError: '',
      tuesdayError: '',
      wednesdayError: '',
      thursdayError: '',
      fridayError: '',
      saturdayError: '',
      sundayError: '',
      saveError: ''
    };
  }
  
  validateTemp(val){
    if(!val){
      return "Input Must Not Be Empty!";
    }
    let temps = val.split(",");
    if((temps.length%2===1 && temps.length!==1) || temps.length>8 || temps.lenght<1){
      return "Please input 1, 2, 4, 6 or 8 values";
    }
    let nums = true;
    let range = true;
    temps.map((temp)=>{
      if(isNaN(Number(temp))){
        nums = false;
      }
      else{
        if(temp>30 || temp<0){
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

  handleSave(){
    if(this.state.mondayError || this.state.tuesdayError || this.state.wednesdayError || this.state.thurdayError || this.state.fridayError || this.state.saturdayError || this.state.sundayError){
      let saveError = "Please resolve all errors before saving!"
      this.setState({saveError});
      return;
    }
    let saveError = "";
    this.setState({saveError});
  

  }
  handleCancel(){

  }
 

  render() {

    return (
      <ScrollView style={styles.container}>
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
          <TouchableOpacity onPress = {() => this.handleCancel()}>
            <View style = {styles.saveWrap}>
              <Text style = {styles.save}>Cancel</Text>
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
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  }
});