import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, ScrollView, View } from 'react-native';

import axios from 'axios';
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
            isExchangeProduct: true,
            bHXProduct: [],
            exchangeProducts: [],
            relativeProducts: [],
            comboProducts: [],
            banner: 'null'
        };
    }

    componentDidMount() {
        axios({
            method: 'get',
            url:
                'https://staging.bachhoaxanh.com/apiapp/api/product/ProductDetail?productId=76513&provinceId=3&storeId=6463&isMobile=true&clearcache=%22%22'
        })
            .then((res) => {
                const { data } = res;
                const { Value } = data;
                const { exchangeProducts, bHXProduct } = Value;
                this.setState({
                    bHXProduct,
                    exchangeProducts
                });
                if (exchangeProducts.length <= 1) {
                    this.setState({ isExchangeProduct: false });
                }
            })
            .catch((err) => console.log(err));
        axios({
            method: 'get',
            url:
                'https://staging.bachhoaxanh.com/apiapp/api/product/ProductRelative?productId=226339&provinceId=3&storeId=6463&totalSize=6&clearcache=%22%22'
        })
            .then((res) => {
                const { data } = res;
                const { Value } = data;
                this.setState({
                    relativeProducts: Value
                });
            })
            .catch((err) => console.log(err));
        axios({
            method: 'get',
            url:
                'https://staging.bachhoaxanh.com/apiapp/api/product/ComboDetail?productCode=79387%2C85959&quantityPromotionId=2&provinceId=3&storeId=6463&clearcache=%22%22'
        })
            .then((res) => {
                const { data } = res;
                const { Value } = data;
                this.setState({
                    comboProducts: Value
                });
                console.log(
                    JSON.stringify(Value, null, 2),
                    'ValueValueValueValueValueValueValue'
                );
            })
            .catch((err) => console.log(err));
        axios({
            method: 'get',
            url:
                'https://staging.bachhoaxanh.com/apiapp/api/product/BoxBanner?productId=226339&provinceId=3&storeId=6463&isMobile=true&clearcache=%22%22'
        })
            .then((res) => {
                const { data } = res;
                const { Value } = data;
                this.setState({
                    banner: Value.Image
                });
            })
            .catch((err) => console.log(err));
    }

    render() {
        return (
            <ScrollView>
                <ProductGallery />
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}>
                        <ProductArticle />
                    </View>
                    {!this.state.isExchangeProduct && (
                        <View>
                            <Box bHXProduct={this.state.bHXProduct} />
                        </View>
                    )}
                </View>
                {this.state.isExchangeProduct && (
                    <GroupBoxOption
                        exchangeProducts={this.state.exchangeProducts}
                    />
                )}
                {this.state.comboProducts !== [] && (
                    <Combo comboProducts={this.state.comboProducts} />
                )}
                <ProductRelative
                    relativeProducts={this.state.relativeProducts}
                />
                <Image
                    style={{ width: '100%', height: 80 }}
                    resizeMode="cover"
                    source={{ uri: this.state.banner }}
                />
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
