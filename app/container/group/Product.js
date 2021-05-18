import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Colors } from '@app/styles';
import ProductBox from '../../components/ProductBox/ProductBox';

const Product = (props) => {
    if (props.listProducts && props.listProducts.length > 0) {
        return (
            <FlatList
                style={{ flex: 1 }}
                numColumns={3}
                data={props.listProducts}
                renderItem={({ item }) => <ProductBox bhxProduct={item} />}
            />
        );
    } else {
        return (
            <View style={styles.productList}>
                <Text style={styles.emptyText}>
                    Không có sản phẩm nào thoả {'\n'} tiêu chí đã chọn
                </Text>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    emptyText: {
        color: Colors.DOVE_GRAY,
        fontSize: 16,
        paddingBottom: 86,
        paddingLeft: 29,
        paddingRight: 29,
        paddingTop: 45,
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    productList: {
        flex: 1
    }
});

export default Product;
