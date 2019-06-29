import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import AppNavigator from './AppNavigator';
import SplashScreen from './containers/SplashScreen';

const InitialNavigator = createSwitchNavigator({
    Splash: SplashScreen,
    App: AppNavigator
});

export default createAppContainer(InitialNavigator);