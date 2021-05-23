import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '@app/styles';

const win = Dimensions.get('window');

const styles = StyleSheet.create({
    ExpiredText: {
        color: Colors.GRAY_DARK
    },
    productList: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    title: {
        fontSize: 20,
        paddingHorizontal: 10
    },
    container: {
        marginBottom: 10
    },
    Image: {
        height: 20,
        margin: 5,
        width: 20
    },
    boxBuy: {
        alignItems: 'center',
        backgroundColor: Colors.WHITE,
        borderBottomLeftRadius: 7,
        borderBottomRightRadius: 7,
        borderTopColor: Colors.CATSKILL_WHITE,
        borderTopWidth: 1,
        height: 35,
        justifyContent: 'center',
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
    center: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center'
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
    price: {
        alignItems: 'center',
        color: Colors.CLOUD_BURST,
        flexBasis: 'auto',
        flexGrow: 1,
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
    product: {
        backgroundColor: Colors.WHITE,
        borderColor: Colors.TROPICAL_RAIN_FOREST,
        borderRadius: 8,
        borderWidth: 1,
        height: 'auto',
        marginBottom: 0,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 7,
        padding: 0,
        position: 'relative',
        shadowColor: Colors.LINK_WATER,
        shadowOffset: { height: 3, width: 0 },
        shadowOpacity: 0.5,
        width: win.width / 3 - 6
    },
    productNearDate: {
        alignItems: 'center',
        backgroundColor: Colors.GRAY_E4E9F2,
        borderRadius: 8,
        height: 'auto',
        justifyContent: 'center',
        marginBottom: 10,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 7,
        paddingVertical: 5,
        position: 'relative',
        shadowColor: Colors.LINK_WATER,
        shadowOffset: { height: 3, width: 0 },
        shadowOpacity: 0.5,
        width: win.width / 3 - 6
    },
    productOutOfStock: {
        backgroundColor: Colors.WHITE,
        borderColor: Colors.BLACK,
        borderRadius: 8,
        borderWidth: 1,
        height: 'auto',
        marginBottom: 0,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 7,
        padding: 0,
        position: 'relative',
        shadowColor: Colors.LINK_WATER,
        shadowOffset: { height: 3, width: 0 },
        shadowOpacity: 0.5,
        width: win.width / 3 - 6
    },
    textProductNearDate: {
        alignItems: 'center',
        backgroundColor: Colors.GRAY_EAEEF7,
        justifyContent: 'center',
        paddingVertical: 2
    },
    unvisibleProductBuy: {
        display: 'none'
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
    upDownShow: {
        display: 'flex',
        flexDirection: 'row',
        height: 35
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
    visibleProductBuy: {
        display: 'flex'
    },

    /// combo
    combo_container: {
        backgroundColor: Colors.WHITE,
        margin: 5,
        padding: 5
    },
    combo_price: {
        color: Colors.GRAY_DARK,
        flex: 1,
        textDecorationLine: 'line-through'
    },
    combo_expired: {
        color: Colors.GRAY_DARK,
        flex: 2
    },
    combo_title: {
        fontSize: 20,
        paddingVertical: 10
    }
});

export default styles;
