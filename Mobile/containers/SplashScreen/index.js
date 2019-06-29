import React from 'react';
import { View, Text, ImageBackground, Image } from 'react-native';

export default class SplashScreen extends React.Component {
    performTimeConsumingTask = async () => {
        return new Promise((resolve) =>
            setTimeout(
                () => { resolve('result') },
                1000
            )
        )
    }

    async componentDidMount() {
        // Preload data from an external API
        // Preload data using AsyncStorage
        const data = await this.performTimeConsumingTask();

        if (data !== null) {
            this.props.navigation.navigate('Home');
        }
    }

    render() {
        return (

            <View style={{ width: '100%', height: '100%' }}>
                <View style={styles.viewStyles}>
                    <Image source={require("../../assets/logo2.png")} ></Image>
                </View>
            </View>

        );
    }
}

const styles = {
    viewStyles: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textStyles: {
        color: 'black',
        fontSize: 40,
        fontWeight: 'bold'

    }
}