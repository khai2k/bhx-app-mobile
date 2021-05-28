import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import * as promotionAction from './action';
import { styles } from './styles';

// Render Load more product
const LoadMoreProduct = React.memo((props) => {
    function loadMoreProduct() {
        props.dispatch(
            promotionAction.loadMoreProductsGroup_post(
                props.query.PageIndex,
                props.query.PageSize,
                props.query.ExcludeProductIds,
                props.query.CategoryId,
                props.query.StringCates,
                props.currentLocation.ProvinceId,
                props.currentLocation.StoreId || 0
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

export default LoadMoreProduct;
