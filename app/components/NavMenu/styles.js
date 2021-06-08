import { StyleSheet } from 'react-native';
import { Colors } from '../../styles';

export const styles = StyleSheet.create({
    btnClearSearch: {
        height: 40,
        position: 'absolute',
        right: 15,
        top: 5,
        width: 30
    },
    btnClose: {
        alignItems: 'center',
        borderBottomColor: Colors.GRAY_E4E9F2,
        borderBottomWidth: 1,
        borderRightColor: Colors.GRAY_E4E9F2,
        borderRightWidth: 1,
        flex: 1.1,
        flexDirection: 'row',
        height: 50,
        justifyContent: 'center'
    },
    btnHome: {
        alignItems: 'center',
        borderBottomColor: Colors.GRAY_E4E9F2,
        borderBottomWidth: 1,
        flex: 1,
        height: 50,
        justifyContent: 'center'
    },
    container: {
        backgroundColor: Colors.GRAY_EAEEF7,
        flexDirection: 'row',
        paddingTop: 60
    },
    contentBottomRight: {
        paddingBottom: 100
    },
    iconCateChild: {
        height: 50,
        resizeMode: 'contain',
        width: 50
    },
    iconChecked: {
        position: 'absolute',
        resizeMode: 'contain',
        right: 10,
        top: 0,
        width: 16,
        zIndex: 1
    },
    iconClearSearch: {
        resizeMode: 'contain',
        top: 5,
        width: 20
    },
    iconClose: {
        height: 16,
        marginRight: 7,
        width: 16
    },
    iconHome: {
        height: 25,
        width: 25
    },
    iconPromotion: {
        height: 16,
        marginRight: 7,
        width: 16
    },
    iconSearch: {
        position: 'absolute',
        resizeMode: 'contain',
        right: 30,
        top: 10,
        width: 20
    },
    inputSearch: {
        borderColor: Colors.GRAY_8F9BB3,
        borderRadius: 8,
        borderWidth: 1,
        flex: 8,
        height: 40,
        paddingLeft: 20,
        paddingRight: 50
    },
    itemCate: {
        flexDirection: 'row',
        padding: 15
    },
    itemCateActive: {
        backgroundColor: Colors.WHITE,
        borderLeftColor: Colors.GREEN_00AC5B,
        borderLeftWidth: 5
    },
    itemCateChild: {
        alignItems: 'center',
        height: 100,
        justifyContent: 'center',
        marginBottom: 15,
        paddingTop: 10,
        position: 'relative',
        width: 75
    },
    lineEachCate: {
        backgroundColor: Colors.RED,
        height: 20,
        position: 'relative',
        width: '100%'
    },
    listOpacity: {
        opacity: 0.5
    },
    navLeft: {
        flex: 2
    },
    navLeftBottom: {
        fontSize: 11,
        lineHeight: 16
    },
    navLeftTop: {
        flexDirection: 'row'
    },
    navRight: {
        backgroundColor: Colors.WHITE,
        flex: 3
    },
    navRightBottom: {
        borderBottomColor: Colors.GRAY_F8FBFF,
        borderBottomWidth: 8,
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingBottom: 10
    },
    navRightTop: {
        flexDirection: 'row',
        height: 50,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        position: 'relative'
    },
    textBtnClose: {
        color: Colors.GRAY_222B45,
        fontSize: 13,
        fontWeight: 'bold'
    },
    txtCate: {
        color: Colors.GRAY_222B45,
        fontSize: 14,
        fontWeight: 'bold',
        lineHeight: 17
    },
    txtCateChild: {
        marginTop: 0,
        textAlign: 'center'
    },
    txtCateChildActive: {
        fontWeight: 'bold'
    }
});
