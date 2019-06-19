import React, { Component } from "react";
import { StyleSheet, Text, View } from 'react-native';
import { Header } from 'react-native-elements';
import BarcodeScanner from '../../components/BarcodeScanner';

export default class ScanningScreen extends Component {
    static navigationOptions = {
        title: 'Scan a product!',
        headerStyle: {
            backgroundColor: '#5B8C2A',
        },
        headerTintColor: '#fff',

        
    };

    transitionProductInfo = (data) => {
        this.props.navigation.navigate('Product', { upc: data });
    }

    render() {
        return <View style={styles.container}>
            <BarcodeScanner transition={this.transitionProductInfo} />
        </View>
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        width: '100%',
        height: '100%',
        padding: 0
    },
    appHeader: {
        backgroundColor: '#5B8C2A',
        justifyContent: 'space-around',
    }
});
