import React, { Component } from "react";
import { StyleSheet, View, Spacer, ImageBackground, SafeAreaView, FlatList, TouchableHighlight } from 'react-native';
import { Header, Button, Icon, Input, Divider, ListItem, Text, Card, Image, Avatar } from 'react-native-elements';
import Grid from 'react-native-grid-component';
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

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Recommendations',
            headerStyle: {
                backgroundColor: '#5B8C2A',
            },
            headerTintColor: '#fff',
            headerRight: (
                <Button
                    buttonStyle={{ backgroundColor: '#5B8C2A', marginRight: 10 }}
                    onPress={() => navigation.navigate('Home')}
                    icon={<Icon name="home" size={25} color="white" />}
                />
            )
        }
    };

    componentDidMount = () => {
        const upc = this.props.navigation.getParam('upc', null);
        this.setState({ isLoading: true })

        if (upc !== null) {
            this.props.recommendedProducts(upc);
        }
    }

    getNutriscoreAvatar = (grade) => {
        let uppercaseGrade = grade.toUpperCase();

        let requiredGrade = null
        switch (uppercaseGrade) {
            case 'A':
                requiredGrade = <Avatar rounded
                    overlayContainerStyle={{ backgroundColor: "#00823f" }}
                    title="A"
                    titleStyle={{ fontWeight: 'bold', color: "white" }} />;
                break;
            case 'B':
                requiredGrade = <Avatar rounded
                    overlayContainerStyle={{ backgroundColor: "#85bb2f" }}
                    title="B"
                    titleStyle={{ fontWeight: 'bold', color: "white" }} />;
                break;
            case 'C':
                requiredGrade = <Avatar rounded
                    overlayContainerStyle={{ backgroundColor: "#fecb02" }}
                    title="C"
                    titleStyle={{ fontWeight: 'bold', color: "white" }} />;
                break;
            case 'D':
                requiredGrade = <Avatar rounded
                    overlayContainerStyle={{ backgroundColor: "#ee8100" }}
                    title="D"
                    titleStyle={{ fontWeight: 'bold', color: "white" }} />;
                break;
            case 'E':
                requiredGrade = <Avatar rounded
                    overlayContainerStyle={{ backgroundColor: "#e63e11" }}
                    title="E"
                    titleStyle={{ fontWeight: 'bold', color: "white" }} />;
                break;
            default:
                requiredGrade = null;
                break;
        }

        return requiredGrade;
    }

    handleProductPress = (upc) => {
        const navigateAction = this.props.navigation.navigate({
            routeName: 'Product',
            params: { upc: upc },
            key: 'ProductScreen' + upc
        });
        this.props.navigation.dispatch(navigateAction);
    };

    handleHomePress = () => {
        const navigateAction = this.props.navigation.navigate({
            routeName: 'Home'
        });
        this.props.navigation.dispatch(navigateAction);
    };

    renderRecommendation = (recom, i) => (
        <View key={i} style={styles.item}>
            <ImageBackground source={{ uri: recom.img }} style={{ width: '100%', height: '100%' }}>
                <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                    <TouchableHighlight onPress={e => this.handleProductPress(recom.upc)}>
                        <View style={{ backgroundColor: 'white' }}>
                            <Text>{recom.name}</Text>
                            {this.getNutriscoreAvatar(recom.nutritionGrade)}
                        </View>
                    </TouchableHighlight>
                </View>
            </ImageBackground>
        </View>
    );

    keyExtractor = (item, index) => item.upc;

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
            <Card>
                <View style={{ flexDirection: 'row' }}>
                    <Image source={{ uri: productData.img }} style={styles.productImage}
                    ></Image>
                    <View style={{ flexDirection: 'column' }}>
                        <Text h3>{productData.name}</Text>
                        <Text>
                            Code: {productData.upc}
                        </Text>
                    </View>
                </View>
            </Card>

            <View style={{ alignItems: 'center' }}>
                <Text h4 style={styles.recommendationTitle}>Recommendations:</Text>
            </View>

            <View style={styles.grid}>
                {
                    searchRecommendations.length !== 0 ?
                        <Grid
                            style={styles.list}
                            renderItem={this.renderRecommendation}
                            keyExtractor={this.keyExtractor}
                            data={searchRecommendations}
                            numColumns={2}
                        />
                        :
                        <View>
                            <Icon
                                name='times'
                                type='font-awesome'
                                color='#333333' />
                            <Text style={styles.errorText}>Some error occured searching for the item</Text>
                        </View>


                }
            </View>
        </View>
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
        height: '100%',
    },
    productImage: {
        height: 75,
        width: 75,
        marginRight: 10,
        borderRadius: 50
    },
    item: {
        flex: 1,
        height: 200,
        width: 200,
        margin: 5
    },
    list: {
        flex: 1
    },
    grid: {
        flex: 1,
        padding: 5
    },
    recommendationTitle: {
        margin: 10,
    },
    errorText: {
        color: "#333333",
        fontSize: 18,
        marginBottom: 5,
        marginLeft: 5,
        marginTop: 5
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