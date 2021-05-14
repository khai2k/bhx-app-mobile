import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    FlatList,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { Colors } from '@app/styles';
import FilterPopup from './FilterPopup';

const PropertyFilter = () => {
    const listProps = [
        {
            ValueID: '17779:124491',
            Value: 'Nước ngọt\n lon, cây'
        },
        {
            ValueID: '17779:124493',
            Value: 'Nước ngọt\n chai nhỏ'
        },
        {
            ValueID: '17779:149374',
            Value: 'Nước ngọt\n chai lớn'
        },
        {
            ValueID: '17779:124494',
            Value: 'Nước ngọt\n dạng lốc'
        },
        {
            ValueID: '17779:124495',
            Value: 'Nước ngọt\n thùng 24'
        },
        {
            ValueID: '27624:187514',
            Value: 'Chai từ\n 330ml-500ml'
        }
    ];
    const [visiblePopup, setVisiblePopup] = useState(false);

    const updateVisibleStatus = (status) => {
        setVisiblePopup(status);
    };

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
                        source={require('../../../assets/Images/searchFilterCate.png')}
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
                    renderItem={({ item }) => (
                        <View className="it" style={styles.it}>
                            <TouchableOpacity>
                                <Text style={styles.propertyItem}>
                                    {item.Value}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </View>
            <FilterPopup
                visibleStatus={visiblePopup}
                onTogglePopup={updateVisibleStatus}
            />
        </View>
    );
};

const styles = StyleSheet.create({
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

export default PropertyFilter;
