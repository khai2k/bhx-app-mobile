import React, { useState, useEffect } from 'react';
import { Colors, Typography } from '@app/styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useSelector, useDispatch } from 'react-redux';
import { helper } from '@app/common';
import HTML from 'react-native-render-html';
import { useNavigation } from '@react-navigation/native';
import {
    Text,
    Image,
    View,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    Alert
} from 'react-native';
import { bindActionCreators } from 'redux';
import * as cartCreator from '@app/container/cart/action';

const ProductItemCart = (props) => {
    const listCartItem = useSelector((state) =>
        state.cartReducer.Cart.ListCartItemBuy.filter(
            (item) => item.TypeProduct === 2
        )
    );
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const actionCart = bindActionCreators(cartCreator, dispatch);
    const [quantity, setQuantity] = useState(props.productCart.Quantity);
    // eslint-disable-next-line no-unused-vars
    const [guildId, setguildId] = useState(props.productCart.GuildId);
    const [isHideCombo, setisHideCombo] = useState(
        props.productCart.TypeProduct === 1
    );
    useEffect(() => {
        setQuantity(props.productCart.Quantity);
    }, []);
    const offItemProduct =
        props.productCart.IsAllowQuantityChange === false ||
        props.productCart.NoChangeQuantity === true;

    const handleInputQuantity = (number) => {
        setQuantity(number);
    };

    const handleSetIsHideCombo = () => {
        setisHideCombo(!isHideCombo);
    };

    const submitQuantity = () => {
        if (helper.isEmptyOrNull(quantity)) {
            return false;
        }
        if (quantity > 50) {
            alertMaxQuantityItemProduct();
        } else {
            actionCart
                .cart_update_item_product(guildId, quantity)
                .then((res) => {
                    if (res.ResultCode > 0) {
                        alertAPI(res.Message);
                    } else {
                        const itemcart = res.Value.Cart.ListCartItem.find(
                            (item) => item.GuildId === guildId
                        );
                        if (itemcart != null) {
                            setQuantity(itemcart.Quantity);
                        }
                    }
                })
                .catch((error) => {
                    alertAPI(error);
                });
        }
    };

    const setQuantityMinus = () => {
        if (quantity <= 1) {
            alertDeleteItemProduct();
        } else {
            setQuantity(quantity - 1);
            actionCart
                .cart_update_item_product(guildId, quantity - 1)
                .then((res) => {
                    if (res.ResultCode > 0) {
                        alertAPI(res.Message);
                        setQuantity(quantity + 1);
                    } else {
                        const itemcart = res.Value.Cart.ListCartItem.find(
                            (item) => item.GuildId === guildId
                        );
                        if (itemcart != null) {
                            setQuantity(itemcart.Quantity);
                        }
                    }
                })
                .catch((error) => {
                    alertAPI(error);
                    setQuantity(quantity + 1);
                });
        }
    };

    const setQuantityPlus = () => {
        if (quantity > 50) {
            alertMaxQuantityItemProduct();
        } else {
            setQuantity(quantity + 1);
            actionCart
                .cart_update_item_product(guildId, quantity + 1)
                .then((res) => {
                    if (res.ResultCode > 0) {
                        alertAPI(res.Message);
                        setQuantity(quantity - 1);
                    } else {
                        const itemcart = res.Value.Cart.ListCartItem.find(
                            (item) => item.GuildId === guildId
                        );
                        if (itemcart != null) {
                            setQuantity(itemcart.Quantity);
                        }
                    }
                })
                .catch((error) => {
                    alertAPI(error);
                    setQuantity(quantity - 1);
                });
        }
    };

    const actionRemoveItemProduct = () => {
        actionCart
            .cart_remove_item_product(guildId)
            .then((res) => {
                if (res.ResultCode < 0) {
                    alertAPI(res.Message);
                }
            })
            .catch((error) => {
                alertAPI(error);
            });
    };

    const alertAPI = (mesages) => {
        Alert.alert('', mesages);
    };

    const alertDeleteItemProduct = () => {
        Alert.alert('', 'Bạn muốn xóa sản phẩm này?', [
            {
                text: 'Không xóa',
                style: 'cancel'
            },
            {
                text: 'Đồng ý',
                onPress: actionRemoveItemProduct
            }
        ]);
    };

    const alertMaxQuantityItemProduct = () => {
        Alert.alert('', 'Chưa có thông tin?', [
            {
                text: 'Không xóa',
                style: 'cancel'
            },
            {
                text: 'Đồng ý',
                onPress: actionRemoveItemProduct
            }
        ]);
    };

    const showHideUnit = () => {
        if (
            quantity >= 2 &&
            props.productCart.TypeProduct !== 5 &&
            props.productCart.TypeProduct !== 1
        ) {
            return (
                <Text style={styles.unit}>
                    {helper.formatMoney(props.productCart.Price)}/
                    {props.productCart.Unit}
                </Text>
            );
        }
    };

    const showCombo = () => {
        if (
            listCartItem !== null &&
            props.productCart.TypeProduct === 1 &&
            !helper.IsEmptyArray(listCartItem)
        ) {
            const list = listCartItem.filter(
                (item) => item.GuildIdRef === props.productCart.GuildId
            );
            if (!helper.IsEmptyArray(list)) {
                return (
                    <View>
                        <TouchableOpacity
                            style={styles.texttoggle}
                            onPress={handleSetIsHideCombo}>
                            <Text style={styles.stextCombo}>
                                Xem chi tiết combo
                            </Text>
                            <Icon
                                style={styles.icontoggle}
                                name={
                                    isHideCombo === false
                                        ? 'angle-up'
                                        : 'angle-down'
                                }
                                size={Typography.FONT_SIZE_14}
                                color={Colors.GREEN_KEY}
                            />
                        </TouchableOpacity>
                        {itemCombo(list)}
                    </View>
                );
            }
        }
    };

    const itemCombo = (list) => {
        if (isHideCombo === false) {
            return (
                <View style={styles.sboxcombo}>
                    {list.map((itemCb) => {
                        return (
                            <View style={styles.scombo}>
                                <TouchableOpacity
                                    style={styles.sitemcombotitle}
                                    onPress={() =>
                                        navigation.push('ProductDetail', {
                                            productId: itemCb.Info.Id
                                        })
                                    }>
                                    <Text
                                        style={styles.sitemcombo}
                                        numberOfLines={1}>
                                        {itemCb.Quantity} {itemCb.Info.Name}
                                    </Text>
                                </TouchableOpacity>
                                <Text style={styles.sitemcomboprice}>
                                    {helper.formatMoney(itemCb.Price)}
                                </Text>
                            </View>
                        );
                    })}
                </View>
            );
        }
    };

    const showMessageQuantity = () => {
        if (!helper.isEmptyOrNull(props.productCart.ErrorMessage)) {
            return (
                <View style={styles.boxerror}>
                    <HTML
                        classesStyles={styles.error}
                        source={{ html: props.productCart.ErrorMessage }}
                        contentWidth={200}
                    />
                    {/* <Text style={styles.error}>Chỉ còn</Text> */}
                    {/* <Text style={styles.errorbold}>
                        {props.productCart.ErrorMessage}
                    </Text> */}
                </View>
            );
        }
    };

    const showHideExpire = () => {
        if (!helper.isEmptyOrNull(props.productCart.InvoiceNote)) {
            return (
                <Text style={styles.unit}>{props.productCart.InvoiceNote}</Text>
            );
        }
    };

    const showExpireNow = () => {
        if (
            props.productCart.Info.IsFresh &&
            !props.productCart.Info.IsFreshExpired
        ) {
            return (
                <Text style={styles.unit} numberOfLines={1}>
                    Chỉ giao trong hôm nay hoặc mai để đảm bảo chất lượng
                </Text>
            );
        } else if (props.productCart.Info.IsFreshExpired) {
            return (
                <Text style={styles.unit} numberOfLines={1}>
                    Chỉ giao trong hôm nay để đảm bảo chất lượng
                </Text>
            );
        }
    };

    const showHideMessage = () => {
        if (
            props.productCart.Message != null &&
            !helper.isEmptyOrNull(props.productCart.Message)
        ) {
            return (
                <Text style={styles.unit} numberOfLines={1}>
                    {props.productCart.Message}
                </Text>
            );
        }
    };

    const showTitleItemProduct = () => {
        let textSub = '';
        if (
            props.productCart.TypeProduct === 6 &&
            props.productCart.Info.IsFreshExpired
        ) {
            textSub = '(Hàng qua ngày)';
        } else if (
            props.productCart.TypeProduct === 6 &&
            !props.productCart.Info.IsFreshExpired
        ) {
            textSub = '(Hàng xả kho)';
        }
        if (props.TypeProduct === 3 || props.TypeProduct === 4) {
            return (
                <Text style={styles.title}>
                    {props.productCart.Info.ShortName} {textSub}
                </Text>
            );
        } else {
            return (
                <TouchableOpacity
                    onPress={() =>
                        navigation.push('ProductDetail', {
                            productId: props.productCart.Info.Id
                        })
                    }>
                    <Text style={styles.title}>
                        {props.productCart.Info.ShortName} {textSub}
                    </Text>
                </TouchableOpacity>
            );
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.boximg}>
                <TouchableOpacity onPress={alertDeleteItemProduct}>
                    <Icon
                        style={styles.closer}
                        name="times"
                        size={Typography.FONT_SIZE_10}
                        color={Colors.WHITE}
                    />
                </TouchableOpacity>
                <Image
                    style={styles.imgbind}
                    source={{
                        uri: props.productCart.Info.Image
                    }}
                />
            </View>
            <View style={styles.boxinfo}>
                {showTitleItemProduct()}
                {showHideExpire()}
                {showHideUnit()}
                {showHideMessage()}
                {showMessageQuantity()}
                {showExpireNow()}
                {showCombo()}
            </View>
            <View style={styles.boxprice}>
                <Text style={styles.price}>
                    {helper.formatMoney(props.productCart.Total)}
                </Text>
                <View style={styles.quantity}>
                    <TouchableOpacity
                        onPress={setQuantityMinus}
                        disabled={offItemProduct}>
                        <Icon
                            style={styles.plus}
                            name="minus"
                            size={Typography.FONT_SIZE_14}
                        />
                    </TouchableOpacity>
                    <TextInput
                        editable={!offItemProduct}
                        selectTextOnFocus
                        onChangeText={handleInputQuantity}
                        onBlur={submitQuantity}
                        onSubmitEditing={submitQuantity}
                        style={styles.input}
                        value={quantity.toString()}
                        keyboardType="numeric"
                    />
                    <TouchableOpacity
                        onPress={setQuantityPlus}
                        disabled={offItemProduct}>
                        <Icon
                            style={styles.plus}
                            name="plus"
                            size={Typography.FONT_SIZE_14}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    boxerror: {
        flexDirection: 'row'
    },
    boximg: {
        flex: 1.3
    },
    boxinfo: {
        flex: 4,
        marginLeft: 5,
        width: 30
    },
    boxprice: {
        flexDirection: 'column',
        marginRight: 8,
        width: 100
    },
    closer: {
        backgroundColor: Colors.BG_BUTTON_CLOSER,
        borderRadius: 15,
        //  elevation: Platform.OS === 'android' ? 5 : 0,
        left: 5,
        paddingHorizontal: 5,
        paddingVertical: 3,
        position: 'absolute',
        top: 5,
        zIndex: 5
    },
    container: {
        borderColor: Colors.BORDER_GENERAL,
        borderTopWidth: 1,
        flexDirection: 'row',
        marginBottom: 5,
        padding: 5
    },
    error: {
        ...Typography.FONT_REGULAR_12,
        color: Colors.MESSAGE_ERROR
    },
    errorbold: {
        ...Typography.FONT_BOLD_12,
        color: Colors.MESSAGE_ERROR,
        marginLeft: 2
    },
    icontoggle: {
        marginLeft: 5
    },
    imgbind: {
        //  elevation: Platform.OS === 'android' ? 2 : 0,
        height: 60,
        resizeMode: 'contain',
        zIndex: 1
    },
    input: {
        borderColor: Colors.BORDER_GENERAL,
        borderRadius: 5,
        borderWidth: 1,
        height: 35,
        paddingVertical: 10,
        textAlign: 'center',
        width: 33
    },
    plus: {
        borderColor: Colors.BORDER_GENERAL,
        borderRadius: 5,
        borderWidth: 1,
        height: 35,
        marginLeft: 2,
        marginRight: 2,
        paddingVertical: 10,
        textAlign: 'center',
        width: 31
    },
    price: {
        fontWeight: '700',
        textAlign: 'right',
        width: '100%'
    },
    quantity: {
        flex: 3,
        flexDirection: 'row',
        textAlign: 'center',
        marginTop: 5
    },
    sboxcombo: {
        backgroundColor: Colors.BG_COMBO,
        borderRadius: 5,
        padding: 5
    },
    scombo: {
        flexDirection: 'row'
    },
    sitemcombo: {
        fontSize: Typography.FONT_SIZE_12
    },
    sitemcomboprice: {
        ...Typography.FONT_BOLD_12,
        flex: 1,
        textAlign: 'right'
    },
    sitemcombotitle: {
        flex: 2
    },
    stextCombo: {
        fontSize: Typography.FONT_SIZE_12
    },
    texttoggle: {
        alignContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    title: {
        color: Colors.BLACK,
        fontSize: Typography.FONT_SIZE_14
    },
    unit: {
        ...Typography.FONT_REGULAR_12,
        color: Colors.CART_UNIT
    }
});

export default ProductItemCart;
