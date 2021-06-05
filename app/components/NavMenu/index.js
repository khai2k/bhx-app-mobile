import React, { useState, useEffect, useRef } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { styles } from './styles';
import NavCateParent from './NavCateParent';
import NavCateChild from './NavCateChild';

const NavMenu = () => {
    const navigation = useNavigation();

    // Get data Menu từ redux
    const menuData = useSelector((state) => state.generalReducer.Menu);
    const categoryActive = useSelector((state) => state.categoryReducer.Info);

    // Danh sách cate
    const [listCate, setListCate] = useState(menuData);
    const masterData = menuData;

    const [search, setSearch] = useState('');

    const [cateFilter, setCateFilter] = useState('8686');
    const [selectedCateChild, setSelectedCateChild] = useState('');
    const [isHasSearch, setIsHasSearch] = useState(false);

    // Danh sách vị trí các cate
    const [listCateChildPosition, setListCateChildPosition] = useState([]);
    const refContainer = useRef(null);

    // function ScrollTo() {
    //     const positionChild = listCateChildPosition
    //         .filter((element) => {
    //             return (
    //                 element.parentId ===
    //                 (categoryActive.ParentIds &&
    //                     categoryActive.ParentIds.shift()?.toString())
    //             );
    //         })
    //         .shift();
    //     refContainer?.current?.scrollTo({
    //         x: 0,
    //         y: positionChild?.position,
    //         animated: true
    //     });
    // }

    useEffect(() => {
        // ScrollTo();
        setSelectedCateChild(categoryActive.Id?.toString());
        setCateFilter(
            (categoryActive.ParentIds &&
                categoryActive.ParentIds.shift()?.toString()) ||
                '8686'
        );
    }, [categoryActive]);

    return (
        <View style={styles.container}>
            <NavCateParent
                masterData={masterData}
                cateFilter={cateFilter}
                setCateFilter={setCateFilter}
                navigation={navigation}
                refContainer={refContainer}
                listCateChildPosition={listCateChildPosition}
            />
            <NavCateChild
                search={search}
                isHasSearch={isHasSearch}
                setIsHasSearch={setIsHasSearch}
                listCate={listCate}
                cateFilter={cateFilter}
                setCateFilter={setCateFilter}
                selectedCateChild={selectedCateChild}
                setSelectedCateChild={setSelectedCateChild}
                masterData={masterData}
                setListCate={setListCate}
                setSearch={setSearch}
                navigation={navigation}
                listCateChildPosition={listCateChildPosition}
                setListCateChildPosition={setListCateChildPosition}
                refContainer={refContainer}
            />
        </View>
    );
};

export default NavMenu;
