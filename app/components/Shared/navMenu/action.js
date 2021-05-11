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

const [isActive, setIsActive] = useState('');

export const renderCateChildItem = ({ item }) => {
    const handleSelectCateChild = (id) => {
        setIsActive(id);
        Alert.alert(isActive);
    };

    return (
        <TouchableOpacity
            key={item.Id}
            style={styles.itemCateChild}
            onPress={() => handleSelectCateChild(item.Id)}>
            <Image style={styles.iconCateChild} source={item.UrlImage} />
            <Text style={styles.txtCateChild}>{item.TextName}</Text>
            {/* <Text style={styles.txtCateChild}>{isActive}</Text> */}
        </TouchableOpacity>
    );
};
