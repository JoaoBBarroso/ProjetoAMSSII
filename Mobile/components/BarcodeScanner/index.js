import React, { Component } from "react";
import { Text, View, StyleSheet, Button, Dimensions } from 'react-native';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class BarcodeScanner extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasCameraPermission: null,
      scanned: false,
    };
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  render() {
    console.log(this.props)
    const { hasCameraPermission, scanned } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View style={{ flex: 1}}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={[StyleSheet.absoluteFillObject, styles.container]}
        >
          <Text style={styles.description}>Scan your barcode</Text>
          <View
            style={styles.bar}
          />
        </BarCodeScanner>
        {scanned && (
          <Button title={'Tap to Scan Again'} onPress={() => this.setState({ scanned: false })} />
        )}
      </View>
    );
  }

  handleBarCodeScanned = ({ type, data }) => {
    this.setState({ scanned: true });
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    this.props.transition();
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    height: '100%',
    padding: 0
  },
  description: {
    fontSize: 24,
    marginTop: '15%',
    textAlign: 'center',
    width: '70%',
    color: 'white',
  },
  bar: {
    marginTop: '45%',
    marginBottom: '45%',
    width: '90%',
    height: 20,
    borderBottomColor: 'red',
    borderBottomWidth: 5,
  }
});