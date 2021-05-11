import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import styles from './style';

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
    const handleInputNumber = (number) => {
        setNumberItems(+number);
    };
    const canBuyProduct = (bhxProduct) => {
        if (bhxProduct.Price > 0) {
            return bhxProduct.IsBaseUnit
                ? bhxProduct.StockQuantityNew > 0
                : StockQuantityNew >= 1;
        }
        return false;
    };
    const calcDateRemain = (expiredDate) => {
        let nowDate = moment(expiredDate);
        let diffDay = nowDate.diff(expiredDate, 'days');
        if (diff < 1) return '';
        if (diff > 365) return diff / 365 + ' năm';
        if (diff <= 365 && diff > 90) return diff / 30 + ' tháng';
        return diff + ' ngày';
    };
    const boxExpiredProduct = () => {
        const bhxProduct = props.bhxProduct;
        const momentExpiredDate = moment(bhxProduct.ExpiredDateDisplay);
        if (canBuyProduct(bhxProduct)) {
            if (
                bhxProduct.ExpiredDateDisplay !== '1/1/0001 12:00:00 AM' &&
                bhxProduct.Category.Id != 7578
            ) {
                if (bhxProduct.ExpiredType >= 2) {
                    return (
                        <Text>
                            HSD {momentExpiredDate.format('DD/MM/YYYY')}
                        </Text>
                    );
                } else {
                    let expiredTime = calcDateRemain(momentExpiredDate);
                    if (expiredTime != '') {
                        let isMore3Years =
                            moment(expiredDate).diff(
                                momentExpiredDate,
                                'days'
                            ) > 1095;
                        return (
                            <Text>
                                HSD{' '}
                                {isMore3Years
                                    ? 'hơn 3 năm'
                                    : 'còn ' + expiredTime}
                            </Text>
                        );
                    }
                }
            }
        }
    };
    return (
        <View
            className="product"
            style={buyButtonVisible ? styles.productSelected : styles.product}>
            <TouchableOpacity
                onPress={() => navigation.navigate('ProductDetail')}
                style={styles.productImg}>
                <View className="boxImg" style={styles.boxImg}>
                    <Text className="boxExpired" style={styles.boxExpired}>
                        HSD còn {props.bhxProduct.ExpiredDateDisplay}
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
                    setNumberItems(1);
                    setBuyButtonVisible(true);
                }}
                style={
                    buyButtonVisible
                        ? styles.unvisibleProductBuy
                        : styles.visibleProductBuy
                }>
                <View
                    className="productInfo"
                    style={
                        props.bhxProduct.IsExpired
                            ? styles.productInfoExpired
                            : styles.productInfo
                    }>
                    <Text style={styles.productName}>
                        {props.bhxProduct.ShortName}
                    </Text>
                </View>
                <View className="boxBuy" style={styles.boxBuy}>
                    <View className="priceInfo" style={styles.priceInfo}>
                        <View className="price" style={styles.price}>
                            <Text>{props.bhxProduct.Price}</Text>
                        </View>
                        <View className="buy" style={styles.buy}>
                            <Text>MUA</Text>
                        </View>
                    </View>
                </View>
                {props.bhxProduct.Sales !== null &&
                props.bhxProduct.Sales != undefined ? (
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
                            {boxExpiredProduct()}
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
                        props.bhxProduct.IsExpired
                            ? styles.productInfoExpired
                            : styles.productInfo
                    }>
                    <Text style={styles.productNameSelected}>
                        {props.bhxProduct.ShortName}
                    </Text>
                    <Text className="price" style={styles.priceSelected}>
                        {props.bhxProduct.Price}
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
                            <Text style={styles.downIcon} />
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
                            <Text style={styles.upIcon1} />
                            <Text style={styles.upIcon2} />
                        </TouchableOpacity>
                    </View>
                </View>
                {props.bhxProduct.Sales !== null &&
                props.bhxProduct.Sales != undefined ? (
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
                            {boxExpiredProduct()}
                        </Text>
                    </TouchableOpacity>
                ) : null}
            </View>
        </View>
    );
};

export default ProductBox;
