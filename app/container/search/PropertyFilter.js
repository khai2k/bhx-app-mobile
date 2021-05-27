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

    const updateVisibleStatus = (status) => {
        setVisiblePopup(status);
    };

    const listAllProperties = [...props.properties, ...props.sort];
    const selectProperty = (propertyId) => {
        // const strSelectedProps = processSelectedProps(propertyId);
        // actionCategory.category_filter(
        //     props.infoCate.Id,
        //     props.selectedBrand,
        //     strSelectedProps
        // );
        // actionCategory.select_property(strSelectedProps);
    };
    const selectSort = (sortId) => {
        // const selectedSort = sortId === props.selectedSort ? 0 : sortId;
        // actionCategory.category_filter(
        //     props.infoCate.Id,
        //     props.selectedBrand,
        //     props.selectedProps,
        //     selectedSort
        // );
        // actionCategory.select_sort(selectedSort);
    };
    const listPropSelected = props.selectedProps.split(',');
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
                                            ? selectSort(item.Value)
                                            : selectProperty(item.Id);
                                    }}>
                                    <Text style={styles.propertyItem}>
                                        {item.Name}
                                    </Text>
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
