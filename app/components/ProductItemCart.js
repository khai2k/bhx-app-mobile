import React, { Component } from 'react';
import { Colors, Typography } from '@app/styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
    Text,
    Image,
    View,
    TouchableOpacity,
    TextInput,
    StyleSheet
} from 'react-native';

class ProductItemCart extends Component {
    render() {
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
                            uri: this.props.productCart.Info.Image
                        }}
                    />
                </View>
                <View style={styles.boxinfo}>
                    <Text style={styles.title}>
                        {this.props.productCart.Info.Name}
                    </Text>
                    <Text style={styles.unit}>
                        {this.props.productCart.Price}/
                        {this.props.productCart.Unit}
                    </Text>
                    <Text style={styles.statusoff}>Tạm hết hàng</Text>
                </View>
                <View style={styles.boxprice}>
                    <Text style={styles.price}>
                        {this.props.productCart.Total}
                    </Text>
                    <View style={styles.quantity}>
                        <TouchableOpacity>
                            <Icon
                                style={styles.plus}
                                name="minus"
                                size={Typography.FONT_SIZE_14}
                            />
                        </TouchableOpacity>
                        <TextInput
                            style={styles.input}
                            keyboardType="numeric"
                        />
                        <TouchableOpacity>
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
    }
}

const styles = StyleSheet.create({
    boximg: {
        flex: 1.3
    },
    closer: {
        borderRadius: 15,
        backgroundColor: '#8f9bb3',
        position: 'absolute',
        top: 5,
        left: 5,
        zIndex: 5,
        elevation: (Platform.OS === 'android') ? 5 : 0,
        paddingHorizontal: 5,
        paddingVertical: 3
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
    container: {
        borderBottomWidth: 1,
        borderColor: Colors.BORDER_GENERAL,
        flexDirection: 'row',
        marginBottom: 5,
        padding: 5
    },
    imgbind: {
        elevation: (Platform.OS === 'android') ? 2 : 0,
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
    unit: {
        ...Typography.FONT_REGULAR_12,
        color: Colors.CART_UNIT
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

export default ProductItemCart;
