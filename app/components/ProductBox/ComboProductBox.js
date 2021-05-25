import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { helper } from '@app/common';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as cartCreator from '@app/container/cart/action';
import FastImage from 'react-native-fast-image';
import styles from './style';
import BuyBox from './BuyBox';

const ComboProductBox = (props) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const actionCart = bindActionCreators(cartCreator, dispatch);

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
        console.log(`Fill button ${props.bhxProduct.Id}`);
        checkFillButtonBuy();
    }, [cart.Total]);

    const handleInputNumber = (number) => {
        if (helper.isEmptyOrNull(number)) {
            return;
        }
        number = +number;
        if (number <= 0) {
            actionCart
                .cart_remove_item_product(guildId)
                .then((res) => {
                    console.log('cart_remove_item_product');
                    console.log(res);
                    if (res.ResultCode > 0) {
                        alertAPI(res.Message);
                    } else {
                        // setBuyButtonVisible(false);
                        actionCart.cart_get_simple();
                    }
                })
                .catch((error) => {
                    alertAPI(error);
                });
        } else {
            actionCart
                .cart_update_item_product(guildId, number)
                .then((res) => {
                    console.log('cart_update_item_product');
                    console.log(res);
                    if (res.ResultCode > 0) {
                        alertAPI(res.Message);
                    } else {
                        // setNumberItems(numberItems - 1);
                        actionCart.cart_get_simple();
                    }
                })
                .catch((error) => {
                    alertAPI(error);
                });
        }
    };

    const addToCart = () => {
        actionCart
            .cart_add_item_product(props.bhxProduct.Id, 1)
            .then(async (res) => {
                console.log('cart_add_item_product');
                console.log(res);
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
    const setQuantityMinus = () => {
        if (numberItems <= 1) {
            actionCart
                .cart_remove_item_product(guildId)
                .then(async (res) => {
                    console.log('cart_remove_item_product');
                    console.log(res);
                    if (res.ResultCode > 0) {
                        alertAPI(res.Message);
                    } else {
                        // setBuyButtonVisible(false);
                        await actionCart.cart_get_simple();
                    }
                })
                .catch((error) => {
                    alertAPI(error);
                });
        } else {
            actionCart
                .cart_update_item_product(guildId, numberItems - 1)
                .then(async (res) => {
                    console.log('cart_update_item_product');
                    console.log(res);
                    if (res.ResultCode > 0) {
                        alertAPI(res.Message);
                    } else {
                        // setNumberItems(numberItems - 1);
                        await actionCart.cart_get_simple();
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
            console.log('setQuantityPlus');
            console.log(guildId);
            console.log(numberItems);
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
                            addToCart();
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
                            setQuantityMinus={setQuantityMinus}
                            setQuantityPlus={setQuantityPlus}
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
                            setQuantityMinus={setQuantityMinus}
                            setQuantityPlus={setQuantityPlus}
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
