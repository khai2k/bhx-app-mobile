import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { helper } from '@app/common';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
//  import * as cartCreator from '@app/container/cart/action';
import * as cartCreator from '@app/redux/actions/cartAction';
import * as locationCreator from '@app/redux/actions/generalAction';
import FastImage from 'react-native-fast-image';
import BuyBox from './BuyBox';
import styles from './style';

const ProductBox = (props) => {
    // console.log(`Init ProductBox ${props.bhxProduct.Id}`);
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
            setNumberItems(1);
            setBuyButtonVisible(false);
        }
    };
    useEffect(() => {
        // console.log(`Fill button ${props.bhxProduct.Id}`);
        checkFillButtonBuy();
    }, [cart.Total]);

    // check đã chọn location chưa
    const locationInfo = useSelector(
        (state) => state.generalReducer.Location.LocationInfo
    );
    const checkReminderLocation = () => {
        if (helper.IsEmptyObject(locationInfo)) {
            actionLocation.showReminderLocation(true);
            return false;
        }
        return true;
    };

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
                        <FastImage
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
                    console.log('cart_add_item_product');
                    console.log(res);
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
                        !helper.isEmptyOrNull(props.bhxProduct.Sales) &&
                        !helper.isEmptyOrNull(
                            props.bhxProduct.Sales[props.bhxProduct.ExpStoreId]
                        )
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
                        addToCart={addToCart}
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
                                ].ProductId,
                                props.bhxProduct.ExpStoreId
                            );
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
                        !helper.isEmptyOrNull(props.bhxProduct.Sales) &&
                        !helper.isEmptyOrNull(
                            props.bhxProduct.Sales[props.bhxProduct.ExpStoreId]
                        )
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
                        addToCart={addToCart}
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
                                ].ProductId,
                                props.bhxProduct.ExpStoreId
                            );
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
