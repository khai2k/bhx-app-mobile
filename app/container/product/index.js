import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
import { translate } from '@app/translate';
import { Header } from '@app/components';
import ProductBox from '../../components/ProductBox/ProductBox';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    productList: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
});

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listProducts: [
                {
                    expiredDateDisplay: '2 tháng',
                    avatar:
                        'http://cdn.tgdd.vn/Products/Images/2945/201564/bhx/feature/loc-4-hop-thuc-uong-lua-mach-it-duong-milo-active-go-180ml-202104291437478177.png',
                    maxQuantityOnBill: 3,
                    shortName: '4 hộp sữa lúa mạch ít đường Milo 180ml',
                    price: '23.500đ'
                },
                {
                    expiredDateDisplay: '3 tháng',
                    avatar:
                        'https://cdn.tgdd.vn/Products/Images/2947/79219/bhx/sua-trai-cay-nutriboost-huong-dau-1-lit-202103290229582034_300x300.jpg',
                    maxQuantityOnBill: 0,
                    shortName: 'Sữa trái cây Nutriboost dâu 1 lít',
                    price: '19.000đ',
                    promotionText: 'Mua 1 tặng quà',
                    promotionGiftImgs:
                        'https://cdn.tgdd.vn/Products/Images/2565/175894/bhx/thung-100-goi-mi-tom-dac-biet-miliket-giay-vang-65g-202103031707002030_300x300.jpg'
                },
                {
                    expiredDateDisplay: '23 ngày',
                    avatar:
                        'https://cdn.tgdd.vn/Products/Images/2565/175894/bhx/thung-100-goi-mi-tom-dac-biet-miliket-giay-vang-65g-202103031707002030_300x300.jpg',
                    maxQuantityOnBill: 1,
                    shortName: '100 gói mì tôm đặc biệt Miliket 65g',
                    price: '228.000đ'
                },
                {
                    expiredDateDisplay: '6 tháng',
                    avatar:
                        'https://cdn.tgdd.vn/Products/Images/2565/175894/bhx/thung-100-goi-mi-tom-dac-biet-miliket-giay-vang-65g-202103031707002030_300x300.jpg',
                    maxQuantityOnBill: 0,
                    shortName: 'Phở chay vina Bích Chi gói 60g',
                    price: '4.700đ',
                    isExpired: true
                }
            ]
        };
    }

    render() {
        // return (
        //     <View style={styles.container}>
        //         <Text style={{fontSize: 30}}>{translate('Product')}</Text>
        //     </View>
        // );
        return (
            <View style={styles.container}>
                <Header />
                <View style={styles.productList}>
                    {this.state.listProducts.map((product, i) => {
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

export default connect(mapStateToProps, mapDispatchToProps)(Product);
