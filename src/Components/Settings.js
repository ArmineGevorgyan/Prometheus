import React, { Component } from 'react'
import { Text, View, StyleSheet, TextInput } from 'react-native'
import { HeaderBackButton } from 'react-navigation'
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";

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
      <View style={styles.container}>
        <Collapse>
          <CollapseHeader>
            <View>
              <Text style={styles.labelText}>Monday</Text>
            </View>
          </CollapseHeader>
          <CollapseBody>
            <TextInput
                style={styles.inputStyle}
                placeholder="Please insert target temperature(s)"
                maxLength={50}
              />
          </CollapseBody>
        </Collapse>
        
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FF7C68",
  },
  labelText: {
    marginLeft: '10%',
    marginTop: '10%',
    marginBottom: '2%',
    fontWeight: "bold",
    fontSize: 20,
    color: "white"
  },
  inputStyle: {
    backgroundColor: "white",
    marginLeft: '10%',
    marginRight: '10%',
    marginBottom: '5%',
    padding: 15,
    borderColor: "white",
    borderWidth: 1

  }
});