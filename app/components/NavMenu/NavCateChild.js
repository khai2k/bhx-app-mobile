import React, { useEffect } from 'react';
import { View, FlatList, TouchableOpacity, Image, Text } from 'react-native';
import { styles } from './styles';
import CategorySearch from './CategorySearch';
import { ImageNavMenu } from '../../images';

// Render danh sách cate con
const NavCateChild = React.memo((props) => {
    return (
        <View style={styles.navRight}>
            <CategorySearch
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
});

// Render cate con
const RenderListCatesChild = React.memo((props) => {
    const refContainer = React.useRef(null);
    const idCateOld = ['8686'];

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

    function displayLineEachCate(parent) {
        if (idCateOld.includes(parent)) {
            return false;
        } else {
            idCateOld.push(parent);
            return true;
        }
    }

    return (
        <FlatList
            style={styles.navRightBottom}
            numColumns="3"
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
                        isShow={arrParent && displayLineEachCate(arrParent[0])}
                    />
                );
            }}
        />
    );
});

const RenderCateChildItem = React.memo((props) => {
    const { item } = props.item;
    const handleSelectCateChild = (id, cateParent) => {
        props.setSelectedCateChild(id);
        props.setCateFilter(cateParent);
        props.navigation.navigate('Group', { url: item.Url });
    };

    function displayActive() {
        // if (props.cateParent !== props.cateFilter) {
        //     console.log('nonActive');
        //     return styles.itemCateChild;
        // } else {
        //     console.log('Active');
        //     return styles.itemCateChildActive;
        // }
        return styles.itemCateChildActive;
    }

    return (
        <View>
            <TouchableOpacity
                style={displayActive()}
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

export default NavCateChild;
