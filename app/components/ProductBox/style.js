import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '@app/styles';

const win = Dimensions.get('window');
const ratio = win.width / 3; // product image width

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
        borderLeftColor: Colors.LINK_WATER_3,
        borderLeftWidth: 1,
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
        borderBottomLeftRadius: 8,
        borderBottomWidth: 0,
        borderColor: Colors.GALLERY,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        borderWidth: 1,
        fontStyle: 'normal',
        height: 34,
        lineHeight: 30,
        position: 'relative',
        textAlign: 'center',
        width: '33%'
    },
    downIcon: {
        backgroundColor: Colors.EUCALYPTUS,
        borderRadius: 4,
        height: 2,
        marginBottom: 15,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 15,
        width: 14
    },
    imageProduct: {
        borderTopLeftRadius: 7,
        borderTopRightRadius: 7,
        height: ratio,
        width: '100%'
    },
    inputBuy: {
        alignSelf: 'center',
        backgroundColor: Colors.LINK_WATER_2,
        borderColor: Colors.GALLERY,
        borderRadius: 0,
        borderWidth: 0,
        color: Colors.MINE_SHAFT,
        fontSize: 16,
        height: 33,
        justifyContent: 'center',
        lineHeight: 30,
        margin: 0,
        padding: 0,
        textAlign: 'center',
        width: '33%'
    },

    up: {
        backgroundColor: Colors.WHITE,
        borderBottomRightRadius: 8,
        borderBottomWidth: 0,
        borderColor: Colors.GALLERY,
        borderRightWidth: 0,
        borderTopWidth: 0,
        borderWidth: 1,
        fontStyle: 'normal',
        height: 34,
        lineHeight: 30,
        position: 'relative',
        textAlign: 'center',
        width: '33%'
    },

    upIcon1: {
        backgroundColor: Colors.EUCALYPTUS,
        borderRadius: 4,
        height: 2,
        marginBottom: 15,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 15,
        width: 14
    },

    upIcon2: {
        backgroundColor: Colors.EUCALYPTUS,
        borderRadius: 4,
        height: 14,
        marginBottom: 0,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: -23,
        width: 2
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    priceInfoHide: {
        display: 'none',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    product: {
        backgroundColor: Colors.WHITE,
        borderColor: Colors.CATSKILL_WHITE,
        borderRadius: 8,
        borderWidth: 1,
        height: 'auto',
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
        width: win.width / 3 - 6
    },
    productSelected: {
        backgroundColor: Colors.WHITE,
        borderColor: Colors.TROPICAL_RAIN_FOREST,
        borderRadius: 8,
        borderWidth: 1,
        height: 'auto',
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
        width: win.width / 3 - 6
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
        backgroundColor: Colors.WHITE,
        bottom: 65,
        height: 40,
        padding: 0,
        paddingBottom: 0,
        paddingTop: 3,
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
        height: 16,
        lineHeight: 14,
        margin: 0,
        overflow: 'hidden',
        padding: 0,
        paddingTop: 2,
        textAlign: 'center',
        width: '100%'
    },
    priceSelected: {
        backgroundColor: Colors.WHITE,
        color: Colors.CLOUD_BURST,
        fontSize: 12,
        height: 15,
        textAlign: 'center',
        width: '100%'
    },
    upDown: {
        display: 'none'
    },
    upDownShow: {
        display: 'flex',
        flexDirection: 'row',
        height: 35
    },
    boxLabel: {
        position: 'relative'
    },
    boxLabelText: {
        backgroundColor: Colors.JADE,
        borderTopRightRadius: 8,
        bottom: 0,
        color: Colors.TURBO,
        fontSize: 11,
        height: 18,
        left: 0,
        overflow: 'hidden',
        paddingBottom: 0,
        paddingLeft: 3,
        paddingRight: 3,
        paddingTop: 0,
        position: 'absolute',
        zIndex: 1
    },
    visibleProductBuy: {
        display: 'flex'
    },
    unvisibleProductBuy: {
        display: 'none'
    },
    boxExpired: {
        alignItems: 'center',
        backgroundColor: Colors.TROUT,
        borderTopLeftRadius: 7,
        borderTopRightRadius: 7,
        color: Colors.WHITE,
        fontSize: 10,
        height: 20,
        justifyContent: 'center',
        opacity: 0.8,
        padding: 3,
        position: 'absolute',
        textAlign: 'center',
        width: '100%',
        zIndex: 1
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
        alignItems: 'center',
        backgroundColor: Colors.MYSTIC,
        borderBottomLeftRadius: 7,
        borderBottomRightRadius: 7,
        color: Colors.BALI_HAI,
        height: 31,
        justifyContent: 'center',
        padding: 0,
        paddingBottom: 1,
        paddingTop: 1,
        position: 'relative',
        textAlign: 'center',
        width: '100%'
    },
    expiredLine: {
        flexDirection: 'row'
    },
    expiredText: {
        color: Colors.BALI_HAI,
        fontSize: 11,
        height: 13,
        lineHeight: 14,
        padding: 0
    },
    expiredPrice: {
        color: Colors.CLOUD_BURST,
        fontSize: 11,
        height: 13,
        lineHeight: 14,
        padding: 0
    },
    /* Combo product box */
    comboTheme: {
        borderTopLeftRadius: 7,
        borderTopRightRadius: 7,
        height: win.width / 3,
        width: '100%'
    },
    wrapImageProductCombo: {
        alignItems: 'center',
        height: '100%',
        justifyContent: 'center',
        left: 0,
        position: 'absolute',
        top: 0,
        width: '100%'
    },
    imageProductCombo: {
        height: win.width / 4,
        width: '100%'
    },
    noBuy: {
        alignItems: 'center',
        fontSize: 11,
        justifyContent: 'center',
        textAlign: 'center',
        textTransform: 'uppercase'
    }
});

export default styles;
