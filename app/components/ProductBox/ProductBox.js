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
    boxLabel() {
        if (this.props.bhxProduct.maxQuantityOnBill > 0)
            return (
                <View className="boxLabel" style={styles.boxLabel}>
                    <Text style={styles.boxLabelText}>
                        Tối đa {this.props.bhxProduct.maxQuantityOnBill}
                        SP/đơn
                    </Text>
                </View>
            );
        else if (this.props.bhxProduct.promotionText)
            return (
                <View className="boxLabel" style={styles.boxLabel}>
                    <Text style={styles.boxLabelText}>
                        {this.props.bhxProduct.promotionText}
                    </Text>
                    {this.props.bhxProduct.promotionGiftImgs !== null &&
                    this.props.bhxProduct.promotionGiftImgs.trim().length >
                        0 ? (
                        <Image
                            style={styles.imagePromotion}
                            source={{
                                uri: this.props.bhxProduct.promotionGiftImgs
                            }}
                        />
                    ) : null}
                </View>
            );
        if (
            this.props.bhxProduct.isPreOrder &&
            this.props.bhxProduct.preAmount > 0
        )
            return (
                <View className="boxLabel" style={styles.boxLabel}>
                    <Text style={styles.boxLabelText}>
                        Còn {this.props.bhxProduct.preAmount} túi
                    </Text>
                </View>
            );
    }
    render() {
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
                        <Text className="boxExpired" style={styles.boxExpired}>
                            HSD còn {this.props.bhxProduct.expiredDateDisplay}
                        </Text>
                        <View className="imgContent" style={styles.imgContent}>
                            <Image
                                style={styles.imageProduct}
                                source={{ uri: this.props.bhxProduct.avatar }}
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
                    <View className="productInfo" style={styles.productInfo}>
                        <Text style={styles.productName}>
                            {this.props.bhxProduct.shortName}
                        </Text>
                        {/* <View className="price">
                                <Text>3.000đ</Text>
                            </View> */}
                    </View>
                    <View className="boxBuy" style={styles.boxBuy}>
                        <View className="priceInfo" style={styles.priceInfo}>
                            <View className="price" style={styles.price}>
                                <Text>{this.props.bhxProduct.price}</Text>
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
                    <View className="productInfo" style={styles.productInfo}>
                        <Text style={styles.productNameSelected}>
                            {this.props.bhxProduct.shortName}
                        </Text>
                        <Text className="price" style={styles.priceSelected}>
                            {this.props.bhxProduct.price}
                        </Text>
                    </View>
                    <View className="boxBuy" style={styles.boxBuy}>
                        <View className="upDown" style={styles.upDownShow}>
                            <TouchableOpacity
                                onPress={() =>
                                    this.setState((state, props) => ({
                                        buyButtonVisible:
                                            state.numberItems == 1
                                                ? false
                                                : true,
                                        numberItems:
                                            state.numberItems > 0
                                                ? this.state.numberItems - 1
                                                : 0
                                    }))
                                }
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
                                    this.setState((state, props) => ({
                                        numberItems: state.numberItems + 1
                                    }));
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
}
