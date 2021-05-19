import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Splash from '../container/splash';

// import Location from '../components/Location';

const SplashStack = createStackNavigator();
const SplashNavigator = () => {
    return (
        <SplashStack.Navigator initialRouteName="Splash" headerMode="none">
            <SplashStack.Screen name="Splash" component={Splash} />
            {/* <Location /> */}
        </SplashStack.Navigator>
    );
};

export default SplashNavigator;
