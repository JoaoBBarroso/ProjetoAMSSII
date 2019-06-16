import React, { Component } from "react";
import { StyleSheet, Text, View } from 'react-native';
import { Header } from 'react-native-elements';
import BarcodeScanner from '../../components/BarcodeScanner';

export default class ScanningScreen extends Component {
    static navigationOptions = {
        title: 'Scan a product!',
        headerStyle: {
            backgroundColor: '#D8D8F6',
        },
        headerTintColor: '#000000',
        
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
        backgroundColor: '#D8D8F6',
        justifyContent: 'space-around',
    }
});
