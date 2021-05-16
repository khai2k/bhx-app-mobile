import React from 'react';
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
import { Colors } from '@app/styles';

const { width, height } = Dimensions.get('window');

const FilterPopup = (props) => {
    const ListSort = [
        {
            Value: 'PriceDesc',
            Name: 'Giá cao\n đến thấp'
        },
        {
            Value: 'PriceAsc',
            Name: 'Giá thấp\n đến cao'
        },
        {
            Value: 'OnlyPromotion',
            Name: 'Khuyến mãi\n nhiều hơn'
        },
        {
            Value: 'PriceDesc',
            Name: 'Sản phẩm\n bán chạy'
        },
        {
            Value: 'PriceDesc',
            Name: 'Sản phẩm\n mới về'
        }
    ];

    return (
        <SafeAreaView>
            <Modal
                visible={props.visibleStatus}
                animationType="fade"
                style={{ width, height }}>
                <ScrollView className="popupFilter" style={styles.popupFilter}>
                    <TouchableOpacity
                        onPress={() => {
                            props.onTogglePopup(false);
                        }}
                        className="closeFilter"
                        style={styles.closeFilter}>
                        <Image
                            style={styles.iconSearch}
                            source={require('../../../assets/Images/searchFilterCate.png')}
                        />
                        <Text style={styles.closeFilterText}>Đóng</Text>
                    </TouchableOpacity>
                    <View className="boxSort">
                        <Text style={styles.filterTitle}>Sắp xếp sản phẩm</Text>
                        <View style={styles.listFilter}>
                            {ListSort.map((filter) => {
                                return (
                                    <TouchableOpacity style={styles.it}>
                                        <Text style={styles.filterName}>
                                            {filter.Name}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </View>
                    {props.properties.map((property) => {
                        return (
                            <View className="boxFilter">
                                <Text style={styles.filterTitle}>
                                    {property.PropertyName}
                                </Text>
                                <View style={styles.listFilter}>
                                    {property.ProductPropValueBOLst.map(
                                        (propValue) => {
                                            return (
                                                <TouchableOpacity
                                                    style={styles.it}>
                                                    <Text
                                                        style={
                                                            styles.filterName
                                                        }>
                                                        {propValue.Value}
                                                    </Text>
                                                </TouchableOpacity>
                                            );
                                        }
                                    )}
                                </View>
                            </View>
                        );
                    })}
                    <View className="boxBrand" style={styles.boxBrand}>
                        <Text style={styles.filterTitle}>
                            Lọc theo thương hiệu
                        </Text>
                        <View style={styles.listFilter}>
                            {props.brands.map((brand) => {
                                return (
                                    <TouchableOpacity
                                        style={[styles.it, styles.itBrand]}>
                                        <Image
                                            style={styles.brandLogo}
                                            source={{
                                                uri: `https://cdn.tgdd.vn/Brand/11/${brand.Logo}`
                                            }}
                                        />
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </View>
                </ScrollView>
                <View class="boxApply" style={styles.boxApply}>
                    <TouchableOpacity
                        className="reset"
                        style={[styles.button, styles.reset]}>
                        <Text style={styles.textButton}>Chọn lại</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
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

export default FilterPopup;
