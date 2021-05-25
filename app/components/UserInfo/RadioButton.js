/* eslint-disable react-native/no-color-literals */
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function RadioButton(onPress, selected, children) {
    return (
        <View style={styles.radioButtonContainer}>
            <TouchableOpacity onPress={onPress} style={styles.radioButton}>
                {selected ? <View style={styles.radioButtonIcon} /> : null}
            </TouchableOpacity>
            <TouchableOpacity onPress={onPress}>
                <Text style={styles.radioButtonText}>{children}</Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    // eslint-disable-next-line react-native/no-color-literals
    radioButton: {
        alignItems: 'center',
        backgroundColor: '#F8F8F8',
        borderColor: '#E6E6E6',
        borderRadius: 10,
        borderWidth: 1,
        height: 20,
        justifyContent: 'center',
        width: 20
    },
    radioButtonContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 5,
        marginRight: 45,
        marginTop: 5
    },
    radioButtonIcon: {
        backgroundColor: '#98CFB6',
        borderRadius: 7,
        height: 14,
        width: 14
    },
    radioButtonText: {
        fontSize: 16,
        marginLeft: 16
    }
});
