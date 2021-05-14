import React from 'react';
import {
    View,
    Text,
    Image,
    FlatList,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { Colors } from '@app/styles';

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

    return (
        <View className="manufacture" style={styles.manufacture}>
            <Text
                className="titleCate"
                style={[styles.titleCate, styles.titleCate80]}>
                Nước ngọt{'\n'} các loại
            </Text>
            <FlatList
                contentContainerStyle={[styles.scrollList, styles.scrollList80]}
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
        alignItems: 'center',
        backgroundColor: Colors.LINK_WATER_2,
        borderBottomColor: Colors.CATSKILL_WHITE,
        borderBottomWidth: 1,
        borderRightColor: Colors.CATSKILL_WHITE,
        borderRightWidth: 1,
        color: Colors.CLOUD_BURST,
        fontSize: 12,
        height: 47,
        justifyContent: 'center',
        lineHeight: 16,
        paddingBottom: 4,
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 4,
        position: 'absolute',
        textAlign: 'center',
        textAlignVertical: 'center',
        width: 60,
        zIndex: 1
    },
    titleCate80: {
        width: 80
    }
});

export default ManufactureFilter;
