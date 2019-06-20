import React, { Component } from "react";
import { StyleSheet, View, Spacer } from 'react-native';
import { Header, Button, Icon, Input, Divider, ListItem, Text } from 'react-native-elements';
import { connect } from 'react-redux';

class HomeScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            upcToSearch: ""
        };
    }

    static navigationOptions = {
        title: 'NUTRIIENT',
        headerStyle: {
            backgroundColor: '#5B8C2A',
        },
        headerTintColor: '#fff',

    };

    handleScannerPress = () => {
        this.props.navigation.navigate('Scanning')
    };

    handleProductPress = () => {
        this.props.navigation.navigate('Product', { upc: this.state.upcToSearch });
    };

    render() {

        const { searchHistory } = this.props;
        console.log(searchHistory)
        console.log(this.state.upcToSearch)

        return <View nativeID={'root'} style={styles.container}>
            <View style={styles.home}>
                <View style={{ flex: 1, flexDirection: 'row', width: '100%' }}>
                    <View style={{ flex: 4 }}>
                        <Input
                            placeholder='Enter a barcode'
                            onChangeText={(text) => this.setState({upcToSearch: text})}
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
                            onPress={this.handleProductPress}
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
                    {/* {
                        list.map((l, i) => (
                            <ListItem
                                key={i}
                                leftAvatar={{ source: { uri: l.avatar_url } }}
                                title={l.name}
                                subtitle={l.subtitle}
                            />
                        ))
                    } */}
                    {
                        searchHistory.map((elem, i) => (
                            <ListItem
                                key={i}
                                leftAvatar={{ source: { uri: elem.img } }}
                                title={elem.brand}
                                subtitle={elem.upc}
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


const mapStateToProps = (state) => {
    const { searchHistory } = state;
    return {
        searchHistory,
    };
};


export default connect(mapStateToProps)(HomeScreen);