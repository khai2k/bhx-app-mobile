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
import Filter from './Filter';

const OEMProduct = (props) => {
    // const { PageIndex, PageSize, TotalRecord } = props.info;
    const Products = props.products;

    const [listProductLoadMore, setListProductLoadMore] = useState(Products);

    useEffect(() => {
        setListProductLoadMore(Products);
    }, [Products]);
    // const [pageIndex, setPageIndex] = useState(PageIndex);
    // useEffect(() => {
    //     console.log('reset pageindex');
    //     if (
    //         !helper.isEmptyOrNull(props.selectedBrand) ||
    //         !helper.isEmptyOrNull(props.selectedProps) ||
    //         !helper.isEmptyOrNull(props.selectedSort)
    //     ) {
    //         setPageIndex(1);
    //     } else {
    //         setPageIndex(0);
    //     }
    // }, [Products]);

    const loadMoreProducts = () => {
        // const bodyApi = {
        //     provinceId: 3,
        //     storeId: 6463,
        //     data: {
        //         categoryId: props.info.Id,
        //         selectedBrandId: props.selectedBrand,
        //         phone: 0,
        //         cateListFilter: '',
        //         propertyIdList: props.selectedProps,
        //         pageIndex,
        //         pageSize: PageSize,
        //         isLoadVideo: false,
        //         isPromotion: false,
        //         sort: props.selectedSort
        //     }
        // };
        // console.log('Start call api');
        // apiBase(API_CONST.API_CATEGORY_AJAX_PRODUCT, METHOD.POST, bodyApi)
        //     .then((response) => {
        //         console.log(response);
        //         setPageIndex(pageIndex + 1);
        //         setListProductLoadMore([
        //             ...listProductLoadMore,
        //             ...response.Value.CurrentData.Products
        //         ]);
        //         console.log('End call api');
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });
    };
    // const footer = () => {
    //     return TotalRecord > (pageIndex === 0 ? 1 : pageIndex) * PageSize ? (
    //         <View>
    //             <TouchableOpacity
    //                 onPress={loadMoreProducts}
    //                 className="loadMore"
    //                 style={styles.loadMore}>
    //                 <Text style={styles.loadMoreText}>
    //                     Còn {TotalRecord - pageIndex * PageSize} sản phẩm
    //                 </Text>
    //             </TouchableOpacity>
    //         </View>
    //     ) : null;
    // };
    return (
        <View style={styles.oemContainer}>
            <Text style={styles.oemContainerTitle}>
                Tham khảo sản phẩm tương tự giá tốt
            </Text>
            <FlatList
                numColumns={3}
                data={listProductLoadMore}
                keyExtractor={(item) => `oemProduct_${item.Id}`}
                renderItem={({ item }) => <ProductBox bhxProduct={item} />}
                // ListHeaderComponent={() => filter(true)}
                // ListFooterComponent={footer}
            />
        </View>
    );
};

const styles = StyleSheet.create({
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
    oemContainer: {
        backgroundColor: Colors.KHAKI,
        borderBottomColor: Colors.PORCELAIN,
        borderBottomWidth: 10,
        marginTop: 10,
        paddingBottom: 5,
        paddingTop: 5
    },
    oemContainerTitle: {
        fontWeight: 'bold',
        paddingBottom: 7,
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 7
    },
    productList: {
        flex: 1
    }
});

export default React.memo(OEMProduct);
