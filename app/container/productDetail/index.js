import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { bindActionCreators } from 'redux';
import { Header, LoadingCart } from '@app/components';
import { helper } from '@app/common';
import * as productDetailCreator from './action';
import ProductGallery from '../../components/ProductGallery/ProductGallery';
import ProductArticle from './productArticle';
import ProductRelative from './productRelative';

class ProductDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comboProducts: true
        };
        const { route, location } = props;
        const { productId } = route.params;
        this.props.actionProductDetail.fetchAll(productId, location);
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView>
                    {this.props.Is_loading === true ? (
                        <View style={{ flex: 1 }}>
                            <LoadingCart />
                            <LoadingCart />
                            <LoadingCart />
                            <LoadingCart />
                        </View>
                    ) : (
                        <View>
                            <Header />
                            <ProductGallery
                                Gallery_product={this.props.Gallery_product}
                            />
                            <ProductArticle
                                product={this.props.Product_detail}
                                isExchangeProduct={this.props.isExchangeProduct}
                            />
                            <ProductRelative
                                relativeProducts={this.props.Product_relative}
                            />
                            {!helper.isEmptyOrNull(this.props.Box_banner) && (
                                <Image
                                    style={{ width: '100%', height: 80 }}
                                    resizeMode="cover"
                                    source={{
                                        uri: this.props.Box_banner.Image
                                    }}
                                />
                            )}
                        </View>
                    )}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 200,
        justifyContent: 'center'
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    }
});

const mapStateToProps = function (state) {
    return {
        Product_detail: state.productDetailReducer.Product_detail,
        Product_relative: state.productDetailReducer.Product_relative,
        Combo_detail: state.productDetailReducer.Combo_detail,
        Box_banner: state.productDetailReducer.Box_banner,
        isExchangeProduct: state.productDetailReducer.isExchangeProduct,
        Gallery_product: state.productDetailReducer.Gallery_product,
        Is_loading: state.productDetailReducer.Is_loading,
        location: state.generalReducer.Location.LocationInfo
    };
};

const mapDispatchToProps = function (dispatch) {
    return {
        actionProductDetail: bindActionCreators(productDetailCreator, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
