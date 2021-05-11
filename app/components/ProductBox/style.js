import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '@app/styles';

const win = Dimensions.get('window');
const ratio = win.width / 3; //product image width

const styles = StyleSheet.create({
    boxBuy: {
        backgroundColor: Colors.WHITE,
        borderBottomLeftRadius: 7,
        borderBottomRightRadius: 7,
        borderTopColor: Colors.CATSKILL_WHITE,
        borderTopWidth: 1,
        height: 35,
        position: 'relative',
        width: '100%'
    },
    boxImg: {
        height: 'auto',
        overflow: 'hidden',
        padding: 0,
        position: 'relative',
        width: '100%'
    },
    buy: {
        alignItems: 'center',
        borderLeftWidth: 1,
        borderLeftColor: Colors.LINK_WATER_3,
        color: Colors.CLOUD_BURST,
        flexBasis: 'auto',
        flexGrow: 1,
        flexShrink: 1,
        fontSize: 14,
        marginBottom: 8,
        marginLeft: 0,
        marginRight: 0,
        marginTop: 8,
        textTransform: 'uppercase'
    },
    down: {
        backgroundColor: Colors.WHITE,
        borderColor: Colors.GALLERY,
        borderWidth: 1,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderBottomWidth: 0,
        fontStyle: 'normal',
        height: 34,
        lineHeight: 30,
        position: 'relative',
        textAlign: 'center',
        width: '33%',
        borderBottomLeftRadius: 8
    },
    downIcon: {
        width: 14,
        height: 2,
        backgroundColor: Colors.EUCALYPTUS,
        marginTop: 15,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 15,
        borderRadius: 4
    },
    up: {
        backgroundColor: Colors.WHITE,
        borderColor: Colors.GALLERY,
        borderWidth: 1,
        borderTopWidth: 0,
        borderRightWidth: 0,
        borderBottomWidth: 0,
        fontStyle: 'normal',
        height: 34,
        lineHeight: 30,
        position: 'relative',
        textAlign: 'center',
        width: '33%',
        borderBottomRightRadius: 8
    },
    upIcon1: {
        width: 14,
        height: 2,
        backgroundColor: Colors.EUCALYPTUS,
        marginTop: 15,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 15,
        borderRadius: 4
    },
    upIcon2: {
        width: 2,
        height: 14,
        backgroundColor: Colors.EUCALYPTUS,
        marginTop: -23,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 0,
        borderRadius: 4
    },
    inputBuy: {
        fontSize: 16,
        color: Colors.MINE_SHAFT,
        width: '33%',
        textAlign: 'center',
        borderWidth: 0,
        borderRadius: 0,
        borderColor: Colors.GALLERY,
        backgroundColor: Colors.LINK_WATER_2,
        justifyContent: 'center',
        alignSelf: 'center',
        height: 34,
        lineHeight: 30,
        padding: 0,
        margin: 0
    },
    imageProduct: {
        borderTopLeftRadius: 7,
        borderTopRightRadius: 7,
        width: win.width / 3 - 6,
        height: ratio
    },
    imgContent: {
        height: 'auto'
    },
    price: {
        alignItems: 'center',
        color: Colors.CLOUD_BURST,
        flexBasis: 'auto',
        flexGrow: 0,
        flexShrink: 0,
        fontSize: 14,
        fontWeight: 'normal',
        justifyContent: 'center',
        paddingBottom: 0,
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 0,
        textAlign: 'center'
    },
    priceInfo: {
        justifyContent: 'space-between',
        width: '100%',
        flexDirection: 'row'
    },
    priceInfoHide: {
        justifyContent: 'space-between',
        width: '100%',
        flexDirection: 'row',
        display: 'none'
    },
    product: {
        backgroundColor: Colors.WHITE,
        borderColor: Colors.CATSKILL_WHITE,
        borderRadius: 8,
        borderWidth: 1,
        marginBottom: 0,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 7,
        minHeight: 175,
        padding: 0,
        position: 'relative',
        shadowColor: Colors.LINK_WATER,
        shadowOffset: { height: 3, width: 0 },
        shadowOpacity: 0.5,
        width: win.width / 3 - 6,
        height: 'auto'
    },
    productSelected: {
        backgroundColor: Colors.WHITE,
        borderColor: Colors.TROPICAL_RAIN_FOREST,
        borderRadius: 8,
        borderWidth: 1,
        marginBottom: 0,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 7,
        minHeight: 175,
        padding: 0,
        position: 'relative',
        shadowColor: Colors.LINK_WATER,
        shadowOffset: { height: 3, width: 0 },
        shadowOpacity: 0.5,
        width: win.width / 3 - 6,
        height: 'auto'
    },
    productImg: {
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        overflow: 'hidden',
        position: 'relative',
        width: '100%'
    },
    productInfo: {
        height: 32,
        position: 'relative',
        width: '100%'
    },
    productInfoExpired: {
        height: 40,
        bottom: 65,
        backgroundColor: Colors.WHITE,
        padding: 0,
        paddingTop: 3,
        paddingBottom: 0,
        position: 'absolute',
        width: '100%'
    },
    productName: {
        backgroundColor: Colors.WHITE,
        color: Colors.TROUT,
        fontSize: 12,
        height: 32,
        lineHeight: 14,
        overflow: 'hidden',
        padding: 3,
        textAlign: 'center',
        width: '100%'
    },
    productNameSelected: {
        backgroundColor: Colors.WHITE,
        color: Colors.TROUT,
        fontSize: 12,
        lineHeight: 14,
        overflow: 'hidden',
        padding: 3,
        textAlign: 'center',
        width: '100%',
        height: 16,
        margin: 0,
        padding: 0,
        paddingTop: 2
    },
    priceSelected: {
        textAlign: 'center',
        fontSize: 12,
        color: Colors.CLOUD_BURST,
        height: 15,
        width: '100%',
        backgroundColor: Colors.WHITE
    },
    upDown: {
        display: 'none'
    },
    upDownShow: {
        display: 'flex',
        height: 35,
        flexDirection: 'row'
    },
    boxLabel: {
        position: 'relative'
    },
    boxLabelText: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: Colors.JADE,
        color: Colors.TURBO,
        fontSize: 11,
        paddingBottom: 0,
        paddingLeft: 3,
        paddingRight: 3,
        paddingTop: 0,
        borderTopRightRadius: 8,
        overflow: 'hidden',
        height: 18,
        zIndex: 1
    },
    visibleProductBuy: {
        display: 'flex'
    },
    unvisibleProductBuy: {
        display: 'none'
    },
    boxExpired: {
        borderTopLeftRadius: 7,
        borderTopRightRadius: 7,
        position: 'absolute',
        zIndex: 1,
        width: '100%',
        height: 20,
        textAlign: 'center',
        backgroundColor: Colors.TROUT,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 10,
        color: Colors.WHITE,
        padding: 3,
        opacity: 0.8
    },
    imagePromotion: {
        padding: 0,
        paddingLeft: 3,
        paddingRight: 3,
        borderBottomRightRadius: 7,
        borderBottomLeftRadius: 7,
        zIndex: 0,
        position: 'absolute',
        bottom: 0,
        right: 0,
        borderWidth: 1,
        borderColor: Colors.MONZA,
        backgroundColor: Colors.WHITE,
        shadowColor: Colors.LINK_WATER,
        shadowOffset: { height: 3, width: 0 },
        shadowOpacity: 0.5,
        width: 48,
        height: 48
    },
    nearlyExpired: {
        height: 31,
        backgroundColor: Colors.MYSTIC,
        borderBottomRightRadius: 7,
        borderBottomLeftRadius: 7,
        textAlign: 'center',
        padding: 0,
        paddingTop: 1,
        paddingBottom: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        position: 'relative',
        color: Colors.BALI_HAI
    },
    expiredLine: {
        flexDirection: 'row'
    },
    expiredText: {
        color: Colors.BALI_HAI,
        height: 13,
        padding: 0,
        lineHeight: 14,
        fontSize: 11
    },
    expiredPrice: {
        color: Colors.CLOUD_BURST,
        height: 13,
        padding: 0,
        lineHeight: 14,
        fontSize: 11
    },
    /*Combo product box*/
    comboTheme: {
        borderTopLeftRadius: 7,
        borderTopRightRadius: 7,
        height: win.width / 3,
        width: '100%'
    },
    imageProductCombo: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default styles;
