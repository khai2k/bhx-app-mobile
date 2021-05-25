import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image
} from 'react-native';
import { Colors } from '@app/styles';
import { apiBase, METHOD, API_CONST } from '@app/api';
import { helper } from '@app/common';
import ProductBox from '../../components/ProductBox/ProductBox';

const Product = (props) => {
    const { Products, Total } = props.currentData;
    const { Name } = props.info;
    const { PageIndex, PageSize } = props.include.Paging;
    const [listProductLoadMore, setListProductLoadMore] = useState(Products);

    useEffect(() => {
        setListProductLoadMore(Products);
    }, [Products]);
    const [pageIndex, setPageIndex] = useState(PageIndex);
    useEffect(() => {
        console.log('reset pageindex');
        if (
            !helper.isEmptyOrNull(props.selectedBrand) ||
            !helper.isEmptyOrNull(props.selectedProps) ||
            !helper.isEmptyOrNull(props.selectedSort)
        ) {
            setPageIndex(1);
        } else {
            setPageIndex(0);
        }
    }, [Products]);

    const loadMoreProducts = () => {
        const bodyApi = {
            provinceId: 3,
            storeId: 6463,
            data: {
                categoryId: props.info.Id,
                selectedBrandId: props.selectedBrand,
                phone: 0,
                cateListFilter: '',
                propertyIdList: props.selectedProps,
                pageIndex,
                pageSize: PageSize,
                isLoadVideo: false,
                isPromotion: false,
                sort: props.selectedSort
            }
        };
        console.log('Start call api');
        apiBase(API_CONST.API_CATEGORY_AJAX_PRODUCT, METHOD.POST, bodyApi)
            .then((response) => {
                console.log(response);
                setPageIndex(pageIndex + 1);
                setListProductLoadMore([
                    ...listProductLoadMore,
                    ...response.Value.CurrentData.Products
                ]);
                console.log('End call api');
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const loadMoreButton = () => {
        return Total > (pageIndex === 0 ? 1 : pageIndex) * PageSize ? (
            <TouchableOpacity
                onPress={loadMoreProducts}
                className="loadMore"
                style={styles.loadMore}>
                <Text style={styles.loadMoreText}>
                    Còn {Total - pageIndex * PageSize} sản phẩm{' '}
                </Text>
                <Text style={styles.loadMoreTextBold}>{Name}</Text>
                <Image
                    style={styles.iconDown}
                    source={require('../../../assets/images/chevron-down.png')}
                />
            </TouchableOpacity>
        ) : null;
    };
    if (listProductLoadMore && listProductLoadMore.length > 0) {
        console.log(
            `Render list product ${listProductLoadMore.length}, ${pageIndex}, ${Total}, ${Products.length}`
        );
        return (
            <FlatList
                numColumns={3}
                data={listProductLoadMore}
                keyExtractor={(item) => `product_${item.Id}`}
                renderItem={({ item }) => <ProductBox bhxProduct={item} />}
                ListFooterComponent={loadMoreButton}
            />
        );
    } else {
        return (
            <View style={styles.productList}>
                <Text style={styles.emptyText}>
                    Không có sản phẩm nào thoả {'\n'} tiêu chí đã chọn
                </Text>
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
    productList: {
        flex: 1
    }
});

export default React.memo(Product);
