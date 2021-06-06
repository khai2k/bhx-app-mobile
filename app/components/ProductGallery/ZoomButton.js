import React, { Fragment, useState } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as COLOR from '@app/styles/colors';

export default function ZoomButton(props) {
    const { handleScaleX } = props;
    const [isZooming, setIsZooming] = useState(false);
    return (
        // eslint-disable-next-line react/jsx-fragments
        <>
            {isZooming ? (
                <TouchableOpacity
                    style={styles.zoom}
                    onPress={() => {
                        handleScaleX(false);
                        setIsZooming(false);
                    }}>
                    <Text style={{ color: COLOR.GREEN_KEY }}>Thu nhỏ </Text>
                    <Icon name="search-minus" size={20} color="green" />
                </TouchableOpacity>
            ) : (
                <TouchableOpacity
                    style={styles.zoom}
                    onPress={() => {
                        handleScaleX(true);
                        setIsZooming(true);
                    }}>
                    <Text style={{ color: COLOR.GREEN_KEY }}>Phóng to </Text>
                    <Icon name="search-plus" size={20} color="green" />
                </TouchableOpacity>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    zoom: {
        backgroundColor: COLOR.WHITE,
        borderRadius: 10,
        bottom: 100,
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10,
        position: 'absolute',
        right: 5,
        zIndex: 13
    }
});
