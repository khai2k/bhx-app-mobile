import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '@app/styles';

const win = Dimensions.get('window');
const ratio = win.width/3/300; //product image width

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
        textTransform: 'uppercase',
    },
    down: {
        backgroundColor: Colors.WHITE,
        borderColor: Colors.GALLERY,
        borderTopWidth: 0,
        borderWidth: 1,
        fontStyle: 'normal',
        height: 34,
        lineHeight: 30,
        position: 'relative',
        textAlign: 'center',
        width: '33%'
    },
    imageProduct: {
        borderTopLeftRadius: 7,
        borderTopRightRadius: 7,
        width: win.width / 3,
        height: ratio * 300
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
        textAlign: 'center',
    },
    priceInfo: {
        justifyContent: 'space-between',
        width: '100%',
        flexDirection: 'row'
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
        width: win.width/3 - 6,
        height: 'auto'
    },
    productImg: {
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        overflow: 'hidden',
        position: 'relative',
        width: '100%',
    },
    productInfo: {
        height: 32,
        position: 'relative',
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
    updown: {
        display: 'none'
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
        height: 18
    }
});

export default styles;
