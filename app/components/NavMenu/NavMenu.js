import React, { useEffect, useState } from 'react';
import { View, AsyncStorage } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';
import NavCateParent from './NavCateParent';
import NavCateChild from './NavCateChild';
import { useSelector } from 'react-redux';

const NavMenu = () => {
    const navigation = useNavigation();

    //Get data Menu từ redux
    const menuData = useSelector((state) => state.menuReducer.Menu);

    // Danh sách cate
    const [listCate, setListCate] = useState(menuData);
    const [masterData, setMasterData] = useState(menuData);

    const [search, setSearch] = useState('');

    const [cateFilter, setCateFilter] = useState('8686');
    const [selectedCateChild, setSelectedCateChild] = useState('');

    const [isHasSearch, setIsHasSearch] = useState(false);



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
                listCate={listCate}
                cateFilter={cateFilter}
                setCateFilter={setCateFilter}
                selectedCateChild={selectedCateChild}
                setSelectedCateChild={setSelectedCateChild}
                masterData={masterData}
                setIsHasSearch={setIsHasSearch}
                setListCate={setListCate}
                setSearch={setSearch}
                navigation={navigation}
            />
        </View>
    );
};

export default NavMenu;
