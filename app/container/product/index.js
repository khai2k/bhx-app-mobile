import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    View,
    Text,
    ScrollView,
    FlatList,
    TouchableOpacity
} from 'react-native';
import { bindActionCreators } from 'redux';
import { Header } from '@app/components';
import { helper } from '@app/common';
import * as homeCreator from './action';
import ProductBox from '../../components/ProductBox/ProductBox';

// import ProductExpiredBox from '../../components/ProductBox/ProductExpiredBox';
// import ComboProductBox from '../../components/ProductBox/ComboProductBox';

import ListCategories from './ListCategories';
import SliderTitle from './SliderTitle';
import styles from './style';

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listTitle: [
                {
                    titleId: 1,
                    name: '5 lần free ship cho khách hàng mới'
                },
                {
                    titleId: 2,
                    name: 'THỊT, CÁ, TRỨNG, RAU CỦ'
                },
                {
                    titleId: 3,
                    name: 'Hơn 10k sản phẩm đang kinh doanh'
                }
            ]
        };
    }

    componentDidMount() {
        this.props.actionHome.get_listproducts();
        this.props.actionHome.get_listcategories();
    }

    render() {
        if (this.props.HomeReducer === null) {
            return null;
        }

        return (
            <ScrollView style={styles.body} onScroll={handleScroll}>
                <Header navigation={this.props.navigation} />

                <ListCategories
                    listCate={this.props.HomeReducer.ListCategories}
                />
                <Text>{this.state.listTitle.length}</Text>

                <SliderTitle listTitle={this.state.listTitle} />

                {this.props.HomeReducer.HomeData?.map((item) => {
                    return ShowBoxCate(item);
                })}
            </ScrollView>
        );
    }
}

const handleScroll = (event) => {
    const positionX = event.nativeEvent.contentOffset.x;
    const positionY = event.nativeEvent.contentOffset.y;
    console.log('X: ', positionX);
    console.log('Y: ', positionY);
    console.log('--------------');
};

const ShowBoxCate = (category) => {
    if (category != null && !helper.IsEmptyArray(category)) {
        const categoryName = category.Text;
        const totalProduct = category.PromotionCount;
        const viewMoreText = `Xem thêm ${totalProduct} sản phẩm ${categoryName.toLowerCase()}`;

        return (
            <View>
                {ShowMainCate(category)}
                <View style={styles.productList}>
                    {category.Products?.map((item) => {
                        return <ProductBox bhxProduct={item} />;
                    })}
                </View>
                {ShowViewmore(category.MaxPage, viewMoreText)}
            </View>
        );
    } else {
        return null;
    }
};

const ShowMainCate = (category) => {
    if (category.CategoryId === 8686) {
        return (
            <View style={styles.boxCategory}>
                <FlatList
                    horizontal
                    data={category.Categorys}
                    renderItem={({ item }) => (
                        <TouchableOpacity>
                            <View>
                                <Text
                                    style={[
                                        styles.categoryItem,
                                        styles.categoryItem_black
                                    ]}>
                                    {item.Name}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
        );
    }
};

const ShowViewmore = (maxpage, viewMoreText) => {
    if (maxpage > 0) {
        return (
            <TouchableOpacity
                onPress={GenMoreProduct()}
                style={styles.viewmoreProduct}>
                <Text style={styles.viewmoreProduct_text}>{viewMoreText}</Text>
            </TouchableOpacity>
        );
    } else {
        return null;
    }
};

const GenMoreProduct = () => {
    return console.log('test');

    // this.props.actionHome
    //     .get_more_listproducts('', '', 0)
    //     .then((res) => {
    //         console.log('get_more_listproducts');
    //         console.log(res);
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     });
};

const mapStateToProps = (state) => {
    return {
        HomeReducer: state.homeReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actionHome: bindActionCreators(homeCreator, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
