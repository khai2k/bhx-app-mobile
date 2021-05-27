// import liraries
import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, Typography } from '@app/styles';

// create a component
const CartEmpty = () => {
    return (
        <View style={styles.container}>
            <View style={styles.cartemph} />
            <View style={styles.cartemp}>
                <Image
                    style={styles.cartimg}
                    source={require('../../../assets/images/bucket-vector.png')}
                />
                <Text style={styles.title}>Bạn chưa mua đơn hàng nào</Text>
                <Text style={styles.titlesub}>
                    Vẫn còn 10.000+ sản phẩm đang chờ anh
                </Text>
                <View style={styles.boxkey}>
                    <TouchableOpacity style={styles.itembox}>
                        <Text style={styles.textcolor}>Sữa</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.itembox}>
                        <Text style={styles.textcolor}>Kem đánh răng</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.itembox}>
                        <Text style={styles.textcolor}>Kem đánh răng</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.itembox}>
                        <Text style={styles.textcolor}>Kem đánh răng</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.itembox}>
                        <Text style={styles.textcolor}>Kem đánh răng</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.itembox}>
                        <Text style={styles.textcolor}>Kem đánh răng</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    boxkey: {
        alignContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        paddingHorizontal: 15
    },
    cartemp: {
        alignContent: 'center',
        alignItems: 'center'
    },
    cartemph: {
        height: '30%'
    },
    cartimg: {
        resizeMode: 'contain',
        width: '40%'
    },
    container: {
        flexDirection: 'column'
    },
    itembox: {
        borderColor: Colors.BORDER_1,
        borderRadius: 4,
        borderWidth: 1,
        marginBottom: 10,
        marginRight: 10,
        paddingHorizontal: 15,
        paddingVertical: 5
    },
    textcolor: {
        color: Colors.GREEN_KEY
    },
    title: {
        ...Typography.FONT_BOLD_14,
        marginBottom: 10
    },
    titlesub: {
        ...Typography.FONT_REGULAR_14,
        color: Colors.CART_UNIT,
        marginBottom: 10
    }
});

// make this component available to the app
export default CartEmpty;
