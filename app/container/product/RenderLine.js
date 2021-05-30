import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    SafeAreaView,
    Alert
} from 'react-native';
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import * as homeCreator from '@app/container/product/action';
import { apiBase, METHOD, API_CONST } from '@app/api';
import styles from './style';
import ProductBox from '../../components/ProductBox/ProductBox';

const RenderLine = (props) => {
    const dispatch = useDispatch();
    const actionHome = bindActionCreators(homeCreator, dispatch);

    const [pageIndex, setPageIndex] = useState(-1); // pageindex
    const [products, setProducts] = useState(props.lineItem.Products); // list product
    const [totalProduct, setTotalProduct] = useState(
        props.lineItem.PromotionCount
    ); // total product
    const [categoriesIdFresh, setCategoriesIdFresh] = useState([]); // list category id fresh
    const [categoryId, setCategoryId] = useState(); // category fresh id
    const [virtualChildCateIds, setVirtualChildCateIds] = useState([]); // child category fresh id
    const [selectedId, setSelectedId] = useState(0); // category fresh active
    const [isClickCateFresh, setIsClickCateFresh] = useState(false); // check click category fresh
    const [isClickViewmore, setIsClickViewmore] = useState(false); // check click xem them
    if (
        props.lineItem.CategoryId === 8686 &&
        props.lineItem.Categorys !== null &&
        categoriesIdFresh !== null &&
        categoriesIdFresh.length <= 0
    ) {
        const listId = [];
        props.lineItem.Categorys?.map((item) => {
            return listId.push(item.Id);
        });
        setCategoriesIdFresh(listId);
    }

    useEffect(() => {
        isClickCateFresh && GetProductFreshCate();
    }, [isClickCateFresh]);

    useEffect(() => {
        isClickViewmore && GenMoreProduct();
    }, [isClickViewmore]);

    // Chỉ lấy 9 productid mới nhất truyền vô excludeProductIds
    function Get9ProductId() {
        const excludeProductIds = [];
        const get9LastProduct = products.slice(
            products.length - 9,
            products.length
        );
        get9LastProduct?.map((item) => {
            return excludeProductIds.push(item.Id);
        });
        return excludeProductIds;
    }

    // Xem thêm sản phẩm của các line
    function GenMoreProduct() {
        const excludeProductIds = Get9ProductId();

        const bodyApi = {
            token: '',
            us: '',
            provinceId: 3,
            districtId: 0,
            wardId: 0,
            storeId: 6463,
            data: {
                ListProducts: '',
                PageIndex: pageIndex,
                PageSize: 9,
                Phone: '',
                CategoryIds: props.lineItem?.CategoryIds.toString(),
                ExcludeProductIds: excludeProductIds.toString(),
                CategoryId: 0,
                ListCategoryIds: ''
            }
        };
        apiBase(API_CONST.GET_MORE_LIST_PRODUCT, METHOD.POST, bodyApi)
            .then((response) => {
                console.log('GET_MORE_LIST_PRODUCT Data:', response);
                setIsClickViewmore(false);
                setProducts([...products, ...response.Value]);
                if (response.OtherData?.TotalRest > 0) {
                    setPageIndex(pageIndex + 1);
                    setTotalProduct(response.OtherData.TotalRest);
                }
            })
            .catch((error) => {
                console.log('GET_MORE_LIST_PRODUCT Error:', error);
            });
    }

    function GetProductFreshCate() {
        const excludeProductIds = pageIndex > 0 ? Get9ProductId() : [];
        const bodyApi = {
            token: '',
            us: '',
            provinceId: 3,
            districtId: 0,
            wardId: 0,
            storeId: 6463,
            data: {
                ListProducts: '',
                PageIndex: pageIndex,
                PageSize: 9,
                Phone: '',
                CategoryIds:
                    virtualChildCateIds !== null &&
                    virtualChildCateIds.length > 0
                        ? virtualChildCateIds.toString()
                        : categoryId.toString(),
                ExcludeProductIds: excludeProductIds?.toString(),
                CategoryId: categoryId,
                ListCategoryIds: categoriesIdFresh?.toString()
            },
            IsMobile: true
        };
        apiBase(API_CONST.GET_FRESH_PRODUCTS, METHOD.POST, bodyApi)
            .then((response) => {
                console.log('GET_FRESH_PRODUCTS Data:', response);
                setIsClickCateFresh(false);
                if (
                    response !== null &&
                    response.Value !== null &&
                    response.Value.length > 0
                ) {
                    setPageIndex(pageIndex + 1);
                    pageIndex > 0
                        ? setProducts([...products, ...response.Value])
                        : setProducts(response.Value);
                    setTotalProduct(response.OtherData?.TotalRest);
                } else {
                    Alert.alert('Kết quả', 'Không tìm thấy sản phẩm.');
                }
            })
            .catch((error) => {
                console.log('GET_FRESH_PRODUCTS Error:', error);
            });
    }

    return (
        <View>
            {/* Danh sách cate line fresh 8686 */}
            {props.lineItem.CategoryId === 8686 && (
                <View style={styles.boxCategory}>
                    <FlatList
                        horizontal
                        data={props.lineItem.Categorys}
                        keyExtractor={(item) => item.Id}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => {
                                    setPageIndex(0);
                                    setCategoryId(item.Id);
                                    setVirtualChildCateIds(
                                        item.VirtualChildCateIds
                                    );
                                    setIsClickCateFresh(true);
                                    setSelectedId(item.Id);
                                }}>
                                <View>
                                    <Text
                                        style={[
                                            styles.categoryItem,
                                            styles.categoryItem_black,
                                            selectedId === item.Id
                                                ? styles.freshActive
                                                : styles.freshNormal
                                        ]}>
                                        {item.Name}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            )}

            {/* Render Product */}
            <SafeAreaView style={styles.productList}>
                <View style={styles.boxLines}>
                    {products?.map((item) => {
                        return (
                            <View style={styles.boxLine}>
                                <ProductBox bhxProduct={item} />
                            </View>
                        );
                    })}
                </View>

                {/* Show button viewmore */}
                {/* props.lineItem.MaxPage > 0 && */}
                {products !== null && products.length > 0 && totalProduct > 0 && (
                    <TouchableOpacity
                        onPress={() => {
                            selectedId > 0
                                ? setIsClickCateFresh(true)
                                : setIsClickViewmore(true);
                            pageIndex <= 0 && setPageIndex(1);
                        }}
                        style={styles.viewmoreProduct}>
                        <View style={styles.viewmoreProduct_text}>
                            <Text style={styles.viewmoreProduct_total}>
                                {`Xem thêm ${totalProduct} sản phẩm`}
                            </Text>
                            {selectedId <= 0 && (
                                <Text style={styles.viewmoreProduct_cateName}>
                                    {props.lineItem.Text.toLowerCase()}
                                </Text>
                            )}
                        </View>
                    </TouchableOpacity>
                )}
            </SafeAreaView>
        </View>
    );
};

export default RenderLine;
