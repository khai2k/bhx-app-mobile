import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Header from './Header';
import { Colors } from '../styles';

const UnderConstruction = () => {
    const navigation = useNavigation();
    function handleGoHome() {
        navigation.navigate('Main');
    }
    return (
        <View>
            <Header />
            <Image
                style={styles.icon}
                source={require('../../assets/images/Chuc_nang_dang_xay_dung.png')}
            />
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.btnGoHome}
                    onPress={() => {
                        handleGoHome();
                    }}>
                    <Text style={styles.txtGoHome}>VỀ TRANG CHỦ</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    btnGoHome: {
        alignItems: 'center',
        backgroundColor: Colors.GREEN_KEY,
        borderRadius: 8,
        height: 44,
        justifyContent: 'center',
        padding: 5,
        width: 300
    },
    container: {
        alignItems: 'center',
        margin: 10
    },
    icon: {
        alignSelf: 'center',
        height: '65%',
        resizeMode: 'contain',
        width: '80%'
    },
    txtGoHome: {
        color: Colors.WHITE_FFF,
        fontSize: 15,
        fontWeight: '600',
        lineHeight: 16,
        padding: 5
    }
});

export default UnderConstruction;
