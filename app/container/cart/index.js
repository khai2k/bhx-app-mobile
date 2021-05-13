import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
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
        justifyContent: 'center',
        padding: 5
    }
});

// create a component
class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.actionCart.get_cart(this.state.carId);
    }

    render() {
        return (
            <View style={styles.cartinfo}>
                <Header />
                <View style={styles.titlecart}>
                    <Text style={styles.textcart}>Giỏ hàng của bạn</Text>
                </View>
                <ProductItemCart />
                <ProductItemCart />
                <ProductItemCart />
                <ProductItemCart />
                <View style={styles.boxsum}>
                    <Text style={styles.boxleft}>Tiền hàng:</Text>
                    <Text style={styles.boxrightfont}>141.000₫</Text>
                </View>
                <View style={styles.boxsum}>
                    <Text style={styles.boxleft}>Phí giao dự kiến:</Text>
                    <Text style={styles.boxright}>15.000₫</Text>
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        carId: state.cartReducer.carId
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actionCart: bindActionCreators(cartCreator, dispatch)
    };
};
// make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
