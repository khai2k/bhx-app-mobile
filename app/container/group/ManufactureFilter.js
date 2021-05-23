import React, { useCallback, useState } from 'react';
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

const ManufactureFilter = (props) => {
    const dispatch = useDispatch();
    const actionCategory = bindActionCreators(categoryCreator, dispatch);
    const [visiblePopup, setVisiblePopup] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const updateVisibleStatus = (status) => {
        setVisiblePopup(status);
    };

    const selectBrand = async (brandId) => {
        setIsLoading(true);
        const selectedBrand = brandId === props.selectedBrand ? 0 : brandId;
        await actionCategory.category_filter(
            props.infoCate.Id,
            selectedBrand,
            props.selectedProps
        );
        actionCategory.select_brand(selectedBrand);
        setIsLoading(false);
    };

    const isExtendBrands = props.brands && props.brands.length > 10;
    const listBrands = isExtendBrands
        ? props.brands.slice(0, 11)
        : props.brands;

    return (
        <View>
            <View className="manufacture" style={styles.manufacture}>
                <TouchableOpacity
                    onPress={() => {
                        updateVisibleStatus(true);
                    }}
                    className="titleCate"
                    style={[styles.titleCate, styles.titleCate80]}>
                    <Text
                        style={[styles.titleCateText, styles.titleCate80Text]}>
                        {props.infoCate.Name}
                    </Text>
                </TouchableOpacity>
                <FlatList
                    contentContainerStyle={[
                        styles.scrollList,
                        styles.scrollList80
                    ]}
                    horizontal
                    data={listBrands}
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
                                        selectBrand(item.Id);
                                    }}
                                    style={[
                                        styles.brand,
                                        props.selectedBrand > 0 &&
                                        props.selectedBrand === item.Id
                                            ? styles.selectedBrand
                                            : ''
                                    ]}>
                                    <Image
                                        style={styles.brandLogo}
                                        source={{
                                            uri: `https://cdn.tgdd.vn/Brand/11/${item.Logo}`
                                        }}
                                    />
                                    {props.selectedBrand === item.Id ? (
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
    brand: {
        alignItems: 'center',
        borderColor: Colors.FUN_GREEN,
        borderRadius: 5,
        borderWidth: 1,
        height: 37,
        justifyContent: 'center',
        width: '100%'
    },
    brandLogo: {
        borderRadius: 4,
        height: 35,
        width: 58
    },
    iconCheck: {
        height: 16,
        position: 'absolute',
        right: -2,
        top: -1,
        width: 16
    },
    it: {
        height: 37,
        marginBottom: 5,
        marginLeft: 5,
        marginRight: 0,
        marginTop: 5,
        width: 60
    },
    manufacture: {
        backgroundColor: Colors.WHITE,
        position: 'relative'
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
        backgroundColor: Colors.LINK_WATER_2,
        borderBottomColor: Colors.CATSKILL_WHITE,
        borderBottomWidth: 1,
        borderRightColor: Colors.CATSKILL_WHITE,
        borderRightWidth: 1,
        height: 47,
        position: 'absolute',
        width: 60,
        zIndex: 1
    },
    titleCate80: {
        width: 80
    },
    titleCate80Text: {
        width: '100%'
    },
    titleCateText: {
        alignItems: 'center',
        color: Colors.CLOUD_BURST,
        fontSize: 12,
        height: '100%',
        justifyContent: 'center',
        lineHeight: 16,
        paddingBottom: 4,
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 4,
        textAlign: 'center',
        textAlignVertical: 'center',
        width: '100%',
        zIndex: 1
    }
});

export default React.memo(ManufactureFilter);
