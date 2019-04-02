import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  Switch,
  TouchableOpacity,
  ToastAndroid
} from "react-native";
var _ = require("lodash");
import BluetoothSerial from "react-native-bluetooth-serial";

export default class Connect extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      isEnabled: false,
      discovering: false,
      devices: [],
      unpairedDevices: [],
      connected: false,
      input: ''
    };
  }
  componentWillMount() {
    Promise.all([BluetoothSerial.isEnabled(), BluetoothSerial.list()]).then(
      values => {
        const [isEnabled, devices] = values;

        this.setState({ isEnabled, devices });
      }
    );

    BluetoothSerial.on("bluetoothEnabled", () => {
      Promise.all([BluetoothSerial.isEnabled(), BluetoothSerial.list()]).then(
        values => {
          const [isEnabled, devices] = values;
          this.setState({ devices });
        }
      );

      BluetoothSerial.on("bluetoothDisabled", () => {
        this.setState({ devices: [] });
      });
      BluetoothSerial.on("error", err => console.log(`Error: ${err.message}`));
    });
  }

  connect(device) {
    this.setState({ connecting: true });
    BluetoothSerial.connect(device.id)
    .then(res => {
      console.log(`Connected to device ${device.name}`);
      BluetoothSerial.write("Hello from the other side.\n")
      .then(res => {
        console.log("response is ", res);
        console.log("Successfuly wrote to device");
        this.setState({ connected: true });
      })
      .catch(err => console.log(err.message));
      ToastAndroid.show(
        `Connected to ${device.name}`,
        ToastAndroid.SHORT
      );
      this.props.navigation.navigate('Loading');
    })
    .catch(err => {
      ToastAndroid.show(
        `Could not connect to ${device.name}`,
        ToastAndroid.SHORT);
      console.log(err.message);
    });
  }


  _renderItem(item) {
    return (
      <TouchableOpacity onPress = {() => this.connect(item.item)}>
        <View style = {styles.deviceNameWrap}>
          <Text style = {styles.deviceName}>
            {item.item.name ? item.item.name : item.item.id}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  enable() {
    BluetoothSerial.enable()
      .then(res => this.setState({ isEnabled: true }))
      .catch(err => Toast.showShortBottom(err.message));
  }

  disable() {
    BluetoothSerial.disable()
      .then(res => this.setState({ isEnabled: false }))
      .catch(err => Toast.showShortBottom(err.message));
  }

  toggleBluetooth(value) {
    if (value === true) {
      this.enable();
    } else {
      this.disable();
    }
  }

  discoverAvailableDevices() {
    if (this.state.discovering) {
      return false;
    } else {
      this.setState({ discovering: true });
      BluetoothSerial.discoverUnpairedDevices()
        .then(unpairedDevices => {
          const uniqueDevices = _.uniqBy(unpairedDevices, "id");
          console.log(uniqueDevices);
          this.setState({ unpairedDevices: uniqueDevices, discovering: false });
        })
        .catch(err => console.log(err.message));
    }
  }

  render() {
    return (
      <View style = {styles.container}>
        <View style = {styles.toolbar}>
          <Text style = {styles.toolbarTitle}> Please Find Your Device </Text>
          <View style = {styles.toolbarButton}>
            <Switch
              value = {this.state.isEnabled}
              onValueChange = {val => this.toggleBluetooth(val)}
            />
          </View>
        </View>
        <View style = {styles.buttonContainer}>
          <Button
            onPress = {this.discoverAvailableDevices.bind(this)}
            title = "Scan for Devices"
            color = "#4A4A4A"
          />
        </View>
        <FlatList
          style={{ flex: 1 }}
          data={this.state.devices}
          keyExtractor={item => item.id}
          renderItem={item => this._renderItem(item)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FF7C68"
  },
  buttonContainer: {
    width: "90%",
    margin: "5%"
  },
  toolbar: {
    paddingTop: 30,
    paddingBottom: 30,
    flexDirection: "row"
  },
  toolbarButton: {
    width: 10,
    marginTop: 8,
    marginRight: 10
  },
  toolbarTitle: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
    flex: 1,
    marginTop: 6
  },
  deviceName: {
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "center",
    color: "#4A4A4A"
  },
  deviceNameWrap: {
    marginLeft: "10%",
    marginRight: "10%",
    marginTop: "2%",
    marginBottom: "2%",
    padding: 15,
    borderRadius: 50,
    backgroundColor: "#FFF"
  }
});
