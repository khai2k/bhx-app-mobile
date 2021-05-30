import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    Modal,
    Dimensions
} from 'react-native';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Colors } from '@app/styles';
import * as categoryCreator from '@app/container/group/action';
import { helper } from '@app/common';
import { ImageNavMenu } from '../../images';

const { width, height } = Dimensions.get('window');

const FilterPopup = (props) => {
    const dispatch = useDispatch();
    const actionCategory = bindActionCreators(categoryCreator, dispatch);
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
    const submitFilter = () => {
        actionCategory.category_filter(
            props.infoCate.Id,
            popupSelectedBrand,
            popupSelectedProps,
            popupSelectedSort
        );
        actionCategory.select_brand(popupSelectedBrand);
        actionCategory.select_property(popupSelectedProps);
        actionCategory.select_sort(popupSelectedSort);
        props.onTogglePopup(false);
    };

    const [popupSelectedBrand, setPopupSelectedBrand] = useState(
        props.selectedBrand
    );
    useEffect(() => {
        setPopupSelectedBrand(props.selectedBrand);
    }, [props.selectedBrand]);

    const [popupSelectedProps, setPopupSelectedProps] = useState(
        props.selectedProps
    );
    useEffect(() => {
        setPopupSelectedProps(props.selectedProps);
    }, [props.selectedProps]);

    const [popupSelectedSort, setPopupSelectedSort] = useState(
        props.selectedSort
    );
    useEffect(() => {
        setPopupSelectedSort(props.selectedSort);
    }, [props.selectedSort]);

    const replaceBetween = (start, end, currentString, replaceString) => {
        return (
            currentString.substring(0, start) +
            replaceString +
            currentString.substring(end)
        );
    };
    const processSelectedProps = (propertyId) => {
        let currentSelectProps = popupSelectedProps;
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
        setPopupSelectedProps(strSelectedProps);
    };

    const resetFilter = () => {
        setPopupSelectedBrand(0);
        setPopupSelectedProps('');
        setPopupSelectedSort(0);
    };

    return (
        <SafeAreaView>
            <Modal
                visible={props.visibleStatus}
                animationType="fade"
                style={{ width, height }}>
                <ScrollView className="popupFilter" style={styles.popupFilter}>
                    <TouchableOpacity
                        onPress={() => {
                            submitFilter();
                            props.onTogglePopup(false);
                        }}
                        className="closeFilter"
                        style={styles.closeFilter}>
                        <Image
                            style={styles.iconClose}
                            source={ImageNavMenu.imgIconClose}
                        />
                        <Text style={styles.closeFilterText}>Đóng</Text>
                    </TouchableOpacity>
                    <View className="boxSort">
                        <Text style={styles.filterTitle}>Sắp xếp sản phẩm</Text>
                        <View style={styles.listFilter}>
                            {ListSort.map((filter) => {
                                return (
                                    <TouchableOpacity
                                        key={`popup_sort_${filter.ValueID}`}
                                        onPress={() => {
                                            setPopupSelectedSort(
                                                popupSelectedSort ===
                                                    filter.ValueID
                                                    ? 0
                                                    : filter.ValueID
                                            );
                                        }}
                                        style={styles.it}>
                                        <Text style={styles.filterName}>
                                            {filter.Value}
                                        </Text>
                                        {popupSelectedSort ===
                                        filter.ValueID ? (
                                            <Image
                                                style={styles.iconCheck}
                                                source={require('../../../assets/images/Icon/Shared/NavMenu/IconCheck.png')}
                                            />
                                        ) : null}
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </View>
                    {!helper.isEmptyOrNull(props.properties) &&
                        props.properties.map((property) => {
                            return (
                                <View
                                    key={`popup_mainprop_${property.PropertyName}`}
                                    className="boxFilter">
                                    <Text style={styles.filterTitle}>
                                        {property.PropertyName}
                                    </Text>
                                    <View style={styles.listFilter}>
                                        {property.ProductPropValueBOLst.map(
                                            (propValue) => {
                                                return (
                                                    <TouchableOpacity
                                                        key={`popup_prop_${propValue.ValueID}`}
                                                        onPress={() => {
                                                            selectProperty(
                                                                `${propValue.PropertyID}:${propValue.ValueID}`
                                                            );
                                                        }}
                                                        style={styles.it}>
                                                        <Text
                                                            style={
                                                                styles.filterName
                                                            }>
                                                            {propValue.Value}
                                                        </Text>
                                                        {popupSelectedProps.includes(
                                                            `${propValue.PropertyID}:${propValue.ValueID}`
                                                        ) ? (
                                                            <Image
                                                                style={
                                                                    styles.iconCheck
                                                                }
                                                                source={require('../../../assets/images/Icon/Shared/NavMenu/IconCheck.png')}
                                                            />
                                                        ) : null}
                                                    </TouchableOpacity>
                                                );
                                            }
                                        )}
                                    </View>
                                </View>
                            );
                        })}
                    {!helper.isEmptyOrNull(props.brands) && (
                        <View className="boxBrand" style={styles.boxBrand}>
                            <Text style={styles.filterTitle}>
                                Lọc theo thương hiệu
                            </Text>
                            <View style={styles.listFilter}>
                                {props.brands.map((brand) => {
                                    return (
                                        <TouchableOpacity
                                            key={`popup_brand_${brand.Id}`}
                                            onPress={() => {
                                                setPopupSelectedBrand(
                                                    popupSelectedBrand ===
                                                        brand.Id
                                                        ? 0
                                                        : brand.Id
                                                );
                                            }}
                                            style={[styles.it, styles.itBrand]}>
                                            <Image
                                                style={styles.brandLogo}
                                                source={{
                                                    uri: `https://cdn.tgdd.vn/Brand/11/${brand.Logo}`
                                                }}
                                            />
                                            {popupSelectedBrand === brand.Id ? (
                                                <Image
                                                    style={styles.iconCheck}
                                                    source={require('../../../assets/images/Icon/Shared/NavMenu/IconCheck.png')}
                                                />
                                            ) : null}
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>
                        </View>
                    )}
                </ScrollView>
                <View class="boxApply" style={styles.boxApply}>
                    <TouchableOpacity
                        onPress={() => {
                            resetFilter();
                        }}
                        className="reset"
                        style={[styles.button, styles.reset]}>
                        <Text style={styles.textButton}>Chọn lại</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            submitFilter();
                        }}
                        className="apply"
                        style={[styles.button, styles.apply]}>
                        <Text style={styles.textButtonApply}>Áp dụng</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    apply: {
        backgroundColor: Colors.TROPICAL_RAIN_FOREST,
        borderColor: Colors.TROPICAL_RAIN_FOREST,
        borderWidth: 1,
        color: Colors.WHITE,
        fontWeight: 'bold',
        width: '65%'
    },
    boxApply: {
        backgroundColor: Colors.WHITE,
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        left: 0,
        padding: 10,
        position: 'absolute',
        shadowColor: Colors.LINK_WATER,
        shadowOffset: { height: 5, width: 0 },
        shadowOpacity: 0.5,
        textAlign: 'center',
        width: '100%'
    },
    boxBrand: {
        marginBottom: 60
    },
    brandLogo: {
        borderRadius: 4,
        height: 35,
        width: '100%'
    },
    button: {
        borderRadius: 8,
        fontSize: 15,
        padding: 10,
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    closeFilter: {
        alignItems: 'center',
        color: Colors.EMPEROR,
        flexDirection: 'row',
        marginBottom: 15,
        paddingBottom: 9,
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 9,
        position: 'relative',
        textAlignVertical: 'center',
        width: '100%'
    },
    closeFilterText: {
        color: Colors.CLOUD_BURST,
        fontSize: 13,
        fontWeight: 'bold',
        lineHeight: 20,
        marginLeft: 5,
        textAlignVertical: 'center'
    },
    filterName: {
        color: Colors.TROPICAL_RAIN_FOREST,
        fontSize: 11,
        height: 35,
        lineHeight: 14,
        textAlign: 'center',
        textAlignVertical: 'center',
        width: '100%'
    },
    filterTitle: {
        color: Colors.CLOUD_BURST,
        fontSize: 14,
        lineHeight: 16,
        marginBottom: 10,
        paddingLeft: 5
    },
    iconCheck: {
        height: 16,
        position: 'absolute',
        right: -2,
        top: -2,
        width: 16
    },
    iconClose: {
        height: 16,
        marginRight: 2,
        width: 16
    },
    it: {
        borderColor: Colors.FUN_GREEN,
        borderRadius: 5,
        borderWidth: 1,
        height: 37,
        marginBottom: 8,
        marginLeft: 4,
        marginRight: 4,
        marginTop: 0,
        position: 'relative',
        width: width / 5 - 10
    },
    listFilter: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 10
    },
    popupFilter: {
        backgroundColor: Colors.WHITE,
        height,
        margin: 'auto',
        paddingBottom: 0,
        paddingLeft: 3,
        paddingRight: 3,
        paddingTop: 0,
        width
    },
    reset: {
        borderColor: Colors.CLOUD_BURST,
        borderWidth: 1,
        color: Colors.CLOUD_BURST,
        width: '30%'
    },
    textButton: {
        fontSize: 15,
        height: '100%',
        textAlign: 'center',
        textAlignVertical: 'center',
        width: '100%'
    },
    textButtonApply: {
        color: Colors.WHITE,
        fontSize: 15,
        fontWeight: 'bold',
        height: '100%',
        textAlign: 'center',
        textAlignVertical: 'center',
        width: '100%'
    }
});

export default React.memo(FilterPopup);
