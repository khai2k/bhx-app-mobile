import { StyleSheet } from 'react-native';
import { Colors, Typography } from '@app/styles';

const styles = StyleSheet.create({
    boxbtn: {
        alignItems: 'center',
        flexDirection: 'row',
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
    boxtotal: {
        padding: 8
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
    cartinfo: {
        backgroundColor: Colors.WHITE
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
    titlecart: {
        borderBottomWidth: 1,
        borderColor: Colors.BORDER_GENERAL,
        borderTopWidth: 5,
        justifyContent: 'center',
        padding: 10
    }
});

export default styles;
