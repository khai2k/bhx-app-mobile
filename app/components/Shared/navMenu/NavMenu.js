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
    const [search, setSearch] = useState('');
    const [masterData, setMasterData] = useState([]);

    const [cateFilter, setCateFilter] = useState('8686');
    const [selectedCateChild, setSelectedCateChild] = useState('');
    const navigation = useNavigation();

    // Danh sách cate
    const [listCate, setListCate] = useState([]);

    const [isHasSearch, setIsHasSearch] = useState(false);

    // Param để lấy danh sách cate Navigation
    const categoryId = 0;
    const currentProvinceId = 0;
    const currentStoreId = 0;
    const isCheckOnSales = true;
    const clearcache = '';

    const searchFilter = (text) => {
        if (text) {
            const filtered = masterData.map((element) => {
                return {
                    // ...element,
                    data: (element.data || []).filter(
                        (subElement) =>
                            subElement.Text.toUpperCase().indexOf(
                                text.toUpperCase()
                            ) > -1
                    )
                };
            });
            const resultSearch = [];
            filtered.filter((value) => {
                return (
                    value.data.length > 0 &&
                    value.data.map((element) => {
                        return (
                            element.ReferenceId !== '-1' &&
                            resultSearch.push(element)
                        );
                    })
                );
            });
            setIsHasSearch(true);
            setListCate(resultSearch);
            setSearch(text);
        } else {
            setIsHasSearch(false);
            setListCate(masterData);
            setSearch(text);
        }
    };

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
            setListCate(value);
            setMasterData(value);
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
                    data={masterData}
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
                        value={search}
                        style={styles.inputSearch}
                        placeholder="Tìm nhóm hàng"
                        onChangeText={(text) => {
                            searchFilter(text);
                        }}
                    />
                    <Image
                        style={styles.iconSearch}
                        source={ImageNavMenu.imgIconSearch}
                    />
                </View>
                {/* Danh sách tìm kiếm cate con */}
                {isHasSearch && (
                    <FlatList
                        style={styles.navRightBottom}
                        numColumns="3"
                        removeClippedSubviews
                        maxToRenderPerBatch="10"
                        data={listCate}
                        renderItem={(item) => {
                            return <RenderSearchCateChildItem item={item} />;
                        }}
                    />
                )}
                {/* Danh sách cate con */}
                {!isHasSearch && (
                    <SectionList
                        sections={listCate}
                        renderItem={() => {
                            return null;
                        }}
                        renderSectionHeader={({ section }) =>
                            section.data.length > 0 && (
                                <FlatList
                                    style={styles.navRightBottom}
                                    numColumns="3"
                                    removeClippedSubviews
                                    maxToRenderPerBatch="10"
                                    data={section.data}
                                    renderItem={(item) => {
                                        return (
                                            <RenderCateChildItem
                                                item={item}
                                                cateParent={section.ReferenceId}
                                                cateFilter={cateFilter}
                                                setCateFilter={setCateFilter}
                                                selectedCateChild={
                                                    selectedCateChild
                                                }
                                                setSelectedCateChild={
                                                    setSelectedCateChild
                                                }
                                            />
                                        );
                                    }}
                                />
                            )
                        }
                    />
                )}
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

// Render danh sách search cate con
const RenderSearchCateChildItem = (props) => {
    const { item } = props.item;

    return (
        <TouchableOpacity
            style={[styles.itemCateChild, styles.itemCateChildActive]}>
            <Image
                style={styles.iconCateChild}
                source={{ uri: `https://${item.ImgUrl}` }}
            />
            <Text style={styles.txtCateChild}>{item.Text}</Text>
        </TouchableOpacity>
    );
};

export default NavMenu;
