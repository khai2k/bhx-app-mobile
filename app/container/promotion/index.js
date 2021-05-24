import React, { useEffect } from 'react';
import {
    Image,
    View,
    FlatList,
    TouchableOpacity,
    ScrollView,
    Text
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { styles } from './styles';
import Header from '../../components/Header';
import { IconPromotion } from '../../images';
import ProductBox from '../../components/ProductBox/ProductBox';
import * as promotionAction from './action';

const Promotion = () => {
    const dispatch = useDispatch();
    const promotionData = useSelector(
        (state) => state.promotionReducer.Promotion
    );
    const promotionTopDealData = useSelector(
        (state) => state.promotionReducer.TopDealPromotion
    );

    const listCategoryTop = promotionData?.Categorys;
    const listGroupCate = promotionData?.GroupCate;

    useEffect(() => {
        dispatch(promotionAction.promotionPage_get());
        dispatch(promotionAction.topDealPromotion_get());
    }, []);

    return (
        <View style={styles.container}>
            <Header />
            <ScrollView nestedScrollEnabled>
                <RenderListCategory lstCategoryTop={listCategoryTop} />
                <RenderLineDealShock lstProductTopDeal={promotionTopDealData} />
                <RenderGroupCate listGroupCate={listGroupCate} />
            </ScrollView>
        </View>
    );
};

// Render danh sách category
const RenderListCategory = (props) => {
    return (
        <View style={styles.listCategory}>
            <FlatList
                horizontal
                initialNumToRender={5}
                maxToRenderPerBatch={5}
                windowSize={60}
                showsHorizontalScrollIndicator={false}
                data={props.lstCategoryTop}
                keyExtractor={(item) => item.Id}
                renderItem={(item) => {
                    return <RenderCategory item={item} />;
                }}
            />
        </View>
    );
};

// Render category
const RenderCategory = React.memo((props) => {
    const { item } = props.item;
    return (
        <TouchableOpacity style={styles.categoryItem}>
            <Image
                style={styles.iconCategory}
                source={{ uri: `https://${item.ImgUrl}` }}
            />
            <Text style={styles.nameCategory}>{item.Name} </Text>
        </TouchableOpacity>
    );
});

// Render tab deal sốc mỗi ngày
const RenderLineDealShock = (props) => {
    return (
        <View style={styles.tabDealShock}>
            <View style={styles.imgIconDealShock}>
                <Image
                    style={styles.iconDealShock}
                    source={IconPromotion.iconDealSoc}
                />
            </View>
            <FlatList
                style={styles.listProductDeal}
                numColumns="3"
                data={props.lstProductTopDeal}
                keyExtractor={(item) => item.Id}
                renderItem={(item) => {
                    return <ProductBox bhxProduct={item.item} />;
                }}
            />
        </View>
    );
};

// Render từng line sản phẩm
const RenderGroupCate = React.memo((props) => {
    return (
        <FlatList
            initialNumToRender={2}
            maxToRenderPerBatch={2}
            windowSize={60}
            data={props.listGroupCate}
            keyExtractor={(item) => item.CategoryId}
            renderItem={(item) => {
                return (
                    item.item.CategoryId !== 9998 && (
                        <View>
                            <RenderCategoryFilter
                                categorys={item.item.Categorys}
                                nameCategory={item.item.Text}
                            />
                            <RenderProductEachCategory
                                lstProducts={item.item.Products}
                            />
                            <RenderLoadMoreProduct
                                promotionCount={item.item.PromotionCount}
                            />
                        </View>
                    )
                );
            }}
        />
    );
});

// Render list Category filter of line category
const RenderCategoryFilter = React.memo((props) => {
    return (
        <View style={styles.groupCateFilter}>
            <View>
                <Text style={styles.nameGroupCategory}>
                    {props.nameCategory}
                </Text>
            </View>
            <FlatList
                horizontal
                initialNumToRender={10}
                maxToRenderPerBatch={10}
                windowSize={60}
                showsHorizontalScrollIndicator={false}
                data={props.categorys}
                keyExtractor={(item) => item.Id}
                renderItem={(item) => {
                    return <RenderItemCateFilter item={item.item} />;
                }}
            />
        </View>
    );
});

// Render Item Cate filter
const RenderItemCateFilter = React.memo((props) => {
    return (
        <View style={styles.itemCateFilter}>
            <TouchableOpacity>
                <Text style={styles.txtItemCateFilter}>{props.item.Name}</Text>
            </TouchableOpacity>
        </View>
    );
});

// Render product of each category
const RenderProductEachCategory = React.memo((props) => {
    return (
        <View>
            <FlatList
                windowSize={60}
                numColumns={3}
                data={props.lstProducts}
                keyExtractor={(item) => item.Id}
                renderItem={(item) => {
                    return <ProductBox bhxProduct={item.item} />;
                }}
            />
        </View>
    );
});

// Render Load more product
const RenderLoadMoreProduct = React.memo((props) => {
    return (
        <View>
            <TouchableOpacity>
                <Text style={styles.loadMoreProduct}>
                    Xem thêm {props.promotionCount} sản phẩm
                </Text>
            </TouchableOpacity>
        </View>
    );
});

export default Promotion;
