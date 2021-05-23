import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    RefreshControl
} from 'react-native';
import { bindActionCreators } from 'redux';
import {
    Header,
    CartTotal,
    ProductItemCart,
    ProductItemCartOff
} from '@app/components';
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
                    <CartTotal cartInfo={this.props.cartTotal} />
                    <View style={styles.boxbtn}>
                        <View style={styles.btn}>
                            <TouchableOpacity
                                onPress={() =>
                                    this.props.navigation.navigate('Cart')
                                }>
                                <Text style={styles.textbtn}>
                                    Xóa hết giỏ hàng
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.btn}>
                            <TouchableOpacity
                                onPress={() =>
                                    this.props.navigation.navigate('Cart')
                                }>
                                <View>
                                    <Text style={styles.textbtn}>
                                        Dùng phiếu mua hàng
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.btnbuy}>
                            <TouchableOpacity
                                onPress={() =>
                                    this.props.navigation.navigate('Cart')
                                }>
                                <View>
                                    <Text style={styles.textbtnbuy}>
                                        ĐẶT HÀNG
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ height: 60 }} />
                </ScrollView>
            </View>
        );
    }
}

const showListCartItemOff = (listCartItemOff) => {
    if (listCartItemOff != null && !helper.IsEmptyArray(listCartItemOff)) {
        const list = listCartItemOff.filter((item) => item.TypeProduct !== 3);
        if (!helper.IsEmptyArray(list)) {
            return (
                <View>
                    {list.map((itemCart) => {
                        return (
                            <ProductItemCartOff
                                productCart={itemCart}
                                key={itemCart.Info.GuildId}
                            />
                        );
                    })}
                    <View style={styles.hr} />
                </View>
            );
        }
    }
};

const showListCartItemBuy = (listCartItemBuy) => {
    if (listCartItemBuy != null && !helper.IsEmptyArray(listCartItemBuy)) {
        const list = listCartItemBuy.filter(
            (item) => item.TypeProduct !== 3 && item.TypeProduct !== 2
        );
        if (!helper.IsEmptyArray(list)) {
            return (
                <View>
                    {list.map((itemCart) => {
                        return (
                            <ProductItemCart
                                productCart={itemCart}
                                key={itemCart.Info.GuildId}
                            />
                        );
                    })}
                </View>
            );
        }
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
