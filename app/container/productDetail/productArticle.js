import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    StyleSheet,
    ScrollView,
    Button,
    useWindowDimensions
} from 'react-native';
import * as COLOR from '@app/styles/colors';
import HTML from 'react-native-render-html';
import Box from './box';
import GroupBoxOption from './groupBoxOption';

const ProductArticle = (props) => {
    const contentWidth = useWindowDimensions().width;
    const { product, isExchangeProduct } = props;
    const { MetaDescription, ProductArticle, FeatureSpecification } = product;
    const [isShowModal, setIsShowModal] = useState(false);
    function renderModal() {
        return (
            <Modal animationType="slide" transparent visible={isShowModal}>
                <View style={styles.modalView}>
                    <View style={styles.header}>
                        <View style={{ flex: 1, paddingHorizontal: 10 }}>
                            <Text>Mô tả sản phẩm </Text>
                        </View>
                        <TouchableOpacity onPress={() => setIsShowModal(false)}>
                            <View
                                style={{
                                    paddingHorizontal: 10,
                                    borderLeftWidth: 1
                                }}>
                                <Text>✕</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <ScrollView>
                        <View
                            style={{
                                paddingHorizontal: 10,
                                backgroundColor: '#fff',
                                marginBottom: 10
                            }}>
                            <View style={{ paddingVertical: 10 }}>
                                <Text>{MetaDescription}</Text>
                            </View>

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
                            </View>
                            <HTML
                                source={{ html: FeatureSpecification }}
                                contentWidth={contentWidth}
                            />
                        </View>
                        <View
                            style={{
                                padding: 10,
                                backgroundColor: '#fff'
                            }}>
                            <Text
                                style={{
                                    fontSize: 20,
                                    fontWeight: 'bold'
                                }}>
                                Bài viết sản phẩm
                            </Text>
                            <HTML
                                source={{ html: ProductArticle }}
                                contentWidth={contentWidth}
                            />
                        </View>
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
        return (
            <View style={{ margin: 5, flex: 1 }}>
                <Text>{MetaDescription}</Text>
                <TouchableOpacity onPress={() => setIsShowModal(true)}>
                    <Text style={{ color: COLOR.PRIMARY }}>Xem chi tiet</Text>
                </TouchableOpacity>
            </View>
        );
    }
    return (
        <View>
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
        backgroundColor: '#fff',
        flexDirection: 'row',
        paddingVertical: 10
    },
    modalView: {
        backgroundColor: '#f5f8fd',
        flex: 1
    },
    product_info: {},
    row_info: {
        flexDirection: 'row'
    }
});

export default ProductArticle;
