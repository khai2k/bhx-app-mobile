import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './../../components/ProductBox/style';

const BoxSelect = (props) => {
    const [numberItems, setNumberItems] = useState(1);
    const [buyButtonVisible, setBuyButtonVisible] = useState(false);
    const navigation = useNavigation();
    const handleInputNumber = (number) => {
        setNumberItems(+number);
    };

    return (
        <View
            // className="product"
            style={styles.productSelected}>
            <TouchableOpacity
                onPress={() => {
                    setNumberItems(1);
                    setBuyButtonVisible(true);
                }}
                style={
                    buyButtonVisible
                        ? styles.unvisibleProductBuy
                        : styles.visibleProductBuy
                }>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignContent: 'center'
                    }}>
                    <Image
                        style={{ width: 20, height: 20, margin: 5 }}
                        source={{ uri: props.bhxProduct.Avatar }}
                    />
                    <View style={{ justifyContent: 'center' }}>
                        <Text>1 lon 330ml</Text>
                    </View>
                </View>
                <View className="boxBuy" style={styles.boxBuy}>
                    <View className="priceInfo" style={styles.priceInfo}>
                        <View className="price" style={styles.price}>
                            <Text>{props.bhxProduct.Price}</Text>
                        </View>
                        <View className="buy" style={styles.buy}>
                            <Text>MUA</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
            <View
                onPress={() => {
                    setBuyButtonVisible(true);
                }}
                style={
                    buyButtonVisible
                        ? styles.visibleProductBuy
                        : styles.unvisibleProductBuy
                }>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center'
                    }}>
                    <Image
                        style={{ width: 20, height: 20, margin: 5 }}
                        source={{ uri: props.bhxProduct.Avatar }}
                    />
                    <View style={{ justifyContent: 'center' }}>
                        <Text>8.000đ</Text>
                    </View>
                </View>
                <View className="boxBuy" style={styles.boxBuy}>
                    <View className="upDown" style={styles.upDownShow}>
                        <TouchableOpacity
                            onPress={() => {
                                setNumberItems(
                                    numberItems > 0 ? numberItems - 1 : 0
                                );
                                setBuyButtonVisible(numberItems !== 1);
                            }}
                            className="down"
                            style={styles.down}>
                            <Text style={styles.downIcon} />
                        </TouchableOpacity>
                        <TextInput
                            style={styles.inputBuy}
                            onChangeText={handleInputNumber}
                            value={numberItems.toString()}
                            keyboardType="numeric"
                        />
                        <TouchableOpacity
                            onPress={() => {
                                setNumberItems(numberItems + 1);
                            }}
                            className="up"
                            style={styles.up}>
                            <Text style={styles.upIcon1} />
                            <Text style={styles.upIcon2} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default BoxSelect;
