import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { helper } from '@app/common';
import styles from './style';

const BuyBox = (props) => {
    const [quantity, setQuantity] = useState(props.numberItems);
    useEffect(() => setQuantity(props.numberItems));
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
                                    setQuantity(+number);
                                }}
                                onSubmitEditing={(e) => {
                                    props.handleInputNumber(e.nativeEvent.text);
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
                        <Text>Tạm Hết hàng</Text>
                    </View>
                );
            } else {
                return (
                    <View className="noBuy" style={[styles.buy, styles.noBuy]}>
                        <Text>Ngưng Kinh Doanh</Text>
                    </View>
                );
            }
        }
    } else if (props.bhxProduct.IsPreOrder) {
        if (props.bhxProduct.PreAmount > 0) {
            return (
                <Text className="noBuy" style={[styles.buy, styles.noBuy]}>
                    Dặt trước
                </Text>
            );
        } else {
            return (
                <Text className="noBuy" style={[styles.buy, styles.noBuy]}>
                    Tạm hết hàng
                </Text>
            );
        }
    } else if (props.bhxProduct.IsComingProduct) {
        <Text className="noBuy" style={[styles.buy, styles.noBuy]}>
            SẮP BÁN
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
                            setQuantity(+number);
                        }}
                        onSubmitEditing={(e) => {
                            props.handleInputNumber(e.nativeEvent.text);
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
                Tạm Hết hàng
            </Text>
        );
    } else {
        return (
            <Text className="noBuy" style={[styles.buy, styles.noBuy]}>
                Ngưng Kinh Doanh
            </Text>
        );
    }
};
export default React.memo(BuyBox);
