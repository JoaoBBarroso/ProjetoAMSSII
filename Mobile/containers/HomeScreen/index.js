import React, { Component } from "react";
import { StyleSheet, Text, View } from 'react-native';
import { Header } from 'react-native-elements';

export default class Home extends Component {
    static navigationOptions = {
        title: 'Home',
        headerStyle: {
            backgroundColor: '#D8D8F6',
        },
        headerTintColor: '#000000',
        
    };
    render() {
        return <View style={styles.container}>
            <Text>boas</Text>
        </View>
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    appHeader: {
        backgroundColor: '#D8D8F6',
        justifyContent: 'space-around',
    }
});
