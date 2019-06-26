import { createStackNavigator, createAppContainer } from 'react-navigation';
import Home from './containers/HomeScreen';
import Scanning from './containers/ScanningScreen';
import Product from './containers/ProductScreen';
import MoreInformation from './containers/MoreInfoScreen';
import Recommendation from './containers/RecommendationScreen';

handleHomePress = () => {
    const navigateAction = this.props.navigation.navigate({
        routeName: 'Home'
    });
    this.props.navigation.dispatch(navigateAction);
};

const AppNavigator = createStackNavigator({
    Home: { screen: Home },
    Scanning: { screen: Scanning },
    Product: { screen: Product },
    MoreInformation: { screen: MoreInformation },
    Recommendation: { screen: Recommendation}
}, {
        initialRouteName: 'Home'
    });

export default createAppContainer(AppNavigator);