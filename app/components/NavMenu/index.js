import React, { useState, useEffect } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    Image,
    FlatList,
    TextInput
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { styles } from './styles';
import { ImageNavMenu } from '../../images';

const NavMenu = () => {
    const navigation = useNavigation();

    // Get data Menu từ redux
    const menuData = useSelector((state) => state.generalReducer.Menu);

    // Danh sách cate
    const [listCate, setListCate] = useState(menuData);
    const masterData = menuData;

    const [search, setSearch] = useState('');

    const [cateFilter, setCateFilter] = useState('8686');
    const [selectedCateChild, setSelectedCateChild] = useState('');

    return (
        <View style={styles.container}>
            <RenderNavCateParent
                masterData={masterData}
                cateFilter={cateFilter}
                setCateFilter={setCateFilter}
                navigation={navigation}
            />
            <RenderNavCateChild
                search={search}
                listCate={listCate}
                cateFilter={cateFilter}
                setCateFilter={setCateFilter}
                selectedCateChild={selectedCateChild}
                setSelectedCateChild={setSelectedCateChild}
                masterData={masterData}
                setListCate={setListCate}
                setSearch={setSearch}
                navigation={navigation}
            />
        </View>
    );
};
// Render danh sách cate cha
const RenderNavCateParent = (props) => {
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

// Render danh sách cate con
const RenderNavCateChild = (props) => {
    return (
        <View style={styles.navRight}>
            <RenderTextSearch
                search={props.search}
                masterData={props.masterData}
                setIsHasSearch={props.setIsHasSearch}
                setListCate={props.setListCate}
                setSearch={props.setSearch}
            />
            <RenderListCatesChild
                listCate={props.listCate}
                cateFilter={props.cateFilter}
                setCateFilter={props.setCateFilter}
                selectedCateChild={props.selectedCateChild}
                setSelectedCateChild={props.setSelectedCateChild}
                navigation={props.navigation}
            />
        </View>
    );
};

const RenderCateChildItem = React.memo((props) => {
    const { item } = props.item;
    const handleSelectCateChild = (id, cateParent) => {
        props.setSelectedCateChild(id);
        props.setCateFilter(cateParent);
        props.navigation.navigate('Group', { url: item.Url });
    };

    return (
        <View>
            <TouchableOpacity
                style={
                    styles.itemCateChild
                    // props.cateFilter === props.cateParent &&
                    //     styles.itemCateChildActive
                }
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
        </View>
    );
});

// TextInput Search
const RenderTextSearch = (props) => {
    // Function search danh sách cate con
    function searchFilter(text) {
        if (text) {
            const filtered = props.masterData.map((element) => {
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
            props.setListCate(filtered);
            props.setSearch(text);
        } else {
            props.setListCate(props.masterData);
            props.setSearch(text);
        }
    }
    return (
        <View style={styles.navRightTop}>
            <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                clearButtonMode="always"
                value={props.search}
                style={styles.inputSearch}
                placeholder="Tìm nhóm hàng"
                onChangeText={(text) => {
                    searchFilter(text, props);
                }}
            />
            <Image
                style={styles.iconSearch}
                source={ImageNavMenu.imgIconSearch}
            />
        </View>
    );
};

// Render cate con
const RenderListCatesChild = (props) => {
    const refContainer = React.useRef(null);

    const lstCateChild = [];
    props.listCate?.filter((value) => {
        return (
            value.data.length > 0 &&
            value.data.map((element) => {
                return (
                    element.ReferenceId !== '-1' && lstCateChild.push(element)
                );
            })
        );
    });

    useEffect(() => {
        const index = lstCateChild?.findIndex((ele) => {
            const arrParent = ele.ParentId?.split(',');
            return arrParent && arrParent[0] === props.cateFilter;
        });
        index >= 0 &&
            refContainer?.current?.scrollToOffset({
                animated: true,
                offset: (index / 3) * 115
            });
    }, [props.cateFilter]);

    return (
        <FlatList
            style={styles.navRightBottom}
            numColumns="3"
            initialNumToRender={20}
            maxToRenderPerBatch={20}
            windowSize={60}
            keyExtractor={(item) => item.ReferenceId}
            data={lstCateChild}
            ref={refContainer}
            getItemLayout={(data, index) => ({
                length: 100,
                offset: (index / 3) * 80,
                index
            })}
            renderItem={(item) => {
                const arrParent = item.item.ParentId?.split(',');
                return (
                    <RenderCateChildItem
                        item={item}
                        cateParent={arrParent && arrParent[0]}
                        cateFilter={props.cateFilter}
                        setCateFilter={props.setCateFilter}
                        selectedCateChild={props.selectedCateChild}
                        setSelectedCateChild={props.setSelectedCateChild}
                        navigation={props.navigation}
                    />
                );
            }}
        />
    );
};

export default NavMenu;
