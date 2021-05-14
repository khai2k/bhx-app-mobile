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

const ManufactureFilter = () => {
    const listBrands = [
        {
            Logo: 'https://cdn.tgdd.vn/Brand/11/pepsi-25092020163114.png'
        },
        {
            Logo: 'https://cdn.tgdd.vn/Brand/11/pepsi-25092020163114.png'
        },
        {
            Logo: 'https://cdn.tgdd.vn/Brand/11/pepsi-25092020163114.png'
        },
        {
            Logo: 'https://cdn.tgdd.vn/Brand/11/pepsi-25092020163114.png'
        },
        {
            Logo: 'https://cdn.tgdd.vn/Brand/11/pepsi-25092020163114.png'
        },
        {
            Logo: 'https://cdn.tgdd.vn/Brand/11/pepsi-25092020163114.png'
        },
        {
            Logo: 'https://cdn.tgdd.vn/Brand/11/pepsi-25092020163114.png'
        },
        {
            Logo: 'https://cdn.tgdd.vn/Brand/11/pepsi-25092020163114.png'
        },
        {
            Logo: 'https://cdn.tgdd.vn/Brand/11/pepsi-25092020163114.png'
        },
        {
            Logo: 'https://cdn.tgdd.vn/Brand/11/pepsi-25092020163114.png'
        },
        {
            Logo: 'https://cdn.tgdd.vn/Brand/11/pepsi-25092020163114.png'
        }
    ];
    const [visiblePopup, setVisiblePopup] = useState(false);

    const updateVisibleStatus = (status) => {
        setVisiblePopup(status);
    };

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
                        Nước ngọt{'\n'} các loại
                    </Text>
                </TouchableOpacity>
                <FlatList
                    contentContainerStyle={[
                        styles.scrollList,
                        styles.scrollList80
                    ]}
                    horizontal
                    data={listBrands}
                    renderItem={({ item }) => (
                        <View className="it" style={styles.it}>
                            <TouchableOpacity style={styles.brand}>
                                <Image
                                    style={styles.brandLogo}
                                    source={{ uri: item.Logo }}
                                />
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

export default ManufactureFilter;
