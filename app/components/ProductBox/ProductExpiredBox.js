import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import styles from './style';

const ProductExpiredBox = (props) => {
    const [numberItems, setNumberItems] = useState(1);
    const [buyButtonVisible, setBuyButtonVisible] = useState(false);
    const navigation = useNavigation();

    const handleInputNumber = (number) => {
        setNumberItems(+number);
    };
    const boxLabel = () => {
        if (props.bhxProduct.IsPreOrder && props.bhxProduct.PreAmount > 0)
            return (
                <View className="boxLabel" style={styles.boxLabel}>
                    <Text style={styles.boxLabelText}>
                        Còn {props.bhxProduct.PreAmount} túi
                    </Text>
                </View>
            );
    };
    //SP có thể bán được
    const canBuyProduct = (bhxProduct) => {
        if (bhxProduct.Price > 0) {
            return bhxProduct.IsBaseUnit
                ? bhxProduct.StockQuantityNew > 0
                : StockQuantityNew >= 1;
        }
        return false;
    };
    //format HSD còn lại
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
                    <Text>HSD {momentExpiredDate.format('DD/MM/YYYY')}</Text>;
                } else {
                    let expiredTime = calcDateRemain(momentExpiredDate);
                    if (expiredTime != '') {
                        let isMore3Years =
                            moment(expiredDate).diff(
                                momentExpiredDate,
                                'days'
                            ) > 1095;
                        <Text>
                            HSD{' '}
                            {isMore3Years ? 'hơn 3 năm' : 'còn ' + expiredTime}
                        </Text>;
                    }
                }
            }
        }
    };
    const bhxProduct = props.bhxProduct;
    const isNearlyExpiredProduct =
        bhxProduct.Sales !== null && bhxProduct.Sales != undefined;
    if (isNearlyExpiredProduct && bhxProduct.ExpStoreId > 0) {
        const expiredProduct =
            bhxProduct.Sales[bhxProduct.ExpStoreId.toString()];
        return (
            <View
                className="product"
                style={
                    this.state.buyButtonVisible
                        ? styles.productSelected
                        : styles.product
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
                        setNumberItems(1);
                        setBuyButtonVisible(true);
                    }}
                    style={
                        this.state.buyButtonVisible
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
                        <View className="priceInfo" style={styles.priceInfo}>
                            <View className="price" style={styles.price}>
                                <Text>{expiredProduct.Price}</Text>
                            </View>
                            <View className="buy" style={styles.buy}>
                                <Text>MUA</Text>
                            </View>
                        </View>
                    </View>
                    {isNearlyExpiredProduct ? (
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
                        this.state.buyButtonVisible
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
                                value={this.state.numberItems.toString()}
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
                    {isNearlyExpiredProduct ? (
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
    }
    return null;
};

export default ProductExpiredBox;
