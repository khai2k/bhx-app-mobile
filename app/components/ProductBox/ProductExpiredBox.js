import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './style';
import BuyBox from './BuyBox';

const ProductExpiredBox = (props) => {
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
    const boxLabel = () => {
        if (props.bhxProduct.IsPreOrder && props.bhxProduct.PreAmount > 0) {
            return (
                <View className="boxLabel" style={styles.boxLabel}>
                    <Text style={styles.boxLabelText}>
                        Còn {props.bhxProduct.PreAmount} túi
                    </Text>
                </View>
            );
        }
    };
    // SP có thể bán được
    const canBuyProduct = (bhxProduct) => {
        if (bhxProduct.Price > 0) {
            return bhxProduct.IsBaseUnit
                ? bhxProduct.StockQuantityNew > 0
                : bhxProduct.StockQuantityNew >= 1;
        }
        return false;
    };

    const { bhxProduct } = props;
    const isNearlyExpiredProduct =
        bhxProduct.Sales !== null && bhxProduct.Sales !== undefined;
    if (isNearlyExpiredProduct && bhxProduct.ExpStoreId > 0) {
        const expiredProduct =
            bhxProduct.Sales[bhxProduct.ExpStoreId.toString()];
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
                        <Text className="boxExpired" style={styles.boxExpired}>
                            {expiredProduct.ExpiredText}
                        </Text>
                        <View className="imgContent" style={styles.imgContent}>
                            <Image
                                style={styles.imageProduct}
                                source={{
                                    uri: bhxProduct.Avatar
                                }}
                            />
                        </View>
                    </View>
                    {boxLabel()}
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
                    <View
                        className="productInfo"
                        style={
                            isNearlyExpiredProduct
                                ? styles.productInfoExpired
                                : styles.productInfo
                        }>
                        <Text style={styles.productName}>
                            {bhxProduct.ShortName}
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
                    {canBuyProduct(bhxProduct) ? (
                        <TouchableOpacity
                            className="nearlyExpired"
                            style={styles.nearlyExpired}>
                            <View style={styles.expiredLine}>
                                <Text style={styles.expiredText}>Hoặc </Text>
                                <Text style={styles.expiredPrice}>
                                    MUA {bhxProduct.Price}
                                    {'\n'}
                                </Text>
                            </View>
                            <Text style={styles.expiredText}>
                                {bhxProduct.ExpiredText}
                            </Text>
                        </TouchableOpacity>
                    ) : null}
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
                    <View
                        className="productInfo"
                        style={
                            isNearlyExpiredProduct
                                ? styles.productInfoExpired
                                : styles.productInfo
                        }>
                        <Text style={styles.productNameSelected}>
                            {bhxProduct.ShortName}
                        </Text>
                        <Text className="price" style={styles.priceSelected}>
                            {bhxProduct.Price}
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
                    {canBuyProduct(bhxProduct) ? (
                        <TouchableOpacity
                            className="nearlyExpired"
                            style={styles.nearlyExpired}>
                            <View style={styles.expiredLine}>
                                <Text style={styles.expiredText}>Hoặc </Text>
                                <Text style={styles.expiredPrice}>
                                    MUA 4.700đ{'\n'}
                                </Text>
                            </View>
                            <Text style={styles.expiredText}>
                                {bhxProduct.ExpiredText}
                            </Text>
                        </TouchableOpacity>
                    ) : null}
                </View>
            </View>
        );
    }
    return null;
};

export default ProductExpiredBox;
