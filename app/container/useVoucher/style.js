import { StyleSheet, StatusBar } from 'react-native';
import { Colors } from '../../styles';

const STATUSBAR_HEIGHT = StatusBar.currentHeight;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.WHITE,
        flex: 1
    },
    header: {
        marginTop: STATUSBAR_HEIGHT,
        marginBottom: 4,
        flexDirection: 'row',
        height: 55,
        justifyContent: 'space-between',
        borderBottomColor: '#e9edf0',
        borderBottomWidth: 3
    },
    headerTitle: {
        padding: 15,
        fontSize: 15
    },
    closeHeader: {
        width: 50,
        borderLeftColor: '#e9edf0',
        borderLeftWidth: 2,
        justifyContent: 'center'
    },
    closeImage: {
        alignSelf: 'center',
        width: 15,
        height: 15
    },
    voucherInput: {
        borderRadius: 10,
        borderColor: '#8F9BB3',
        borderWidth: 1,
        marginHorizontal: 8,
        paddingHorizontal: 10,
        marginBottom: 10,
        height: 50
    },
    phoneInput: {
        borderRadius: 10,
        borderColor: '#8F9BB3',
        borderWidth: 1,
        marginHorizontal: 8,
        paddingHorizontal: 10,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50
    },
    submitPhone: {
        backgroundColor: '#E4E9F2',
        height: 30,
        borderRadius: 10,
        justifyContent: 'center',
        marginHorizontal: 10,
        paddingHorizontal: 10
    },
    textSubmitPhone: {
        textAlign: 'center',
        color: '#3B854E'
    },
    pinCode: {
        borderRadius: 10,
        borderColor: '#8F9BB3',
        borderWidth: 1,
        marginHorizontal: 8,
        paddingHorizontal: 10,
        marginBottom: 10,
        height: 50
    },
    footer: {
        borderWidth: 2,
        backgroundColor: Colors.WHITE,
        width: '100%',
        position: 'absolute',
        bottom: 0,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderColor: '#f5ebeb',
        padding: 10
    },
    note: {
        padding: 8,
        marginHorizontal: 8
    },
    textNote: {
        color: '#FF7B01',
        fontSize: 12,
        textAlign: 'center'
    },
    closeButton: {
        backgroundColor: '#c5cee0',
        marginHorizontal: 8,
        marginVertical: 8,
        borderRadius: 10,
        height: 50,
        justifyContent: 'center'
    },
    submitButton: {
        backgroundColor: Colors.GREEN_PRIMARY,
        marginHorizontal: 8,
        marginVertical: 8,
        borderRadius: 10,
        height: 50,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    closeButtonText: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: Colors.WHITE,
        fontSize: 15
    },
    submitButtonText: {
        fontWeight: 'bold',
        color: Colors.WHITE,
        fontSize: 15,
        left: 15
    },
    submitPrice: {
        right: 15
    },
    oldPrice: {
        color: Colors.WHITE,
        fontSize: 12,
        textDecorationLine: 'line-through'
    },
    newPrice: {
        color: Colors.WHITE,
        fontSize: 14,
        fontWeight: 'bold'
    },
    voucherContainer: {
        marginTop: -10,
        paddingHorizontal: 10,
        marginBottom: '40%'
    },
    voucherBox: {
        marginHorizontal: 8,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    voucherLeft: {
        width: '20%',
        height: 60,
        borderColor: Colors.GREEN_PRIMARY,
        borderWidth: 2,
        justifyContent: 'center',
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10,
        borderRightWidth: 0
    },
    voucherMid: {
        height: 60,
        width: '5%'
    },
    voucherMidTop: {
        borderColor: Colors.GREEN_PRIMARY,
        width: '100%',
        height: 9,
        borderWidth: 2,
        marginBottom: 21,
        borderBottomRightRadius: 8,
        borderBottomLeftRadius: 8,
        borderTopWidth: 0
    },
    voucherMidBottom: {
        borderColor: Colors.GREEN_PRIMARY,
        width: '100%',
        height: 9,
        borderWidth: 2,
        marginTop: 21,
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8,
        borderBottomWidth: 0
    },
    voucherRight: {
        justifyContent: 'center',
        paddingHorizontal: 10,
        height: 60,
        borderColor: Colors.GREEN_PRIMARY,
        borderWidth: 2,
        width: '75%',
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
        borderLeftWidth: 0
    },
    voucherPriceBox: {
        marginHorizontal: 10,
        backgroundColor: Colors.GREEN_PRIMARY,
        width: 50,
        height: 35,
        justifyContent: 'center',
        borderRadius: 5
    },
    voucherLabel: {
        marginBottom: 7
    },
    labelPriceVoucher: {
        color: Colors.WHITE,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 17
    },
    voucherDate: {
        color: '#8F9BB3',
        fontSize: 12
    },
    voucherCancelText: {
        color: '#FF001E',
        fontSize: 12,
        fontWeight: 'bold'
    },
    calVoucher: {
        marginVertical: 3,
        flexDirection: 'row',
        width: '100%'
    },
    loading: {
        height: '100%',
        position: 'absolute',
        width: '100%'
    },
    loadingActive: {
        backgroundColor: Colors.BLACK,
        opacity: 0.3,
        zIndex: 1
    },
    onfocusInput: {
        paddingHorizontal: 5,
        height: 30,
        paddingVertical: 0
    },
    onfocusLabel: {
        fontSize: 12,
        paddingHorizontal: 5,
        top: 5,
        color: '#8f9bb3'
    },
    onfocusPhoneInput: {
        paddingHorizontal: 5,
        height: 30,
        marginBottom: 4,
        paddingVertical: 0
    },
    onfocusPhoneLabel: {
        fontSize: 12,
        paddingHorizontal: 5,
        top: 5,
        color: '#8f9bb3'
    },
    onBlurLabel: {
        display: 'none'
    },
    onBlurInput: {}
});

export default styles;
