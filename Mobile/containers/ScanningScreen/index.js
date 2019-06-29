import React, { Component } from "react";
import { StyleSheet, Text, View } from 'react-native';
import { Header, Button, Icon } from 'react-native-elements';
import BarcodeScanner from '../../components/BarcodeScanner';

export default class ScanningScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Scan a product!',
            headerStyle: {
                backgroundColor: '#5B8C2A',
            },
            headerTintColor: '#fff',
            headerRight: (
                <Button
                    buttonStyle={{ backgroundColor: '#5B8C2A', marginRight: 10}}
                    onPress={() => navigation.navigate('Home')}
                    icon={<Icon name="home" size={25} color="white" />}
                />
            )
        }
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
