import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import info from './test.json';

const test = require('./test.json');

export default class MoreInfoScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            productData: this.props.productData || undefined,
            collapseIngredients: false,
            collapseNutrients: false
        };
    }

    static navigationOptions = {
        title: 'Scanned Product Information',
        headerStyle: {
            backgroundColor: '#D8D8F6',
        },
        headerTintColor: '#000000',

    };

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
        console.log(test)
        let productGrade = test.product.nutrition_grades;
        return <View style={styles.container}>

            <View style={styles.homeButtons}>
                <Card
                    title={test.product.brands}
                    image={{uri: test.product.image_front_url}}>
                    <Text style={{ marginBottom: 10 }}>
                        Code: {test.product.id}
                    </Text>
                    <Image source={this.getNutriscoreGrade(test.product.nutrition_grades)}></Image>
                    
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
