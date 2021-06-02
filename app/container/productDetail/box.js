/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { helper } from '@app/common';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as cartCreator from '@app/redux/actions/cartAction';
import * as locationCreator from '@app/components/Location/action';
import styles from './style';
import BuyBox from '../../components/ProductBox/BuyBox';

const Box = (props) => {
    const { bHXProduct } = props;
    const dispatch = useDispatch();
    const actionCart = bindActionCreators(cartCreator, dispatch);
    const cart = useSelector((state) => state.cartReducer.CartSimple);
    const actionLocation = bindActionCreators(locationCreator, dispatch);
    const [guildId, setGuildId] = useState('');
    const alertAPI = (messages) => {
        Alert.alert('', messages);
    };

    const [numberItems, setNumberItems] = useState(1);
    const [buyButtonVisible, setBuyButtonVisible] = useState(false);

    const handleInputNumber = (productID, expStoreId = 0, quantity = 1) => {
        if (helper.isEmptyOrNull(quantity)) {
            return;
        }
        quantity = +quantity;
        console.log(`Begin addToCart ${props.bhxProduct.Id}`);
        actionCart
            .cart_add_item_product(
                productID,
                quantity,
                quantity >= numberItems,
                expStoreId,
                true
            )
            .then(async (res) => {
                if (res.ResultCode > 0) {
                    alertAPI(res.Message);
                    // add sp tới max tồn
                    const maxQuantity =
                        res.Value.stock > 0 ? res.Value.stock : 50;
                    actionCart
                        .cart_add_item_product(
                            productID,
                            maxQuantity,
                            quantity >= numberItems,
                            expStoreId,
                            true
                        )
                        .then(async (res2) => {
                            if (res2.ResultCode > 0) {
                                alertAPI(res2.Message);
                            } else {
                                await actionCart.cart_get_simple();
                            }
                        })
                        .catch((error) => {
                            alertAPI(error);
                        });
                } else {
                    await actionCart.cart_get_simple();
                }
            })
            .catch((error) => {
                alertAPI(error);
            });
    };
    const locationInfo = useSelector((state) => state.locationReducer);
    const checkReminderLocation = () => {
        if (
            helper.isEmptyOrNull(locationInfo) ||
            helper.isEmptyOrNull(locationInfo.crrLocationRs)
        ) {
            actionLocation.showReminderLocation(true);
            return false;
        }
        return true;
    };

    const checkFillButtonBuy = () => {
        const idProduct = bHXProduct.Id;
        if (
            !helper.isEmptyOrNull(cart) &&
            !helper.isEmptyOrNull(cart.ProInCart) &&
            !helper.isEmptyOrNull(cart.ProInCart[idProduct])
        ) {
            setGuildId(cart.ProInCart[idProduct][0]);
            setNumberItems(+cart.ProInCart[idProduct][1]);
            setBuyButtonVisible(true);
        } else {
            setNumberItems(1);
            setBuyButtonVisible(false);
        }
    };
    useEffect(() => {
        checkFillButtonBuy();
    }, [cart.Total]);

    const addToCart = async (
        productID,
        expStoreId = 0,
        quantity = 1,
        increase = true
    ) => {
        const checkLocation = await checkReminderLocation();
        checkLocation &&
            actionCart
                .cart_add_item_product(
                    productID,
                    quantity,
                    increase,
                    expStoreId
                )
                .then(async (res) => {
                    if (res.ResultCode > 0) {
                        alertAPI(res.Message);
                    } else {
                        await actionCart.cart_get_simple();
                        console.log();
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

    function renderBottomBox() {
        return (
            <View>
                {buyButtonVisible ? (
                    <BuyBox
                        bhxProduct={bHXProduct}
                        isPageExpired={false}
                        selectedBuy
                        numberItems={numberItems}
                        addToCart={addToCart}
                        handleInputNumber={handleInputNumber}
                    />
                ) : (
                    <View>
                        {isSaleOnly ? (
                            <View style={[styles.boxBuy, styles.boxBuyBorder]}>
                                <Text style={styles.ExpiredText}>
                                    {' '}
                                    {Sales['6613'].ExpiredText === ''
                                        ? Sales['6613'].LabelText
                                        : Sales['6613'].ExpiredText}
                                </Text>
                            </View>
                        ) : (
                            <View
                                className="boxBuy"
                                style={[styles.boxBuy, styles.boxBuyBorder]}>
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
            <TouchableOpacity
                onPress={() => {
                    addToCart(
                        bHXProduct.Sales[bHXProduct.ExpStoreId].ProductId,
                        bHXProduct.ExpStoreId
                    );
                }}>
                <View style={styles.productNearDate}>
                    <Text>
                        {Sales &&
                            `MUA ${helper.formatMoney(Sales['6613'].Price)}`}
                    </Text>
                    <Text style={styles.ExpiredText}>
                        {' '}
                        {Sales['6613'].ExpiredText === ''
                            ? Sales['6613'].LabelText
                            : Sales['6613'].ExpiredText}
                    </Text>
                </View>
            </TouchableOpacity>
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
                    disabled={webStatusId !== 3}
                    onPress={() => {
                        if (webStatusId === 3) {
                            setNumberItems(1);
                            setBuyButtonVisible(true);
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
