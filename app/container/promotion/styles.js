import { StyleSheet } from 'react-native';
import { Colors } from '../../styles';

export const styles = StyleSheet.create({
    aquaLine: {
        backgroundColor: Colors.AQUA_91dacf
    },
    blueLine: {
        backgroundColor: Colors.BLUE_8ed1d6
    },
    categoryItem: {
        alignItems: 'center',
        marginRight: 5,
        textAlign: 'center',
        width: 80
    },
    container: {
        flex: 1
    },
    greenLine: {
        backgroundColor: Colors.GREEN_a2e362
    },
    groupCateFilter: {
        alignItems: 'center',
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
        width: '95%'
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
    itemCateFilterActive: {
        backgroundColor: Colors.GREEN_3B854E
    },
    itemGroupCateFilter: {
        flexDirection: 'row'
    },
    lineExpired: {
        alignItems: 'center',
        backgroundColor: Colors.ORANGE_ff7500,
        borderRadius: 15,
        height: 32,
        marginBottom: 10,
        marginHorizontal: 15,
        paddingVertical: 5
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
        marginBottom: 10,
        marginHorizontal: 10,
        paddingVertical: 10,
        textAlign: 'center'
    },
    loading: {
        height: '100%',
        position: 'absolute',
        width: '100%'
    },
    loadingActive: {
        backgroundColor: Colors.GRAY_F8FBFF,
        opacity: 0.3,
        zIndex: 1
    },
    lstProducts: {
        marginBottom: 10
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
    orangeLine: {
        backgroundColor: Colors.ORANGE_FF9534
    },
    pinkLine: {
        backgroundColor: Colors.PINK_ffb7b7
    },
    purpleLine: {
        backgroundColor: Colors.PURPLE_739aff
    },
    redLine: {
        backgroundColor: Colors.RED_e72323
    },
    seafoamLine: {
        backgroundColor: Colors
    },
    skyblueLine: {
        backgroundColor: Colors.SKY_BLUE_90e0ff
    },
    tabDealShock: {
        alignItems: 'center',
        marginBottom: 15
    },
    txtItemCateFilter: {
        color: Colors.BG_BUTTON_BUY,
        textAlign: 'center'
    },
    txtItemCateFilterActive: {
        color: Colors.TURBO
    },
    txtTitleExpired: {
        color: Colors.WHITE_FFF,
        fontSize: 17,
        fontWeight: 'bold',
        height: 32,
        textAlign: 'center',
        textTransform: 'uppercase'
    }
});
