import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { bindActionCreators } from 'redux';
import { Header, ProductItemCart, ProductItemCartOff } from '@app/components';
import { connect } from 'react-redux';
import { helper } from '@app/common';
import * as cartCreator from './action';
import styles from './style';

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
                <ScrollView>
                    <View style={styles.titlecart}>
                        <Text style={styles.textcart}>Giỏ hàng của bạn</Text>
                    </View>
                    {showListCartItemOff(
                        this.props.cartInfo.Cart.ListCartItemOff
                    )}
                    {showListCartItemBuy(
                        this.props.cartInfo.Cart.ListCartItemBuy
                    )}
                    <View style={styles.boxtotal}>
                        <ComponentTotal
                            total={this.props.cartInfo.CartTotal.Total}
                            title="Tiền hàng:"
                            bold
                        />
                        <ComponentTotal
                            total={
                                this.props.cartInfo.CartTotal.TotalBillPromotion
                            }
                            title="Hàng khuyến mãi:"
                        />
                        <ComponentTotal
                            total={this.props.cartInfo.CartTotal.ShipFee}
                            title="Phí giao dự kiến:"
                        />
                    </View>
                    <View style={styles.boxbtn}>
                        <TouchableOpacity
                            style={styles.btn}
                            onPress={() =>
                                this.props.navigation.navigate('Cart')
                            }>
                            <Text style={styles.textbtn}>Xóa hết giỏ hàng</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.btn}
                            onPress={() =>
                                this.props.navigation.navigate('Cart')
                            }>
                            <Text style={styles.textbtn}>
                                Dùng phiếu mua hàng
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.btnbuy}
                            onPress={() =>
                                this.props.navigation.navigate('Cart')
                            }>
                            <Text style={styles.textbtnbuy}>ĐẶT HÀNG</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
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

const ComponentTotal = (props) => {
    return (
        <View style={styles.boxsum}>
            <Text style={styles.boxleft}>{props.title}</Text>
            <Text style={props.bold ? styles.boxrightfont : styles.boxright}>
                {helper.formatMoney(props.total)}
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
