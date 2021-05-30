import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { helper } from '@app/common';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
// import * as cartCreator from '@app/container/cart/action';
import * as cartCreator from '@app/redux/actions/cartAction';
import * as locationCreator from '@app/components/Location/action';

import FastImage from 'react-native-fast-image';
import styles from './style';
import BuyBox from './BuyBox';

const ComboProductBox = (props) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const actionCart = bindActionCreators(cartCreator, dispatch);
    const actionLocation = bindActionCreators(locationCreator, dispatch);

    const [numberItems, setNumberItems] = useState(1);
    const [buyButtonVisible, setBuyButtonVisible] = useState(false);

    const cart = useSelector((state) => state.cartReducer.CartSimple);
    const [guildId, setGuildId] = useState('');

    const checkFillButtonBuy = () => {
        const idProduct = props.bhxProduct.Id;
        if (
            !helper.isEmptyOrNull(cart) &&
            !helper.isEmptyOrNull(cart.ProInCart) &&
            !helper.isEmptyOrNull(cart.ProInCart[idProduct])
        ) {
            console.log(`Change button ${props.bhxProduct.Id}`);
            setGuildId(cart.ProInCart[idProduct][0]);
            setNumberItems(+cart.ProInCart[idProduct][1]);
            setBuyButtonVisible(true);
        } else {
            console.log(`Reset button ${props.bhxProduct.Id}`);
            setNumberItems(1);
            setBuyButtonVisible(false);
        }
    };
    useEffect(() => {
        // console.log(`Fill button ${props.bhxProduct.Id}`);
        checkFillButtonBuy();
    }, [cart.Total]);

    // check đã chọn location chưa
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

    const addToCart = async (
        productID,
        expStoreId = 0,
        quantity = 1,
        increase = true
    ) => {
        console.log(`Begin addToCart ${props.bhxProduct.Id}`);
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
                        console.log(`End addToCart ${props.bhxProduct.Id}`);

                        await actionCart.cart_get_simple();
                        console.log(
                            `End update addToCart cartSimple ${props.bhxProduct.Id}`
                        );
                    }
                })
                .catch((error) => {
                    alertAPI(error);
                });
    };
    const alertAPI = (messages) => {
        Alert.alert('', messages);
    };

    const imageModal =
        props.bhxProduct != null &&
        props.bhxProduct.FeatureImageModel != null &&
        props.bhxProduct.FeatureImageModel !== undefined
            ? props.bhxProduct.FeatureImageModel
            : null;
    if (props.bhxProduct != null && imageModal != null) {
        return (
            <View
                className="product"
                style={
                    buyButtonVisible ? styles.productSelected : styles.product
                }>
                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate('ProductDetail', {
                            productId: props.bhxProduct.Id
                        })
                    }
                    style={styles.productImg}>
                    <View className="boxImg" style={styles.boxImg}>
                        <View className="imgContent" style={styles.imgContent}>
                            <FastImage
                                style={styles.comboTheme}
                                source={{
                                    uri: imageModal.ThemeMobile
                                }}
                            />
                            <View style={styles.wrapImageProductCombo}>
                                <FastImage
                                    style={styles.imageProductCombo}
                                    source={{
                                        uri: imageModal.ImageMobile
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        if (
                            props.bhxProduct.Price > 0 &&
                            props.bhxProduct.StockQuantityNew >= 1
                        ) {
                            addToCart(props.bhxProduct.Id);
                        }
                    }}
                    style={
                        buyButtonVisible
                            ? styles.unvisibleProductBuy
                            : styles.visibleProductBuy
                    }>
                    <View className="productInfo" style={styles.productInfo}>
                        <Text style={styles.productName}>
                            {props.bhxProduct.ShortName}
                        </Text>
                    </View>
                    <View className="boxBuy" style={styles.boxBuy}>
                        <BuyBox
                            bhxProduct={props.bhxProduct}
                            isPageExpired={false}
                            selectedBuy={false}
                            numberItems={numberItems}
                            addToCart={addToCart}
                            handleInputNumber={handleInputNumber}
                        />
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
                    <View className="productInfo" style={styles.productInfo}>
                        <Text style={styles.productNameSelected}>
                            {props.bhxProduct.ShortName}
                        </Text>
                        <Text className="price" style={styles.priceSelected}>
                            {helper.formatMoney(props.bhxProduct.Price)}
                        </Text>
                    </View>
                    <View className="boxBuy" style={styles.boxBuy}>
                        <BuyBox
                            bhxProduct={props.bhxProduct}
                            isPageExpired={false}
                            selectedBuy
                            numberItems={numberItems}
                            addToCart={addToCart}
                            handleInputNumber={handleInputNumber}
                        />
                    </View>
                </View>
            </View>
        );
    }
    return null;
};
export default React.memo(ComboProductBox);
