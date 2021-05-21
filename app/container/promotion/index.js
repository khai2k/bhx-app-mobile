import React from 'react';
import {
    Image,
    View,
    FlatList,
    TouchableOpacity,
    ScrollView,
    Text
} from 'react-native';
import { useSelector } from 'react-redux';
import { styles } from './styles';
import Header from '../../components/Header';
import { IconPromotion } from '../../images';
import ProductBox from '../../components/ProductBox/ProductBox';

const Promotion = () => {
    const lstCategory = [
        {
            CategoryId: 1,
            Name: 'Xả kho giá sốc',
            Icon: 'https://cdn.tgdd.vn/bachhoaxanh/khuyen-mai/Content/images/Icon-ShockGroup.png'
        },
        {
            CategoryId: 2,
            Name: 'Đồ dùng gia đình',
            Icon: 'https://cdn.tgdd.vn/Products/Images/3185/bhx/do-dung-gia-dinh-202012061051411488.png'
        },
        {
            CategoryId: 3,
            Name: 'Mì cháo phở bún',
            Icon: 'https://cdn.tgdd.vn/Products/Images/7147/bhx/mi-chao-pho-bun-202101191033150536.png'
        },
        {
            CategoryId: 4,
            Name: 'Bánh kẹo các loại',
            Icon: 'https://cdn.tgdd.vn/Products/Images/7143/bhx/banh-keo-cac-loai-202101191012413445.png'
        },
        {
            CategoryId: 5,
            Name: 'Chăm sóc cá nhân',
            Icon: 'https://cdn.tgdd.vn/Products/Images/2515/bhx/cham-soc-ca-nhan-202012061051074058.png'
        }
    ];

    const lstProducts = useSelector((state) => state.homeReducer.HomeData);

    return (
        <View>
            <Header />
            <ScrollView style={styles.container}>
                <RenderListCategory lstCategory={lstCategory} />
                <RenderLineDealShock lstProducts={lstProducts[0].Products} />
            </ScrollView>
        </View>
    );
};

// Render danh sách category
const RenderListCategory = (props) => {
    return (
        <View style={styles.listCategory}>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={props.lstCategory}
                keyExtractor={(item) => item.CategoryId}
                renderItem={(item) => {
                    return <RenderCategory item={item} />;
                }}
            />
        </View>
    );
};

// Render category
const RenderCategory = (props) => {
    const { item } = props.item;
    return (
        <TouchableOpacity style={styles.categoryItem}>
            <Image style={styles.iconCategory} source={{ uri: item.Icon }} />
            <Text style={styles.nameCategory}>{item.Name} </Text>
        </TouchableOpacity>
    );
};

// Render tab deal sốc mỗi ngày
const RenderLineDealShock = (props) => {
    return (
        <View style={styles.tabDealShock}>
            <Image
                style={styles.iconDealShock}
                source={IconPromotion.iconDealSoc}
            />
            <View style={styles.listProductDeal}>
                {props.lstProducts?.map((element) => {
                    return <ProductBox bhxProduct={element} />;
                })}
            </View>
        </View>
    );
};

export default Promotion;
