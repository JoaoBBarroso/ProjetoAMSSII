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

    transitionProductInfo = () => {
        this.props.navigation.navigate('Product');
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
        backgroundColor: '#f7f7f7',
    },
    appHeader: {
        backgroundColor: '#D8D8F6',
        justifyContent: 'space-around',
    }
});
