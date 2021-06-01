import React from 'react';
import { FlatList, View, TouchableOpacity, Text } from 'react-native';
import { styles } from './styles';
import * as promotionAction from '../../redux/actions/promotionAction';

const ListCategoryFilter = React.memo((props) => {
    return (
        <FlatList
            horizontal
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            windowSize={60}
            showsHorizontalScrollIndicator={false}
            data={props.categorys}
            keyExtractor={(item) => item.Id}
            renderItem={(item) => {
                return (
                    <RenderItemCateFilter
                        item={item.item}
                        index={item.index}
                        promotionCount={props.promotionCount}
                        groupCateId={props.groupCateId}
                        lstGroupCateFilter={props.lstGroupCateFilter}
                        setListGroupCateFilter={props.setListGroupCateFilter}
                        dispatch={props.dispatch}
                        query={props.query}
                        isBottom={props.isBottom}
                        isTop={props.isTop}
                        navigation={props.navigation}
                        currentLocation={props.currentLocation}
                    />
                );
            }}
        />
    );
});

// Render Item Cate filter
const RenderItemCateFilter = React.memo((props) => {
    function displayActiveGroupCateFilter(groupCateFilterId, itemActive) {
        const result = props.lstGroupCateFilter.some((element) => {
            return (
                element.GroupCateId === props.groupCateId &&
                element.GroupCateFilterId === groupCateFilterId
            );
        });
        if (result) {
            return itemActive
                ? styles.itemCateFilterActive
                : styles.txtItemCateFilterActive;
        }
    }

    function handleSelectCateFilter(groupCateFilterId) {
        const result = props.lstGroupCateFilter.map((element) => {
            if (element.GroupCateId === props.groupCateId) {
                return { ...element, GroupCateFilterId: groupCateFilterId };
            } else {
                return element;
            }
        });
        props.setListGroupCateFilter(result);
        props.dispatch(
            promotionAction.productBySubCate_post(
                props.query.PageIndex,
                props.query.PageSize,
                '',
                props.groupCateId,
                groupCateFilterId === 0 ? '' : groupCateFilterId,
                props.currentLocation.ProvinceId,
                props.currentLocation.StoreId || 6463
            )
        );
    }

    return (
        <View
            style={[
                styles.itemGroupCateFilter,
                props.isBottom && styles.itemGroupCateFilterBottom
            ]}>
            {props.index === 0 && !props.isBottom && (
                <View
                    style={[
                        styles.itemCateFilter,
                        displayActiveGroupCateFilter(0, true)
                    ]}>
                    <TouchableOpacity
                        onPress={() => {
                            handleSelectCateFilter(0);
                        }}>
                        <Text
                            style={[
                                styles.txtItemCateFilter,
                                displayActiveGroupCateFilter(0, false)
                            ]}>
                            {props.promotionCount + 7} Khuyến mãi Hot
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
            {((props.isBottom && props.query.PageIndex > 0) || props.isTop) && (
                <View
                    style={[
                        styles.itemCateFilter,
                        !props.isBottom &&
                            displayActiveGroupCateFilter(props.item.Id, true)
                    ]}>
                    <TouchableOpacity
                        onPress={() => {
                            props.isBottom
                                ? props.navigation.navigate('Group', {
                                      url: props.item.Url
                                  })
                                : handleSelectCateFilter(props.item.Id);
                        }}>
                        <Text
                            style={[
                                styles.txtItemCateFilter,
                                props.isBottom && styles.txtItemCateFilterColor,
                                !props.isBottom &&
                                    displayActiveGroupCateFilter(
                                        props.item.Id,
                                        false
                                    )
                            ]}>
                            {props.item.Name}
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
});

export default ListCategoryFilter;
