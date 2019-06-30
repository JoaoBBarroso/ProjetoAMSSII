import React, { Component } from "react";
import { StyleSheet, View, ScrollView, Spacer, TouchableHighlight, AsyncStorage } from 'react-native';
import { Header, Button, Icon, Input, Divider, ListItem, Text } from 'react-native-elements';
import { connect } from 'react-redux';
import { setHistoryPersisted, setFavouritesPersisted } from '../../Redux/ProductScanning';
import Loader from '../../components/Loader';

class HomeScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            upcToSearch: "",
            persistedFavourites: [],
            persistedSearchHistory: [],
            isLoadingSearch: true,
            isLoadingFavourites: true,
        };
    }

    static navigationOptions = {
        title: 'NUTRIEAT',
        headerStyle: {
            backgroundColor: '#5B8C2A',
        },
        headerTintColor: '#fff',

    };

    componentDidMount = async () => {
        this.retrieveFavourites();
        this.retrieveSearchHistory();
    }

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

    retrieveFavourites = async () => {
        try {
            const data = await AsyncStorage.getItem('@favourites');
            if (data !== null) {
                this.props.setFavouritesPersisted(JSON.parse(data))
                this.setState({
                    persistedFavourites: JSON.parse(data),
                    isLoadingFavourites: false
                })
            } else {
                this.setState({
                    isLoadingFavourites: false
                })
            }
        } catch (error) {
            console.log(error)
            this.setState({
                isLoadingFavourites: false
            })
        }
    };


    clearFavourites = async () => {
        try {
            this.props.setFavouritesPersisted([])
            await AsyncStorage.setItem('@favourites', JSON.stringify([]));
        } catch (error) {
            console.log(error)
        }
    };

    retrieveSearchHistory = async () => {
        try {
            const data = await AsyncStorage.getItem('@history');
            if (data !== null) {
                this.props.setHistoryPersisted(JSON.parse(data))
                this.setState({
                    persistedSearchHistory: JSON.parse(data),
                    isLoadingSearch: false
                })
            } else {
                this.setState({
                    isLoadingSearch: false
                })
            }
        } catch (error) {
            console.log(error)
            this.setState({
                isLoadingSearch: false
            })
        }

    };

    clearSearchHistory = async () => {
        try {
            this.props.setHistoryPersisted([])
            await AsyncStorage.setItem('@history', JSON.stringify([]));
        } catch (error) {
            console.log(error)
        }
    };

    setHistoryToShow = () => {
        let toShow = [];

        if (this.props.searchHistory.length === 0 && this.state.persistedSearchHistory.length !== 0) {
            toShow = this.state.persistedSearchHistory;
        } else {
            toShow = this.props.searchHistory;
        }

        return toShow;
    }

    setFavouritesToShow = () => {
        let toShow = [];
        if (this.props.favourites.length === 0 && this.state.persistedFavourites.length !== 0) {
            toShow = this.state.persistedFavourites;
        } else {
            toShow = this.props.favourites;
        }

        return toShow;
    }


    render() {

        const { searchHistory, favourites } = this.props;

        const { isLoadingSearch, isLoadingFavourites } = this.state;
        if (isLoadingSearch || isLoadingFavourites) return <Loader />;

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
                        <ListItem
                            key={'clear_history'}
                            title={"Clear search history"}
                            subtitle={"click here and erase your history"}
                            onPress={() => this.clearSearchHistory()}
                        />
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
                        <ListItem
                            key={'clear_favourites'}
                            title={"Clear favourites"}
                            subtitle={"click here and erase your favourites"}
                            onPress={() => this.clearFavourites()}
                        />
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

const mapDispatchToProps = dispatch => {
    return {
        setHistoryPersisted: upc => {
            dispatch(setHistoryPersisted(upc));
        },
        setFavouritesPersisted: upc => {
            dispatch(setFavouritesPersisted(upc));
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);