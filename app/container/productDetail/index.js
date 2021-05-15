import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, View } from 'react-native';

import ProductGallery from '../../components/ProductGallery/ProductGallery';
import ProductArticle from './productArticle';
import ProductRelative from './productRelative';
import GroupBoxSelect from './groupBoxSelect';

class ProductDetail extends Component {
    render() {
        return (
            <ScrollView>
                <ProductGallery />
                <ProductArticle />
                <GroupBoxSelect />
                <ProductRelative />
            </ScrollView>
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
