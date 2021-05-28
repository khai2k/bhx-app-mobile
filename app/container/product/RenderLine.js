import React, { useState } from 'react';
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

    const [pageIndex, setPageIndex] = useState(1);
    const [products, setProducts] = useState(props.lineItem.Products);
    const [totalProduct, setTotalProduct] = useState(
        props.lineItem.PromotionCount
    );
    const [categoriesIdFresh, setCategoriesIdFresh] = useState([]);

    if (
        props.lineItem.CategoryId === 8686 &&
        props.lineItem.Categorys !== null &&
        categoriesIdFresh.length <= 0
    ) {
        const listId = [];
        props.lineItem.Categorys?.map((item) => {
            return listId.push(item.Id);
        });
        setCategoriesIdFresh(listId);
    }

    function GenMoreProduct(currentPage, categoryIds) {
        // Chỉ lấy 9 productid mới nhất truyền vô excludeProductIds
        const excludeProductIds = [];
        const get9LastProduct = products.slice(
            products.length - 9,
            products.length
        );
        get9LastProduct?.map((item) => {
            return excludeProductIds.push(item.Id);
        });

        const bodyApi = {
            token: '',
            us: '',
            provinceId: 3,
            districtId: 0,
            wardId: 0,
            storeId: 6463,
            data: {
                ListProducts: '',
                PageIndex: currentPage,
                PageSize: 9,
                Phone: '',
                CategoryIds: categoryIds.toString(),
                ExcludeProductIds: excludeProductIds.toString(),
                CategoryId: 0,
                ListCategoryIds: ''
            }
        };
        apiBase(API_CONST.GET_MORE_LIST_PRODUCT, METHOD.POST, bodyApi)
            .then((response) => {
                setProducts([...products, ...response.Value]);
                if (response.OtherData?.TotalRest > 0) {
                    setPageIndex(pageIndex + 1);
                    setTotalProduct(response.OtherData.TotalRest);
                } else {
                    setPageIndex(1);
                    setTotalProduct(0);
                }
            })
            .catch((error) => {
                console.log('GET_MORE_LIST_PRODUCT Error:', error);
            });
    }

    function GetProductFreshCate(category) {
        const bodyApi = {
            token: '',
            us: '',
            provinceId: 3,
            districtId: 0,
            wardId: 0,
            storeId: 6463,
            data: {
                ListProducts: '',
                PageIndex: 0,
                PageSize: 9,
                Phone: '',
                CategoryIds: category.VirtualChildCateIds?.toString(),
                ExcludeProductIds: '',
                CategoryId: category.CategoryId,
                ListCategoryIds: categoriesIdFresh?.toString()
            },
            IsMobile: true
        };
        apiBase(API_CONST.GET_FRESH_PRODUCTS, METHOD.POST, bodyApi)
            .then((response) => {
                console.log(response);
                response !== null &&
                response.Value !== null &&
                response.Value?.length > 0
                    ? Alert.alert('', 'lấy dữ liệu thành công')
                    : Alert.alert('', 'không có dữ liệu');
            })
            .catch((error) => {
                console.log('GET_MORE_LIST_PRODUCT Error:', error);
            });
    }

    return (
        <View>
            {/* Danh sách cate line fresh 8686 */}
            <View style={styles.boxCategory}>
                <FlatList
                    horizontal
                    data={props.lineItem.Categorys}
                    keyExtractor={(item) => item.Id}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => {
                                GetProductFreshCate(item);
                            }}>
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

            {/* Render Product */}
            <SafeAreaView style={styles.productList}>
                <FlatList
                    numColumns="3"
                    data={products}
                    renderItem={(item) => {
                        return <ProductBox bhxProduct={item.item} />;
                    }}
                    keyExtractor={(item) => item.Id}
                />

                {/* Show button viewmore */}
                {products !== null &&
                    products.length > 0 &&
                    props.lineItem.MaxPage > 0 &&
                    totalProduct > 0 && (
                        <TouchableOpacity
                            onPress={() => {
                                GenMoreProduct(
                                    pageIndex,
                                    props.lineItem.CategoryIds
                                );
                            }}
                            style={styles.viewmoreProduct}>
                            <View style={styles.viewmoreProduct_text}>
                                <Text style={styles.viewmoreProduct_total}>
                                    {`Xem thêm ${totalProduct} sản phẩm`}
                                </Text>
                                <Text style={styles.viewmoreProduct_cateName}>
                                    {props.lineItem.Text.toLowerCase()}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )}
            </SafeAreaView>
        </View>
    );
};

export default RenderLine;
