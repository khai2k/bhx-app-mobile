import { StyleSheet } from 'react-native';
import { Colors } from '../../styles';

export const styles = StyleSheet.create({
    categoryItem: {
        alignItems: 'center',
        marginRight: 5,
        textAlign: 'center',
        width: 80
    },
    iconCategory: {
        height: 50,
        resizeMode: 'contain',
        width: 50
    },
    iconDealShock: {
        resizeMode: 'contain',
        width: '80%'
    },
    listCategory: {
        backgroundColor: Colors.WHITE_FFF,
        padding: 10
    },
    listProductDeal: {
        backgroundColor: Colors.ORANGE_FF9534,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    nameCategory: {
        textAlign: 'center'
    },
    tabDealShock: {
        alignItems: 'center',
        minHeight: '100%'
    }
});
