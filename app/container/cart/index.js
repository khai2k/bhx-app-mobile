import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { Header, ProductItemCart, ProductItemCartOff } from '@app/components';
import { connect } from 'react-redux';
import { Colors, Typography } from '@app/styles';
import { helper } from '@app/common';
import * as cartCreator from './action';

// define your styles

const styles = StyleSheet.create({
    boxbtn: {
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly'
    },
    boxleft: {
        marginLeft: 5
    },
    boxright: {
        marginRight: 5
    },
    boxrightfont: {
        ...Typography.FONT_BOLD_14,
        marginRight: 5
    },
    boxsum: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5
    },
    btn: {
        borderColor: Colors.CART_BORDER_BTN,
        borderRadius: 10,
        borderWidth: 1,
        padding: 5,
        width: '30%'
    },
    cartinfo: {
        backgroundColor: Colors.WHITE
    },
    textbtn: {
        ...Typography.FONT_BOLD_14,
        alignItems: 'center',
        textAlign: 'center'
    },
    textcart: {
        ...Typography.FONT_BOLD_14
    },
    titlecart: {
        borderBottomWidth: 1,
        borderColor: Colors.BORDER_GENERAL,
        borderTopWidth: 5,
        justifyContent: 'center',
        padding: 10
    }
});

// create a component
class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.actionCart.cart_get();
    }

    render() {
        return (
            <View style={styles.cartinfo}>
                <Header />
                <View style={styles.titlecart}>
                    <Text style={styles.textcart}>Giỏ hàng của bạn</Text>
                </View>
                {showListCartItemOff(this.props.cartInfo.Cart.ListCartItemOff)}
                {showListCartItemBuy(this.props.cartInfo.Cart.ListCartItemBuy)}
                <View style={styles.boxsum}>
                    <Text style={styles.boxleft}>Tiền hàng:</Text>
                    <Text style={styles.boxrightfont}>
                        {helper.formatMoney(
                            this.props.cartInfo.CartTotal.Total
                        )}
                    </Text>
                </View>
                {showTotalPromotion(this.props.cartInfo.CartTotal)}
                <View style={styles.boxsum}>
                    <Text style={styles.boxleft}>Phí giao dự kiến:</Text>
                    <Text style={styles.boxright}>
                        {helper.formatMoney(
                            this.props.cartInfo.CartTotal.ShipFee
                        )}
                    </Text>
                </View>
                <View style={styles.boxbtn}>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={() => this.props.navigation.navigate('Cart')}>
                        <Text style={styles.textbtn}>Xóa hết giỏ hàng</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={() => this.props.navigation.navigate('Cart')}>
                        <Text style={styles.textbtn}>Dùng phiếu mua hàng</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={() => this.props.navigation.navigate('Cart')}>
                        <Text style={styles.textbtn}>ĐẶT HÀNG</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const showListCartItemOff = (listCartItemOff) => {
    if (listCartItemOff != null && !helper.IsEmptyArray(listCartItemOff)) {
        return (
            <View>
                {listCartItemOff.map((itemCart) => {
                    return <ProductItemCartOff productCart={itemCart} />;
                })}
            </View>
        );
    }
};

const showListCartItemBuy = (listCartItemBuy) => {
    if (listCartItemBuy != null && !helper.IsEmptyArray(listCartItemBuy)) {
        return (
            <View>
                {listCartItemBuy.map((itemCart) => {
                    return <ProductItemCart productCart={itemCart} />;
                })}
            </View>
        );
    }
};

const showTotalPromotion = (cartTotal) => {
    return (
        <View style={styles.boxsum}>
            <Text style={styles.boxleft}>Hàng khuyến mãi:</Text>
            <Text style={styles.boxright}>
                {helper.formatMoney(cartTotal.TotalBillPromotion)}
            </Text>
        </View>
    );
};

const mapStateToProps = (state) => {
    return {
        cartInfo: state.cartReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actionCart: bindActionCreators(cartCreator, dispatch)
    };
};
// make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
