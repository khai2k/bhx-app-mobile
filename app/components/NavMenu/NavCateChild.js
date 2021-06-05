import React from 'react';
import { View, TouchableOpacity, Image, Text, ScrollView } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { styles } from './styles';
import CategorySearch from './CategorySearch';
import { ImageNavMenu } from '../../images';

// Render danh sách cate con
const NavCateChild = React.memo((props) => {
    function handleOnScroll(event) {
        const positionScreen = parseInt(
            event.nativeEvent?.contentOffset?.y,
            10
        );
        const dataPosition = props.listCateChildPosition
            ?.filter((element) => {
                return positionScreen >= element.position;
            })
            .slice(-1);
        props.setCateFilter(dataPosition?.shift()?.parentId);
    }

    return (
        <View style={styles.navRight}>
            <CategorySearch
                search={props.search}
                masterData={props.masterData}
                setIsHasSearch={props.setIsHasSearch}
                setListCate={props.setListCate}
                setSearch={props.setSearch}
            />
            <View style={styles.contentBottomRight}>
                {!props.isHasSearch && (
                    <ScrollView
                        ref={props.refContainer}
                        onMomentumScrollEnd={(e) => handleOnScroll(e)}
                        showsVerticalScrollIndicator={false}
                        scrollEventThrottle={16}>
                        {props.listCate?.map((element) => {
                            return (
                                <RenderListCatesChild
                                    key={element.ReferenceId}
                                    listCate={element}
                                    cateFilter={props.cateFilter}
                                    setCateFilter={props.setCateFilter}
                                    selectedCateChild={props.selectedCateChild}
                                    setSelectedCateChild={
                                        props.setSelectedCateChild
                                    }
                                    navigation={props.navigation}
                                    listCateChildPosition={
                                        props.listCateChildPosition
                                    }
                                    setListCateChildPosition={
                                        props.setListCateChildPosition
                                    }
                                    parentId={element.ReferenceId}
                                />
                            );
                        })}
                    </ScrollView>
                )}
                {props.isHasSearch && (
                    <FlatList
                        numColumns={3}
                        windowSize={60}
                        data={props.listCate}
                        keyExtractor={(item) => item.ReferenceId}
                        showsVerticalScrollIndicator={false}
                        renderItem={(item) => {
                            return (
                                <RenderCateChildItem
                                    key={item.ReferenceId}
                                    item={item.item}
                                    cateParent={props.parentId}
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
                )}
            </View>
        </View>
    );
});

// Render cate con
const RenderListCatesChild = React.memo((props) => {
    function onLayout(event) {
        const { y } = event.nativeEvent.layout;
        props.setListCateChildPosition([
            ...props.listCateChildPosition,
            ...[{ parentId: props.parentId, position: parseInt(y, 10) }]
        ]);
    }
    return (
        <View
            onLayout={(event) => onLayout(event)}
            style={[
                styles.navRightBottom,
                props.cateFilter !== props.parentId && styles.listOpacity
            ]}>
            {props.listCate.data?.map((element) => {
                return (
                    <RenderCateChildItem
                        key={element.ReferenceId}
                        item={element}
                        cateParent={props.parentId}
                        cateFilter={props.cateFilter}
                        setCateFilter={props.setCateFilter}
                        selectedCateChild={props.selectedCateChild}
                        setSelectedCateChild={props.setSelectedCateChild}
                        navigation={props.navigation}
                    />
                );
            })}
        </View>
    );
});

const RenderCateChildItem = React.memo((props) => {
    const handleSelectCateChild = (id, cateParent) => {
        props.setSelectedCateChild(id);
        props.setCateFilter(cateParent);
        props.navigation.navigate('Group', { url: props.item.Url });
    };

    return (
        <View>
            <TouchableOpacity
                style={styles.itemCateChild}
                onPress={() =>
                    handleSelectCateChild(
                        props.item.ReferenceId,
                        props.cateParent
                    )
                }>
                {props.selectedCateChild === props.item.ReferenceId && (
                    <Image
                        style={styles.iconChecked}
                        source={ImageNavMenu.imgIconCheck}
                    />
                )}
                <Image
                    style={styles.iconCateChild}
                    source={{ uri: `https://${props.item.ImgUrl}` }}
                />
                <Text
                    style={[
                        styles.txtCateChild,
                        props.selectedCateChild === props.item.ReferenceId &&
                            styles.txtCateChildActive
                    ]}>
                    {props.item.Text}
                </Text>
            </TouchableOpacity>
        </View>
    );
});

export default NavCateChild;
