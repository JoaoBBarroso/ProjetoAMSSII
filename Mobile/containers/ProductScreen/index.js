import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import info from './test.json';
import { nullLiteral } from "@babel/types";

const test = require('./test.json');

export default class ProductScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            productData: this.props.productData || undefined,
        };
    }

    static navigationOptions = {
        title: 'Scanned Product Information',
        headerStyle: {
            backgroundColor: '#D8D8F6',
        },
        headerTintColor: '#000000',

    };

    componentDidMount = () => {
        const upc = this.props.navigation.getParam('upc', null);
        console.log("upc:", upc);

        if (upc !== null) {
            // let productInfo = this.getProduct(upc);
            console.log(productInfo)
        }
    }

    async getProduct(upc) {

        try {
            let response = await fetch(`http://localhost:3001/api/food/${upc}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            }
            );
            let responseJson = await response.json();

            return responseJson;
        } catch (error) {
            console.error(error);
        }

        // fetch(`http://localhost:3001/api/food/${upc}`,
        //     {
        //         method: 'GET',
        //         mode: 'cors',
        //         cache: 'default'
        //     })
        //     .then(function (response) {
        //         console.log(response)
        //         return response.json();
        //     })
        //     .then(function (productData) {
        //         console.log(productData);
        //         that.setState({ productData, loading: false })
        //         return productData;
        //     }).catch(function (err) {
        //         console.log(err)
        //         that.setState({ loading: false, error: "your product doesn't exist" });
        //     });

    }

    getNutriscoreGrade = (grade) => {
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
    }

    render() {

        let productGrade = test.product.nutrition_grades;
        return <View style={styles.container}>

            <View style={styles.homeButtons}>
                <Card
                    title={test.product.brands}
                    image={{ uri: test.product.image_front_url }}>
                    <Text style={{ marginBottom: 10 }}>
                        Code: {test.product.id}
                    </Text>
                    <Image source={this.getNutriscoreGrade(test.product.nutrition_grades)}></Image>
                    <Button
                        icon={<Icon name='code' color='#000000' />}
                        buttonStyle={{ backgroundColor: '#D8D8F6' }}
                        titleStyle={{ color: '#000000' }}
                        title='More info' />
                </Card>
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
        marginTop: 15,
    }
});