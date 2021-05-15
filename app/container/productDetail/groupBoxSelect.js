import React, { Component } from 'react';
import { connect } from 'react-redux';

import { View, StyleSheet, Text } from 'react-native';
import BoxSelect from './boxSelect';

const styles = StyleSheet.create({
    productList: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
});

class GroupBoxSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listProducts: [
                {
                    isNearDate: 0,
                    status: 0,
                    ExpiredDateDisplay: '2 tháng',
                    Avatar:
                        'http://cdn.tgdd.vn/Products/images/2945/201564/bhx/feature/loc-4-hop-thuc-uong-lua-mach-it-duong-milo-active-go-180ml-202104291437478177.png',
                    MaxQuantityOnBill: 3,
                    ShortName: '1 lon 330ml',
                    Price: '5.500đ'
                },
                {
                    isNearDate: 1,
                    status: 1,
                    ExpiredDateDisplay: '3 tháng',
                    Avatar:
                        'https://cdn.tgdd.vn/Products/images/2947/79219/bhx/sua-trai-cay-nutriboost-huong-dau-1-lit-202103290229582034_300x300.jpg',
                    MaxQuantityOnBill: 0,
                    ShortName: '6 lon 330ml',
                    Price: '30.000đ',
                    PromotionText: 'Mua 1 tặng quà',
                    PromotionGiftImgs:
                        'https://cdn.tgdd.vn/Products/images/2565/175894/bhx/thung-100-goi-mi-tom-dac-biet-miliket-giay-vang-65g-202103031707002030_300x300.jpg'
                },
                {
                    isNearDate: 1,
                    status: 2,
                    ExpiredDateDisplay: '23 ngày',
                    Avatar:
                        'https://cdn.tgdd.vn/Products/images/2565/175894/bhx/thung-100-goi-mi-tom-dac-biet-miliket-giay-vang-65g-202103031707002030_300x300.jpg',
                    MaxQuantityOnBill: 1,
                    ShortName: 'Thùng 12 lon',
                    Price: '228.000đ'
                }
            ],
            bhxProduct: {}
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.productList}>
                    {this.state.listProducts.map((product) => {
                        return <BoxSelect bhxProduct={product} />;
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

export default connect(mapStateToProps, mapDispatchToProps)(GroupBoxSelect);
