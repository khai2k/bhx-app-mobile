import React, { PureComponent, useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import styles from './style';

export default class ProductBox extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            numberItems: 0,
            buyButtonVisible: false
        };
    }

    render() {
        return (
            <View className="product" style={styles.product}>
                <View style={styles.productImg}>
                    <View className="boxImg" style={styles.boxImg}>
                        <View className="imgContent" style={styles.imgContent}>
                            <Image
                                style={styles.imageProduct}
                                source={{
                                    uri:
                                        'https://cdn.tgdd.vn/Products/Images/2386/219025/bhx/sua-tuoi-nguyen-kem-khong-duong-inex-hop-1-lit-202104081044194338_300x300.jpg'
                                }}
                                resizeMode="contain"
                            />
                        </View>
                        <View className="boxLabel" style={styles.boxLabel}>
                            <Text style={styles.boxLabelText}>
                                Tối đa 3SP/đơn
                            </Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity
                    onPress={() =>
                        this.setState({
                            buyButtonVisible: true
                        })
                    }>
                    <View className="productInfo" style={styles.productInfo}>
                        <Text style={styles.productName}>
                            Mì tôm chua cay Hảo Hảo
                        </Text>
                        {/* <View className="price">
                                <Text>3.000đ</Text>
                            </View> */}
                    </View>
                    <View className="boxBuy" style={styles.boxBuy}>
                        <View
                            className="priceInfo"
                            style={
                                this.state.buyButtonVisible
                                    ? styles.priceInfoHide
                                    : styles.priceInfo
                            }>
                            <View className="price" style={styles.price}>
                                <Text>3.000đ</Text>
                            </View>
                            <View className="buy" style={styles.buy}>
                                <Text>MUA</Text>
                            </View>
                        </View>
                        <View
                            className="upDown"
                            style={
                                this.state.buyButtonVisible
                                    ? styles.upDownShow
                                    : styles.upDown
                            }>
                            <View className="down" style={styles.down}>
                                <Text>-</Text>
                            </View>
                            <TextInput
                                style={styles.inputBuy}
                                value={this.state.numberItems}
                                keyboardType="numeric"
                            />
                            <View className="up" style={styles.up}>
                                <Text>+</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}
