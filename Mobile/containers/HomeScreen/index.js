import React, { Component } from "react";
import { StyleSheet, View, Spacer } from 'react-native';
import { Header, Button, Icon, Input, Divider, ListItem, Text } from 'react-native-elements';

const list = [
    {
      name: 'Caramel M&M\'s',
      avatar_url: 'data:image/jpeg;base64,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',
      subtitle: '0040000508861'
    },
    {
      name: 'Tortitas de Milho com Azeitona e Ceboliho',
      avatar_url: 'https://sgfm.elcorteingles.es/SGFM//01/85/9/5220727001859/5220727001859000g01011.jpg',
      subtitle: '8423207207461'
    }
  ]

export default class HomeScreen extends Component {
    static navigationOptions = {
        title: 'NUTRIIENT',
        headerStyle: {
            
            backgroundColor: '#5B8C2A',
        },
        headerTintColor: '#fff',

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
        return <View nativeID={'root'} style={styles.container}>
            <View style={styles.home}>
                <View style={{ flex: 1, flexDirection: 'row', width: '100%' }}>
                    <View style={{ flex: 4 }}>
                        <Input
                            placeholder='Enter a barcode'
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Button
                            title=""
                            icon={{
                                name: "search",
                                type: "font-awesome",
                                size: 28,
                                color: "black"
                            }}
                            type="clear"

                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Button
                            title=""
                            icon={{
                                name: "barcode",
                                type: "font-awesome",
                                size: 28,
                                color: "black"
                            }}
                            type="clear"
                            onPress={this.handleScannerPress}
                        />
                    </View>
                </View>

                <Text style={{color:"grey", fontSize:18, marginBottom:5, marginLeft:5 }}>History</Text>
                <View style={{flex:6}}>
                    {
                        list.map((l, i) => (
                            <ListItem
                                key={i}
                                leftAvatar={{ source: { uri: l.avatar_url } }}
                                title={l.name}
                                subtitle={l.subtitle}
                            />
                        ))
                    }
                </View>
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
    home: {
        marginTop: 20,
        flexDirection: 'column',
        justifyContent: 'space-between'
    }
});
