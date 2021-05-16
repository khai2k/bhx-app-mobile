import React from 'react';
import { View, StyleSheet } from 'react-native';
import ProductBox from '../../components/ProductBox/ProductBox';

const Product = (props) => {
    return (
        <View style={styles.productList}>
            {props.listProducts.map((product) => {
                return <ProductBox bhxProduct={product} />;
            })}
        </View>
    );
};

const styles = StyleSheet.create({});

export default Product;
