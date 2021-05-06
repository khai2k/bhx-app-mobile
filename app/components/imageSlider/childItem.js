import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

const ChildItem = ({
    item,
    style,
    onPress,
    index,
    imageKey,
    local,
    height
}) => {
    return (
        <TouchableOpacity
            style={styles.container}
            activeOpacity={1}
            onPress={() => onPress(index)}>
            <Image
                style={[styles.image, style, { height }]}
                source={local ? item[imageKey] : { uri: item[imageKey] }}
            />
        </TouchableOpacity>
    );
};
export default ChildItem;

const styles = StyleSheet.create({
    container: {
        opacity: 1
    },
    image: {
        height: 230,
        resizeMode: 'stretch'
    }
});
