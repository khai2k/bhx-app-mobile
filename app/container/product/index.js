import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    View,
    Text,
    ScrollView,
    FlatList,
    TouchableOpacity,
    Alert
} from 'react-native';
import { bindActionCreators } from 'redux';
import { Header } from '@app/components';
import * as homeCreator from './action';
import ProductBox from '../../components/ProductBox/ProductBox';
// import ProductExpiredBox from '../../components/ProductBox/ProductExpiredBox';
// import ComboProductBox from '../../components/ProductBox/ComboProductBox';
import ListCategories from './ListCategories';
import SliderTitle from './SliderTitle';
import styles from './style';

class Product extends Component {
    listTitle = [
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
    ];

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.actionHome.get_listproducts();
        this.props.actionHome.get_listcategories();
    }

    render() {
        return (
            <ScrollView style={styles.body} onScroll={handleScroll}>
                <Header navigation={this.props.navigation} />

                <ListCategories
                    listCate={this.props.HomeReducer?.ListCategories}
                />

                <SliderTitle listTitle={this.listTitle} />

                {this.props.HomeReducer.HomeData?.map((lineItem) => {
                    return (
                        <RenderLineItem
                            actionHome={this.props.actionHome}
                            category={lineItem}
                            productIds={this.productIds}
                        />
                    );
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

const RenderLineItem = (props) => {
    const productIds = [];

    function GenMoreProduct(pageIndex, categoryIds, excludeProductIds) {
        pageIndex += 1;
        props.actionHome
            .get_more_listproducts(
                categoryIds.toString(),
                excludeProductIds.toString(),
                pageIndex
            )
            .then((res) => {
                console.log('GenMoreProduct Data:');
                console.log(res);
                Alert.alert(res.Message);
            })
            .catch((error) => {
                console.log('GenMoreProduct Error: ', error);
            });
    }

    const {
        Categorys,
        CategoryId,
        Products,
        PromotionCount,
        MaxPage,
        PageIndex,
        CategoryIds
    } = props.category;
    const viewMoreText = `Xem thêm ${PromotionCount} sản phẩm`;

    return (
        <View>
            <ShowMainCate categories={Categorys} categoryId={CategoryId} />
            <View style={styles.productList}>
                {Products?.map((item) => {
                    productIds.push(item.Id);
                    return <ProductBox bhxProduct={item} />;
                })}
            </View>
            {MaxPage > 0 && (
                <TouchableOpacity
                    onPress={() =>
                        GenMoreProduct(PageIndex, CategoryIds, productIds)
                    }
                    style={styles.viewmoreProduct}>
                    <View style={styles.viewmoreProduct_text}>
                        <Text style={styles.viewmoreProduct_total}>
                            {viewMoreText}
                        </Text>
                        <Text style={styles.viewmoreProduct_cateName}>
                            {props.category.Text.toLowerCase()}
                        </Text>
                    </View>
                </TouchableOpacity>
            )}
        </View>
    );
};

const ShowMainCate = (props) => {
    const { categories } = props.categories;
    const { categoryId } = props.categoryId;
    return (
        categoryId === 8686 && (
            <View style={styles.boxCategory}>
                <FlatList
                    horizontal
                    data={categories}
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
        )
    );
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
