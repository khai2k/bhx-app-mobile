import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, StyleSheet, Image } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { connect } from 'react-redux';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { translate } from '@app/translate';
import { constants } from '../constants';
import Profile from '../container/profile';
import Product from '../container/product';
import ProductDetail from '../container/productDetail';
import Promotion from '../container/promotion';
import Notification from '../container/notification';

const MainStack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const MainNavigator = () => {
    return (
        <MainStack.Navigator initialRouteName="Main">
            <MainStack.Screen
                name="Main"
                component={MainDrawer}
                options={({ route }) => {
                    const routeName = getFocusedRouteNameFromRoute(route) ?? '';
                    console.log('route:', routeName);
                    return { headerShown: false };
                }}
            />
            <MainStack.Screen
                name="ProductDetail"
                component={ProductDetail}
                options={({ route }) => {
                    const routeName = getFocusedRouteNameFromRoute(route) ?? '';
                    console.log('route:', routeName);
                    return { headerShown: false };
                }}
            />
        </MainStack.Navigator>
    );
};

export default MainNavigator;

const styles = StyleSheet.create({
    drawerStyle: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        width: constants.width
    }
});
const MainDrawer = () => {
    return (
        <Drawer.Navigator
            initialRouteName="MainTab"
            drawerContent={(props) => {
                return <View {...props} />;
            }}
            drawerStyle={styles.drawerStyle}>
            <Drawer.Screen name="MainTab" component={MainTab} />
        </Drawer.Navigator>
    );
};

class MainTabComponent extends Component {
    render() {
        return (
            <Tab.Navigator
                initialRouteName="Product"
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, image }) => {
                        if (route.name === 'Product') {
                            image = focused
                                ? require('../../assets/Images/grid.png')
                                : require('../../assets/Images/grid.png');
                        } else if (route.name === 'Promotion') {
                            image = focused
                                ? require('../../assets/Images/promotion.png')
                                : require('../../assets/Images/promotion.png');
                        } else if (route.name === 'Notification') {
                            image = focused
                                ? require('../../assets/Images/notification.png')
                                : require('../../assets/Images/notification.png');
                        } else if (route.name === 'Profile') {
                            image = focused
                                ? require('../../assets/Images/user.png')
                                : require('../../assets/Images/user.png');
                        }
                        return (
                            <Image
                                source={image}
                                style={{ width: 20, height: 20 }}
                            />
                        );
                    }
                })}
                tabBarOptions={{
                    activeTintColor: 'red',
                    inactiveTintColor: 'gray'
                }}>
                <Tab.Screen
                    name="Product"
                    component={Product}
                    options={{ title: translate('Product') }}
                />
                <Tab.Screen
                    name="Promotion"
                    component={Promotion}
                    options={{ title: translate('Promotion') }}
                />
                <Tab.Screen
                    name="Notification"
                    component={Notification}
                    options={{ title: translate('Notification') }}
                />
                <Tab.Screen
                    name="Profile"
                    component={Profile}
                    options={{ title: translate('Account') }}
                />
            </Tab.Navigator>
        );
    }
}

const mapStatePropMain = function () {
    return {};
};

const mapDispatchPropsMain = function () {
    return {};
};

const MainTab = connect(
    mapStatePropMain,
    mapDispatchPropsMain
)(MainTabComponent);
