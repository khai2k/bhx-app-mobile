import React, { PureComponent, useState, Component } from 'react'
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import styles from './style'

import { useNavigation } from '@react-navigation/native'

const ProductBox = props => {
    const [numberItems, setNumberItems] = useState(1)
    const [buyButtonVisible, setBuyButtonVisible] = useState(false)
    const navigation = useNavigation()

    const boxLabel = () => {
        if (props.bhxProduct.maxQuantityOnBill > 0)
            return (
                <View className='boxLabel' style={styles.boxLabel}>
                    <Text style={styles.boxLabelText}>
                        Tối đa {props.bhxProduct.maxQuantityOnBill}
                        SP/đơn
                    </Text>
                </View>
            )
        else if (props.bhxProduct.promotionText)
            return (
                <View className='boxLabel' style={styles.boxLabel}>
                    <Text style={styles.boxLabelText}>
                        {props.bhxProduct.promotionText}
                    </Text>
                    {props.bhxProduct.promotionGiftImgs !== null &&
                    props.bhxProduct.promotionGiftImgs.trim().length > 0 ? (
                        <Image
                            style={styles.imagePromotion}
                            source={{
                                uri: props.bhxProduct.promotionGiftImgs
                            }}
                        />
                    ) : null}
                </View>
            )
        if (props.bhxProduct.isPreOrder && props.bhxProduct.preAmount > 0)
            return (
                <View className='boxLabel' style={styles.boxLabel}>
                    <Text style={styles.boxLabelText}>
                        Còn {props.bhxProduct.preAmount} túi
                    </Text>
                </View>
            )
    }

    const handleInputNumber = number => {
        setNumberItems(+number)
    }

    return (
        <View
            className='product'
            style={
                this.buyButtonVisible ? styles.productSelected : styles.product
            }>
            <TouchableOpacity
                onPress={() => navigation.navigate('ProductDetail')}
                style={styles.productImg}>
                <View className='boxImg' style={styles.boxImg}>
                    <Text className='boxExpired' style={styles.boxExpired}>
                        HSD còn {props.bhxProduct.expiredDateDisplay}
                    </Text>
                    <View className='imgContent' style={styles.imgContent}>
                        <Image
                            style={styles.imageProduct}
                            source={{ uri: props.bhxProduct.avatar }}
                        />
                    </View>
                </View>
                {boxLabel()}
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    this.setNumberItems(1)
                    this.setBuyButtonVisible(true)
                }}
                style={
                    this.buyButtonVisible
                        ? styles.unvisibleProductBuy
                        : styles.visibleProductBuy
                }>
                <View
                    className='productInfo'
                    style={
                        props.bhxProduct.isExpired
                            ? styles.productInfoExpired
                            : styles.productInfo
                    }>
                    <Text style={styles.productName}>
                        {props.bhxProduct.shortName}
                    </Text>
                    {/* <View className="price">
                                <Text>3.000đ</Text>
                            </View> */}
                </View>
                <View className='boxBuy' style={styles.boxBuy}>
                    <View className='priceInfo' style={styles.priceInfo}>
                        <View className='price' style={styles.price}>
                            <Text>{props.bhxProduct.price}</Text>
                        </View>
                        <View className='buy' style={styles.buy}>
                            <Text>MUA</Text>
                        </View>
                    </View>
                </View>
                {props.bhxProduct.isExpired ? (
                    <TouchableOpacity
                        className='nearlyExpired'
                        style={styles.nearlyExpired}>
                        <View style={styles.expiredLine}>
                            <Text style={styles.expiredText}>Hoặc </Text>
                            <Text style={styles.expiredPrice}>
                                MUA 4.700đ{'\n'}
                            </Text>
                        </View>
                        <Text style={styles.expiredText}>HSD còn 15 ngày</Text>
                    </TouchableOpacity>
                ) : null}
            </TouchableOpacity>
            <View
                onPress={() => {
                    this.setBuyButtonVisible(true)
                }}
                style={
                    this.buyButtonVisible
                        ? styles.visibleProductBuy
                        : styles.unvisibleProductBuy
                }>
                <View
                    className='productInfo'
                    style={
                        props.bhxProduct.isExpired
                            ? styles.productInfoExpired
                            : styles.productInfo
                    }>
                    <Text style={styles.productNameSelected}>
                        {props.bhxProduct.shortName}
                    </Text>
                    <Text className='price' style={styles.priceSelected}>
                        {props.bhxProduct.price}
                    </Text>
                </View>
                <View className='boxBuy' style={styles.boxBuy}>
                    <View className='upDown' style={styles.upDownShow}>
                        <TouchableOpacity
                            onPress={() => {
                                this.setState((state, props) => ({
                                    buyButtonVisible:
                                        state.numberItems == 1 ? false : true,
                                    numberItems:
                                        state.numberItems > 0
                                            ? numberItems - 1
                                            : 0
                                }))
                            }}
                            className='down'
                            style={styles.down}>
                            <Text style={styles.downIcon}></Text>
                        </TouchableOpacity>
                        <TextInput
                            style={styles.inputBuy}
                            onChangeText={this.handleInputNumber}
                            value={numberItems.toString()}
                            keyboardType='numeric'
                        />
                        <TouchableOpacity
                            onPress={() => {
                                this.setState((state, props) => ({
                                    numberItems: state.numberItems + 1
                                }))
                            }}
                            className='up'
                            style={styles.up}>
                            <Text style={styles.upIcon1}></Text>
                            <Text style={styles.upIcon2}></Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {props.bhxProduct.isExpired ? (
                    <TouchableOpacity
                        className='nearlyExpired'
                        style={styles.nearlyExpired}>
                        <View style={styles.expiredLine}>
                            <Text style={styles.expiredText}>Hoặc </Text>
                            <Text style={styles.expiredPrice}>
                                MUA 4.700đ{'\n'}
                            </Text>
                        </View>
                        <Text style={styles.expiredText}>HSD còn 15 ngày</Text>
                    </TouchableOpacity>
                ) : null}
            </View>
        </View>
    )
}

export default ProductBox
