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
import * as categoryCreator from '@app/container/group/action';
import FilterPopup from './FilterPopup';

const PropertyFilter = (props) => {
    const dispatch = useDispatch();
    const actionCategory = bindActionCreators(categoryCreator, dispatch);
    const [visiblePopup, setVisiblePopup] = useState(false);
    const ListSort = [
        {
            PropertyID: -99,
            ValueID: 2,
            Value: 'Giá cao\n đến thấp'
        },
        {
            PropertyID: -99,
            ValueID: 1,
            Value: 'Giá thấp\n đến cao'
        },
        {
            PropertyID: -99,
            ValueID: 13,
            Value: 'Khuyến mãi\n nhiều hơn'
        },
        {
            PropertyID: -99,
            ValueID: 14,
            Value: 'Sản phẩm\n bán chạy'
        },
        {
            PropertyID: -99,
            ValueID: 15,
            Value: 'Sản phẩm\n mới về'
        }
    ];

    const updateVisibleStatus = (status) => {
        setVisiblePopup(status);
    };

    let listAllProperties = props.properties.flatMap(
        (property) => property.ProductPropValueBOLst
    );
    listAllProperties = [...listAllProperties, ...ListSort];
    const replaceBetween = (start, end, currentString, replaceString) => {
        return (
            currentString.substring(0, start) +
            replaceString +
            currentString.substring(end)
        );
    };
    const processSelectedProps = (propertyId) => {
        let currentSelectProps = props.selectedProps;
        const selectPropertyInfo = propertyId.split(':');
        const indexContainSelectedPropertyStart =
            currentSelectProps.indexOf(propertyId);
        const indexContainSelectedGroupPropertyStart =
            currentSelectProps.indexOf(`${selectPropertyInfo[0]}:`);
        // nếu có tồn tại nhóm props trong listprops đã chọn
        if (indexContainSelectedGroupPropertyStart > -1) {
            const indexContainSelectedGroupPropertyEnd =
                currentSelectProps.indexOf(
                    ',',
                    indexContainSelectedGroupPropertyStart
                );
            currentSelectProps = replaceBetween(
                indexContainSelectedGroupPropertyStart,
                indexContainSelectedGroupPropertyEnd,
                currentSelectProps,
                indexContainSelectedPropertyStart > -1 ? '' : `${propertyId}` // bỏ chọn prop đã chọn
            );
        } else {
            currentSelectProps += `${propertyId},`;
        }
        return currentSelectProps;
    };
    const selectProperty = (propertyId) => {
        const strSelectedProps = processSelectedProps(propertyId);
        actionCategory.category_filter(
            props.infoCate.Id,
            props.selectedBrand,
            strSelectedProps
        );
        actionCategory.select_property(strSelectedProps);
    };
    const selectSort = (sortId) => {
        const selectedSort = sortId === props.selectedSort ? 0 : sortId;
        actionCategory.category_filter(
            props.infoCate.Id,
            props.selectedBrand,
            props.selectedProps,
            selectedSort
        );
        actionCategory.select_sort(selectedSort);
    };
    const listPropSelected = props.selectedProps.split(',');
    const isExtendProps = listAllProperties.length > 10;
    const listProps = isExtendProps
        ? listAllProperties.slice(0, 11)
        : listAllProperties;

    return (
        <View>
            <View className="property" style={styles.property}>
                <TouchableOpacity
                    onPress={() => {
                        updateVisibleStatus(true);
                    }}
                    className="titleCate"
                    style={[styles.titleCate, styles.titleCate80]}>
                    <Image
                        style={styles.iconSearch}
                        source={require('../../../assets/images/searchFilterCate.png')}
                    />
                    <Text style={styles.titleCateText}>Lọc tìm</Text>
                </TouchableOpacity>
                <FlatList
                    contentContainerStyle={[
                        styles.scrollList,
                        styles.scrollList80
                    ]}
                    horizontal
                    data={listProps}
                    keyExtractor={(item) => `prop_${item.ValueID}`}
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
                                        item.PropertyID === -99
                                            ? selectSort(item.ValueID)
                                            : selectProperty(
                                                  `${item.PropertyID}:${item.ValueID}`
                                              );
                                    }}>
                                    <Text style={styles.propertyItem}>
                                        {item.Value}
                                    </Text>
                                    {(item.PropertyID === -99 &&
                                        props.selectedSort === item.ValueID) ||
                                    (item.PropertyID !== -99 &&
                                        listPropSelected.includes(
                                            `${item.PropertyID}:${item.ValueID}`
                                        )) ? (
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
            <FilterPopup
                visibleStatus={visiblePopup}
                onTogglePopup={updateVisibleStatus}
                brands={props.brands}
                properties={props.properties}
                infoCate={props.infoCate}
                selectedBrand={props.selectedBrand}
                selectedProps={props.selectedProps}
                selectedSort={props.selectedSort}
            />
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
        paddingLeft: 62,
        paddingRight: 7
    },
    scrollList80: {
        paddingLeft: 82
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
    },
    titleCate: {
        alignItems: 'center',
        backgroundColor: Colors.LINK_WATER_2,
        borderRightColor: Colors.CATSKILL_WHITE,
        borderRightWidth: 1,
        color: Colors.CLOUD_BURST,
        fontSize: 12,
        height: 48,
        justifyContent: 'center',
        lineHeight: 16,
        paddingBottom: 4,
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 4,
        position: 'absolute',
        textAlign: 'center',
        width: 60,
        zIndex: 1
    },
    titleCate80: {
        width: 80
    },
    titleCateText: {
        color: Colors.TROPICAL_RAIN_FOREST,
        fontSize: 12
    }
});

export default React.memo(PropertyFilter);
