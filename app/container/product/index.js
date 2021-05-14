import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
// import { translate } from '@app/translate';
import { Header } from '@app/components';
import ProductBox from '../../components/ProductBox/ProductBox';
import ProductExpiredBox from '../../components/ProductBox/ProductExpiredBox';
import ComboProductBox from '../../components/ProductBox/ComboProductBox';

import ListCategory from './ListCategory';
import SliderTitle from './SliderTitle';

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
                        'https://cdn.tgdd.vn/Products/images/2386/85541/bhx/thung-48-bich-sua-dinh-duong-co-duong-vinamilk-happy-star-220ml-202104131024078812_300x300.jpg',
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
                    Price: '4.700đ',
                    Sales: {}
                },
                {
                    ExpiredDateDisplay: '6 tháng',
                    MaxQuantityOnBill: 0,
                    ShortName: 'Phở chay vina Bích Chi gói 60g',
                    Price: '4.700đ',
                    Sales: {},
                    FeatureImageModel: {
                        ThemeMobile:
                            'https://cdn.tgdd.vn/bachhoaxanh/themes-combo/7.Mobile.jpg',
                        ImageMobile:
                            'https://cdn.tgdd.vn/Products/images/2386/219025/bhx/feature/sua-tuoi-nguyen-kem-khong-duong-inex-hop-1-lit-202102200840479611.png'
                    }
                }
            ]
        };
    }

    // componentDidMount() {
    //     axios({
    //         method: 'get',
    //         url:
    //             'https://beta.bachhoaxanh.com/apiapp/api/product/Get?productId=196828&provinceId=3&storeId=6463',
    //         headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json'
    //         }
    //     })
    //         .then((res) => {
    //             const bhxProduct = res.data;
    //             console.log(`Api response: ${res.data}`);
    //             this.setState({ bhxProduct });
    //         })
    //         .catch((err) => console.log(err));
    // }

    render() {
        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation} />
                <SliderTitle />
                <ListCategory />
                <View style={styles.productList}>
                    {this.state.listProducts.map((product) => {
                        return <ProductBox bhxProduct={product} />;
                    })}
                    {this.state.listProducts.map((product) => {
                        return <ProductExpiredBox bhxProduct={product} />;
                    })}
                    {this.state.listProducts.map((product) => {
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
