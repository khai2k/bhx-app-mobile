import { StyleSheet } from 'react-native';
import { Colors, Typography } from '@app/styles';

const styles = StyleSheet.create({
    boxbtn: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingBottom: 10
    },
    btn: {
        borderColor: Colors.CART_BORDER_BTN,
        borderRadius: 10,
        borderWidth: 1,
        height: 50,
        justifyContent: 'center',
        padding: 5,
        width: '30%'
    },
    btnAlert: {
        backgroundColor: Colors.GREEN_KEY
    },
    btnAlertClose: {
        color: Colors.GRAY_ALERT_CLOSE
    },
    btnAlertText: {
        color: Colors.WHITE
    },
    btnbuy: {
        backgroundColor: Colors.BG_BUTTON_BUY,
        borderColor: Colors.CART_BORDER_BTN,
        borderRadius: 10,
        borderWidth: 1,
        height: 50,
        justifyContent: 'center',
        padding: 5,
        width: '30%'
    },
    cartempty: {
        backgroundColor: Colors.CART_BG_EMPTY
    },
    cartinfo: {
        backgroundColor: Colors.WHITE,
        flex: 1
    },
    hr: {
        backgroundColor: Colors.BORDER_GENERAL,
        height: 5
    },
    textbtn: {
        ...Typography.FONT_BOLD_14,
        textAlign: 'center'
    },
    textbtnbuy: {
        ...Typography.FONT_BOLD_14,
        color: Colors.WHITE,
        textAlign: 'center'
    },
    textcart: {
        ...Typography.FONT_BOLD_14
    },
    textdel: {
        ...Typography.FONT_REGULAR_14,
        color: Colors.CART_UNIT,
        marginRight: 5,
        textDecorationLine: 'line-through'
    },
    titlecart: {
        borderColor: Colors.BORDER_GENERAL,
        borderTopWidth: 5,
        justifyContent: 'center',
        padding: 10
    }
});

export default styles;
