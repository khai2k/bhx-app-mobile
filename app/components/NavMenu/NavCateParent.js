import React from 'react';
import { View, TouchableOpacity, Text, Image, FlatList } from 'react-native';
import { styles } from './styles';
import { ImageNavMenu } from '../../images';

// Render danh sách cate cha
const NavCateParent = (props) => {
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
                    onPress={() => props.navigation.navigate('Product')}>
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
            renderItem={(item) => {
                return (
                    <RenderCateItem
                        item={item}
                        cateFilter={props.cateFilter}
                        setCateFilter={props.setCateFilter}
                    />
                );
            }}
        />
    );
};

const RenderCateItem = (props) => {
    const { item } = props.item;
    const handleSelectCateParent = (id) => {
        props.setCateFilter(id);
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
            {item.ReferenceId !== '-1' && (
                <Text style={styles.txtCate}>{item.Text}</Text>
            )}
        </TouchableOpacity>
    );
};

export default NavCateParent;
