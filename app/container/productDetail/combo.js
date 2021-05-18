import React from 'react';
import { Image, Text, View } from 'react-native';

import styles from './style';

const Product = (props) => {
    const { product } = props;
    const { ShortName = '11', Price, ExpiredText, Avatar } = product;
    return (
        <View style={{ flexDirection: 'row' }}>
            <Image style={{ height: 50, width: 50 }} source={{ uri: Avatar }} />
            <View style={{ flex: 1, paddingLeft: 10 }}>
                <Text>{ShortName}</Text>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ flex: 1 }}>{`${Price}đ`}</Text>
                    <Text style={styles.combo_price}>{`${Price}đ`}</Text>
                    <Text
                        style={styles.combo_expired}>{`(${ExpiredText})`}</Text>
                </View>
            </View>
        </View>
    );
};
const Combo = (props) => {
    const { comboProducts } = props;
    return (
        <View style={styles.combo_container}>
            <Text style={styles.combo_title}>Chi tiet Combo</Text>
            {comboProducts.map((product) => {
                return <Product product={product} />;
            })}
        </View>
    );
};

export default Combo;
