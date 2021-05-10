import React from 'react';
import { TouchableOpacity, Image, Text } from 'react-native';
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

// export const renderCateChildItem = ({ item }) => (
//     <TouchableOpacity style={styles.itemCateChild}>
//         <Image
//             style={styles.iconCateChild}
//             source={item != null && item.UrlImage != null ? item.UrlImage : ''}
//         />
//         <Text style={styles.txtCateChild}>{item.TextName}</Text>
//     </TouchableOpacity>
// );

export const renderCateChildItem = ({ TextName, UrlImage }) => (
    <TouchableOpacity style={styles.itemCateChild}>
        <Image style={styles.iconCateChild} source={UrlImage} />
        <Text style={styles.txtCateChild}>{TextName}</Text>
    </TouchableOpacity>
);
