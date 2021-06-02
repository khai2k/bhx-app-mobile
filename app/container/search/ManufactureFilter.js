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
import * as searchCreator from '@app/redux/actions/searchAction';
import FilterPopup from './FilterPopup';

const ManufactureFilter = (props) => {
    const dispatch = useDispatch();
    const actionSearch = bindActionCreators(searchCreator, dispatch);
    const [visiblePopup, setVisiblePopup] = useState(false);

    const updateVisibleStatus = (status) => {
        setVisiblePopup(status);
    };

    const selectBrand = (brandId) => {
        const selectedBrand = brandId === props.selectedBrand ? 0 : brandId;
        actionSearch.search_filter(
            props.infoCate.OriginalKey,
            props.infoCate.TotalRecord,
            selectedBrand,
            props.selectedProps
        );
        actionSearch.select_brand(selectedBrand);
    };

    const isExtendBrands = props.brands && props.brands.length > 10;
    const listBrands = isExtendBrands
        ? props.brands.slice(0, 11)
        : props.brands;

    return (
        <View>
            <View className="manufacture" style={styles.manufacture}>
                <FlatList
                    contentContainerStyle={styles.scrollList}
                    horizontal
                    data={listBrands}
                    keyExtractor={(item) => `manu_${item.Id}`}
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

export default React.memo(ManufactureFilter);
