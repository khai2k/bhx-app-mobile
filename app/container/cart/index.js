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
    CartEmpty,
    LoadingCart,
    ProductItemCart,
    ProductItemCartOff
} from '@app/components';

import {
    ModalPortal,
    ModalFooter,
    ModalTitle,
    ModalButton
} from 'react-native-modals';

import { connect } from 'react-redux';
import { helper } from '@app/common';
import * as cartCreator from '@app/redux/actions/cartAction';
import styles from './style';

// create a component
class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
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

    handleRemoveCart = () => {
        this.props.actionCart.cart_remove();
    };

    componentDidMount() {
        this.props.actionCart.cart_get().then((res) => {
            this.setState({ isLoading: false });
        });
    }

    alertRemoveCart = () => {
        const modalPortalId = ModalPortal.show(
            <View>
                <ModalTitle title="Bạn muốn xóa tất cả sản phẩm trong giỏ hàng này?" />
                <ModalFooter>
                    <ModalButton
                        textStyle={styles.btnAlertClose}
                        text="Không xóa"
                        onPress={() => {
                            ModalPortal.dismiss(modalPortalId);
                        }}
                    />
                    <ModalButton
                        style={styles.btnAlert}
                        textStyle={styles.btnAlertText}
                        text="Đồng ý"
                        onPress={() => {
                            this.props.actionCart.cart_remove();
                            ModalPortal.dismiss(modalPortalId);
                        }}
                    />
                </ModalFooter>
            </View>,
            {
                animationDuration: 0,
                onHardwareBackPress: () => {
                    return true;
                }
            }
        );
    };

    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.cartinfo}>
                    <Header />
                    <LoadingCart />
                    <LoadingCart />
                    <LoadingCart />
                    <LoadingCart />
                </View>
            );
        } else if (
            this.props.cart.ListCartItemBuy == null ||
            helper.IsEmptyArray(this.props.cart.ListCartItemBuy)
        ) {
            return (
                <View style={styles.cartempty}>
                    <Header />
                    <CartEmpty listCategory={this.props.listCategory} />
                </View>
            );
        }
        return (
            <View style={styles.cartinfo}>
                <Header />
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isLoading}
                            onRefresh={this.onRefresh}
                        />
                    }
                    contentContainerStyle={{
                        paddingBottom: 10
                    }}>
                    <View style={styles.titlecart}>
                        <Text style={styles.textcart}>Giỏ hàng của bạn</Text>
                    </View>
                    {showListCartItemOff(this.props.cart.ListCartItemOff)}
                    {showListCartItemBuy(this.props.cart.ListCartItemBuy)}
                    <CartTotal cartInfo={this.props.cartTotal} />
                    <View style={styles.boxbtn}>
                        <View style={styles.btn}>
                            <TouchableOpacity onPress={this.alertRemoveCart}>
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
                                    // this.props.navigation.navigate('Cart')
                                    this.props.navigation.navigate('UserInfo')
                                }>
                                <View>
                                    <Text style={styles.textbtnbuy}>
                                        ĐẶT HÀNG
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
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
        cartTotal: state.cartReducer.CartTotal,
        listCategory: state.cartReducer.ListCategory
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actionCart: bindActionCreators(cartCreator, dispatch)
    };
};
// make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
