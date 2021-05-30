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

const OEMProduct = (props) => {
    const Products = props.products;
    const { StrOEMBrands, TotalOEM, Exclude } = props.otherData;

    const [pageIndex, setPageIndex] = useState(0);
    const pageSize = 6;

    const [listProductLoadMore, setListProductLoadMore] = useState(Products);
    useEffect(() => {
        setListProductLoadMore(Products);
    }, [Products]);
    const [remainProducts, setRemainProducts] = useState(TotalOEM);

    const loadMoreProducts = () => {
        const bodyApi = {
            strOEMBrands: StrOEMBrands,
            pageSize,
            pageIndex,
            provinceId: 3,
            storeId: 6463,
            strExclude: Exclude
        };
        console.log('Start call api');
        apiBase(API_CONST.API_SEARCH_AJAXPRODUCT_OEM, METHOD.POST, bodyApi)
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
    const footer = () => {
        return remainProducts > 0 ? (
            <View>
                <TouchableOpacity
                    onPress={loadMoreProducts}
                    className="loadMore"
                    style={styles.loadMore}>
                    <Text style={styles.loadMoreText}>
                        Còn {remainProducts} sản phẩm
                    </Text>
                </TouchableOpacity>
            </View>
        ) : null;
    };
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
                ListFooterComponent={footer}
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
    }
});

export default React.memo(OEMProduct);
