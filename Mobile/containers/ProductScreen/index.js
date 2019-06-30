import React, { Component } from "react";
import { StyleSheet, View, Image, } from 'react-native';
import { Card, Button, Icon, Text } from 'react-native-elements';
import { connect } from 'react-redux';
import { searchProduct, addToFavourites, removeFromFavourites } from '../../Redux/ProductScanning';
import Loader from '../../components/Loader';

class ProductScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // productData: this.props.productData || [],
            searchedUpc: null,
            isLoading: false
        };
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Scanned Product Information',
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
        let upc = this.props.navigation.getParam('upc', null);
        this.setState({ isLoading: true, searchedUpc: upc })
        if (upc !== null) {
            this.props.searchProduct(upc);
        }
    }

    getNutriscoreGrade = (grade) => {
        if (grade) {
            let uppercaseGrade = grade.toUpperCase();
            let requiredGrade = null
            switch (uppercaseGrade) {
                case 'A':
                    requiredGrade = require(`../../assets/nutriscoreA.png`);
                    break;
                case 'B':
                    requiredGrade = require(`../../assets/nutriscoreB.png`);
                    break;
                case 'C':
                    requiredGrade = require(`../../assets/nutriscoreC.png`);
                    break;
                case 'D':
                    requiredGrade = require(`../../assets/nutriscoreD.png`);
                    break;
                case 'E':
                    requiredGrade = require(`../../assets/nutriscoreE.png`);
                    break;
                default:
                    requiredGrade = null;
                    break;
            }
            return requiredGrade;
        } else {
            return null
        }




        
    }

    isFavourite = () => {

        const { favourites, productData } = this.props;
        let favourite = false;

        favourites.map((elem) => {
            if(elem.upc === productData.upc){
                favourite = true;
            }
        })

        return favourite;
    }

    favouriteProduct = () => {
        const { productData } = this.props;
        let isFavourite = this.isFavourite();

        if (isFavourite) {
            this.props.removeFromFavourites(productData);
        } else {
            this.props.addToFavourites(productData);
        }
    }

    transitionMoreInformation = () => {
        this.props.navigation.navigate('MoreInformation', { productData: this.props.productData });
    }
    transitionRecommendation = () => {

        let upc = this.props.navigation.getParam('upc', null);

        const navigateAction = this.props.navigation.navigate({
            routeName: 'Recommendation',

            params: {
                productData: this.props.productData,
                upc: upc
            },
            key: 'RecommendationScreen' + upc
        });

        this.props.navigation.dispatch(navigateAction);
    }

    render() {

        const {
            isLoading,
            productData,
            error
        } = this.props;

        let isFavourite = this.isFavourite()

        if (isLoading) return <Loader />;
        if (!productData) return null; // If it is not loading and its not loaded, then return nothing.

        return <View style={styles.container}>
            <View style={styles.homeButtons}>
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
                        <View>
                            <Card
                                image={{ uri: productData.img }}
                                imageProps={{ resizeMode: "cover" }}>
                                <Text h3>{productData.name}</Text>
                                <Text style={{ marginBottom: 10, color: "gray" }}>
                                    Code: {productData.upc}
                                </Text>
                                {
                                    productData.nutritionGrade ? 
                                        <Image source={this.getNutriscoreGrade(productData.nutritionGrade)} ></Image>
                                        :
                                        <Text h4>No grade yet defined</Text>
                                }
                                
                                <Button
                                    title={isFavourite ? "Remove from favourites" : "Add to favourites"}
                                    titleStyle={{
                                        color: 'black'
                                    }}
                                    icon={{
                                        name: "star",
                                        type: "font-awesome",
                                        size: 28,
                                        color: isFavourite ? "gold" : "lightgrey"
                                    }}
                                    type="clear"
                                    onPress={this.favouriteProduct}
                                />
                            </Card>
                            <View style={{ flex: 1, alignItems: 'center', flexDirection: "row", justifyContent: "space-between" }}>
                                <Button
                                    icon={<Icon name='code' color='#fff' />}
                                    buttonStyle={[{ backgroundColor: '#F2A413' }, styles.button]}
                                    titleStyle={{ color: '#fff' }}
                                    onPress={this.transitionMoreInformation}
                                    title='More info' />
                                <Button
                                    buttonStyle={[{ backgroundColor: '#5B8C2A' }, styles.button]}
                                    titleStyle={{ color: '#fff' }}
                                    onPress={this.transitionRecommendation}
                                    title='Healthier Alternative' />
                            </View>
                        </View>
                }

            </View>
        </View>


    }
};

//TO CHANGE
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
        alignItems: 'center',
    },
    homeButtons: {
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    button: {
        marginTop: 5,
    }
});

const mapStateToProps = (state) => {
    const { productData, isLoaded, isLoading, error, searchHistory, favourites } = state;
    return {
        searchHistory,
        favourites,
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
        },
        addToFavourites: upc => {
            dispatch(addToFavourites(upc));
        },
        removeFromFavourites: upc => {
            dispatch(removeFromFavourites(upc));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductScreen);



