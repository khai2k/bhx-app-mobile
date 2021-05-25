/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';

import { helper } from '@app/common';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as cartCreator from '@app/container/cart/action';
import styles from './style';

const BoxOption = (props) => {
    const { exchangeProduct } = props;
    const { Info, Unit, BaseValue, BaseUnit, ExchangeQuantity } =
        exchangeProduct;
    const { Sales, Price, Avatar, StockQuantityNew } = Info;
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
    const isSaleOnly = checkIsSaleOnly(webStatusId, Sales);

    const webStatusId = checkWebStatusId(Price, StockQuantityNew);

    const getShortName = () => {
        if (Unit !== BaseUnit) {
            return `1 ${Unit} ${ExchangeQuantity} ${BaseUnit}`;
        }
        return `1 ${Unit} ${BaseValue}`;
    };
    const ShortName = getShortName();

    const [numberItems, setNumberItems] = useState(1);
    const [buyButtonVisible, setBuyButtonVisible] = useState(false);
    const handleInputNumber = (number) => {
        setNumberItems(+number);
    };
    const dispatch = useDispatch();
    const actionCart = bindActionCreators(cartCreator, dispatch);
    const cart = useSelector((state) => state.cartReducer.CartSimple);
    const [guildId, setGuildId] = useState('');

    const checkFillButtonBuy = () => {
        const idProduct = Info.Id;
        if (
            !helper.isEmptyOrNull(cart) &&
            !helper.isEmptyOrNull(cart.ProInCart)
        ) {
            if (!helper.isEmptyOrNull(cart.ProInCart[idProduct])) {
                setGuildId(cart.ProInCart[idProduct][0]);
                setNumberItems(+cart.ProInCart[idProduct][1]);
                setBuyButtonVisible(true);
            }
        } else {
            setNumberItems(1);
            setBuyButtonVisible(false);
        }
    };
    useEffect(() => {
        checkFillButtonBuy();
    }, [cart.Total]);
    const alertAPI = (messages) => {
        Alert.alert('', messages);
    };
    const alertMaxQuantityItemProduct = () => {
        Alert.alert('', 'Chưa có thông tin?', [
            {
                text: 'Không xóa',
                style: 'cancel'
            },
            {
                text: 'Đồng ý'
            }
        ]);
    };
    const setQuantityMinus = () => {
        if (numberItems <= 1) {
            actionCart
                .cart_remove_item_product(guildId)
                .then((res) => {
                    if (res.ResultCode > 0) {
                        alertAPI(res.Message);
                    } else {
                        actionCart.cart_get_simple();
                    }
                })
                .catch((error) => {
                    alertAPI(error);
                });
        } else {
            actionCart
                .cart_update_item_product(guildId, numberItems - 1)
                .then((res) => {
                    if (res.ResultCode > 0) {
                        alertAPI(res.Message);
                    } else {
                        actionCart.cart_get_simple();
                    }
                })
                .catch((error) => {
                    alertAPI(error);
                });
        }
    };

    const setQuantityPlus = () => {
        if (numberItems > 50) {
            alertMaxQuantityItemProduct();
        } else {
            actionCart
                .cart_update_item_product(guildId, numberItems + 1)
                .then(async (res) => {
                    if (res.ResultCode > 0) {
                        alertAPI(res.Message);
                    } else {
                        await actionCart.cart_get_simple();
                    }
                })
                .catch((error) => {
                    alertAPI(error);
                });
        }
    };
    const addToCart = (productID) => {
        setNumberItems(1);
        setBuyButtonVisible(true);
        actionCart
            .cart_add_item_product(productID, 1)
            .then(async (res) => {
                if (res.ResultCode > 0) {
                    alertAPI(res.Message);
                } else {
                    await actionCart.cart_get_simple();
                }
            })
            .catch((error) => {
                alertAPI(error);
            });
    };
    function renderBoxBuy() {
        return (
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
        );
    }
    function renderTopBox() {
        return (
            <View style={styles.center}>
                {isSaleOnly ? (
                    <Text style={{ fontWeight: 'bold' }}>
                        {Sales &&
                            `MUA ${helper.formatMoney(Sales['6613'].Price)}`}
                    </Text>
                ) : (
                    <View style={[styles.center, { flexDirection: 'row' }]}>
                        <Image style={styles.Image} source={{ uri: Avatar }} />
                        <View style={{ justifyContent: 'center' }}>
                            <Text>{ShortName}</Text>
                        </View>
                    </View>
                )}
            </View>
        );
    }
    function renderSale() {
        return (
            <View style={styles.productNearDate}>
                <Text style={{ fontWeight: 'bold' }}>
                    {Sales && `MUA ${helper.formatMoney(Sales['6613'].Price)}`}
                </Text>
                <Text style={styles.ExpiredText}>
                    {' '}
                    {Sales['6613'].ExpiredText === ''
                        ? Sales['6613'].LabelText
                        : Sales['6613'].ExpiredText}
                </Text>
            </View>
        );
    }
    function renderBottomBox() {
        return (
            <View>
                {buyButtonVisible ? (
                    renderBoxBuy()
                ) : (
                    <View>
                        {isSaleOnly ? (
                            <View style={styles.boxBuy}>
                                <Text style={styles.ExpiredText}>
                                    {' '}
                                    {Sales['6613'].ExpiredText === ''
                                        ? Sales['6613'].LabelText
                                        : Sales['6613'].ExpiredText}
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
                                            <Text>
                                                {helper.formatMoney(Price)}
                                            </Text>
                                        </View>
                                        <View
                                            className="buy"
                                            style={styles.buy}>
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
                    </View>
                )}
            </View>
        );
    }
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
                            addToCart(Info.Id);
                        }
                    }}>
                    {renderTopBox()}
                    {renderBottomBox()}
                </TouchableOpacity>
            </View>
            {Sales !== null && !isSaleOnly && renderSale()}
        </View>
    );
};

export default BoxOption;
