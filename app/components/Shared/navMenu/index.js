import React, { PureComponent } from 'react';
import { TouchableOpacity, View, Text, Image, FlatList } from 'react-native';
import styles from './styles';

const ListCate = [
    { key: 'Thịt, cá, rau, trứng' },
    { key: 'Đồ uống các loại' },
    { key: 'Sữa uống các loại' },
    { key: 'Bánh kẹo các loại' },
    { key: 'Mì cháo phở bún' },
    { key: 'Dầu ăn gia vị' },
    { key: 'Vệ sinh nhà cửa' },
    { key: 'Đồ dùng cá nhân' },
    { key: 'Đồ dùng gia đình' },
    { key: 'Khuyến mãi hot' }
];

const imgIconClose = require('../../../../assets/Images/Icon/IconClose.png');
const imgIconPromotion = require('../../../../assets/Images/Icon/IconPromotion.png');
const imgIconHome = require('../../../../assets/Images/Icon/IconHome.png');

const renderCateItem = ({ item }) => (
    <TouchableOpacity style={styles.itemCate}>
        {item.key === 'Khuyến mãi hot' ? (
            <Image style={styles.iconPromotion} source={imgIconPromotion} />
        ) : null}
        <Text style={styles.txtCate}>{item.key}</Text>
    </TouchableOpacity>
);

class NavMenu extends PureComponent {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.navLeft}>
                    <View style={styles.navLeftTop}>
                        <TouchableOpacity style={styles.btnClose}>
                            <Image
                                style={styles.iconClose}
                                source={imgIconClose}
                            />
                            <Text style={styles.textBtnClose}>Đóng</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnHome}>
                            <Image
                                source={imgIconHome}
                                style={styles.iconHome}
                            />
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        style={styles.navLeftBottom}
                        data={ListCate}
                        renderItem={renderCateItem}
                    />
                </View>
                <View style={styles.navRight}>
                    <View style={styles.navRightTop} />
                    <View style={styles.navRightBottom} />
                </View>
            </View>
        );
    }
}

export default NavMenu;
