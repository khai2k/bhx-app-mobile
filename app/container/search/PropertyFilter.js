import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    FlatList,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Colors } from '@app/styles';
import * as searchCreator from '@app/container/search/action';
import { helper } from '@app/common';
import FilterPopup from './FilterPopup';

const PropertyFilter = (props) => {
    const dispatch = useDispatch();
    const actionSearch = bindActionCreators(searchCreator, dispatch);
    const [visiblePopup, setVisiblePopup] = useState(false);
    const ListSort = [
        {
            ValueID: 2,
            Name: 'Giá cao\n đến thấp'
        },
        {
            ValueID: 1,
            Name: 'Giá thấp\n đến cao'
        },
        {
            ValueID: 13,
            Name: 'Khuyến mãi\n nhiều hơn'
        },
        {
            ValueID: 14,
            Name: 'Sản phẩm\n bán chạy'
        },
        {
            ValueID: 15,
            Name: 'Sản phẩm\n mới về'
        }
    ];

    const updateVisibleStatus = (status) => {
        setVisiblePopup(status);
    };

    const listAllProperties = [...props.properties, ...ListSort];
    const selectProperty = (propertyId) => {
        const selectedProp =
            propertyId === props.selectedProps ? 0 : propertyId;
        actionSearch.search_filter(
            props.infoCate.OriginalKey,
            props.infoCate.TotalRecord,
            props.selectedBrand,
            selectedProp,
            props.selectedSort
        );
        actionSearch.select_property(selectedProp);
    };
    const selectSort = (sortId) => {
        const selectedSort = sortId === props.selectedSort ? 0 : sortId;
        actionSearch.search_filter(
            props.infoCate.OriginalKey,
            props.infoCate.TotalRecord,
            props.selectedBrand,
            props.selectedProps,
            selectedSort
        );
        actionSearch.select_sort(selectedSort);
    };
    const isExtendProps = listAllProperties.length > 10;
    const listProps = isExtendProps
        ? listAllProperties.slice(0, 11)
        : listAllProperties;

    return (
        <View>
            <View className="property" style={styles.property}>
                <FlatList
                    contentContainerStyle={styles.scrollList}
                    horizontal
                    data={listProps}
                    keyExtractor={(item) => `prop_${item.Name}`}
                    renderItem={({ item, index }) => (
                        <View className="it" style={styles.it}>
                            {index === 10 ? (
                                <TouchableOpacity
                                    onPress={() => {
                                        updateVisibleStatus(true);
                                    }}
                                    style={styles.showMore}>
                                    <Image
                                        style={styles.iconSearch}
                                        source={require('../../../assets/images/searchFilterCate.png')}
                                    />
                                    <Text style={styles.textShowMore}>
                                        Xem thêm
                                    </Text>
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity
                                    onPress={() => {
                                        helper.isEmptyOrNull(item.Id)
                                            ? selectSort(item.ValueID)
                                            : selectProperty(item.Id);
                                    }}>
                                    <Text style={styles.propertyItem}>
                                        {item.Name}
                                    </Text>
                                    {(helper.isEmptyOrNull(item.Id) &&
                                        props.selectedSort === item.ValueID) ||
                                    (!helper.isEmptyOrNull(item.Id) &&
                                        props.selectedProps === item.Id) ? (
                                        <Image
                                            style={styles.iconCheck}
                                            source={require('../../../assets/images/Icon/Shared/NavMenu/IconCheck.png')}
                                        />
                                    ) : null}
                                </TouchableOpacity>
                            )}
                        </View>
                    )}
                />
            </View>
            {props.isTop && (
                <FilterPopup
                    visibleStatus={visiblePopup}
                    onTogglePopup={updateVisibleStatus}
                    brands={props.brands}
                    properties={props.properties}
                    sort={props.sort}
                    infoCate={props.infoCate}
                    selectedBrand={props.selectedBrand}
                    selectedProps={props.selectedProps}
                    selectedSort={props.selectedSort}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    iconCheck: {
        height: 16,
        position: 'absolute',
        right: 2,
        top: 4,
        width: 16
    },
    it: {
        marginLeft: 3,
        position: 'relative'
    },
    property: {
        backgroundColor: Colors.WHITE,
        position: 'relative'
    },
    propertyItem: {
        alignItems: 'center',
        borderColor: Colors.FUN_GREEN,
        borderRadius: 5,
        borderWidth: 1,
        color: Colors.FUN_GREEN,
        fontSize: 11,
        height: 37,
        justifyContent: 'center',
        lineHeight: 14,
        marginBottom: 3,
        marginLeft: 2,
        marginRight: 2,
        marginTop: 7,
        overflow: 'hidden',
        textAlign: 'center',
        textAlignVertical: 'center',
        width: 60
    },
    scrollList: {
        overflow: 'visible',
        paddingLeft: 7,
        paddingRight: 7
    },
    showMore: {
        alignItems: 'center',
        height: 37,
        justifyContent: 'center',
        width: '100%'
    },
    textShowMore: {
        color: Colors.FUN_GREEN,
        fontSize: 12,
        lineHeight: 15
    }
});

export default React.memo(PropertyFilter);
