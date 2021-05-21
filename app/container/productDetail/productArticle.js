import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    StyleSheet,
    ScrollView
} from 'react-native';
import * as COLOR from '@app/styles/colors';

const ProductArticle = (props) => {
    const { product } = props;
    const { MetaDescription } = product;
    const [isShowModal, setIsShowModal] = useState(false);
    return (
        <View style={{ margin: 5 }}>
            <Text>{MetaDescription}</Text>
            <TouchableOpacity onPress={() => setIsShowModal(false)}>
                <Text style={{ color: COLOR.PRIMARY }}>Xem chi tiet</Text>
            </TouchableOpacity>
            <Modal animationType="slide" transparent visible={isShowModal}>
                <ScrollView style={styles.scrollView}>
                    <View style={styles.modalView}>
                        <Text>
                            Thùng 12 hộp sữa tươi nguyên kem không đường Inex 1
                            lít thơm ngon, giàu canxi và các dưỡng chất tốt cho
                            sức khỏe. Mua hàng giá tốt, giao tận cửa tại Bách
                            hóa XANH
                        </Text>
                        <View style={styles.product_info}>
                            <View style={{ paddingVertical: 10 }}>
                                <Text style={{ fontSize: 20 }}>
                                    Thông tin sản phẩm{' '}
                                </Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </Modal>
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
    header: {
        borderBottomWidth: 1,
        flexDirection: 'row',
        paddingVertical: 10
    },
    modalView: {
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 20,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4
    },
    product_info: {},
    row_info: {
        flexDirection: 'row',
        minHeight: 30
    },
    scrollView: {
        paddingVertical: 10
    }
});

export default ProductArticle;
