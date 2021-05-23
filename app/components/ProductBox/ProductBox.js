import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { helper } from '@app/common';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as cartCreator from '@app/container/cart/action';
import BuyBox from './BuyBox';
import styles from './style';

const ProductBox = (props) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const actionCart = bindActionCreators(cartCreator, dispatch);

    const [numberItems, setNumberItems] = useState(1);
    const [buyButtonVisible, setBuyButtonVisible] = useState(false);

    const cart = useSelector((state) => state.cartReducer.CartSimple);
    const [guildId, setGuildId] = useState('');

    const checkFillButtonBuy = () => {
        const idProduct = props.bhxProduct.Id;
        if (cart && cart.ProInCart) {
            if (cart.ProInCart[idProduct]) {
                setGuildId(cart.ProInCart[idProduct][0]);
                setNumberItems(+cart.ProInCart[idProduct][1]);
                setBuyButtonVisible(true);
            } else {
                setNumberItems(1);
                setBuyButtonVisible(false);
            }
        }
    };
    useEffect(() => {
        checkFillButtonBuy();
    });

    const boxLabel = () => {
        if (props.bhxProduct.MaxQuantityOnBill > 0) {
            return (
                <View className="boxLabel" style={styles.boxLabel}>
                    <Text style={styles.boxLabelText}>
                        Tối đa {props.bhxProduct.MaxQuantityOnBill}
                        SP/đơn
                    </Text>
                </View>
            );
        } else if (props.bhxProduct.PromotionText) {
            return (
                <View className="boxLabel" style={styles.boxLabel}>
                    <Text style={styles.boxLabelText}>
                        {props.bhxProduct.PromotionText}
                    </Text>
                    {props.bhxProduct.PromotionGiftImgs !== null &&
                    props.bhxProduct.PromotionGiftImgs.trim().length > 0 ? (
                        <Image
                            style={styles.imagePromotion}
                            source={{
                                uri: props.bhxProduct.PromotionGiftImgs
                            }}
                        />
                    ) : null}
                </View>
            );
        }
        if (props.bhxProduct.IsPreOrder && props.bhxProduct.PreAmount > 0) {
            return (
                <View className="boxLabel" style={styles.boxLabel}>
                    <Text style={styles.boxLabelText}>
                        Còn {props.bhxProduct.PreAmount} túi
                    </Text>
                </View>
            );
        }
    };
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

    const addToCart = (productID) => {
        setNumberItems(1);
        setBuyButtonVisible(true);
        actionCart
            .cart_add_item_product(productID, 1)
            .then((res) => {
                console.log('cart_add_item_product');
                console.log(res);
                if (res.ResultCode > 0) {
                    alertAPI(res.Message);
                } else {
                    // setNumberItems(1);
                    // setBuyButtonVisible(true);
                    // const infoCartProduct =
                    //     res.Value?.cart.Cart.ListCartItem.find(
                    //         (item) => item.Info.Id === props.bhxProduct.Id
                    //     );
                    // setGuildId(infoCartProduct.GuildId);
                    actionCart.cart_get_simple();
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
                .cart_update_item_product(guildId, numberItems - 1)
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

    const setQuantityPlus = () => {
        if (numberItems > 50) {
            alertMaxQuantityItemProduct();
        } else {
            console.log('setQuantityPlus');
            console.log(guildId);
            console.log(numberItems);
            actionCart
                .cart_update_item_product(guildId, numberItems + 1)
                .then((res) => {
                    console.log('cart_update_item_product');
                    console.log(res);
                    if (res.ResultCode > 0) {
                        alertAPI(res.Message);
                    } else {
                        // setNumberItems(numberItems + 1);
                        actionCart.cart_get_simple();
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

    return (
        <View
            className="product"
            style={buyButtonVisible ? styles.productSelected : styles.product}>
            <TouchableOpacity
                onPress={() =>
                    navigation.push('ProductDetail', {
                        productId: props.bhxProduct.Id
                    })
                }
                style={styles.productImg}>
                <View className="boxImg" style={styles.boxImg}>
                    {!helper.isEmptyOrNull(props.bhxProduct.ExpiredText) ? (
                        <Text className="boxExpired" style={styles.boxExpired}>
                            {props.bhxProduct.ExpiredText}
                        </Text>
                    ) : null}

                    <View className="imgContent" style={styles.imgContent}>
                        <Image
                            style={styles.imageProduct}
                            source={{ uri: props.bhxProduct.Avatar }}
                        />
                    </View>
                </View>
                {boxLabel()}
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
                <View
                    className="productInfo"
                    style={
                        props.bhxProduct.Sales !== null &&
                        props.bhxProduct.Sales !== undefined
                            ? styles.productInfoExpired
                            : styles.productInfo
                    }>
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
                {!helper.isEmptyOrNull(props.bhxProduct.Sales) &&
                !helper.isEmptyOrNull(
                    props.bhxProduct.Sales[props.bhxProduct.ExpStoreId]
                ) ? (
                    <TouchableOpacity
                        onPress={() => {
                            addToCart(
                                props.bhxProduct.Sales[
                                    props.bhxProduct.ExpStoreId
                                ]
                            ).ProductId;
                        }}
                        className="nearlyExpired"
                        style={styles.nearlyExpired}>
                        <View style={styles.expiredLine}>
                            <Text style={styles.expiredText}>Hoặc </Text>
                            <Text style={styles.expiredPrice}>
                                MUA{' '}
                                {helper.formatMoney(
                                    props.bhxProduct.Sales[
                                        props.bhxProduct.ExpStoreId
                                    ].Price
                                )}
                                {'\n'}
                            </Text>
                        </View>
                        <Text style={styles.expiredText}>
                            {!helper.isEmptyOrNull(
                                props.bhxProduct.Sales[
                                    props.bhxProduct.ExpStoreId
                                ].LabelText
                            )
                                ? props.bhxProduct.Sales[
                                      props.bhxProduct.ExpStoreId
                                  ].LabelText
                                : props.bhxProduct.Sales[
                                      props.bhxProduct.ExpStoreId
                                  ].ExpiredDate}
                        </Text>
                    </TouchableOpacity>
                ) : null}
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
                    className="productInfo"
                    style={
                        props.bhxProduct.Sales !== null &&
                        props.bhxProduct.Sales !== undefined
                            ? styles.productInfoExpired
                            : styles.productInfo
                    }>
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
                {!helper.isEmptyOrNull(props.bhxProduct.Sales) &&
                !helper.isEmptyOrNull(
                    props.bhxProduct.Sales[props.bhxProduct.ExpStoreId]
                ) ? (
                    <TouchableOpacity
                        onPress={() => {
                            addToCart(
                                props.bhxProduct.Sales[
                                    props.bhxProduct.ExpStoreId
                                ]
                            ).ProductId;
                        }}
                        className="nearlyExpired"
                        style={styles.nearlyExpired}>
                        <View style={styles.expiredLine}>
                            <Text style={styles.expiredText}>Hoặc </Text>
                            <Text style={styles.expiredPrice}>
                                MUA{' '}
                                {helper.formatMoney(
                                    props.bhxProduct.Sales[
                                        props.bhxProduct.ExpStoreId
                                    ].Price
                                )}
                                {'\n'}
                            </Text>
                        </View>
                        <Text style={styles.expiredText}>
                            {!helper.isEmptyOrNull(
                                props.bhxProduct.Sales[
                                    props.bhxProduct.ExpStoreId
                                ].LabelText
                            )
                                ? props.bhxProduct.Sales[
                                      props.bhxProduct.ExpStoreId
                                  ].LabelText
                                : props.bhxProduct.Sales[
                                      props.bhxProduct.ExpStoreId
                                  ].ExpiredDate}
                        </Text>
                    </TouchableOpacity>
                ) : null}
            </View>
        </View>
    );
};

export default React.memo(ProductBox);
