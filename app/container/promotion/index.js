import React, { useEffect, useState } from 'react';
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
import Loading from '../../components/Loading';

const Promotion = () => {
    const dispatch = useDispatch();
    const promotionData = useSelector(
        (state) => state.promotionReducer.Promotion
    );
    const promotionTopDealData = useSelector(
        (state) => state.promotionReducer.TopDealPromotion
    );

    const [isLoading, setIsLoading] = useState(true);
    const listCategoryTop = promotionData?.Categorys;
    const listGroupCate = promotionData?.GroupCate;

    useEffect(() => {
        if (promotionTopDealData && promotionData) {
            setIsLoading(false);
        }
    }, [promotionTopDealData, promotionData]);

    useEffect(() => {
        dispatch(promotionAction.promotionPage_get());
        dispatch(promotionAction.topDealPromotion_get());
    }, []);

    return (
        <View style={styles.container}>
            <Header />
            {isLoading && <Loading />}
            {!isLoading && (
                <ScrollView nestedScrollEnabled>
                    <RenderListCategory lstCategoryTop={listCategoryTop} />
                    <RenderLineDealShock
                        lstProductTopDeal={promotionTopDealData}
                    />
                    <RenderGroupCate
                        listGroupCate={listGroupCate}
                        dispatch={dispatch}
                    />
                </ScrollView>
            )}
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
    function renderGroupCate(item) {
        return (
            <View>
                {item.item.CategoryId === 9998 && (
                    <RenderLineExpired nameCategory={item.item.Text} />
                )}
                {item.item.CategoryId !== 9998 && (
                    <RenderCategoryFilter
                        categorys={item.item.Categorys}
                        nameCategory={item.item.Text}
                        lineColor={item.item.LineColor}
                        promotionCount={item.item.PromotionCount}
                    />
                )}
                <RenderProductEachCategory lstProducts={item.item.Products} />
                {item.item.Query.PromotionCount > 0 && (
                    <RenderLoadMoreProduct
                        promotionCount={item.item.Query.PromotionCount}
                        query={item.item.Query}
                        dispatch={props.dispatch}
                    />
                )}
            </View>
        );
    }

    return (
        <FlatList
            initialNumToRender={2}
            maxToRenderPerBatch={2}
            windowSize={60}
            data={props.listGroupCate}
            keyExtractor={(item) => item.CategoryId}
            renderItem={renderGroupCate}
        />
    );
});

// Render list Category filter of line category
const RenderCategoryFilter = React.memo((props) => {
    function renderColorLine() {
        switch (props.lineColor) {
            case 'green-line':
                return styles.greenLine;
            case 'orange-line':
                return styles.orangeLine;
            case 'blue-line':
                return styles.blueLine;
            case 'pink-line':
                return styles.pinkLine;
            case 'aqua-line':
                return styles.aquaLine;
            case 'skyblue-line':
                return styles.skyblueLine;
            case 'purple-line':
                return styles.purpleLine;
            case 'red-line':
                return styles.redLine;
            default:
                return styles.greenLine;
        }
    }
    return (
        <View style={[styles.groupCateFilter, renderColorLine()]}>
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
                    return (
                        <RenderItemCateFilter
                            item={item.item}
                            index={item.index}
                            promotionCount={props.promotionCount}
                        />
                    );
                }}
            />
        </View>
    );
});

// Render Item Cate filter
const RenderItemCateFilter = React.memo((props) => {
    return (
        <View style={styles.itemGroupCateFilter}>
            {props.index === 0 && (
                <View
                    style={[
                        styles.itemCateFilter,
                        styles.itemCateFilterActive
                    ]}>
                    <TouchableOpacity>
                        <Text
                            style={[
                                styles.txtItemCateFilter,
                                styles.txtItemCateFilterActive
                            ]}>
                            {props.promotionCount} Khuyến mãi Hot
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
            <View style={styles.itemCateFilter}>
                <TouchableOpacity>
                    <Text style={styles.txtItemCateFilter}>
                        {props.item.Name}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
});

// Render product of each category
const RenderProductEachCategory = React.memo((props) => {
    return (
        <View>
            <FlatList
                style={styles.lstProducts}
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
    function loadMoreProduct() {
        props.dispatch(
            promotionAction.loadMoreProductsGroup_post(
                props.query.PageIndex + 1,
                props.query.PageSize,
                props.query.ExcludeProductIds,
                props.query.CategoryId,
                props.query.StringCates
            )
        );
    }
    return (
        <View>
            <TouchableOpacity onPress={() => loadMoreProduct()}>
                <Text style={styles.loadMoreProduct}>
                    Xem thêm {props.promotionCount} sản phẩm
                </Text>
            </TouchableOpacity>
        </View>
    );
});

// RenderLine Xả kho giá sốc
const RenderLineExpired = (props) => {
    return (
        <View style={styles.lineExpired}>
            <Text style={styles.txtTitleExpired}>{props.nameCategory}</Text>
        </View>
    );
};

export default Promotion;
