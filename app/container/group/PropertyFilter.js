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

const PropertyFilter = (props) => {
    const [visiblePopup, setVisiblePopup] = useState(false);

    const updateVisibleStatus = (status) => {
        setVisiblePopup(status);
    };

    const listAllProperties = props.properties.flatMap(
        (property) => property.ProductPropValueBOLst
    );

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
                    data={listAllProperties}
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
                brands={props.brands}
                properties={props.properties}
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
