import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';

import ProductGallery from '../../components/ProductGallery/ProductGallery';
import ProductArticle from './productArticle';

class ProductDetail extends Component {
    render() {
        return (
            <View>
                <ProductGallery />
                <ProductArticle />
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
