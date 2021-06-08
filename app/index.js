import { View, StyleSheet, StatusBar } from 'react-native';
import React, { Component } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
// import { CodePushUpdate } from '@app/components';
import { ModalPortal } from 'react-native-modals';
import { Colors } from '@app/styles';
import FlashMessage from 'react-native-flash-message';
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
                        //barStyle="hight-dark" //ios chỗ này dark hoặc light hen ae
                        barStyle="light"
                        translucent
                        backgroundColor={Colors.GREEN_KEY}
                    />
                    <Provider store={store}>
                        <AppContainer />
                        <ModalPortal />
                    </Provider>
                </View>
                {/* <CodePushUpdate /> */}
                <FlashMessage
                    hideOnPress
                    position="center"
                    style={{
                        borderRadius: 30,
                        alignItems: 'center'
                    }}
                />
            </SafeAreaProvider>
        );
    }
}

export default App;
