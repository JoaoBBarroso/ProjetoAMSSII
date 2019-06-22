import React, { Component } from "react";
import { StyleSheet, Text, View, Image, } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { searchProduct } from '../../Redux/ProductScanning';
import Loader from '../../components/Loader';

class ProductScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // productData: this.props.productData || [],
            isLoading: false
        };
    }

    static navigationOptions = {
        title: 'Scanned Product Information',
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
            this.props.searchProduct(upc);
        }
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

    transitionMoreInformation = () => {
        this.props.navigation.navigate('MoreInformation', { productData: this.state.productData });
    }

    render() {

        const {
            isLoading,
            productData,
            error
        } = this.props;

        console.log(error)

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
                        <Card
                            title={productData.brand}
                            image={{ uri: productData.img }}>
                            <Image source={this.getNutriscoreGrade(productData.nutritionGrade)}></Image>
                            <Text style={{ marginBottom: 10 }}>
                                UPC Code: {productData.upc}
                            </Text>
                            <Button
                                icon={<Icon name='code' color='#fff' />}
                                buttonStyle={{ backgroundColor: '#5B8C2A' }}
                                titleStyle={{ color: '#fff' }}
                                onPress={this.transitionMoreInformation}
                                title=' More info' />
                        </Card>
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
        marginTop: 15,
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductScreen);



// import React, { Component } from "react";
// import { StyleSheet, Text, View, Image, } from 'react-native';
// import { Card, Button, Icon } from 'react-native-elements';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// // import { searchProduct } from '../../Redux/ProductScanningActions';
// import Loader from '../../components/Loader';
// import { searchProduct } from "../../Redux/actions/creators";

// class ProductScreen extends Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             productData: this.props.productData || undefined,
//             isLoading: false
//         };
//     }

//     static navigationOptions = {
//         title: 'Scanned Product Information',
//         headerStyle: {
//             backgroundColor: '#5B8C2A',
//         },
//         headerTintColor: '#fff',


//     };

//     componentDidMount = () => {
//         console.log(this.props.productSearched)
//         const upc = this.props.navigation.getParam('upc', null);
//         let that = this;
//         this.setState({ isLoading: true })

//         if (upc !== null) {

//             this.getProduct(upc).then(productData => {
//                 this.setState({ productData, isLoading: false })
//             }).catch(function (err) {

//                 console.log(err)
//                 that.setState({ isLoading: false, error: "your product doesn't exist" });
//             });

//         }
//     }

//     async getProduct(upc) {
//         let response = await fetch(`http://192.168.1.92:3001/api/food/${upc}`, {
//             method: 'GET',
//             mode: 'cors',
//             cache: 'default'
//         });
//         let data = await response.json()
//         return data;


//         // fetch(`http://localhost:3001/api/food/${upc}`,
//         // fetch(`http://192.168.1.92:3001/api/food/${upc}`,
//         //     {
//         //         method: 'GET',
//         //         mode: 'cors',
//         //         cache: 'default'
//         //     })
//         //     .then(function (response) {
//         //         console.log(response)
//         //         return response.json();
//         //     })
//         //     .then(function (productData) {
//         //         console.log(productData);
//         //         that.setState({ productData, loading: false })
//         //         return productData;
//         //     }).catch(function (err) {
//         //         console.log(err)
//         //         that.setState({ loading: false, error: "your product doesn't exist" });
//         //     });

//     }

//     getNutriscoreGrade = (grade) => {
//         let uppercaseGrade = grade.toUpperCase();

//         let requiredGrade = null
//         switch (uppercaseGrade) {
//             case 'A':
//                 requiredGrade = require(`../../assets/nutriscoreA.png`);
//                 break;
//             case 'B':
//                 requiredGrade = require(`../../assets/nutriscoreB.png`);
//                 break;
//             case 'C':
//                 requiredGrade = require(`../../assets/nutriscoreC.png`);
//                 break;
//             case 'D':
//                 requiredGrade = require(`../../assets/nutriscoreD.png`);
//                 break;
//             case 'E':
//                 requiredGrade = require(`../../assets/nutriscoreE.png`);
//                 break;
//             default:
//                 requiredGrade = null;
//                 break;
//         }

//         return requiredGrade;
//     }

//     transitionMoreInformation = () => {
//         this.props.navigation.navigate('MoreInformation', { productData: this.state.productData });
//     }

//     render() {

//         // const { isLoading, isLoaded, productData } = this.props;
//         const { productData, isLoading } = this.state;

//         if (isLoading) return <Loader />;
//         if (!productData) return null; // If it is not loading and its not loaded, then return nothing.

//         return <View style={styles.container}>

//             <View style={styles.homeButtons}>
//                 <Card
//                     title={productData.brand}
//                     image={{ uri: productData.img }}>
//                     <Text style={{ marginBottom: 10 }}>
//                         Code: {productData.upc}
//                     </Text>
//                     <Image source={this.getNutriscoreGrade(productData.nutritionGrade)}></Image>
//                     <Button
//                         icon={<Icon name='code' color='#000000' />}
//                         buttonStyle={{ backgroundColor: '#5B8C2A' }}
//                         titleStyle={{ color: '#000000' }}
//                         onPress={this.transitionMoreInformation}
//                         title='More info' />
//                 </Card>
//             </View>

//         </View>


//     }
// };

// //TO CHANGE
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#f7f7f7',
//         alignItems: 'center',
//     },
//     homeButtons: {
//         flexDirection: 'column',
//         justifyContent: 'space-between',
//     },
//     button: {
//         marginTop: 15,
//     }
// });

// // const mapStateToProps = (state) => {
// //     const { productData, isLoaded, isLoading, error } = state;
// //     return {
// //         productData,
// //         isLoaded,
// //         isLoading,
// //         error
// //     };
// // };

// // const mapDispatchToProps = dispatch => (
// //     bindActionCreators({
// //         searchProduct,
// //     }, dispatch)
// // );

// // export default connect(mapStateToProps, mapDispatchToProps)(ProductScreen);

// const mapDispatchToProps = dispatch => {
//     return {
//         searchProduct: upc => {
//             dispatch(upc);
//         }
//     };
// };
// const mapStateToProps = state => {
//     return {
//         productSearched: state.productSearched,
//     };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(ProductScreen);
