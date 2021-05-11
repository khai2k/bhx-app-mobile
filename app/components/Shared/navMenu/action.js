import React, { useState } from 'react';
import { TouchableOpacity, Image, Text, Alert } from 'react-native';
import { styles } from './styles';
import { ImageNavMenu } from '../../../images';

export const renderCateItem = ({ item }) => (
    <TouchableOpacity style={styles.itemCate}>
        {item.Id === '1400' ? (
            <Image
                style={styles.iconPromotion}
                source={ImageNavMenu.imgIconPromotion}
            />
        ) : null}
        <Text style={styles.txtCate}>{item.TextName}</Text>
    </TouchableOpacity>
);

export const renderCateChildItem = ({ item }) => {
    const [isActive, setIsActive] = useState('');

    const _onPress = (id) => {
        setIsActive(id);
        Alert.alert(isActive);
    };

    return (
        <TouchableOpacity
            key={item.Id}
            style={styles.itemCateChild}
            onPress={() => _onPress(item.Id)}>
            <Image style={styles.iconCateChild} source={item.UrlImage} />
            <Text style={styles.txtCateChild}>{item.TextName}</Text>
        </TouchableOpacity>
    );
};
