import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { helper } from '@app/common';
import styles from './style';
import BuyBox from './BuyBox';

const ComboProductBox = (props) => {
    const [numberItems, setNumberItems] = useState(1);
    const [buyButtonVisible, setBuyButtonVisible] = useState(false);
    const navigation = useNavigation();
    const onUpdateNumberItems = (number) => {
        setNumberItems(number);
    };
    const onUpdateBuyButtonVisible = (status) => {
        setBuyButtonVisible(status);
    };
    const handleInputNumber = (number) => {
        setNumberItems(+number);
    };
    const imageModal =
        props.bhxProduct != null &&
        props.bhxProduct.FeatureImageModel != null &&
        props.bhxProduct.FeatureImageModel !== undefined
            ? props.bhxProduct.FeatureImageModel
            : null;
    if (props.bhxProduct != null && imageModal != null) {
        return (
            <View
                className="product"
                style={
                    buyButtonVisible ? styles.productSelected : styles.product
                }>
                <TouchableOpacity
                    onPress={() => navigation.navigate('ProductDetail')}
                    style={styles.productImg}>
                    <View className="boxImg" style={styles.boxImg}>
                        <View className="imgContent" style={styles.imgContent}>
                            <Image
                                style={styles.comboTheme}
                                source={{
                                    uri: imageModal.ThemeMobile
                                }}
                            />
                            <View style={styles.wrapImageProductCombo}>
                                <Image
                                    style={styles.imageProductCombo}
                                    source={{
                                        uri: imageModal.ImageMobile
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        if (
                            props.bhxProduct.Price > 0 &&
                            props.bhxProduct.StockQuantityNew >= 1
                        ) {
                            setNumberItems(1);
                            setBuyButtonVisible(true);
                        }
                    }}
                    style={
                        buyButtonVisible
                            ? styles.unvisibleProductBuy
                            : styles.visibleProductBuy
                    }>
                    <View className="productInfo" style={styles.productInfo}>
                        <Text style={styles.productName}>
                            {props.bhxProduct.ShortName}
                        </Text>
                    </View>
                    <View className="boxBuy" style={styles.boxBuy}>
                        <BuyBox
                            bhxProduct={props.bhxProduct}
                            isPageExpired={false}
                            selectedBuy={false}
                            numberItems={numberItems}
                            onUpdateNumberItems={onUpdateNumberItems}
                            onUpdateBuyButtonVisible={onUpdateBuyButtonVisible}
                            handleInputNumber={handleInputNumber}
                        />
                    </View>
                </TouchableOpacity>
                <View
                    onPress={() => {
                        setBuyButtonVisible(true);
                    }}
                    style={
                        buyButtonVisible
                            ? styles.visibleProductBuy
                            : styles.unvisibleProductBuy
                    }>
                    <View className="productInfo" style={styles.productInfo}>
                        <Text style={styles.productNameSelected}>
                            {props.bhxProduct.ShortName}
                        </Text>
                        <Text className="price" style={styles.priceSelected}>
                            {helper.formatMoney(props.bhxProduct.Price)}
                        </Text>
                    </View>
                    <View className="boxBuy" style={styles.boxBuy}>
                        <BuyBox
                            bhxProduct={props.bhxProduct}
                            isPageExpired={false}
                            selectedBuy
                            numberItems={numberItems}
                            onUpdateNumberItems={onUpdateNumberItems}
                            onUpdateBuyButtonVisible={onUpdateBuyButtonVisible}
                            handleInputNumber={handleInputNumber}
                        />
                    </View>
                </View>
            </View>
        );
    }
    return null;
};
export default ComboProductBox;
