import React, { useEffect, useMemo, useState } from 'react';
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
import * as homeCreator from '@app/redux/actions/homeAction';
import { apiBase, METHOD, API_CONST } from '@app/api';
import { useNavigation } from '@react-navigation/native';
import { helper } from '@app/common';
import styles from './style';
import ProductBox from '../../components/ProductBox/ProductBox';
import SliderTitle from './SliderTitle';

const PAGE_SIZE = 9;

const RenderLine = (props) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const actionHome = bindActionCreators(homeCreator, dispatch);

    const listTitle = [
        {
            titleId: 1,
            name: '5 lần free ship cho khách hàng mới'
        },
        {
            titleId: 2,
            name: 'THỊT, CÁ, TRỨNG, RAU CỦ'
        },
        {
            titleId: 3,
            name: 'Hơn 10k sản phẩm đang kinh doanh'
        }
    ];

    const {
        Products,
        CategoryId,
        CategoryIds,
        Categorys,
        PageIndex,
        ListCategories,
        PromotionCount,
        FreshCategorys
    } = props.lineItem; // list product
    const categoriesIdFresh = []; // list category id fresh
    const [virtualChildCateIds, setVirtualChildCateIds] = useState([]); // child category fresh id
    const [selectedId, setSelectedId] = useState(0); // category fresh active

    // lấy danh sách cate line fresh
    if (CategoryId === 8686 && !helper.isEmptyObjectOrNull(Categorys)) {
        Categorys.map((item) => {
            return categoriesIdFresh.push(item.Id);
        });
    }

    // xoá subcate fresh hết hàng
    const listCateFresh = () => {
        if (CategoryId === 8686 && !helper.isEmptyObjectOrNull(Categorys)) {
            return Categorys.filter((item) => item.Quantity > 0);
        }
    };

    // Chỉ lấy 9 productid đầu truyền vô excludeProductIds
    const Get9ProductId = () => {
        const excludeProductIds = [];
        const get9LastProduct = Products.slice(0, 9);
        get9LastProduct?.map((item) => {
            return excludeProductIds.push(item.Id);
        });
        return excludeProductIds;
    };

    // Xem thêm sản phẩm của các lines
    function GenMoreProduct() {
        const excludeProductIds = Get9ProductId();

        actionHome.loadMoreProducts(
            PageIndex,
            CategoryIds.toString(),
            excludeProductIds.toString(),
            CategoryId
        );
    }

    function GetProductFreshCate(categoryId, categoryIds, index) {
        const excludeProductIds = index > 0 ? Get9ProductId() : [];
        actionHome.loadMoreFreshProducts(
            index,
            categoryIds.toString(),
            excludeProductIds.toString(),
            categoryId,
            categoriesIdFresh.toString(),
            CategoryId
        );
    }

    return (
        <View>
            {/* Danh sách cate line fresh 8686 */}
            {CategoryId === 8686 && (
                <View style={styles.boxCategory}>
                    <SliderTitle listTitle={listTitle} />
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        data={listCateFresh()}
                        keyExtractor={(item) => item.Id}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => {
                                    setVirtualChildCateIds(
                                        item.VirtualChildCateIds
                                    );
                                    setSelectedId(item.Id);
                                    GetProductFreshCate(
                                        item.Id,
                                        !helper.isEmptyObjectOrNull(
                                            virtualChildCateIds
                                        )
                                            ? virtualChildCateIds.toString()
                                            : item.Id.toString(),
                                        0
                                    );
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
            <View style={styles.productList}>
                <View style={styles.boxLines}>
                    {Products?.map((item) => {
                        return (
                            <View
                                key={`product_${item.Id}`}
                                style={styles.boxLine}>
                                <ProductBox bhxProduct={item} />
                            </View>
                        );
                    })}
                </View>
                {Products.length !== 9 && (
                    <View style={styles.boxCategory}>
                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            horizontal
                            data={
                                !helper.isEmptyObjectOrNull(FreshCategorys)
                                    ? FreshCategorys
                                    : Categorys
                            }
                            keyExtractor={(item) => item.Id}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate('Group', {
                                            url: item.Url
                                        });
                                    }}>
                                    <View>
                                        <Text
                                            style={[
                                                styles.categoryItem,
                                                styles.categoryItem_black,
                                                styles.freshNormal
                                            ]}>
                                            {item.Name}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                )}
                {Products !== null &&
                    Products.length > 0 &&
                    PromotionCount > 0 && (
                        <TouchableOpacity
                            onPress={() => {
                                selectedId > 0
                                    ? GetProductFreshCate(
                                          selectedId,
                                          !helper.isEmptyObjectOrNull(
                                              virtualChildCateIds
                                          ) &&
                                              !helper.IsEmptyArray(
                                                  virtualChildCateIds
                                              )
                                              ? virtualChildCateIds.toString()
                                              : selectedId.toString(),
                                          PageIndex
                                      )
                                    : GenMoreProduct();
                            }}
                            style={styles.viewmoreProduct}>
                            <View style={styles.viewmoreProduct_text}>
                                <Text style={styles.viewmoreProduct_total}>
                                    {`Xem thêm ${PromotionCount} sản phẩm`}
                                </Text>
                                {selectedId <= 0 && (
                                    <Text
                                        style={styles.viewmoreProduct_cateName}>
                                        {props.lineItem.Text.toLowerCase()}
                                    </Text>
                                )}
                            </View>
                        </TouchableOpacity>
                    )}
            </View>
        </View>
    );
};

export default React.memo(RenderLine);
