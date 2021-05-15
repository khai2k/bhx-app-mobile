/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './style';

const BoxSelect = (props) => {
    const [numberItems, setNumberItems] = useState(1);
    const [buyButtonVisible, setBuyButtonVisible] = useState(false);
    const navigation = useNavigation();
    const handleInputNumber = (number) => {
        setNumberItems(+number);
    };
    const { status, ShortName, Avatar, Price, isNearDate } = props.bhxProduct;
    return (
        <View>
            <View
                style={
                    status === 0 ? styles.product : styles.productOutOfStock
                }>
                <TouchableOpacity
                    onPress={() => {
                        if (status === 0) {
                            setNumberItems(1);
                            setBuyButtonVisible(true);
                        }
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
                            alignItems: 'center',
                            flex: 1
                        }}>
                        <Image
                            style={{ width: 20, height: 20, margin: 5 }}
                            source={{ uri: Avatar }}
                        />
                        <View style={{ justifyContent: 'center' }}>
                            <Text>{ShortName}</Text>
                        </View>
                    </View>
                    <View className="boxBuy" style={styles.boxBuy}>
                        {status === 0 ? (
                            <View
                                className="priceInfo"
                                style={styles.priceInfo}>
                                <View className="price" style={styles.price}>
                                    <Text>{Price}</Text>
                                </View>
                                <View className="buy" style={styles.buy}>
                                    <Text>MUA</Text>
                                </View>
                            </View>
                        ) : status === 1 ? (
                            <View
                                style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                <Text>TẠM HẾT HÀNG</Text>
                            </View>
                        ) : (
                            <View
                                style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                <Text style={{ fontSize: 12 }}>
                                    NGUNG KINH DANH
                                </Text>
                            </View>
                        )}
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
                            source={{ uri: Avatar }}
                        />
                        <View style={{ justifyContent: 'center' }}>
                            <Text>{Price}</Text>
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
            {isNearDate === 1 && (
                <View style={styles.productNearDate}>
                    <View style={styles.textProductNearDate}>
                        <Text style={{ fontWeight: 'bold' }}> MUA 13.000đ</Text>
                    </View>
                    <View style={styles.textProductNearDate}>
                        <Text> HSD còn 24 ngày </Text>
                    </View>
                </View>
            )}
        </View>
    );
};

export default BoxSelect;
