import React, { useState, useEffect } from 'react';
import { Colors, Typography } from '@app/styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useDispatch } from 'react-redux';
import { helper } from '@app/common';
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
    //  const cart = useSelector((state) => state.cartReducer.Cart);
    const dispatch = useDispatch();
    const actionCart = bindActionCreators(cartCreator, dispatch);
    const [quantity, setQuantity] = useState(props.productCart.Quantity);
    const [guildId, setguildId] = useState(props.productCart.GuildId);
    useEffect(() => {
        console.log('useEffect');
        console.log(props.productCart.Quantity);
        setQuantity(props.productCart.Quantity);
        setguildId(props.productCart.GuildId);
    }); //  , [props.productCart.Quantity]
    const offItemProduct =
        props.productCart.IsAllowQuantityChange === false ||
        props.productCart.NoChangeQuantity === true;

    const handleInputQuantity = (number) => {
        setQuantity(+number);
    };

    const setQuantityMinus = () => {
        if (quantity <= 1) {
            alertDeleteItemProduct();
        } else {
            setQuantity(quantity - 1);
            actionCart
                .cart_update_item_product(props.ProductId, quantity)
                .then((res) => {
                    console.log('cart_update_item_product');
                    console.log(res);
                    if (res.ResultCode > 0) {
                        alertAPI(res.Message);
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
                .cart_update_item_product(props.ProductId, quantity)
                .then((res) => {
                    console.log('cart_update_item_product');
                    console.log(res);
                    if (res.ResultCode > 0) {
                        alertAPI(res.Message);
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
                console.log('actionRemoveItemProduct');
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
        if (quantity >= 2) {
            return (
                <Text style={styles.unit}>
                    {helper.formatMoney(props.productCart.Price)}/
                    {props.productCart.Unit}
                </Text>
            );
        }
    };

    const showHideExpire = () => {
        if (props.productCart.InvoiceNote !== '') {
            return (
                <Text style={styles.unit}>{props.productCart.InvoiceNote}</Text>
            );
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.boximg}>
                <TouchableOpacity>
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
                <Text style={styles.title}>
                    {props.productCart.Info.ShortName}
                </Text>
                {showHideExpire()}
                {showHideUnit()}
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
                        onChangeText={handleInputQuantity}
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
        elevation: Platform.OS === 'android' ? 5 : 0,
        left: 5,
        paddingHorizontal: 5,
        paddingVertical: 3,
        position: 'absolute',
        top: 5,
        zIndex: 5
    },
    container: {
        borderBottomWidth: 1,
        borderColor: Colors.BORDER_GENERAL,
        flexDirection: 'row',
        marginBottom: 5,
        padding: 5
    },
    imgbind: {
        elevation: Platform.OS === 'android' ? 2 : 0,
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
    statusoff: {
        color: Colors.CART_STOPSALES,
        fontSize: Typography.FONT_SIZE_12,
        marginTop: 5
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
