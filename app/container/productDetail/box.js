/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { helper } from '@app/common';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as cartCreator from '@app/container/cart/action';
import styles from './style';

const Box = (props) => {
    const { bHXProduct } = props;
    const dispatch = useDispatch();
    const actionCart = bindActionCreators(cartCreator, dispatch);
    const cart = useSelector((state) => state.cartReducer.CartSimple);
    const [guildId, setGuildId] = useState('');

    const [numberItems, setNumberItems] = useState(1);
    const [buyButtonVisible, setBuyButtonVisible] = useState(false);
    const handleInputNumber = (number) => {
        setNumberItems(+number);
    };
    const checkFillButtonBuy = () => {
        const idProduct = bHXProduct.Id;
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
        console.log(`Fill button ${props.bHXProduct.Id}`);
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
                    console.log(res);
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
                    console.log('cart_update_item_product');
                    console.log(res);
                    if (res.ResultCode > 0) {
                        alertAPI(res.Message);
                    } else {
                        // setNumberItems(numberItems + 1);

                        await actionCart.cart_get_simple();
                    }
                })
                .catch((error) => {
                    alertAPI(error);
                });
        }
    };
    const addToCart = (productID) => {
        console.log(`Begin addToCart ${props.bHXProduct.Id}`);

        setNumberItems(1);
        setBuyButtonVisible(true);
        actionCart
            .cart_add_item_product(productID, 1)
            .then(async (res) => {
                console.log('cart_add_item_product');
                console.log(res);
                if (res.ResultCode > 0) {
                    alertAPI(res.Message);
                } else {
                    console.log(`End addToCart ${props.bHXProduct.Id}`);

                    await actionCart.cart_get_simple();
                    console.log(
                        `End update addToCart cartSimple ${props.bHXProduct.Id}`
                    );
                }
            })
            .catch((error) => {
                alertAPI(error);
            });
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
    const { StockQuantityNew, Price, Sales } = bHXProduct;
    const webStatusId = checkWebStatusId(Price, StockQuantityNew);
    const isSaleOnly = checkIsSaleOnly(webStatusId, Sales);
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
                                            className="buy"
                                            style={styles.buy}>
                                            <Text>MUA NGAY</Text>
                                        </View>
                                    </View>
                                ) : webStatusId === 5 ? (
                                    <View style={styles.center}>
                                        <Text>TẠM HẾT HÀNG</Text>
                                    </View>
                                ) : (
                                    <View style={styles.center}>
                                        <Text style={{ fontSize: 12 }}>
                                            NGƯNG KINH DANH
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

    function renderTopBox() {
        return (
            <View style={styles.center}>
                {isSaleOnly ? (
                    <Text style={{ fontWeight: 'bold' }}>
                        {Sales &&
                            `MUA ${helper.formatMoney(Sales['6613'].Price)}`}
                    </Text>
                ) : (
                    <View style={styles.boxBuy}>
                        <Text>{helper.formatMoney(Price)}</Text>
                    </View>
                )}
            </View>
        );
    }
    function renderSale() {
        return (
            <View style={styles.productNearDate}>
                <Text>
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
                            addToCart(bHXProduct.Id);
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

export default Box;
