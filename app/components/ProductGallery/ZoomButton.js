import React, { Fragment, useState } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

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
                    <Text style={{ color: 'green' }}>Thu nhỏ </Text>
                    <Icon name="search-minus" size={20} color="green" />
                </TouchableOpacity>
            ) : (
                <TouchableOpacity
                    style={styles.zoom}
                    onPress={() => {
                        handleScaleX(true);
                        setIsZooming(true);
                    }}>
                    <Text style={{ color: 'green' }}>Phóng to </Text>
                    <Icon name="search-plus" size={20} color="green" />
                </TouchableOpacity>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    zoom: {
        bottom: 100,
        flexDirection: 'row',
        justifyContent: 'center',
        position: 'absolute',
        right: 20,
        zIndex: 13
    }
});
