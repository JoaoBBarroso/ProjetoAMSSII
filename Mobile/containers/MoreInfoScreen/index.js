import React, { Component } from "react";
import { StyleSheet, View, Image, ScrollView } from 'react-native';
import { Card, Button, Icon, ListItem, Text } from 'react-native-elements';

export default class MoreInfoScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nutrientsList: null,
            ingredientsList: null
        };
    }

    static navigationOptions = {
        title: 'More Information',
        headerStyle: {
            backgroundColor: '#D8D8F6',
        },
        headerTintColor: '#000000',

    };

    componentDidMount = () => {
        const productData = this.props.navigation.getParam('productData', null);
        let that = this
        if (productData !== null) {
            that.setState({
                nutrientsList: productData.nutrients,
                ingredientsList: productData.ingredients
            })
        }
    }

    render() {
        const { nutrientsList, ingredientsList } = this.state;

        if (!nutrientsList || !ingredientsList) return null;

        console.log(nutrientsList, ingredientsList);
        return <ScrollView style={styles.container}>
            <View style={styles.infoContainer}>
                <Text h3 style={styles.title}>Nutrients</Text>
                {
                    Object.entries(nutrientsList).map((nutrient, i) => (
                        <Text key={`nutrient_${i}`} style={styles.infoText}>
                            {`${nutrient[0]}: ${nutrient[1]}`}
                        </Text>
                    ))
                }
            </View>
            <View style={styles.infoContainer}>
                <Text h3 style={styles.title}>Ingredients</Text>
                {
                    ingredientsList.map((ingredient, i) => (
                        <Text key={`ingredient_${i}`} style={styles.infoText}>
                            {ingredient.text}
                        </Text>


                    ))
                }
            </View>
            {/* {
                Object.entries(nutrientsList).map((nutrient, i) => (
                    <ListItem
                        key={i}
                        title={`${nutrient[0]}: ${nutrient[1]}`}
                    />
                ))
            }
            {
                ingredientsList.map((ingredient, i) => (
                    <ListItem
                        key={i}
                        title={ingredient.text}
                    />
                ))
            } */}
        </ScrollView>
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
    },
    title: {
        textAlign: 'center'
    },
    infoContainer: {
        marginTop: 10,
        fontSize: 34
    },
    infoText: {
        marginLeft: 10
    }
});
