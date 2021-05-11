import React, { PureComponent, useState, Component } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import moment from 'moment';
import styles from './style';

export default class ProductBox extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            numberItems: 1,
            buyButtonVisible: false
        };
    }
    handleInputNumber = (number) => {
        this.setState({
            numberItems: +number
        });
    };
    handleChangeNumber = (number) => {
        if (number < 0) {
            this.setState((state, props) => ({
                buyButtonVisible: state.numberItems == 1 ? false : true,
                numberItems:
                    state.numberItems > 0 ? this.state.numberItems - 1 : 0
            }));
        } else {
            this.setState((state, props) => ({
                numberItems: state.numberItems + number
            }));
        }
    };
    boxLabel() {
        if (
            this.props.bhxProduct.IsPreOrder &&
            this.props.bhxProduct.PreAmount > 0
        )
            return (
                <View className="boxLabel" style={styles.boxLabel}>
                    <Text style={styles.boxLabelText}>
                        Còn {this.props.bhxProduct.PreAmount} túi
                    </Text>
                </View>
            );
    }
    canBuyProduct = (bhxProduct) => {
        if (bhxProduct.Price > 0) {
            return bhxProduct.IsBaseUnit
                ? bhxProduct.StockQuantityNew > 0
                : StockQuantityNew >= 1;
        }
        return false;
    };
    calcDateRemain = (expiredDate) => {
        let nowDate = moment(expiredDate);
        let diffDay = nowDate.diff(expiredDate, 'days');
        if (diff < 1) return '';
        if (diff > 365) return diff / 365 + ' năm';
        if (diff <= 365 && diff > 90) return diff / 30 + ' tháng';
        return diff + ' ngày';
    };
    boxExpiredProduct() {
        const bhxProduct = this.props.bhxProduct;
        const momentExpiredDate = moment(bhxProduct.ExpiredDateDisplay);
        if (this.canBuyProduct(bhxProduct)) {
            if (
                bhxProduct.ExpiredDateDisplay !== '1/1/0001 12:00:00 AM' &&
                bhxProduct.Category.Id != 7578
            ) {
                if (bhxProduct.ExpiredType >= 2) {
                    <Text>HSD {momentExpiredDate.format('DD/MM/YYYY')}</Text>;
                } else {
                    let expiredTime = this.calcDateRemain(momentExpiredDate);
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
    }
    render() {
        const bhxProduct = this.props.bhxProduct;
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
                        onPress={() =>
                            this.props.navigation.navigate('ProductDetail')
                        }
                        style={styles.productImg}>
                        <View className="boxImg" style={styles.boxImg}>
                            <Text
                                className="boxExpired"
                                style={styles.boxExpired}>
                                {expiredProduct.ExpiredText}
                            </Text>
                            <View
                                className="imgContent"
                                style={styles.imgContent}>
                                <Image
                                    style={styles.imageProduct}
                                    source={{
                                        uri: bhxProduct.Avatar
                                    }}
                                />
                            </View>
                        </View>
                        {this.boxLabel()}
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() =>
                            this.setState({
                                buyButtonVisible: true,
                                numberItems: 1
                            })
                        }
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
                            {/* <View className="price">
                                    <Text>3.000đ</Text>
                                </View> */}
                        </View>
                        <View className="boxBuy" style={styles.boxBuy}>
                            <View
                                className="priceInfo"
                                style={styles.priceInfo}>
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
                                    <Text style={styles.expiredText}>
                                        Hoặc{' '}
                                    </Text>
                                    <Text style={styles.expiredPrice}>
                                        MUA {bhxProduct.Price}
                                        {'\n'}
                                    </Text>
                                </View>
                                <Text style={styles.expiredText}>
                                    {this.boxExpiredProduct()}
                                </Text>
                            </TouchableOpacity>
                        ) : null}
                    </TouchableOpacity>
                    <View
                        onPress={() =>
                            this.setState({
                                buyButtonVisible: true
                            })
                        }
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
                            <Text
                                className="price"
                                style={styles.priceSelected}>
                                {bhxProduct.Price}
                            </Text>
                        </View>
                        <View className="boxBuy" style={styles.boxBuy}>
                            <View className="upDown" style={styles.upDownShow}>
                                <TouchableOpacity
                                    onPress={() => this.handleChangeNumber(-1)}
                                    className="down"
                                    style={styles.down}>
                                    <Text style={styles.downIcon}></Text>
                                </TouchableOpacity>
                                <TextInput
                                    style={styles.inputBuy}
                                    onChangeText={this.handleInputNumber}
                                    value={this.state.numberItems.toString()}
                                    keyboardType="numeric"
                                />
                                <TouchableOpacity
                                    onPress={() => {
                                        this.handleChangeNumber(1);
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
                                    <Text style={styles.expiredText}>
                                        Hoặc{' '}
                                    </Text>
                                    <Text style={styles.expiredPrice}>
                                        MUA 4.700đ{'\n'}
                                    </Text>
                                </View>
                                <Text style={styles.expiredText}>
                                    {this.boxExpiredProduct()}
                                </Text>
                            </TouchableOpacity>
                        ) : null}
                    </View>
                </View>
            );
        } else {
            return null;
        }
    }
}
