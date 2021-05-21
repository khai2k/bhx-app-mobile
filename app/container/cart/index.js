import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    RefreshControl
} from 'react-native';
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
        this.state = {
            isLoading: false
        };
    }

    onRefresh = () => {
        this.setState({ isLoading: true });
        this.props.actionCart
            .cart_get()
            .then((res) => {
                this.setState({ isLoading: false });
            })
            .catch(() => {
                this.setState({ isLoading: false });
            });
    };

    componentDidMount() {
        this.props.actionCart.cart_get();
    }

    componentDidUpdate() {
        console.log('componentDidUpdate');
    }

    render() {
        return (
            <View style={styles.cartinfo}>
                <Header />
                <TouchableOpacity
                    style={styles.btnbuy}
                    onPress={() =>
                        // this.props.navigation.navigate('Cart')
                        this.props.navigation.navigate('UserInfo')
                    }>
                    <Text style={styles.textbtnbuy}>ĐẶT HÀNG</Text>
                </TouchableOpacity>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isLoading}
                            onRefresh={this.onRefresh}
                        />
                    }>
                    <View style={styles.titlecart}>
                        <Text style={styles.textcart}>Giỏ hàng của bạn</Text>
                    </View>
                    {showListCartItemOff(this.props.cart.ListCartItemOff)}
                    {showListCartItemBuy(this.props.cart.ListCartItemBuy)}
                    <View style={styles.boxtotal}>
                        <ComponentTotal
                            total={this.props.cartTotal.Total}
                            title="Tiền hàng:"
                            bold
                        />
                        <ComponentTotal
                            total={this.props.cartTotal.TotalBillPromotion}
                            title="Hàng khuyến mãi:"
                        />
                        <ComponentTotalFee
                            cartTotal={this.props.cartTotal}
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
                                // this.props.navigation.navigate('Cart')
                                this.props.navigation.navigate('UserInfo')
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
    if (props.total > 0) {
        return (
            <View style={styles.boxsum}>
                <Text style={styles.boxleft}>{props.title}</Text>
                <Text
                    style={props.bold ? styles.boxrightfont : styles.boxright}>
                    {helper.formatMoney(props.total)}
                </Text>
            </View>
        );
    }
    return null;
};

const ComponentTotalFee = (props) => {
    const totalFee = props.cartTotal.ApartmentShipFee + props.cartTotal.ShipFee;
    if (totalFee > 0) {
        return (
            <View style={styles.boxsum}>
                <Text style={styles.boxleft}>{props.title}</Text>
                <Text style={styles.boxright}>
                    {helper.formatMoney(totalFee)}
                </Text>
            </View>
        );
    } else if (props.cartTotal.ShipFeeBase > 0) {
        return (
            <View style={styles.boxsum}>
                <Text style={styles.boxleft}>{props.title}</Text>
                <View style={styles.boxright}>
                    <Text style={styles.textdel}>
                        {helper.formatMoney(props.cartTotal.ShipFeeBase)}
                    </Text>
                    <Text>Miễn Phí</Text>
                </View>
            </View>
        );
    } else {
        return (
            <View style={styles.boxsum}>
                <Text style={styles.boxleft}>{props.title}</Text>
                <Text style={styles.boxright}>Miễn Phí</Text>
            </View>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        cart: state.cartReducer.Cart,
        cartTotal: state.cartReducer.CartTotal
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actionCart: bindActionCreators(cartCreator, dispatch)
    };
};
// make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
