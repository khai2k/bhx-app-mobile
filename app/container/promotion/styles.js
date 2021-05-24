import { StyleSheet } from 'react-native';
import { Colors } from '../../styles';

export const styles = StyleSheet.create({
    categoryItem: {
        alignItems: 'center',
        marginRight: 5,
        textAlign: 'center',
        width: 80
    },
    container: {
        flex: 1
    },
    groupCateFilter: {
        alignItems: 'center',
        backgroundColor: Colors.BLUE_8ed1d6,
        flexDirection: 'row',
        marginBottom: 10,
        padding: 10
    },
    iconCategory: {
        height: 50,
        resizeMode: 'contain',
        width: 50
    },
    iconDealShock: {
        position: 'absolute',
        resizeMode: 'contain',
        width: '80%'
    },
    imgIconDealShock: {
        alignItems: 'center',
        paddingBottom: 50,
        position: 'relative'
    },
    itemCateFilter: {
        alignItems: 'center',
        backgroundColor: Colors.WHITE,
        borderColor: Colors.GRAY_c5cee0,
        borderRadius: 5,
        borderWidth: 1,
        marginRight: 5,
        padding: 5,
        width: 100
    },
    listCategory: {
        backgroundColor: Colors.WHITE_FFF,
        padding: 10
    },
    listProductDeal: {
        backgroundColor: Colors.ORANGE_FF9534,
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingBottom: 10
    },
    loadMoreProduct: {
        alignItems: 'center',
        borderColor: Colors.BG_BUTTON_BUY,
        borderRadius: 5,
        borderWidth: 1,
        color: Colors.BG_BUTTON_BUY,
        fontSize: 14,
        marginHorizontal: 10,
        marginVertical: 10,
        paddingVertical: 10,
        textAlign: 'center'
    },
    nameCategory: {
        textAlign: 'center'
    },
    nameGroupCategory: {
        alignItems: 'center',
        color: Colors.WHITE,
        fontSize: 14,
        fontWeight: 'bold',
        width: 70
    },
    tabDealShock: {
        alignItems: 'center',
        marginBottom: 15
    },
    txtItemCateFilter: {
        color: Colors.BG_BUTTON_BUY,
        textAlign: 'center'
    }
});
