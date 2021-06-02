/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { View, Text, Image, Alert, TouchableOpacity } from 'react-native';

import { helper } from '@app/common';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
//  import * as cartCreator from '@app/container/cart/action';
import * as cartCreator from '@app/redux/actions/cartAction';
import * as locationCreator from '@app/components/Location/action';
import styles from './style';
import BuyBox from '../../components/ProductBox/BuyBox';

const BoxOption = (props) => {
    const { exchangeProduct } = props;
    const { Info, Unit, BaseValue, BaseUnit, ExchangeQuantity } =
        exchangeProduct;
    const { Sales, Price, Avatar, StockQuantityNew } = Info;
    const isSale = !helper.isEmptyObjectOrNull(Sales);
    const actionLocation = bindActionCreators(locationCreator, dispatch);
    const alertAPI = (messages) => {
        Alert.alert('', messages);
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
    const checkIsSaleOnly = (webStatusId, isSale) => {
        if (webStatusId === 5 && isSale === true) {
            return true;
        }
        return false;
    };
    const isSaleOnly = checkIsSaleOnly(webStatusId, isSale);

    const webStatusId = checkWebStatusId(Price, StockQuantityNew);

    const getShortName = () => {
        if (Unit !== BaseUnit) {
            return `${Unit} ${ExchangeQuantity} ${BaseUnit}`;
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
        const idProduct = exchangeProduct.Id;
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

    const locationInfo = useSelector((state) => state.locationReducer);
    const checkReminderLocation = () => {
        if (helper.IsEmptyObject(locationInfo)) {
            actionLocation.showReminderLocation(true);
            return false;
        }
        return true;
    };

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

    function renderTopBox() {
        return (
            <View style={styles.center}>
                {isSaleOnly ? (
                    <Text style={{ fontWeight: 'bold' }}>
                        {isSale &&
                            `MUA ${helper.formatMoney(Sales['6613'].Price)}`}
                    </Text>
                ) : (
                    <View
                        style={[
                            {
                                alignItems: 'center',
                                flex: 1
                            },
                            { flexDirection: 'row' }
                        ]}>
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
                    {isSale && `MUA ${helper.formatMoney(Sales['6613'].Price)}`}
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
                    <BuyBox
                        bhxProduct={exchangeProduct}
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
                    disabled={webStatusId !== 3}
                    onPress={() => {
                        if (webStatusId === 3) {
                            addToCart(Info.Id);
                        }
                    }}>
                    {renderTopBox()}
                    {renderBottomBox()}
                </TouchableOpacity>
            </View>
            {isSale && !isSaleOnly && renderSale()}
        </View>
    );
};

export default BoxOption;
