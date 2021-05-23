import React, { useState } from 'react';
import { Colors, Typography } from '@app/styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useDispatch } from 'react-redux';
import {
    Text,
    Image,
    View,
    TouchableOpacity,
    StyleSheet,
    Alert
} from 'react-native';
import { bindActionCreators } from 'redux';
import * as cartCreator from '@app/container/cart/action';

const ProductItemCartOff = (props) => {
    const dispatch = useDispatch();
    const actionCart = bindActionCreators(cartCreator, dispatch);
    const [guildId, setguildId] = useState(props.productCart.GuildId);

    const actionRemoveItemProduct = () => {
        actionCart.cart_remove_item_product(guildId);
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
                <Text style={styles.statusoff}>Tạm hết hàng</Text>
            </View>
            <View style={styles.boxprice} />
            <TouchableOpacity
                style={styles.link}
                onPress={alertDeleteItemProduct}>
                <Text>Xem sản phẩm tương tự</Text>
            </TouchableOpacity>
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
        width: 100
    },
    closer: {
        backgroundColor: '#8f9bb3',
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
        borderColor: Colors.BORDER_GENERAL,
        borderTopWidth: 1,
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
    link: {
        bottom: 5,
        position: 'absolute',
        right: 5,
        zIndex: 2
    },
    statusoff: {
        color: Colors.CART_STOPSALES,
        fontSize: Typography.FONT_SIZE_12,
        marginTop: 5
    },
    title: {
        color: Colors.BLACK,
        fontSize: Typography.FONT_SIZE_14
    }
});

export default ProductItemCartOff;
