import React, { useEffect, useState } from 'react';
import { View, AsyncStorage } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';
import NavCateParent from './NavCateParent';
import NavCateChild from './NavCateChild';

const NavMenu = () => {
    const navigation = useNavigation();

    const [search, setSearch] = useState('');
    const [masterData, setMasterData] = useState([]);

    const [cateFilter, setCateFilter] = useState('8686');
    const [selectedCateChild, setSelectedCateChild] = useState('');

    // Danh sách cate
    const [listCate, setListCate] = useState([]);
    const [isHasSearch, setIsHasSearch] = useState(false);

    const getListCateLocalStorage = async () => {
        const value = await AsyncStorage.getItem('ListCates');
        return value ? JSON.parse(value) : [];
    };

    useEffect(async () => {
        // Lấy dữ liệu từ local
        const data = await getListCateLocalStorage();
        setListCate(data);
        setMasterData(data);
    }, []);

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
