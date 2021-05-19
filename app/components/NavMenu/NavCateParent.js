import React, { useEffect } from 'react';
import { TouchableOpacity, View, Text, Image, FlatList } from 'react-native';
import { ImageNavMenu } from '../../images';
import { styles } from './styles';

const NavCateParent = (props) => {
    return (
        <View style={styles.navLeft}>
            <View style={styles.navLeftTop}>
                <RenderButtonClose navigation={props.navigation} />
                <RenderButtonHome navigation={props.navigation} />
            </View>
            <RenderListCateParent
                masterData={props.masterData}
                cateFilter={props.cateFilter}
                setCateFilter={props.setCateFilter}
            />
        </View>
    );
};

// Render danh sách cate cha
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
            {item.ReferenceId === '-1' && (
                <Image
                    style={styles.iconPromotion}
                    source={ImageNavMenu.imgIconPromotion}
                />
            )}
            <Text style={styles.txtCate}>{item.Text}</Text>
        </TouchableOpacity>
    );
};

const RenderButtonClose = (props) => {
    return (
        <TouchableOpacity
            style={styles.btnClose}
            onPress={() => props.navigation.goBack()}>
            <Image
                style={styles.iconClose}
                source={ImageNavMenu.imgIconClose}
            />
            <Text style={styles.textBtnClose}>Đóng</Text>
        </TouchableOpacity>
    );
};

const RenderButtonHome = (props) => {
    return (
        <TouchableOpacity
            style={styles.btnHome}
            onPress={() => props.navigation.navigate('Main')}>
            <Image source={ImageNavMenu.imgIconHome} style={styles.iconHome} />
        </TouchableOpacity>
    );
};

const RenderListCateParent = (props) => {
    useEffect(() => {
        console.log('RenderListCateParent');
    }, []);
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

export default NavCateParent;
