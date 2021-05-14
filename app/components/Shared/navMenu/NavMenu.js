import React, { useEffect, useState } from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    Image,
    FlatList,
    TextInput,
    SectionList
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';
import { ImageNavMenu } from '../../../images';
import * as service from '../../../service/shared';

const NavMenu = () => {
    const [query, setQuery] = useState('');
    const [fullData, setFullData] = useState([]);
    const [cateFilter, setCateFilter] = useState('8686');
    const [selectedCateChild, setSelectedCateChild] = useState('');
    const navigation = useNavigation();

    // Danh sách cate
    const [listCate, setListCate] = useState([]);

    // Param để lấy danh sách cate Navigation
    const categoryId = 0;
    const currentProvinceId = 0;
    const currentStoreId = 0;
    const isCheckOnSales = true;
    const clearcache = 'ok';

    useEffect(() => {
        const result = service.GetNavigationFromApi(
            'GET',
            'shared/GetNavigation',
            categoryId,
            currentProvinceId,
            currentStoreId,
            isCheckOnSales,
            clearcache
        );
        result.then((value) => {
            console.log(value);
            setListCate(value);
            setFullData(value);
        });
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.navLeft}>
                <View style={styles.navLeftTop}>
                    <TouchableOpacity
                        style={styles.btnClose}
                        onPress={() => navigation.goBack()}>
                        <Image
                            style={styles.iconClose}
                            source={ImageNavMenu.imgIconClose}
                        />
                        <Text style={styles.textBtnClose}>Đóng</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.btnHome}
                        onPress={() => navigation.goBack()}>
                        <Image
                            source={ImageNavMenu.imgIconHome}
                            style={styles.iconHome}
                        />
                    </TouchableOpacity>
                </View>
                <FlatList
                    style={styles.navLeftBottom}
                    data={listCate}
                    renderItem={(item) => {
                        return (
                            <RenderCateItem
                                item={item}
                                cateFilter={cateFilter}
                                setCateFilter={setCateFilter}
                            />
                        );
                    }}
                />
            </View>
            <View style={styles.navRight}>
                <View style={styles.navRightTop}>
                    <TextInput
                        autoCapitalize="none"
                        autoCorrect={false}
                        clearButtonMode="always"
                        value={query}
                        style={styles.inputSearch}
                        placeholder="Tìm nhóm hàng"
                        // onChangeText={(queryText) =>
                        //     handleSearchInput(queryText)
                        // }
                    />
                    <Image
                        style={styles.iconSearch}
                        source={ImageNavMenu.imgIconSearch}
                    />
                </View>
                <SectionList
                    sections={listCate}
                    renderItem={() => {
                        return null;
                    }}
                    renderSectionHeader={({ section }) => (
                        <FlatList
                            style={styles.navRightBottom}
                            numColumns="3"
                            data={section.data}
                            renderItem={(item) => {
                                return (
                                    <RenderCateChildItem
                                        item={item}
                                        cateParent={section.ReferenceId}
                                        cateFilter={cateFilter}
                                        setCateFilter={setCateFilter}
                                        selectedCateChild={selectedCateChild}
                                        setSelectedCateChild={
                                            setSelectedCateChild
                                        }
                                    />
                                );
                            }}
                        />
                    )}
                />
            </View>
        </View>
    );
};

// Render danh sách cate cha
const RenderCateItem = (props) => {
    const { item } = props.item;

    return (
        <TouchableOpacity
            style={[
                styles.itemCate,
                item.ReferenceId === props.cateFilter && styles.itemCateActive
            ]}
            onPress={() => {
                props.setCateFilter(item.ReferenceId);
            }}>
            {item.Id === '-1' && (
                <Image
                    style={styles.iconPromotion}
                    source={ImageNavMenu.imgIconPromotion}
                />
            )}
            <Text style={styles.txtCate}>{item.Text}</Text>
        </TouchableOpacity>
    );
};

// Render danh sách cate con
const RenderCateChildItem = (props) => {
    const { item } = props.item;

    const handleSelectCateChild = (id, cateParent) => {
        props.setSelectedCateChild(id);
        props.setCateFilter(cateParent);
    };

    return (
        <TouchableOpacity
            disabled={props.cateFilter !== props.cateParent}
            style={[
                styles.itemCateChild,
                props.cateFilter === props.cateParent &&
                    styles.itemCateChildActive
            ]}
            onPress={() =>
                handleSelectCateChild(item.ReferenceId, props.cateParent)
            }>
            {props.selectedCateChild === item.ReferenceId && (
                <Image
                    style={styles.iconChecked}
                    source={ImageNavMenu.imgIconCheck}
                />
            )}
            <Image
                style={styles.iconCateChild}
                source={{ uri: `https://${item.ImgUrl}` }}
            />
            <Text
                style={[
                    styles.txtCateChild,
                    props.selectedCateChild === item.ReferenceId &&
                        styles.txtCateChildActive
                ]}>
                {item.Text}
            </Text>
        </TouchableOpacity>
    );
};

export default NavMenu;
