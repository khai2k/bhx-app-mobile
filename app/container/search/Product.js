import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Alert
} from 'react-native';
import { Colors } from '@app/styles';
import { apiBase, METHOD, API_CONST } from '@app/api';
import { helper } from '@app/common';
import ProductBox from '../../components/ProductBox/ProductBox';
import Filter from './Filter';
import OEMProduct from './OEMProduct';

const Product = (props) => {
    const { PageIndex, PageSize, TotalRecord } = props.info;
    const Products = props.products;

    const [listProductLoadMore, setListProductLoadMore] = useState(Products);
    const [remainProducts, setRemainProducts] = useState(TotalRecord);

    useEffect(() => {
        setListProductLoadMore(Products);
    }, [Products]);
    const [pageIndex, setPageIndex] = useState(1);
    useEffect(() => {
        console.log('reset pageindex');
        setPageIndex(1);
        if (!helper.isEmptyOrNull(props.otherDataAjax.RestProduct)) {
            setRemainProducts(props.otherDataAjax.RestProduct);
        }
    }, [Products]);

    const loadMoreProducts = () => {
        const bodyApi = {
            OriginalKey: props.info.OriginalKey,
            Key: props.info.OriginalKey,
            CategoryId: props.selectedProps,
            ManufactureID: props.selectedBrand,
            PageSize,
            PageIndex: pageIndex,
            TotalRecord: remainProducts,
            QuerySort: props.selectedSort,
            QueryFilter: filter,
            provinceId: 3,
            storeId: 6463,
            IsCheckPromo: false
        };
        console.log('Start call api');
        apiBase(API_CONST.API_SEARCH_AJAXPRODUCT, METHOD.POST, bodyApi)
            .then((response) => {
                console.log(response);
                if (!helper.isEmptyOrNull(response)) {
                    setPageIndex(pageIndex + 1);
                    setListProductLoadMore([
                        ...listProductLoadMore,
                        ...response.Value
                    ]);
                    setRemainProducts(response.OtherData.RestProduct);
                } else {
                    Alert('Lỗi lấy dữ liệu');
                }
                console.log('End call api');
            })
            .catch((error) => {
                Alert('Lỗi lấy dữ liệu');
                console.log(error);
            });
    };
    const filter = (isTop) => {
        return (
            <Filter
                brands={props.brands}
                properties={props.properties}
                sort={props.sort}
                info={props.info}
                selectedBrand={props.selectedBrand}
                selectedProps={props.selectedProps}
                selectedSort={props.selectedSort}
                isTop={isTop}
            />
        );
    };
    const oemProductBox = () => {
        return (
            !helper.isEmptyOrNull(props.oemProducts) && (
                <OEMProduct
                    products={props.oemProducts}
                    otherData={props.otherData}
                />
            )
        );
    };
    const footer = () => {
        return remainProducts > 0 ? (
            <View>
                <TouchableOpacity
                    onPress={loadMoreProducts}
                    className="loadMore"
                    style={styles.loadMore}>
                    <Text style={styles.loadMoreText}>
                        Còn {remainProducts - PageSize} sản phẩm
                    </Text>
                </TouchableOpacity>
                {filter(false)}
                {oemProductBox()}
            </View>
        ) : (
            <View>
                {filter(false)}
                {oemProductBox()}
            </View>
        );
    };
    if (listProductLoadMore && listProductLoadMore.length > 0) {
        // console.log(
        //     `Render list product ${listProductLoadMore.length}, ${pageIndex}, ${TotalRecord}, ${Products.length}`
        // );
        return (
            <FlatList
                numColumns={3}
                data={listProductLoadMore}
                keyExtractor={(item) => `product_${item.Id}`}
                renderItem={({ item }) => <ProductBox bhxProduct={item} />}
                ListHeaderComponent={() => filter(true)}
                ListFooterComponent={footer}
            />
        );
    } else {
        return (
            <View style={{ flex: 1 }}>
                {filter(true)}
                <View style={styles.productList}>
                    <Text style={styles.emptyText}>
                        Không có sản phẩm nào thoả {'\n'} tiêu chí đã chọn
                    </Text>
                </View>
                {oemProductBox()}
            </View>
        );
    }
};

const styles = StyleSheet.create({
    emptyText: {
        color: Colors.DOVE_GRAY,
        fontSize: 16,
        paddingBottom: 86,
        paddingLeft: 29,
        paddingRight: 29,
        paddingTop: 45,
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    iconDown: {
        height: 3,
        marginLeft: 5,
        width: 6
    },
    loadMore: {
        alignItems: 'center',
        borderColor: Colors.TROPICAL_RAIN_FOREST,
        borderRadius: 8,
        borderWidth: 1,
        color: Colors.TROPICAL_RAIN_FOREST,
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 10,
        padding: 0,
        paddingBottom: 12,
        paddingTop: 12,
        position: 'relative',
        textAlign: 'center',
        textAlignVertical: 'center',
        backgroundColor: Colors.WHITE
    },
    loadMoreText: {
        color: Colors.TROPICAL_RAIN_FOREST
    },
    loadMoreTextBold: {
        color: Colors.TROPICAL_RAIN_FOREST,
        fontWeight: 'bold'
    },
    productList: {}
});

export default React.memo(Product);
