import { createStackNavigator, createAppContainer } from 'react-navigation';
import Home from './containers/HomeScreen';
import Scanning from './containers/ScanningScreen';
import Product from './containers/ProductScreen';

const AppNavigator = createStackNavigator({
    Home: { screen: Home },
    Scanning: { screen: Scanning },
    Product: { screen: Product },
}, {
        initialRouteName: 'Home'
    });

export default createAppContainer(AppNavigator);