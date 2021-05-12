import React from 'react';
import { TouchableOpacity, Image, Text } from 'react-native';
import { styles } from './styles';
import { ImageNavMenu } from '../../../images';

export const RenderCateItem = (props) => {
    const { item } = props.item;

    return (
        <TouchableOpacity
            style={[
                styles.itemCate,
                item.Id === props.cateFilter && styles.itemCateActive
            ]}
            onPress={() => {
                props.setCateFilter(item.Id);
            }}>
            {item.Id === '1400' && (
                <Image
                    style={styles.iconPromotion}
                    source={ImageNavMenu.imgIconPromotion}
                />
            )}
            <Text style={styles.txtCate}>{item.TextName}</Text>
        </TouchableOpacity>
    );
};

export const RenderCateChildItem = (props) => {
    const { item } = props.item;

    const handleSelectCateChild = (id, cateParent) => {
        props.setSelectedCateChild(id);
        props.setCateFilter(cateParent);
    };

    return (
        <TouchableOpacity
            style={[
                styles.itemCateChild,
                props.cateFilter === props.cateParent &&
                    styles.itemCateChildActive
            ]}
            onPress={() => handleSelectCateChild(item.Id, props.cateParent)}>
            {props.selectedCateChild === item.Id && (
                <Image
                    style={styles.iconChecked}
                    source={ImageNavMenu.imgIconCheck}
                />
            )}
            <Image style={styles.iconCateChild} source={item.UrlImage} />
            <Text
                style={[
                    styles.txtCateChild,
                    props.selectedCateChild === item.Id &&
                        styles.txtCateChildActive
                ]}>
                {item.TextName}
            </Text>
        </TouchableOpacity>
    );
};
