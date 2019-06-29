import React, { Component } from "react";
import { StyleSheet, View, ScrollView, Spacer, TouchableHighlight } from 'react-native';
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
        title: 'NUTRIEAT',
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
        this.setState({
            upcToSearch: ""
        })
    };

    handleProductListPress = (upc) => {
        const navigateAction = this.props.navigation.navigate({
            routeName: 'Product',
            params: { upc: upc },
            key: 'ProductScreen' + upc
        });
        this.props.navigation.dispatch(navigateAction);
    };

    render() {

        const { searchHistory, favourites } = this.props;

        return <View nativeID={'root'} style={styles.container}>
            <View style={styles.home}>
                <View style={{ flex: 1, flexDirection: 'row', width: '100%' }}>
                    <View style={{ flex: 4 }}>
                        <Input
                            placeholder='Enter a barcode'
                            value={this.state.upcToSearch}
                            onChangeText={(text) => this.setState({ upcToSearch: text })}
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
                            icon={{
                                name: "barcode",
                                type: "font-awesome",
                                size: 28,
                                color: "black"
                            }}
                            type="clear"
                            onPress={this.handleScannerPress}
                        />
                        <Text style={styles.scanText} onPress={this.handleScannerPress}>Scan it!</Text>
                    </View>
                </View>

                <Text style={styles.listTitle}>History</Text>
                <View style={styles.listView}>
                    <ScrollView>
                        {
                            searchHistory.length !== 0 ?
                                searchHistory.map((elem, i) => (
                                    <ListItem
                                        key={i}
                                        onPress={() => this.handleProductListPress(elem.upc)}
                                        leftAvatar={{ source: { uri: elem.img } }}
                                        title={elem.name}
                                        subtitle={elem.upc}
                                    />
                                ))
                                :
                                <ListItem
                                    key={'empty_list'}
                                    title={"No products searched yet"}
                                    subtitle={"scan or search any product"}
                                />
                        }
                    </ScrollView>
                </View>
                <Text style={styles.listTitle}>Favourites</Text>
                <View style={styles.listView}>
                    <ScrollView>

                        {
                            favourites.length !== 0 ?
                                favourites.map((elem, i) => (
                                    <ListItem
                                        onPress={() => this.handleProductListPress(elem.upc)}
                                        key={i}
                                        leftAvatar={{ source: { uri: elem.img } }}
                                        title={elem.name}
                                        subtitle={elem.upc}
                                    />
                                ))
                                :
                                <ListItem
                                    key={'empty_list'}
                                    title={"No products favourited yet"}
                                    subtitle={"Add products to your 'favourite' list"}
                                />
                        }
                    </ScrollView>
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
        height: '100%'
    },
    home: {
        marginTop: 20,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    listView: {
        marginTop: 10,
        flex: 4
    },
    listTitle: {
        color: "grey",
        marginTop: 10,
        fontSize: 18,
        marginBottom: 5,
        marginLeft: 5
    },
    scanText: {
        marginLeft: 10,
    }
});


const mapStateToProps = (state) => {
    const { searchHistory, favourites } = state;
    return {
        searchHistory, favourites
    };
};


export default connect(mapStateToProps)(HomeScreen);