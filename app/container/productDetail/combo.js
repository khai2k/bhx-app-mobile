import React from 'react';
import { Image, Text, View } from 'react-native';

import styles from './style';

const Avatar =
    'https://cdn.tgdd.vn/Products/Images/2943/204183/bhx/thung-40-bich-sua-dau-nanh-nguyen-chat-it-duong-fami-200ml-202104130018093533_300x300.jpg';
const Product = () => {
    return (
        <View style={{ flexDirection: 'row' }}>
            <Image style={{ height: 50, width: 50 }} source={{ uri: Avatar }} />
            <View style={{ flex: 1, paddingLeft: 10 }}>
                <Text sty>4 chai Strongbow vi dau 330ml</Text>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ flex: 1 }}>72000d</Text>
                    <Text style={styles.combo_price}>72000d</Text>
                    <Text style={styles.combo_expired}>(HSD con 2 nam)</Text>
                </View>
            </View>
        </View>
    );
};
const Combo = () => {
    return (
        <View style={styles.combo_container}>
            <Text style={styles.combo_title}>Chi tiet Combo</Text>
            <Product />
            <Product />
            <Product />
        </View>
    );
};

export default Combo;
