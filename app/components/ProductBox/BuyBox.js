import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { helper } from '@app/common';
import styles from './style';

const BuyBox = (props) => {
    const [quantity, setQuantity] = useState(props.numberItems);
    useEffect(() => setQuantity(props.numberItems), [props.numberItems]);

    const inputQuantity = (number) => {
        const numreg = /^[0-9]+$/;
        if (number === '') {
            setQuantity(0);
        }
        if (numreg.test(number)) {
            setQuantity(+number);
        }
    };

    if (props.isPageExpired) {
        const expStore = props.bhxProduct.ExpStoreId;
        const obj =
            expStore !== undefined ? props.bhxProduct.Sales[expStore] : null;
        if (!helper.isEmptyOrNull(obj)) {
            if (obj.Price > 0 && obj.StockQuantityNew >= 1) {
                if (!props.selectedBuy) {
                    return (
                        <View className="priceInfo" style={styles.priceInfo}>
                            <View className="price" style={styles.price}>
                                <Text>
                                    {helper.formatMoney(props.bhxProduct.Price)}
                                </Text>
                            </View>
                            <View className="buy" style={styles.buy}>
                                <Text>MUA</Text>
                            </View>
                        </View>
                    );
                } else {
                    return (
                        <View className="upDown" style={styles.upDownShow}>
                            <TouchableOpacity
                                onPress={() => {
                                    props.addToCart(
                                        obj.ProductId,
                                        expStore,
                                        1,
                                        false
                                    );
                                }}
                                className="down"
                                style={styles.down}>
                                <Text style={styles.downIcon} />
                            </TouchableOpacity>
                            <TextInput
                                style={styles.inputBuy}
                                onChangeText={(number) => {
                                    inputQuantity(number);
                                }}
                                onSubmitEditing={(e) => {
                                    props.handleInputNumber(
                                        obj.ProductId,
                                        expStore,
                                        e.nativeEvent.text
                                    );
                                }}
                                onBlur={(e) => {
                                    props.handleInputNumber(
                                        obj.ProductId,
                                        expStore,
                                        e.nativeEvent.text
                                    );
                                }}
                                value={quantity.toString()}
                                keyboardType="numeric"
                            />
                            <TouchableOpacity
                                onPress={() => {
                                    props.addToCart(obj.ProductId, expStore);
                                }}
                                className="up"
                                style={styles.up}>
                                <Text style={styles.upIcon1} />
                                <Text style={styles.upIcon2} />
                            </TouchableOpacity>
                        </View>
                    );
                }
            } else if (obj.Price > 0) {
                return (
                    <View className="noBuy" style={[styles.buy, styles.noBuy]}>
                        <Text>T???m H???t h??ng</Text>
                    </View>
                );
            } else {
                return (
                    <View className="noBuy" style={[styles.buy, styles.noBuy]}>
                        <Text>Ng??ng Kinh Doanh</Text>
                    </View>
                );
            }
        }
    } else if (props.bhxProduct.IsPreOrder) {
        if (props.bhxProduct.PreAmount > 0) {
            return (
                <Text className="noBuy" style={[styles.buy, styles.noBuy]}>
                    D???t tr?????c
                </Text>
            );
        } else {
            return (
                <Text className="noBuy" style={[styles.buy, styles.noBuy]}>
                    T???m h???t h??ng
                </Text>
            );
        }
    } else if (props.bhxProduct.IsComingProduct) {
        <Text className="noBuy" style={[styles.buy, styles.noBuy]}>
            S???P B??N
        </Text>;
    } else if (
        props.bhxProduct.Price > 0 &&
        props.bhxProduct.StockQuantityNew >= 1
    ) {
        if (!props.selectedBuy) {
            return (
                <View className="priceInfo" style={styles.priceInfo}>
                    <View className="price" style={styles.price}>
                        <Text>
                            {helper.formatMoney(props.bhxProduct.Price)}
                        </Text>
                    </View>
                    <View className="buy" style={styles.buy}>
                        <Text>MUA</Text>
                    </View>
                </View>
            );
        } else {
            return (
                <View className="upDown" style={styles.upDownShow}>
                    <TouchableOpacity
                        onPress={() => {
                            props.addToCart(props.bhxProduct.Id, 0, 1, false);
                        }}
                        className="down"
                        style={styles.down}>
                        <Text style={styles.downIcon} />
                    </TouchableOpacity>
                    <TextInput
                        style={styles.inputBuy}
                        onChangeText={(number) => {
                            inputQuantity(number);
                        }}
                        onSubmitEditing={(e) => {
                            props.handleInputNumber(
                                props.bhxProduct.Id,
                                0,
                                e.nativeEvent.text
                            );
                        }}
                        onBlur={(e) => {
                            props.handleInputNumber(
                                props.bhxProduct.Id,
                                0,
                                e.nativeEvent.text
                            );
                        }}
                        value={quantity.toString()}
                        keyboardType="numeric"
                    />
                    <TouchableOpacity
                        onPress={() => {
                            props.addToCart(props.bhxProduct.Id);
                        }}
                        className="up"
                        style={styles.up}>
                        <Text style={styles.upIcon1} />
                        <Text style={styles.upIcon2} />
                    </TouchableOpacity>
                </View>
            );
        }
    } else if (props.bhxProduct.Price > 0) {
        return (
            <Text className="noBuy" style={[styles.buy, styles.noBuy]}>
                T???m H???t h??ng
            </Text>
        );
    } else {
        return (
            <Text className="noBuy" style={[styles.buy, styles.noBuy]}>
                Ng??ng Kinh Doanh
            </Text>
        );
    }
};
export default React.memo(BuyBox);
