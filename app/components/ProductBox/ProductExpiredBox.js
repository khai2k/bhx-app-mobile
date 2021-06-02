import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { helper } from '@app/common';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as cartCreator from '@app/redux/actions/cartAction';
import * as locationCreator from '@app/redux/actions/locationAction';
import FastImage from 'react-native-fast-image';
import { ModalPortal, ModalContent } from 'react-native-modals';
import HTML from 'react-native-render-html';
import styles from './style';
import BuyBox from './BuyBox';

const ProductExpiredBox = (props) => {
    const dispatch = useDispatch();
    const actionCart = bindActionCreators(cartCreator, dispatch);
    const actionLocation = bindActionCreators(locationCreator, dispatch);

    const [numberItems, setNumberItems] = useState(1);
    const [buyButtonVisible, setBuyButtonVisible] = useState(false);
    const navigation = useNavigation();

    const cart = useSelector((state) => state.cartReducer.CartSimple);
    const [guildId, setGuildId] = useState('');

    const checkFillButtonBuy = () => {
        const idProduct = props.bhxProduct.Id;
        if (
            !helper.isEmptyOrNull(cart) &&
            !helper.isEmptyOrNull(cart.ProInCart_Exp) &&
            !helper.isEmptyOrNull(cart.ProInCart_Exp[idProduct])
        ) {
            console.log(`Change button ${props.bhxProduct.Id}`);
            setGuildId(cart.ProInCart_Exp[idProduct][0]);
            setNumberItems(+cart.ProInCart_Exp[idProduct][1]);
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
    const locationInfo = useSelector(
        (state) => state.locationReducer.Location.LocationInfo
    );
    const checkReminderLocation = () => {
        if (helper.IsEmptyObject(locationInfo)) {
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
        const alertModal = ModalPortal.show(
            <ModalContent>
                <HTML source={{ html: messages }} />
            </ModalContent>,
            {
                animationDuration: 0,
                width: 0.8,
                onTouchOutside: () => {
                    ModalPortal.dismiss(alertModal);
                },
                onHardwareBackPress: () => {
                    return true;
                }
            }
        );
    };

    const boxLabel = () => {
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
    // SP có thể bán được
    const canBuyProduct = (bhxProduct) => {
        if (bhxProduct.Price > 0) {
            return bhxProduct.IsBaseUnit
                ? bhxProduct.StockQuantityNew > 0
                : bhxProduct.StockQuantityNew >= 1;
        }
        return false;
    };

    const { bhxProduct } = props;
    const isNearlyExpiredProduct =
        !helper.isEmptyOrNull(bhxProduct.Sales) &&
        !helper.isEmptyOrNull(bhxProduct.Sales[bhxProduct.ExpStoreId]);
    if (isNearlyExpiredProduct && bhxProduct.ExpStoreId > 0) {
        const expiredProduct = bhxProduct.Sales[bhxProduct.ExpStoreId];
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
                        {!helper.isEmptyOrNull(props.bhxProduct.ExpiredText) ? (
                            <Text
                                className="boxExpired"
                                style={styles.boxExpired}>
                                {expiredProduct.ExpiredText}
                            </Text>
                        ) : null}
                        <View className="imgContent" style={styles.imgContent}>
                            <FastImage
                                style={styles.imageProduct}
                                source={{
                                    uri: bhxProduct.Avatar
                                }}
                            />
                        </View>
                    </View>
                    {boxLabel()}
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        if (
                            expiredProduct.Price > 0 &&
                            expiredProduct.StockQuantityNew >= 1
                        ) {
                            addToCart(
                                expiredProduct.ProductId,
                                bhxProduct.ExpStoreId
                            );
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
                            isNearlyExpiredProduct
                                ? styles.productInfoExpired
                                : styles.productInfo
                        }>
                        <Text style={styles.productName}>
                            {bhxProduct.ShortName}
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
                    {canBuyProduct(bhxProduct) ? (
                        <TouchableOpacity
                            onPress={() => {
                                addToCart(bhxProduct.Id);
                            }}
                            className="nearlyExpired"
                            style={styles.nearlyExpired}>
                            <View style={styles.expiredLine}>
                                <Text style={styles.expiredText}>Hoặc </Text>
                                <Text style={styles.expiredPrice}>
                                    MUA {helper.formatMoney(bhxProduct.Price)}
                                    {'\n'}
                                </Text>
                            </View>
                            <Text style={styles.expiredText}>
                                {bhxProduct.ExpiredText}
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
                            isNearlyExpiredProduct
                                ? styles.productInfoExpired
                                : styles.productInfo
                        }>
                        <Text style={styles.productNameSelected}>
                            {bhxProduct.ShortName}
                        </Text>
                        <Text className="price" style={styles.priceSelected}>
                            {helper.formatMoney(bhxProduct.Price)}
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
                    {canBuyProduct(bhxProduct) ? (
                        <TouchableOpacity
                            onPress={() => {
                                addToCart(bhxProduct.Id);
                            }}
                            className="nearlyExpired"
                            style={styles.nearlyExpired}>
                            <View style={styles.expiredLine}>
                                <Text style={styles.expiredText}>Hoặc </Text>
                                <Text style={styles.expiredPrice}>
                                    MUA {helper.formatMoney(bhxProduct.Price)}
                                    {'\n'}
                                </Text>
                            </View>
                            <Text style={styles.expiredText}>
                                {bhxProduct.ExpiredText}
                            </Text>
                        </TouchableOpacity>
                    ) : null}
                </View>
            </View>
        );
    }
    return null;
};

export default React.memo(ProductExpiredBox);
