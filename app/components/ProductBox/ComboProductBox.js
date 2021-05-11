import React, { PureComponent, useState, Component } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
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
    render() {
        const bhxProduct = this.props.bhxProduct;
        const imageModal =
            bhxProduct != null && bhxProduct.FeatureImageModel != null
                ? bhxProduct.FeatureImageModel
                : null;
        if (bhxProduct != null && imageModal != null) {
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
                    </View>
                </View>
            );
        } else {
            return null;
        }
    }
}
