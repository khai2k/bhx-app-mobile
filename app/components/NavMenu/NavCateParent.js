import React from 'react';
import { View, TouchableOpacity, Text, Image, FlatList } from 'react-native';
import { styles } from './styles';
import { ImageNavMenu } from '../../images';

// Render danh sách cate cha
const NavCateParent = (props) => {
    function handleClickHome() {
        props.navigation.navigate('Product');
    }
    return (
        <View style={styles.navLeft}>
            <View style={styles.navLeftTop}>
                <TouchableOpacity
                    style={styles.btnClose}
                    onPress={() => props.navigation.goBack()}>
                    <Image
                        style={styles.iconClose}
                        source={ImageNavMenu.imgIconClose}
                    />
                    <Text style={styles.textBtnClose}>Đóng</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.btnHome}
                    onPress={() => handleClickHome()}>
                    <Image
                        source={ImageNavMenu.imgIconHome}
                        style={styles.iconHome}
                    />
                </TouchableOpacity>
            </View>
            <RenderListCateParent
                masterData={props.masterData}
                cateFilter={props.cateFilter}
                setCateFilter={props.setCateFilter}
                refContainer={props.refContainer}
                listCateChildPosition={props.listCateChildPosition}
            />
        </View>
    );
};

const RenderListCateParent = (props) => {
    return (
        <FlatList
            style={styles.navLeftBottom}
            data={props.masterData}
            keyExtractor={(item) => item.ReferenceId}
            scrollEnabled={false}
            renderItem={(item) => {
                return (
                    item.item.ReferenceId !== '-1' && (
                        <RenderCateItem
                            item={item}
                            cateFilter={props.cateFilter}
                            setCateFilter={props.setCateFilter}
                            refContainer={props.refContainer}
                            listCateChildPosition={props.listCateChildPosition}
                        />
                    )
                );
            }}
        />
    );
};

const RenderCateItem = React.memo((props) => {
    const { item } = props.item;
    const handleSelectCateParent = (id) => {
        props.setCateFilter(id);
        const positionChild = props.listCateChildPosition
            .filter((element) => {
                return element.parentId === id;
            })
            .shift();
        props.refContainer?.current?.scrollTo({
            x: 0,
            y: positionChild?.position,
            animated: true
        });
    };
    return (
        <TouchableOpacity
            style={[
                styles.itemCate,
                item.ReferenceId === props.cateFilter && styles.itemCateActive
            ]}
            onPress={() => {
                handleSelectCateParent(item.ReferenceId);
            }}>
            <Text style={styles.txtCate}>{item.Text}</Text>
        </TouchableOpacity>
    );
});

export default NavCateParent;
