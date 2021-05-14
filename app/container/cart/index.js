import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { Header, ProductItemCart } from '@app/components';
import { connect } from 'react-redux';
import { Colors, Typography } from '@app/styles';
import * as cartCreator from './action';

// define your styles

const styles = StyleSheet.create({
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
    cartinfo: {
        backgroundColor: Colors.WHITE
    },
    textcart: {
        ...Typography.FONT_BOLD_14
    },
    titlecart: {
        borderBottomWidth: 1,
        borderColor: Colors.BORDER_GENERAL,
        borderTopWidth: 5,
        justifyContent: 'center',
        padding: 10,
    },
    boxbtn: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    btn: {
        padding: 5,
        width: '30%',
        borderWidth: 1,
        borderColor: Colors.CART_BORDER_BTN,
        borderRadius: 10,
    },
    textbtn: {
        ...Typography.FONT_BOLD_14,
        alignItems: 'center',
        textAlign: 'center',
    }
});

// create a component
class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.actionCart.get_cart();
    }

    render() {
        return (
            <View style={styles.cartinfo}>
                <Header />
                <View style={styles.titlecart}>
                    <Text style={styles.textcart}>Giỏ hàng của bạn</Text>
                </View>
                <View>
                    {this.props.cartInfo.Cart.ListCartItem.map((itemCart) => {
                        return <ProductItemCart productCart={itemCart} />;
                    })}
                </View>
                <View style={styles.boxsum}>
                    <Text style={styles.boxleft}>Tiền hàng:</Text>
                    <Text style={styles.boxrightfont}>141.000₫</Text>
                </View>
                <View style={styles.boxsum}>
                    <Text style={styles.boxleft}>Phí giao dự kiến:</Text>
                    <Text style={styles.boxright}>15.000₫</Text>
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

const mapStateToProps = (state) => {
    console.log(state.cartReducer);
    console.log(mapStateToProps);
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
