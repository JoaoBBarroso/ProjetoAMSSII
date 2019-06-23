import React, { Component } from "react";
import { StyleSheet, View, Spacer, ImageBackground } from 'react-native';
import { Header, Button, Icon, Input, Divider, ListItem, Text, Card, Image, Avatar } from 'react-native-elements';

import { connect } from 'react-redux';
import { recommendedProducts } from '../../Redux/ProductScanning';
import Loader from '../../components/Loader';

class RecommendationScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            upcToSearch: ""
        };
    }

    static navigationOptions = {
        title: 'Recommendations',
        headerStyle: {
            backgroundColor: '#5B8C2A',
        },
        headerTintColor: '#fff',

    };

    componentDidMount = () => {
        const upc = this.props.navigation.getParam('upc', null);
        let that = this;
        this.setState({ isLoading: true })

        if (upc !== null) {
            console.log(upc)
            this.props.recommendedProducts(upc);
        }
    }

    getNutriscoreAvatar = (grade) => {
        let uppercaseGrade = grade.toUpperCase();

        let requiredGrade = null
        switch (uppercaseGrade) {
            case 'A':
                requiredGrade = <Avatar rounded title="A" titleStyle={{ backgroundColor: "#00823f", color: "white" }} />;
                break;
            case 'B':
                requiredGrade = <Avatar rounded title="B" titleStyle={{ backgroundColor: "#85bb2f", color: "white" }} />;
                break;
            case 'C':
                requiredGrade = <Avatar rounded title="C" titleStyle={{ backgroundColor: "#fecb02", color: "white" }} />;
                break;
            case 'D':
                requiredGrade = <Avatar rounded title="D" titleStyle={{ backgroundColor: "#ee8100", color: "white" }} />;
                break;
            case 'E':
                requiredGrade = <Avatar rounded title="E" titleStyle={{ backgroundColor: "#e63e11", color: "white" }} />;
                break;
            default:
                requiredGrade = null;
                break;
        }

        return requiredGrade;
    }

    handleProductPress = () => {

    };

    render() {

        const {
            isLoading,
            productData,
            searchRecommendations,
            error
        } = this.props;


        if (isLoading) return <Loader />;
        if (searchRecommendations.length === 0 || !productData) return null; // If it is not loading and its not loaded, then return nothing.

        return <View nativeID={'recommendationScreen'} style={styles.container}>
            <Card style={{ width: '90%' }}>
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
            {
                error ?
                    <View>
                        <Icon
                            name='times'
                            type='font-awesome'
                            color='#333333' />
                        <Text style={{ color: "#333333", fontSize: 18, marginBottom: 5, marginLeft: 5, marginTop: 5 }}>Some error occured searching for the item</Text>
                    </View>
                    :
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        {
                            searchRecommendations.map((recom) => {
                                <View style={{ flex: 1, backgroundColor: "red", margin: 5 }}>
                                    <ImageBackground source={{ uri: recom.img }} style={{ width: '100%', height: '100%' }}>
                                        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                                            <View style={{ height: 65, padding: 5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <Text>{recom.brand}</Text>
                                                {this.getNutriscoreAvatar(recom.nutritionGrade)}
                                            </View>
                                        </View>
                                    </ImageBackground>
                                </View>
                            })

                        }
                    </View>
            }


            {/* <View style={{ flex: 1, flexDirection: 'row' }}>
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
            </View> */}
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
    const { productData, isLoaded, isLoading, error, searchHistory, searchRecommendations } = state;
    return {
        searchRecommendations,
        searchHistory,
        productData,
        isLoaded,
        isLoading,
        error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        recommendedProducts: upc => {
            dispatch(recommendedProducts(upc));
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(RecommendationScreen);