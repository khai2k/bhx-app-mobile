import { StyleSheet } from 'react-native';
import { Colors } from '../../../styles';

export const styles = StyleSheet.create({
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
        flex: 1
    },
    iconCateChild: {
        resizeMode: 'contain',
        width: 60
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
        backgroundColor: Colors.BLUE_ASTRONAUT,
        height: 80,
        justifyContent: 'center',
        width: 80
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
        backgroundColor: Colors.CORAL_RED,
        marginTop: 5
    },
    navRightTop: {
        flexDirection: 'row',
        height: 40,
        paddingBottom: 5,
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
    }
});
