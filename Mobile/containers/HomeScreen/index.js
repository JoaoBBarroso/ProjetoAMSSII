import React, { Component } from "react";
import { StyleSheet, Text, View, Spacer } from 'react-native';
import { Header, Button } from 'react-native-elements';

export default class HomeScreen extends Component {
    static navigationOptions = {
        title: 'Healthy Scanning',
        headerStyle: {
            backgroundColor: '#D8D8F6',
        },
        headerTintColor: '#000000',

    };

    handleScannerPress = () => {
        console.log("Scanner button pressed");
        this.props.navigation.navigate('Scanning')
    };

    handleProductPress = () => {
        console.log("Scanner button pressed");
        this.props.navigation.navigate('Product')
    };

    render() {
        return <View style={styles.container}>
            <View style={styles.homeButtons}>
                <Button
                    title="Scan a product!"
                    onPress={this.handleScannerPress}
                    buttonStyle={{ backgroundColor: '#D8D8F6' }}
                    titleStyle={{ color: '#000000' }}
                    containerStyle={{ marginTop: 25 }}
                   
                />
                <Button
                    title="View last scanned product"
                    onPress={this.handleProductPress}
                    buttonStyle={{ backgroundColor: '#D8D8F6' }}
                    titleStyle={{ color: '#000000' }}
                    containerStyle={{ marginTop: 25 }}
                />
            </View>
        </View>
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
        alignItems: 'center',
        // width: '100%',
        height: '100%'
    },
    homeButtons: {
        marginTop: 20,
        flexDirection: 'column',
        justifyContent: 'space-around',
    }
});
