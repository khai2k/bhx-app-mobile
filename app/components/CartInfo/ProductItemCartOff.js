import React, { useState } from 'react';
import { Colors, Typography, Mixins, StyleGeneral } from '@app/styles';
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
import {
    ModalPortal,
    ModalFooter,
    ModalContent,
    ModalButton
} from 'react-native-modals';
import { bindActionCreators } from 'redux';
import * as cartCreator from '@app/redux/actions/cartAction';

const ProductItemCartOff = (props) => {
    const dispatch = useDispatch();
    const actionCart = bindActionCreators(cartCreator, dispatch);
    // eslint-disable-next-line no-unused-vars
    const [guildId, setguildId] = useState(props.productCart.GuildId);

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
        const modalPortalId = ModalPortal.show(
            <View>
                <ModalContent>
                    <Text>Bạn muốn xóa sản phẩm này?</Text>
                </ModalContent>
                <ModalFooter>
                    <ModalButton
                        textStyle={StyleGeneral.styleAlert.btnAlertClose}
                        text="Không xóa"
                        onPress={() => {
                            ModalPortal.dismiss(modalPortalId);
                        }}
                    />
                    <ModalButton
                        style={StyleGeneral.styleAlert.btnAlert}
                        textStyle={StyleGeneral.styleAlert.btnAlertText}
                        text="Đồng ý"
                        onPress={() => {
                            actionRemoveItemProduct();
                            ModalPortal.dismiss(modalPortalId);
                        }}
                    />
                </ModalFooter>
            </View>,
            {
                animationDuration: 0,
                width: 0.8,
                onHardwareBackPress: () => {
                    return true;
                }
            }
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.boximg}>
                <Image
                    style={styles.imgbind}
                    source={{
                        uri: props.productCart.Info.Image
                    }}
                />
                <TouchableOpacity
                    style={styles.closer}
                    onPress={alertDeleteItemProduct}>
                    <Icon
                        name="times"
                        size={Typography.FONT_SIZE_10}
                        color={Colors.WHITE}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.boxinfo}>
                <Text style={styles.title}>
                    {props.productCart.Info.ShortName}
                </Text>
                <Text style={styles.statusoff}>Tạm hết hàng</Text>
            </View>
            <View style={styles.boxprice} />
            <TouchableOpacity style={styles.link}>
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
        backgroundColor: Colors.BG_BUTTON_CLOSER,
        borderRadius: 15,
        left: 0,
        paddingHorizontal: 5,
        paddingVertical: 3,
        position: 'absolute',
        top: -5,
        zIndex: 5
    },
    container: {
        ...Mixins.padding(10, 0, 10, 10),
        borderColor: Colors.BORDER_GENERAL,
        borderTopWidth: 1,
        flexDirection: 'row',
        marginBottom: 5
    },
    imgbind: {
        //  elevation: Platform.OS === 'android' ? 2 : 0,
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
