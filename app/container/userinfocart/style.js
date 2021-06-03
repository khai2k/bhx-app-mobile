/* eslint-disable react-native/no-color-literals */
import { StyleSheet } from 'react-native';
import { Colors, Typography } from '@app/styles';

const styles = StyleSheet.create({
    absTit: {
        color: '#8F9BB3',
        paddingLeft: 10,
        paddingTop: 3,
        position: 'absolute'
    },
    backTop: {
        alignItems: 'center',
        backgroundColor: '#F5F8FD',
        display: 'flex',
        flexDirection: 'row',
        fontSize: 15,
        padding: 6
    },
    blockPadding: {
        backgroundColor: '#F5F8FD',
        height: 20
    },
    borderRadius: {
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8
    },
    boxCallOther: {
        padding: 7
    },
    boxbtn: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginBottom: 100,
        paddingBottom: 10
    },
    btn: {
        borderColor: Colors.CART_BORDER_BTN,
        borderRadius: 10,
        borderWidth: 1,
        height: 50,
        padding: 5,
        width: '30%'
    },
    btnGetHistoryAddress: {
        alignItems: 'center',
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 15
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
    checkbox: {
        alignSelf: 'center'
    },
    checkboxContainer: {
        flexDirection: 'row'
    },
    container: {
        backgroundColor: '#fff'
    },
    delichoose: {
        borderColor: '#D6E0F5',
        borderRadius: 4,
        borderStyle: 'solid',
        borderWidth: 1,
        display: 'flex'
    },
    disBox: {
        borderRadius: 8,
        borderStyle: 'solid',
        borderWidth: 1,
        paddingLeft: 10,
        paddingRight: 10,
        position: 'relative'
    },
    floatingBox: {
        borderColor: '#D6E0F5',
        borderRadius: 8,
        borderWidth: 1,
        fontSize: 14,
        marginBottom: 10,
        padding: 10
    },
    floatingBoxErr: {
        borderColor: '#d0021b',
        borderRadius: 8,
        borderWidth: 1,
        fontSize: 14,
        marginBottom: 10,
        padding: 10
    },
    floatingBoxErrNoMargin: {
        borderColor: '#d0021b',
        borderRadius: 8,
        borderWidth: 1,
        fontSize: 14,
        padding: 10
    },
    floatingBoxNoMargin: {
        borderColor: '#D6E0F5',
        borderRadius: 8,
        borderWidth: 1,
        fontSize: 14,
        padding: 10
    },
    hasAbsTit: {
        paddingTop: 28
    },
    inputAndTit: {
        borderColor: '#D6E0F5',
        borderRadius: 4,
        borderStyle: 'solid',
        borderWidth: 1
    },
    inputBox: {
        borderColor: '#D6E0F5',
        borderRadius: 8,
        borderStyle: 'solid',
        borderWidth: 1,
        padding: 10
    },
    inputErr: {
        borderColor: '#ff001f'
    },
    inputNote: {
        borderColor: '#D6E0F5',
        borderRadius: 4,
        borderStyle: 'solid',
        borderWidth: 1,
        marginVertical: 10,
        padding: 10,
        textAlignVertical: 'top',
        width: '100%'
    },
    label: {
        margin: 8
    },
    logoback: {
        height: 10,
        marginLeft: 15,
        resizeMode: 'contain',
        width: 5
    },
    logohome: {
        height: 20,
        marginRight: 10,
        resizeMode: 'contain',
        width: 20
    },
    marginTop: {
        marginTop: 10
    },
    noBorder: {
        borderWidth: 0
    },
    noMarginBottom: {
        marginBottom: 0
    },
    provAndDic: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        width: '100%'
    },
    provBox: {
        borderRadius: 8,
        borderStyle: 'solid',
        borderWidth: 1,
        paddingLeft: 10,
        paddingRight: 10,
        position: 'relative'
    },
    radioButton: {
        alignItems: 'center',
        backgroundColor: '#F8F8F8',
        borderColor: '#008848',
        borderRadius: 10,
        borderWidth: 1,
        height: 20,
        justifyContent: 'center',
        width: 20
    },
    radioButtonContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 5,
        marginRight: 45,
        marginTop: 5
    },
    radioButtonIcon: {
        backgroundColor: '#008848',
        borderRadius: 7,
        height: 14,
        width: 14
    },
    radioButtonText: {
        fontSize: 16,
        marginLeft: 16
    },
    sectionInput: {
        backgroundColor: '#fff',
        paddingHorizontal: 10
    },
    sectionInputTop: {
        backgroundColor: '#fff',
        padding: 10
    },
    stepTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        marginBottom: 15,
        marginTop: 10
    },
    textErr: {
        color: '#ff001f',
        fontSize: 12,
        fontStyle: 'italic',
        marginLeft: 3,
        marginTop: 5
    },
    textErrAbs: {
        bottom: -19,
        position: 'absolute'
    },
    textHistoryAddress: {
        color: '#3B854E',
        fontWeight: '600',
        textAlign: 'center'
    },
    textPriceTotal: {
        color: Colors.WHITE,
        fontSize: 13,
        textAlign: 'center'
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
    wardBox: {
        borderRadius: 8,
        borderStyle: 'solid',
        borderWidth: 1,
        display: 'flex',
        marginTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        width: '100%'
    }
});

export default styles;
