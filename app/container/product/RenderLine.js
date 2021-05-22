import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import * as homeCreator from '@app/container/product/action';
import styles from './style';
import ProductBox from '../../components/ProductBox/ProductBox';
import { HomeReducer } from './reducer';

const RenderLine = (props) => {
    const dispatch = useDispatch();
    const actionHome = bindActionCreators(homeCreator, dispatch);

    const viewMoreText = `Xem thêm ${props.lineItem.PromotionCount} sản phẩm`;
    const productIds = [];
    const [pageIndex, setPageIndex] = useState(1);
    const [product, setProduct] = useState([]);

    function GenMoreProduct(currentPage, categoryIds, excludeProductIds) {
        // await actionHome.get_more_listproducts(
        //     currentPage,
        //     categoryIds.toString(),
        //     excludeProductIds.toString()
        // );
        // props.lineItem.Products = [
        //     ...props.lineItem.Products,
        //     ...(product && product.length > 0 ? product.Value : [])
        // ];
        // // product?.HttpCode === 200 && setPageIndex(pageIndex + 1);
        // console.log(props.lineItem.Products);
        // actionHome
        //     .get_more_listproducts(
        //         currentPage,
        //         categoryIds.toString(),
        //         excludeProductIds.toString()
        //     )
        //     .then((res) => {
        //         console.log('get_more_listproducts');
        //         const products = res.Value;
        //         setProduct(products);
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });
        // props.lineItem.Products = [...props.lineItem.Products, ...product];
        // console.log(props.lineItem.Products);
        // actionHome
        //     .get_more_listproducts(
        //         currentPage,
        //         categoryIds.toString(),
        //         excludeProductIds.toString()
        //     )
        //     .then((res) => {
        //         console.log('get_more_listproducts');
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });
    }

    return (
        <View>
            {/* Danh sách cate line fresh 8686 */}
            <ShowMainCate
                categories={props.lineItem.Categorys}
                categoryId={props.lineItem.CategoryId}
            />

            {/* Render Product */}
            <View style={styles.productList}>
                <FlatList
                    numColumns="3"
                    data={props.lineItem.Products}
                    renderItem={(item) => {
                        productIds.push(item.item.Id);
                        return <ProductBox bhxProduct={item.item} />;
                    }}
                    keyExtractor={(item) => item.Id}
                />

                {/* Show button viewmore */}
                {props.lineItem.MaxPage > 0 && (
                    <TouchableOpacity
                        onPress={() => {
                            GenMoreProduct(
                                pageIndex,
                                props.lineItem.CategoryIds,
                                productIds
                            );
                        }}
                        style={styles.viewmoreProduct}>
                        <View style={styles.viewmoreProduct_text}>
                            <Text style={styles.viewmoreProduct_total}>
                                {viewMoreText}
                            </Text>
                            <Text style={styles.viewmoreProduct_cateName}>
                                {props.lineItem.Text.toLowerCase()} - pageindex{' '}
                                {pageIndex}
                            </Text>
                        </View>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const ShowMainCate = (props) => {
    const { categories, categoryId } = props;
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

export default RenderLine;
