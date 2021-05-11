import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './style';

const ComboProductBox = (props) => {
    const [numberItems, setNumberItems] = useState(1);
    const [buyButtonVisible, setBuyButtonVisible] = useState(false);
    const navigation = useNavigation();

    const handleInputNumber = (number) => {
        setNumberItems(+number);
    }
    const bhxProduct = props.bhxProduct;
    const imageModal =
        bhxProduct != null && bhxProduct.FeatureImageModel != null
            ? bhxProduct.FeatureImageModel
            : null;
    if (bhxProduct != null && imageModal != null) {
        return (
            <View
                className="product"
                style={
                    buyButtonVisible
                        ? styles.productSelected
                        : styles.product
                }>
                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate('ProductDetail')
                    }
                    style={styles.productImg}>
                    <View className="boxImg" style={styles.boxImg}>
                        <View
                            className="imgContent"
                            style={styles.imgContent}>
                            <Image
                                style={styles.comboTheme}
                                source={{
                                    uri: imageModal.ThemeMobile
                                }}
                            />
                            <Image
                                style={styles.imageProductCombo}
                                source={{
                                    uri: imageModal.ImageMobile
                                }}
                            />
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() =>
                        setBuyButtonVisible(true);
                        setNumberItems(1);
                    }
                    style={
                        buyButtonVisible
                            ? styles.unvisibleProductBuy
                            : styles.visibleProductBuy
                    }>
                    <View
                        className="productInfo"
                        style={styles.productInfo}>
                        <Text style={styles.productName}>
                            {bhxProduct.ShortName}
                        </Text>
                    </View>
                    <View className="boxBuy" style={styles.boxBuy}>
                        <View
                            className="priceInfo"
                            style={styles.priceInfo}>
                            <View className="price" style={styles.price}>
                                <Text>{bhxProduct.Price}</Text>
                            </View>
                            <View className="buy" style={styles.buy}>
                                <Text>MUA</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
                <View
                    onPress={() =>
                        setBuyButtonVisible(true);
                    }
                    style={
                        buyButtonVisible
                            ? styles.visibleProductBuy
                            : styles.unvisibleProductBuy
                    }>
                    <View
                        className="productInfo"
                        style={styles.productInfo}>
                        <Text style={styles.productNameSelected}>
                            {bhxProduct.ShortName}
                        </Text>
                        <Text
                            className="price"
                            style={styles.priceSelected}>
                            {bhxProduct.Price}
                        </Text>
                    </View>
                    <View className="boxBuy" style={styles.boxBuy}>
                        <View className="upDown" style={styles.upDownShow}>
                            <TouchableOpacity
                                onPress={() => {
                                    setNumberItems(
                                        numberItems > 0 ? numberItems - 1 : 0
                                    );
                                    setBuyButtonVisible(numberItems !== 1);
                                }}
                                className="down"
                                style={styles.down}>
                                <Text style={styles.downIcon}></Text>
                            </TouchableOpacity>
                            <TextInput
                                style={styles.inputBuy}
                                onChangeText={handleInputNumber}
                                value={numberItems.toString()}
                                keyboardType="numeric"
                            />
                            <TouchableOpacity
                                onPress={() => {
                                    setNumberItems(numberItems + 1);
                                }}    
                                className="up"
                                style={styles.up}>
                                <Text style={styles.upIcon1}></Text>
                                <Text style={styles.upIcon2}></Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        );
    } 
    return null;
};
export default class ComboProductBox;