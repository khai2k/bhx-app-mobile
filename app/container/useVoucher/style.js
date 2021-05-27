import { StyleSheet, StatusBar } from 'react-native';

const STATUSBAR_HEIGHT = StatusBar.currentHeight;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
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
        paddingHorizontal: 5,
        marginBottom: 10
    },
    phoneInput: {
        borderRadius: 10,
        borderColor: '#8F9BB3',
        borderWidth: 1,
        marginHorizontal: 8,
        paddingHorizontal: 5,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
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
        paddingHorizontal: 5,
        marginBottom: 10
    },
    footer: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderColor: '#f5ebeb',
        padding: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: -10
        },
        shadowOpacity: 0.8,
        shadowRadius: 20,
        elevation: 1.2
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
        backgroundColor: 'green',
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
        color: '#FFF',
        fontSize: 15
    },
    submitButtonText: {
        fontWeight: 'bold',
        color: '#FFF',
        fontSize: 15,
        left: 15
    },
    submitPrice: {
        right: 15
    },
    oldPrice: {
        color: 'white',
        fontSize: 12,
        textDecorationLine: 'line-through'
    },
    newPrice: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold'
    },
    voucherContainer: {
        paddingHorizontal: 10,
        marginBottom: '40%'
    },
    voucherBox: {
        marginHorizontal: 8,
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderColor: 'green',
        borderWidth: 1,
        height: 60,
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: 10
    },
    voucherPriceBox: {
        left: -4,
        backgroundColor: 'green',
        width: 52,
        height: 35,
        justifyContent: 'center',
        borderRadius: 5
    },
    voucherLabel: {
        marginBottom: 7
    },
    voucherInfoBox: {
        right: -4
    },
    imageVoucher: {
        width: 35,
        height: 18,
        alignSelf: 'center'
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
        justifyContent: 'space-around'
    }
});

export default styles;
