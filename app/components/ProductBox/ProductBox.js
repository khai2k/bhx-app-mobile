import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { helper } from '@app/common';
import styles from './style';
import BuyBox from './BuyBox';

const ProductBox = (props) => {
    const [numberItems, setNumberItems] = useState(1);
    const [buyButtonVisible, setBuyButtonVisible] = useState(false);
    const navigation = useNavigation();

    const boxLabel = () => {
        if (props.bhxProduct.MaxQuantityOnBill > 0) {
            return (
                <View className="boxLabel" style={styles.boxLabel}>
                    <Text style={styles.boxLabelText}>
                        Tối đa {props.bhxProduct.MaxQuantityOnBill}
                        SP/đơn
                    </Text>
                </View>
            );
        } else if (props.bhxProduct.PromotionText) {
            return (
                <View className="boxLabel" style={styles.boxLabel}>
                    <Text style={styles.boxLabelText}>
                        {props.bhxProduct.PromotionText}
                    </Text>
                    {props.bhxProduct.PromotionGiftImgs !== null &&
                    props.bhxProduct.PromotionGiftImgs.trim().length > 0 ? (
                        <Image
                            style={styles.imagePromotion}
                            source={{
                                uri: props.bhxProduct.PromotionGiftImgs
                            }}
                        />
                    ) : null}
                </View>
            );
        }
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
    const onUpdateNumberItems = (number) => {
        setNumberItems(number);
    };
    const onUpdateBuyButtonVisible = (status) => {
        setBuyButtonVisible(status);
    };

    const handleInputNumber = (number) => {
        setNumberItems(+number);
    };
    return (
        <View
            className="product"
            style={buyButtonVisible ? styles.productSelected : styles.product}>
            <TouchableOpacity
                onPress={() =>
                    navigation.push('ProductDetail', {
                        productId: props.bhxProduct.Id
                    })
                }
                style={styles.productImg}>
                <View className="boxImg" style={styles.boxImg}>
                    <Text className="boxExpired" style={styles.boxExpired}>
                        {props.bhxProduct.ExpiredText}
                    </Text>
                    <View className="imgContent" style={styles.imgContent}>
                        <Image
                            style={styles.imageProduct}
                            source={{ uri: props.bhxProduct.Avatar }}
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
                        props.bhxProduct.Sales !== null &&
                        props.bhxProduct.Sales !== undefined
                            ? styles.productInfoExpired
                            : styles.productInfo
                    }>
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
                {props.bhxProduct.Sales !== null &&
                props.bhxProduct.Sales !== undefined ? (
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
                            {props.bhxProduct.ExpiredText}
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
                        props.bhxProduct.Sales !== null &&
                        props.bhxProduct.Sales !== undefined
                            ? styles.productInfoExpired
                            : styles.productInfo
                    }>
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
                {props.bhxProduct.Sales !== null &&
                props.bhxProduct.Sales !== undefined ? (
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
                            {props.bhxProduct.ExpiredText}
                        </Text>
                    </TouchableOpacity>
                ) : null}
            </View>
        </View>
    );
};

export default ProductBox;
