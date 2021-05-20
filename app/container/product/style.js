import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '@app/styles';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    body: {
        backgroundColor: Colors.LINK_WATER_2
    },
    boxCategory: {
        marginBottom: 5,
        paddingRight: 5
    },
    boxTitle: {
        alignItems: 'center',
        bottom: 10,
        display: 'flex',
        justifyContent: 'center',
        left: 0,
        marginVertical: 10,
        position: 'relative',
        right: 0,
        top: 0,
        width: '100%'
    },
    categoryItem: {
        backgroundColor: Colors.WHITE,
        borderColor: Colors.GRAY_MEDIUM,
        borderRadius: 5,
        borderWidth: 1,
        color: Colors.TROPICAL_RAIN_FOREST,
        marginLeft: 5,
        marginTop: 5,
        padding: 10
    },
    categoryItem_black: {
        borderColor: Colors.ZAMBEZI,
        color: Colors.BLACK
    },
    imgTitle: {
        borderRadius: 50,
        bottom: 0,
        height: 50,
        left: '10%',
        marginHorizontal: 0,
        position: 'absolute',
        right: '10%',
        top: 0
    },
    productList: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    slideItem: {
        alignContent: 'center',
        alignItems: 'center',
        color: Colors.WHITE,
        display: 'flex',
        height: 50,
        justifyContent: 'center',
        textAlign: 'center',
        width: '100%'
    },
    viewmoreProduct: {
        backgroundColor: Colors.WHITE,
        borderColor: Colors.TROPICAL_RAIN_FOREST,
        borderRadius: 5,
        borderWidth: 1,
        marginBottom: 10,
        marginLeft: 5,
        marginTop: 5,
        textAlign: 'center',
        width: windowWidth - 10
    },
    viewmoreProduct_text: {
        color: Colors.TROPICAL_RAIN_FOREST,
        padding: 10,
        textAlign: 'center'
    }
});
export default styles;
