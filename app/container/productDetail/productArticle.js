import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    StyleSheet,
    ScrollView,
    Button,
    useWindowDimensions,
    Image
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { helper } from '@app/common';
import * as COLOR from '@app/styles/colors';
import HTML from 'react-native-render-html';
import Box from './box';
import GroupBoxOption from './groupBoxOption';

const ProductArticle = (props) => {
    const contentWidth = useWindowDimensions().width;
    const { product, isExchangeProduct } = props;
    const { MetaDescription, FeatureSpecification, bHXProduct } = product;
    const { PromotionText, ShortName, FullName, Avatar, ExpiredText } =
        bHXProduct;
    let { ProductArticle } = product;
    /// modify ProductArticle to display Image
    ProductArticle = ProductArticle.split('data-src').join('src');
    const [isShowModal, setIsShowModal] = useState(false);
    const [isShowMore, setIsShowMore] = useState(false);
    function renderModal() {
        return (
            <Modal
                animationType="slide"
                transparent
                visible={isShowModal}
                onRequestClose={() => setIsShowModal(false)}>
                <View style={styles.modalView}>
                    <View style={styles.header}>
                        <View
                            style={{
                                flex: 1,
                                paddingHorizontal: 10,
                                backgroundColor: 'white',
                                paddingVertical: 10
                            }}>
                            <Text>Mô tả sản phẩm </Text>
                        </View>
                        <TouchableOpacity onPress={() => setIsShowModal(false)}>
                            <View
                                style={{
                                    backgroundColor: 'white',
                                    padding: 10,
                                    marginLeft: 2
                                }}>
                                <Text>✕</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <ScrollView>
                        <View
                            style={{
                                paddingHorizontal: 10,
                                backgroundColor: COLOR.WHITE,
                                marginBottom: 10
                            }}>
                            <View style={{ paddingVertical: 10 }}>
                                <Text>{MetaDescription}</Text>
                            </View>
                            {FeatureSpecification !== '' && (
                                <View style={styles.product_info}>
                                    <View style={{ paddingVertical: 10 }}>
                                        <Text
                                            style={{
                                                fontSize: 20,
                                                fontWeight: 'bold'
                                            }}>
                                            Thông tin sản phẩm{' '}
                                        </Text>
                                    </View>

                                    <HTML
                                        source={{
                                            html: FeatureSpecification
                                        }}
                                        contentWidth={contentWidth}
                                    />
                                </View>
                            )}
                        </View>
                        {ProductArticle !== '' && (
                            <View>
                                <View
                                    style={{
                                        padding: 10,
                                        backgroundColor: COLOR.WHITE,
                                        flex: 1
                                    }}>
                                    <Text
                                        style={{
                                            fontSize: 20,
                                            fontWeight: 'bold'
                                        }}>
                                        Bài viết sản phẩm
                                    </Text>
                                    <View
                                        style={{
                                            height: isShowMore ? 'auto' : 300
                                        }}>
                                        <HTML
                                            source={{ html: ProductArticle }}
                                            contentWidth={contentWidth}
                                        />
                                    </View>
                                </View>
                                <View
                                    style={{
                                        flex: 1,
                                        backgroundColor: 'white',
                                        padding: 10
                                    }}>
                                    {!isShowMore &&
                                        ProductArticle.length > 1000 && (
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center'
                                                }}>
                                                <Text
                                                    style={{ color: 'green' }}
                                                    onPress={() =>
                                                        setIsShowMore(true)
                                                    }>
                                                    {`Xem thêm `}
                                                </Text>
                                                <Icon
                                                    name="chevron-down"
                                                    size={10}
                                                    color="green"
                                                />
                                            </View>
                                        )}
                                </View>
                            </View>
                        )}
                    </ScrollView>
                    <View style={{ paddingVertical: 10, alignItems: 'center' }}>
                        <ScrollView>
                            {isExchangeProduct ? (
                                <GroupBoxOption
                                    exchangeProducts={
                                        product.exchangeProducts || []
                                    }
                                />
                            ) : (
                                <Box bHXProduct={product.bHXProduct || []} />
                            )}
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        );
    }
    function renderDescription() {
        let address = '';
        return (
            <View style={{ flex: 1, padding: 5 }}>
                <Text>
                    <Text style={{ fontWeight: 'bold' }}>{FullName}</Text>
                    {` ${MetaDescription} `}
                    <Text
                        onPress={() => setIsShowModal(true)}
                        style={{ color: COLOR.GREEN_KEY }}>
                        Xem chi tiết
                    </Text>
                </Text>
            </View>
        );
    }
    function renderPromotion() {
        return (
            <View style={{ padding: 5 }}>
                <Text style={styles.textPromotionSmall}>
                    {`* Khuyến mãi áp dụng khi mua ${ShortName}`}
                </Text>
                <View style={styles.promotionBox}>
                    <View style={{ padding: 5 }}>
                        <Image style={styles.Image} source={{ uri: Avatar }} />
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Text>{PromotionText}</Text>
                    </View>
                </View>
            </View>
        );
    }
    function renderExpiredText() {
        return (
            <View
                style={{
                    position: 'absolute',
                    top: -60,
                    left: 10,
                    backgroundColor: '#222b45b5',
                    paddingHorizontal: 8,
                    borderRadius: 10
                }}>
                <Text style={{ color: 'white' }}>{ExpiredText}</Text>
            </View>
        );
    }
    return (
        <View style={{ backgroundColor: COLOR.WHITE, paddingBottom: 10 }}>
            {!helper.isEmptyOrNull(ExpiredText) && renderExpiredText()}
            {!helper.isEmptyOrNull(PromotionText) && renderPromotion()}
            <View style={{ flexDirection: 'row' }}>
                {renderDescription()}
                {!isExchangeProduct && (
                    <View>
                        <Box bHXProduct={product.bHXProduct || []} />
                    </View>
                )}
            </View>
            {isExchangeProduct && (
                <View>
                    <GroupBoxOption
                        exchangeProducts={product.exchangeProducts || []}
                    />
                </View>
            )}
            {renderModal()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        marginTop: 22
    },
    fixBottom: {
        position: 'absolute',
        top: 100,
        zIndex: 1111
    },
    header: {
        flexDirection: 'row',
        paddingBottom: 2
    },
    modalView: {
        backgroundColor: '#f5f8fd',
        flex: 1
    },
    product_info: {},
    row_info: {
        flexDirection: 'row'
    },
    Image: {
        height: 25,
        margin: 5,
        width: 25
    },
    textPromotionSmall: {
        fontSize: 12,
        color: COLOR.GRAY_DARK
    },
    promotionBox: {
        flexDirection: 'row',
        backgroundColor: COLOR.DANDELION,
        borderRadius: 8,
        padding: 5,
        marginVertical: 5
    }
});

export default ProductArticle;
