import { View, StyleSheet, StatusBar } from 'react-native';
import React, { Component } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { CodePushUpdate } from '@app/components';
import { store } from './store';
import AppContainer from './navigator/appNavigator';

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
class App extends Component {
    render() {
        return (
            <SafeAreaProvider>
                <View style={styles.container}>
                    <StatusBar
                        barStyle="dark-content"
                        translucent
                        backgroundColor="transparent"
                    />
                    <Provider store={store}>
                        <AppContainer />
                    </Provider>
                </View>
                <CodePushUpdate />
            </SafeAreaProvider>
        );
    }
}

export default App;
