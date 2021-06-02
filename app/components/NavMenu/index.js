import React, { useState, useEffect } from 'react';
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
    const categoryIdActive = useSelector(
        (state) => state.categoryReducer.Info.Id
    );

    // Danh sách cate
    const [listCate, setListCate] = useState(menuData);
    const masterData = menuData;

    const [search, setSearch] = useState('');

    const [cateFilter, setCateFilter] = useState('8686');
    const [selectedCateChild, setSelectedCateChild] = useState('');
    const [isHasSearch, setIsHasSearch] = useState(false);

    useEffect(() => {
        setSelectedCateChild(categoryIdActive?.toString());
    }, [categoryIdActive]);

    return (
        <View style={styles.container}>
            <NavCateParent
                masterData={masterData}
                cateFilter={cateFilter}
                setCateFilter={setCateFilter}
                navigation={navigation}
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
            />
        </View>
    );
};

export default NavMenu;
