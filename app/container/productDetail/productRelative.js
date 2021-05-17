import React, { Component } from 'react';
import { connect } from 'react-redux';

import { View, StyleSheet, Text } from 'react-native';
import ProductBox from '../../components/ProductBox/ProductBox';

const styles = StyleSheet.create({
    productList: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    title: {
        fontSize: 20,
        paddingHorizontal: 10
    }
});

class ProductRelative extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listProducts: [
                {
                    ExpiredDateDisplay: '2 tháng',
                    Avatar:
                        'http://cdn.tgdd.vn/Products/images/2945/201564/bhx/feature/loc-4-hop-thuc-uong-lua-mach-it-duong-milo-active-go-180ml-202104291437478177.png',
                    MaxQuantityOnBill: 3,
                    ShortName: '4 hộp sữa lúa mạch ít đường Milo 180ml',
                    Price: '23.500đ'
                },
                {
                    ExpiredDateDisplay: '3 tháng',
                    Avatar:
                        'https://cdn.tgdd.vn/Products/images/2947/79219/bhx/sua-trai-cay-nutriboost-huong-dau-1-lit-202103290229582034_300x300.jpg',
                    MaxQuantityOnBill: 0,
                    ShortName: 'Sữa trái cây Nutriboost dâu 1 lít',
                    Price: '19.000đ',
                    PromotionText: 'Mua 1 tặng quà',
                    PromotionGiftImgs:
                        'https://cdn.tgdd.vn/Products/images/2565/175894/bhx/thung-100-goi-mi-tom-dac-biet-miliket-giay-vang-65g-202103031707002030_300x300.jpg'
                },
                {
                    ExpiredDateDisplay: '23 ngày',
                    Avatar:
                        'https://cdn.tgdd.vn/Products/images/2565/175894/bhx/thung-100-goi-mi-tom-dac-biet-miliket-giay-vang-65g-202103031707002030_300x300.jpg',
                    MaxQuantityOnBill: 1,
                    ShortName: '100 gói mì tôm đặc biệt Miliket 65g',
                    Price: '228.000đ'
                },
                {
                    ExpiredDateDisplay: '6 tháng',
                    Avatar:
                        'https://cdn.tgdd.vn/Products/images/2565/175894/bhx/thung-100-goi-mi-tom-dac-biet-miliket-giay-vang-65g-202103031707002030_300x300.jpg',
                    MaxQuantityOnBill: 0,
                    ShortName: 'Phở chay vina Bích Chi gói 60g',
                    Price: '4.700đ'
                }
            ],
            bhxProduct: {}
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Sản phẩm liên quan </Text>
                <View style={styles.productList}>
                    {this.state.listProducts.map((product) => {
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
