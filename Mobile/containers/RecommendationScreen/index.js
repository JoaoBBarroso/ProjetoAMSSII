import React, { Component } from "react";
import { StyleSheet, View, Spacer, ImageBackground } from 'react-native';
import { Header, Button, Icon, Input, Divider, ListItem, Text, Card, Image } from 'react-native-elements';
import { connect } from 'react-redux';

class RecommendationScreen extends Component {

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

    handleProductPress = () => {

    };

    render() {

        const { isLoading, productData } = this.props;

        if (isLoading) return <Loader />;
        // if (!productData) return null; // If it is not loading and its not loaded, then return nothing.

        return <View nativeID={'root'} style={styles.container}>
            <Card>
                <View style={{ flexDirection: 'row' }}>
                    <Image source={{ uri: productData.img }}
                        style={{ height: 75, width: 75, marginRight: 10, borderRadius: 50 }}
                    ></Image>
                    <View style={{ flexDirection: 'column' }}>
                        <Text h3>{productData.name}</Text>
                        <Text>
                            Code: {productData.upc}
                        </Text>
                    </View>
                </View>
            </Card>
            <Text h4>Recommendations:</Text>
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ flex: 1, backgroundColor: "red", margin: 5 }}>
                    <ImageBackground source={{ uri: "http://via.placeholder.com/300x300" }} style={{ width: '100%', height: '100%' }}>
                        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                            <View style={{ height: 65, padding: 5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text>P1</Text>
                                <Image source={{ uri: productData.img }}
                                    style={{
                                        height: 45, width: 45, marginRight: 5, borderRadius: 30, borderWidth: 3,
                                        borderColor: '#fff'
                                    }}
                                ></Image>
                            </View>
                        </View>
                    </ImageBackground>
                </View>
                <View style={{ flex: 1, backgroundColor: "red", margin: 5 }}>
                    <ImageBackground source={{ uri: "http://via.placeholder.com/300x300" }} style={{ width: '100%', height: '100%' }}>
                        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                            <View style={{ height: 65, padding: 5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text>P2</Text>
                                <Image source={{ uri: productData.img }}
                                    style={{
                                        height: 45, width: 45, marginRight: 5, borderRadius: 30, borderWidth: 3,
                                        borderColor: '#fff'
                                    }}
                                ></Image>
                            </View>
                        </View>
                    </ImageBackground>
                </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ flex: 1, backgroundColor: "red", margin: 5 }}>
                    <ImageBackground source={{ uri: "http://via.placeholder.com/300x300" }} style={{ width: '100%', height: '100%' }}>
                        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                            <View style={{ height: 65, padding: 5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text>P3</Text>
                                <Image source={{ uri: productData.img }}
                                    style={{
                                        height: 45, width: 45, marginRight: 5, borderRadius: 30, borderWidth: 3,
                                        borderColor: '#fff'
                                    }}
                                ></Image>
                            </View>
                        </View>
                    </ImageBackground>
                </View>
                <View style={{ flex: 1, backgroundColor: "red", margin: 5 }}>
                    <ImageBackground source={{ uri: "http://via.placeholder.com/300x300" }} style={{ width: '100%', height: '100%' }}>
                        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                            <View style={{ height: 65, padding: 5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text>P4</Text>
                                <Image source={{ uri: productData.img }}
                                    style={{
                                        height: 45, width: 45, marginRight: 5, borderRadius: 30, borderWidth: 3,
                                        borderColor: '#fff'
                                    }}
                                ></Image>
                            </View>
                        </View>
                    </ImageBackground>
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
        height: '100%',
        flexDirection: "column"
    }
});


const mapStateToProps = (state) => {
    const { productData, isLoaded, isLoading, error, searchHistory } = state;
    return {
        searchHistory,
        productData,
        isLoaded,
        isLoading,
        error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        searchProduct: upc => {
            dispatch(searchProduct(upc));
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(RecommendationScreen);