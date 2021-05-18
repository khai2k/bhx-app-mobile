import React, { Component } from 'react';
import { connect } from 'react-redux';

import { View, Text } from 'react-native';
import ProductBox from '../../components/ProductBox/ProductBox';
import styles from './style';

class ProductRelative extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Sản phẩm liên quan </Text>
                <View style={styles.productList}>
                    {this.props.relativeProducts.map((product) => {
                        return <ProductBox bhxProduct={product} />;
                    })}
                </View>
            </View>
        );
    }
}

const mapStateToProps = function () {
    return {};
};

const mapDispatchToProps = function () {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductRelative);
