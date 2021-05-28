import React, { useEffect, useState } from 'react';
import {
    View,
    FlatList,
    ScrollView,
    Text,
    ActivityIndicator,
    SafeAreaView
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import ListCategoryTop from './ListCategoryTop';
import { styles } from './styles';
import Header from '../../components/Header';
import ProductBox from '../../components/ProductBox/ProductBox';
import * as promotionAction from './action';
import LineDealShock from './LineDealShock';
import ListCategoryFilter from './ListCategoryFilter';
import LoadMoreProduct from './LoadMoreProduct';

const Promotion = React.memo(() => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const promotionData = useSelector(
        (state) => state.promotionReducer.Promotion
    );
    const promotionTopDealData = useSelector(
        (state) => state.promotionReducer.TopDealPromotion
    );

    const currentLocation = useSelector(
        (state) => state.locationReducer?.crrLocationRs
    );

    const isLoading = useSelector((state) => state.promotionReducer.IsLoading);

    const listCategoryTop = promotionData?.Categorys;
    const listGroupCate = promotionData?.GroupCate;

    const [lstGroupCateFilter, setListGroupCateFilter] = useState([]);

    // Cate Filter Top
    const [groupCateFilter, setGroupCateFilter] = useState([]);

    useEffect(() => {
        if (promotionData && promotionTopDealData) {
            const listIdGroupCate = listGroupCate?.map((element) => {
                return {
                    GroupCateId: element.CategoryId,
                    GroupCateFilterId: element.GroupCateFilterId || 0
                };
            });

            setListGroupCateFilter(listIdGroupCate);
        }
    }, [promotionData, promotionTopDealData]);

    // Khi Store thay đổi thì lấy lại dữ liệu
    useEffect(() => {
        dispatch(
            promotionAction.promotionPage_get(
                currentLocation.ProvinceId,
                currentLocation.StoreId || 0
            )
        );
        dispatch(
            promotionAction.topDealPromotion_get(
                currentLocation.ProvinceId,
                currentLocation.StoreId || 0
            )
        );
    }, [currentLocation.StoreId]);

    useEffect(() => {
        getPosition();
    }, [groupCateFilter]);

    // Lấy vị trí các group cate để scroll
    function getPosition() {
        const positionFirstLine = 730;
        const heightEachLine = 550;
        const index = listGroupCate?.findIndex((ele) => {
            return ele.CategoryId === groupCateFilter;
        });

        if (index >= 0) {
            return positionFirstLine + (index - 2) * heightEachLine;
        } else {
            return 0;
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <ActivityIndicator
                style={[styles.loading, isLoading && styles.loadingActive]}
                animating={isLoading}
                size="large"
                color="#00ff00"
            />
            <ScrollView contentOffset={{ x: 0, y: getPosition() }}>
                <ListCategoryTop
                    lstCategoryTop={listCategoryTop}
                    setGroupCateFilter={setGroupCateFilter}
                />
                <LineDealShock lstProductTopDeal={promotionTopDealData} />
                <RenderGroupCate
                    listGroupCate={listGroupCate}
                    dispatch={dispatch}
                    lstGroupCateFilter={lstGroupCateFilter}
                    setListGroupCateFilter={setListGroupCateFilter}
                    groupCateFilter={groupCateFilter}
                    navigation={navigation}
                    currentLocation={currentLocation}
                />
            </ScrollView>
        </SafeAreaView>
    );
});

// Render từng line sản phẩm
const RenderGroupCate = React.memo((props) => {
    function renderGroupCate(item) {
        return (
            item.item.Products.length > 0 && (
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
                            groupCateId={item.item.CategoryId}
                            lstGroupCateFilter={props.lstGroupCateFilter}
                            setListGroupCateFilter={
                                props.setListGroupCateFilter
                            }
                            dispatch={props.dispatch}
                            query={item.item.Query}
                            currentLocation={props.currentLocation}
                        />
                    )}
                    <RenderProductEachCategory
                        lstProducts={item.item.Products}
                    />
                    {item.item.CategoryId !== 9998 && (
                        <ListCategoryFilter
                            categorys={item.item.Categorys}
                            promotionCount={item.item.PromotionCount}
                            groupCateId={item.item.CategoryId}
                            lstGroupCateFilter={props.lstGroupCateFilter}
                            setListGroupCateFilter={
                                props.setListGroupCateFilter
                            }
                            dispatch={props.dispatch}
                            query={item.item.Query}
                            isBottom
                            navigation={props.navigation}
                            currentLocation={props.currentLocation}
                        />
                    )}
                    {item.item.Query.PromotionCount > 0 && (
                        <LoadMoreProduct
                            promotionCount={item.item.Query.PromotionCount}
                            query={item.item.Query}
                            dispatch={props.dispatch}
                            currentLocation={props.currentLocation}
                        />
                    )}
                </View>
            )
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
            <ListCategoryFilter
                categorys={props.categorys}
                promotionCount={props.promotionCount}
                groupCateId={props.groupCateId}
                lstGroupCateFilter={props.lstGroupCateFilter}
                setListGroupCateFilter={props.setListGroupCateFilter}
                dispatch={props.dispatch}
                query={props.query}
                isTop
                isBottom={false}
                currentLocation={props.currentLocation}
            />
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

// RenderLine Xả kho giá sốc
const RenderLineExpired = (props) => {
    return (
        <View style={styles.lineExpired}>
            <Text style={styles.txtTitleExpired}>{props.nameCategory}</Text>
        </View>
    );
};

export default Promotion;
