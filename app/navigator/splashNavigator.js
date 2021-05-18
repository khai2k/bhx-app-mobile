import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Splash from '../container/splash';

const SplashStack = createStackNavigator();
const SplashNavigator = () => {
    return (
        <SplashStack.Navigator initialRouteName="Splash" headerMode="none">
            <SplashStack.Screen name="Splash" component={Splash} />
        </SplashStack.Navigator>
    );
};

export default SplashNavigator;
