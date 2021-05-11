import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
import { translate } from '@app/translate';
import { Header } from '@app/components';
import ProductBox from '../../components/ProductBox/ProductBox';
import ProductExpiredBox from '../../components/ProductBox/ProductExpiredBox';
import ComboProductBox from '../../components/ProductBox/ComboProductBox';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import axios from 'axios';

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
                    ExpiredDateDisplay: '2 tháng',
                    Avatar:
                        'http://cdn.tgdd.vn/Products/Images/2945/201564/bhx/feature/loc-4-hop-thuc-uong-lua-mach-it-duong-milo-active-go-180ml-202104291437478177.png',
                    MaxQuantityOnBill: 3,
                    ShortName: '4 hộp sữa lúa mạch ít đường Milo 180ml',
                    Price: '23.500đ'
                },
                {
                    ExpiredDateDisplay: '3 tháng',
                    Avatar:
                        'https://cdn.tgdd.vn/Products/Images/2947/79219/bhx/sua-trai-cay-nutriboost-huong-dau-1-lit-202103290229582034_300x300.jpg',
                    MaxQuantityOnBill: 0,
                    ShortName: 'Sữa trái cây Nutriboost dâu 1 lít',
                    Price: '19.000đ',
                    PromotionText: 'Mua 1 tặng quà',
                    PromotionGiftImgs:
                        'https://cdn.tgdd.vn/Products/Images/2565/175894/bhx/thung-100-goi-mi-tom-dac-biet-miliket-giay-vang-65g-202103031707002030_300x300.jpg'
                },
                {
                    ExpiredDateDisplay: '23 ngày',
                    Avatar:
                        'https://cdn.tgdd.vn/Products/Images/2565/175894/bhx/thung-100-goi-mi-tom-dac-biet-miliket-giay-vang-65g-202103031707002030_300x300.jpg',
                    MaxQuantityOnBill: 1,
                    ShortName: '100 gói mì tôm đặc biệt Miliket 65g',
                    Price: '228.000đ'
                },
                {
                    ExpiredDateDisplay: '6 tháng',
                    Avatar:
                        'https://cdn.tgdd.vn/Products/Images/2565/175894/bhx/thung-100-goi-mi-tom-dac-biet-miliket-giay-vang-65g-202103031707002030_300x300.jpg',
                    MaxQuantityOnBill: 0,
                    ShortName: 'Phở chay vina Bích Chi gói 60g',
                    Price: '4.700đ',
                    IsExpired: true
                }
            ],
            bhxProduct: {}
        };
    }

    componentDidMount() {
        axios({
            method: 'get',
            url:
                'http://apiappbeta.bachhoaxanh.com/api/product/get?productId=196828&province=0&store=6463',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {
                const bhxProduct = res.data;
                console.log('Api response: ' + res.data);
                this.setState({ bhxProduct: bhxProduct });
            })
            .catch((err) => console.log(err));
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
                    {this.state.listProducts.map((product, i) => {
                        return <ProductExpiredBox bhxProduct={product} />;
                    })}
                    {this.state.listProducts.map((product, i) => {
                        return <ComboProductBox bhxProduct={product} />;
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
