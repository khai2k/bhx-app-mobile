import { Component } from 'react';
import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { connect } from 'react-redux';
import { enableScreens } from 'react-native-screens';
import { bindActionCreators } from 'redux';
import SplashNavigator from './splashNavigator';
import MainNavigator from './mainNavigator';
import * as actionAuthenCreator from '../container/splash/action';

enableScreens();

class AppContainer extends Component {
    render() {
        const { isShowSplash } = this.props;
        const showSplash = isShowSplash ?? true;
        return (
            <NavigationContainer>
                {showSplash ? <SplashNavigator /> : <MainNavigator />}
            </NavigationContainer>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isShowSplash: state.authenReducer.isShowSplash
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actionAuthen: bindActionCreators(actionAuthenCreator, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
