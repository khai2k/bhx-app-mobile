import React, { useEffect } from 'react';
import {
    TouchableOpacity,
    View,
    TextInput,
    Image,
    FlatList,
    SectionList,
    Text
} from 'react-native';
import { ImageNavMenu } from '../../images';
import { styles } from './styles';

const NavCateChild = (props) => {
    return (
        <View style={styles.navRight}>
            <RenderTextSearch search={props.search} />
            {/* Danh sách tìm kiếm cate con */}
            {props.isHasSearch && (
                <RenderListResultSearch listCate={props.listCate} />
            )}
            {/* Danh sách cate con */}
            {!props.isHasSearch && (
                <RenderListCatesChild
                    listCate={props.listCate}
                    cateFilter={props.cateFilter}
                    setCateFilter={props.setCateFilter}
                    selectedCateChild={props.selectedCateChild}
                    setSelectedCateChild={props.setSelectedCateChild}
                    navigation={props.navigation}
                />
            )}
        </View>
    );
};

// Render danh sách cate con
const RenderCateChildItem = (props) => {
    const { item } = props.item;
    const handleSelectCateChild = (id, cateParent) => {
        props.setSelectedCateChild(id);
        props.setCateFilter(cateParent);
        props.navigation.navigate('Group', { url: item.Url });
    };

    return (
        <TouchableOpacity
            // disabled={props.cateFilter !== props.cateParent}
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
    );
};

// Function search danh sách cate con
const searchFilter = (text, props) => {
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
        props.setIsHasSearch(true);
        props.setListCate(resultSearch);
        props.setSearch(text);
    } else {
        props.setIsHasSearch(false);
        props.setListCate(props.masterData);
        props.setSearch(text);
    }
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

// TextInput Search
const RenderTextSearch = (props) => {
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

// Render danh sách sp search
const RenderListResultSearch = (props) => {
    return (
        <FlatList
            style={styles.navRightBottom}
            numColumns="3"
            removeClippedSubviews
            maxToRenderPerBatch="10"
            keyExtractor={(item) => item.ReferenceId}
            data={props.listCate}
            renderItem={(item) => {
                return <RenderSearchCateChildItem item={item} />;
            }}
        />
    );
};

// Render cate con
const RenderListCatesChild = (props) => {
    const refContainer = React.useRef(null);

    useEffect(() => {
        const index = props.listCate.findIndex((ele) => {
            return ele.ReferenceId === props.cateFilter;
        });
        setTimeout(() => {
            refContainer?.current?.scrollToLocation({
                animated: true,
                itemIndex: 0,
                sectionIndex: index,
                viewPosition: 0
            });
        }, 100);
    }, [props.cateFilter]);

    return (
        <SectionList
            sections={props.listCate}
            renderItem={() => {
                return null;
            }}
            ref={refContainer}
            getItemLayout={(data, index) => ({
                length: 27,
                offset: 27 * index,
                index
            })}
            removeClippedSubviews
            keyExtractor={(item, index) => item + index}
            renderSectionHeader={({ section }) =>
                section.data.length > 0 && (
                    <FlatList
                        style={styles.navRightBottom}
                        numColumns="3"
                        data={section.data}
                        keyExtractor={(item) => item.ReferenceId}
                        renderItem={(item) => {
                            return (
                                <RenderCateChildItem
                                    item={item}
                                    cateParent={section.ReferenceId}
                                    cateFilter={props.cateFilter}
                                    setCateFilter={props.setCateFilter}
                                    selectedCateChild={props.selectedCateChild}
                                    setSelectedCateChild={
                                        props.setSelectedCateChild
                                    }
                                    navigation={props.navigation}
                                />
                            );
                        }}
                    />
                )
            }
        />
    );
};

export default NavCateChild;
