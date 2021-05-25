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
        if (item.CategoryId !== 9998) {
            return (
                <View>
                    <RenderCategoryFilter
                        categorys={item.item.Categorys}
                        nameCategory={item.item.Text}
                    />
                    <RenderProductEachCategory
                        lstProducts={item.item.Products}
                    />
                    {item.item.PromotionCount > 0 && (
                        <RenderLoadMoreProduct
                            promotionCount={item.item.PromotionCount}
                            query={item.item.Query}
                            dispatch={props.dispatch}
                        />
                    )}
                </View>
            );
        }
        // } else {
        //     return <RenderLineExpired />;
        // }
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
// const RenderLineExpired = (props) => {
//     return <View />;
// };

export default Promotion;
