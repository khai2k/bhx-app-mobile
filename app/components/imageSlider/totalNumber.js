import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default (TotalNumber = ({
    itemCount,
    currentIndex,
    totalNumberStyle
}) => {
    return (
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
            <View style={{ width: 40 }}>
                <Text style={[styles.totalNumber, totalNumberStyle ]}>{currentIndex + 1}/{itemCount}</Text>
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    totalNumber: {
        backgroundColor: '#d6e0f5',
        color: '#fff',
        fontSize: 12,
        lineHeight: 16,
        textAlign: 'center',
        borderRadius: 16,
        marginTop: 5,
        marginRight: 5
    }
});