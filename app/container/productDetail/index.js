import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, ScrollView, View } from 'react-native';
import { bindActionCreators } from 'redux';
import * as productDetailCreator from './action';
import ProductGallery from '../../components/ProductGallery/ProductGallery';
import ProductArticle from './productArticle';
import ProductRelative from './productRelative';
import GroupBoxOption from './groupBoxOption';
import Box from './box';
import Combo from './combo';

class ProductDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comboProducts: true
        };
        const { route } = props;
        const { productId } = route.params;
        console.log(productId, '=======================');
        this.props.actionProductDetail.get_gallery_product(productId);
        this.props.actionProductDetail.get_product_detail(productId);
        this.props.actionProductDetail.get_product_relative(productId);
        this.props.actionProductDetail.get_combo_detail(productId);
        this.props.actionProductDetail.get_box_banner(productId);
    }

    render() {
        return (
            <ScrollView>
                <ProductGallery Gallery_product={this.props.Gallery_product} />
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}>
                        <ProductArticle product={this.props.Product_detail} />
                    </View>
                    {!this.props.isExchangeProduct && (
                        <View>
                            <Box
                                bHXProduct={
                                    this.props.Product_detail.bHXProduct || []
                                }
                            />
                        </View>
                    )}
                </View>
                {this.props.isExchangeProduct && (
                    <GroupBoxOption
                        exchangeProducts={
                            this.props.Product_detail.exchangeProducts || []
                        }
                    />
                )}
                {this.state.comboProducts && (
                    <Combo comboProducts={this.props.Combo_detail} />
                )}
                <ProductRelative
                    relativeProducts={this.props.Product_relative}
                />
                <Image
                    style={{ width: '100%', height: 80 }}
                    resizeMode="cover"
                    source={{ uri: this.props.Box_banner.Image }}
                />
            </ScrollView>
        );
    }
}

const mapStateToProps = function (state) {
    return {
        Product_detail: state.productDetailReducer.Product_detail,
        Product_relative: state.productDetailReducer.Product_relative,
        Combo_detail: state.productDetailReducer.Combo_detail,
        Box_banner: state.productDetailReducer.Box_banner,
        isExchangeProduct: state.productDetailReducer.isExchangeProduct,
        Gallery_product: state.productDetailReducer.Gallery_product
    };
};

const mapDispatchToProps = function (dispatch) {
    return {
        actionProductDetail: bindActionCreators(productDetailCreator, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
