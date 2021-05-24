/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './style';

const BoxOption = (props) => {
    const [numberItems, setNumberItems] = useState(1);
    const [buyButtonVisible, setBuyButtonVisible] = useState(false);
    const navigation = useNavigation();
    const handleInputNumber = (number) => {
        setNumberItems(+number);
    };
    const checkWebStatusId = (Price, StockQuantityNew) => {
        if (Price > 0) {
            if (StockQuantityNew > 0) {
                return 3;
            }
            return 5;
        }
        return 1;
    };
    const checkIsSaleOnly = (webStatusId, Sales) => {
        if (webStatusId === 5 && Sales !== null) {
            return true;
        }
        return false;
    };
    const { Info, Unit, BaseValue } = props.exchangeProduct;
    const { Sales, Price, Avatar, StockQuantityNew } = Info;
    const isSaleOnly = checkIsSaleOnly(webStatusId, Sales);

    const webStatusId = checkWebStatusId(Price, StockQuantityNew);
    const ShortName = `1 ${Unit} ${BaseValue}`;
    const isNearDate = !!Sales;

    return (
        <View>
            <View
                style={
                    webStatusId === 3 || isSaleOnly
                        ? styles.product
                        : styles.productOutOfStock
                }>
                <TouchableOpacity
                    onPress={() => {
                        if (webStatusId === 3) {
                            setNumberItems(1);
                            setBuyButtonVisible(true);
                        }
                    }}
                    style={
                        buyButtonVisible
                            ? styles.unvisibleProductBuy
                            : styles.visibleProductBuy
                    }>
                    <View style={[styles.center, { flexDirection: 'row' }]}>
                        <Image style={styles.Image} source={{ uri: Avatar }} />
                        <View style={{ justifyContent: 'center' }}>
                            <Text>{ShortName}</Text>
                        </View>
                    </View>
                    {isSaleOnly ? (
                        <View style={styles.boxBuy}>
                            <Text style={styles.ExpiredText}>
                                {' '}
                                {Sales && Sales['6613'].ExpiredText}
                            </Text>
                        </View>
                    ) : (
                        <View className="boxBuy" style={styles.boxBuy}>
                            {webStatusId === 3 ? (
                                <View
                                    className="priceInfo"
                                    style={styles.priceInfo}>
                                    <View
                                        className="price"
                                        style={styles.price}>
                                        <Text>{`${Price}đ`}</Text>
                                    </View>
                                    <View className="buy" style={styles.buy}>
                                        <Text>MUA</Text>
                                    </View>
                                </View>
                            ) : webStatusId === 5 ? (
                                <View style={styles.center}>
                                    <Text>TẠM HẾT HÀNG</Text>
                                </View>
                            ) : (
                                <View style={styles.center}>
                                    <Text style={{ fontSize: 12 }}>
                                        NGUNG KINH DANH
                                    </Text>
                                </View>
                            )}
                        </View>
                    )}
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
                    <View style={[styles.center, { flexDirection: 'row' }]}>
                        <Image style={styles.Image} source={{ uri: Avatar }} />
                        <View style={{ justifyContent: 'center' }}>
                            <Text>{`${Price}đ`}</Text>
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
            {Sales !== null && !isSaleOnly && (
                <View style={styles.productNearDate}>
                    <Text style={{ fontWeight: 'bold' }}>
                        {Sales && `MUA ${Sales['6613'].Price}`}
                    </Text>
                    <Text style={styles.ExpiredText}>
                        {' '}
                        {Sales && Sales['6613'].ExpiredText}
                    </Text>
                </View>
            )}
        </View>
    );
};

export default BoxOption;
