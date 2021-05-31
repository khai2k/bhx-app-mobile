import { View, Image, FlatList } from 'react-native';
import React from 'react';
import { styles } from './styles';
import { IconPromotion } from '../../images';
import ProductBox from '../../components/ProductBox/ProductBox';

const LineDealShock = (props) => {
    return (
        <View style={styles.tabDealShock}>
            <View style={styles.imgIconDealShock}>
                <Image
                    style={styles.iconDealShock}
                    source={IconPromotion.iconDealSoc}
                />
            </View>
            <FlatList
                style={styles.listProductDeal}
                numColumns="3"
                data={props.lstProductTopDeal}
                keyExtractor={(item) => item.Id}
                renderItem={(item) => {
                    return <ProductBox bhxProduct={item.item} />;
                }}
            />
        </View>
    );
};

export default LineDealShock;
