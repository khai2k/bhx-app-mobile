import React, { useState } from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    Image,
    FlatList,
    TextInput,
    ScrollView,
    SectionList
} from 'react-native';
import { styles } from './styles';
import { ImageNavMenu, ImageCateDemo } from '../../../images';
import * as action from './action';

const ListCate = [
    {
        Id: '1100',
        TextName: 'Thịt, cá, tôm, trứng',
        data: [
            {
                Id: '1101',
                TextName: 'Thịt tươi sống',
                UrlImage: ImageCateDemo.imgCate1
            },
            {
                Id: '1102',
                TextName: 'Tôm tươi sống',
                UrlImage: ImageCateDemo.imgCate2
            },
            {
                Id: '1103',
                TextName: 'Cá tươi sống',
                UrlImage: ImageCateDemo.imgCate3
            }
        ]
    },
    {
        Id: '1200',
        TextName: 'Đồ uống các loại',
        data: [
            {
                Id: '1201',
                TextName: 'Nước ngọt có ga',
                UrlImage: ImageCateDemo.imgCate4
            },
            {
                Id: '1202',
                TextName: 'Nước trà giải khát',
                UrlImage: ImageCateDemo.imgCate5
            },
            {
                Id: '1203',
                TextName: 'Trà sữa đóng chai',
                UrlImage: ImageCateDemo.imgCate6
            }
        ]
    },
    {
        Id: '1300',
        TextName: 'Dầu ăn, gia vị',
        data: [
            {
                Id: '1301',
                TextName: 'Dầu ăn',
                UrlImage: ImageCateDemo.imgCate7
            },
            {
                Id: '1302',
                TextName: 'Muối',
                UrlImage: ImageCateDemo.imgCate8
            },
            {
                Id: '1303',
                TextName: 'Đường',
                UrlImage: ImageCateDemo.imgCate9
            }
        ]
    },
    {
        Id: '1400',
        TextName: 'Khuyến mãi hot',
        data: []
    }
];

const NavMenu = () => {
    const [textSearch, setTextSearch] = useState('');
    // const [cateIndex, setCateIndex] = useState('1100');
    return (
        <View style={styles.container}>
            <View style={styles.navLeft}>
                <View style={styles.navLeftTop}>
                    <TouchableOpacity style={styles.btnClose}>
                        <Image
                            style={styles.iconClose}
                            source={ImageNavMenu.imgIconClose}
                        />
                        <Text style={styles.textBtnClose}>Đóng</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnHome}>
                        <Image
                            source={ImageNavMenu.imgIconHome}
                            style={styles.iconHome}
                        />
                    </TouchableOpacity>
                </View>
                <FlatList
                    style={styles.navLeftBottom}
                    data={ListCate}
                    renderItem={action.renderCateItem}
                />
            </View>
            <View style={styles.navRight}>
                <View style={styles.navRightTop}>
                    <TextInput
                        style={styles.inputSearch}
                        placeholder="Tìm nhóm hàng"
                        onChangeText={() => setTextSearch(textSearch)}
                    />
                    <Image
                        style={styles.iconSearch}
                        source={ImageNavMenu.imgIconSearch}
                    />
                </View>
                <ScrollView style={styles.navRightBottom}>
                    <SectionList
                        sections={ListCate}
                        renderItem={({ item }) => {
                            return (
                                <action.renderCateChildItem
                                    TextName={item.TextName}
                                    UrlImage={item.UrlImage}
                                />
                            );
                        }}
                    />
                </ScrollView>
            </View>
        </View>
    );
};

export default NavMenu;
