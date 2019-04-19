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
      monday: 'placeholder',
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
    };
  }
  
  validateTemp(val){
    if(!val){
      return "Input Must Not Be Empty!";
    }
  }

  handleSave(){

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
                if(mondayError){
                  this.setState({mondayError});
                }
                this.setState({monday});
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
                if(tuesdayError){
                  this.setState({tuesdayError});
                }
                this.setState({tuesday});
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
                if(wednesdayError){
                  this.setState({wednesdayError});
                }
                this.setState({wednesday});
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
                if(thursdayError){
                  this.setState({thursdayError});
                }
                this.setState({thursday});
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
                if(fridayError){
                  this.setState({fridayError});
                }
                this.setState({friday});
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
                if(saturdayError){
                  this.setState({saturdayError});
                }
                this.setState({saturday});
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
                if(sundayError){
                  this.setState({sundayError});
                }
                this.setState({sunday});
                }
              }
            />
          <Text style={styles.errorText}>  {this.state.sundayError}</Text>
        </View>
        
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