import { createStackNavigator, createAppContainer } from 'react-navigation';
import Home from './containers/HomeScreen';
import Login from './containers/LoginScreen';

const AppNavigator = createStackNavigator({
    Home: { screen: Home },
    Login: { screen: Login },
}, {
        initialRouteName: 'Login'
    });

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;