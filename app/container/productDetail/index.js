import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';

import ProductGallery from '../../components/ProductGallery/ProductGallery';

class ProductDetail extends Component {
    render() {
        return (
            <View>
                <ProductGallery />
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
