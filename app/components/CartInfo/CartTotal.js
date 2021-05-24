import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { helper } from '@app/common';
import { Colors, Typography } from '@app/styles';

// create a component
const CartTotal = (props) => {
    const componentTotal = (total, title, bold) => {
        if (total > 0) {
            return (
                <View style={styles.boxsum}>
                    <Text style={styles.boxleft}>{title}</Text>
                    <Text
                        style={
                            bold === true
                                ? styles.boxrightfont
                                : styles.boxright
                        }>
                        {helper.formatMoney(total)}
                    </Text>
                </View>
            );
        }
    };

    const componentTotalFee = (cartInfo, title) => {
        const totalFee = cartInfo.ApartmentShipFee + cartInfo.ShipFee;
        if (totalFee > 0) {
            return (
                <View style={styles.boxsum}>
                    <Text style={styles.boxleft}>{title}</Text>
                    <Text style={styles.boxright}>
                        {helper.formatMoney(totalFee)}
                    </Text>
                </View>
            );
        } else if (cartInfo.ShipFeeBase > 0) {
            return (
                <View style={styles.boxsum}>
                    <Text style={styles.boxleft}>{title}</Text>
                    <View style={styles.boxright}>
                        <Text style={styles.textdel}>
                            {helper.formatMoney(cartInfo.ShipFeeBase)}
                        </Text>
                        <Text>Miễn Phí</Text>
                    </View>
                </View>
            );
        } else {
            return (
                <View style={styles.boxsum}>
                    <Text style={styles.boxleft}>{title}</Text>
                    <Text style={styles.boxright}>Miễn Phí</Text>
                </View>
            );
        }
    };
    return (
        <View style={styles.boxtotal}>
            {componentTotal(props.cartInfo.Total, 'Tiền hàng:', true)}
            {componentTotal(
                props.cartInfo.TotalBillPromotion,
                'Hàng khuyến mãi:',
                false
            )}
            {componentTotalFee(props.cartInfo, 'Phí giao dự kiến:')}
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    boxleft: {
        marginLeft: 5
    },
    boxright: {
        flexDirection: 'row',
        marginRight: 5
    },
    boxrightfont: {
        ...Typography.FONT_BOLD_18,
        marginRight: 5
    },
    boxsum: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5
    },
    boxtotal: {
        borderColor: Colors.BORDER_GENERAL,
        borderTopWidth: 1,
        padding: 10
    }
});

// make this component available to the app
export default CartTotal;
