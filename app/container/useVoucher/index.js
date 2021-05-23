import React, { Component } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import styles from './style';

class UseVoucher extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    _renderHeader() {
        return (
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Dùng Phiếu mua hàng</Text>
                <View style={styles.closeHeader}>
                    <Image
                        style={{ alignSelf: 'center', width: 15, height: 15 }}
                        source={require('../../../assets/images/close.png')}></Image>
                </View>
            </View>
        );
    }

    _renderInputContainer() {
        return (
            <View style={{ padding: 10 }}>
                <View style={styles.voucherInput}>
                    <TextInput placeholder="Nhập mã phiếu mua hàng" />
                </View>
                <View style={styles.phoneInput}>
                    <TextInput
                        placeholder="Nhập số điện thoại"
                        keyboardType="numeric"
                    />
                    <TouchableOpacity>
                        <View style={styles.submitPhone}>
                            <Text style={styles.textSubmitPhone}>Sử dụng</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.pinCode}>
                    <TextInput placeholder="Nhập Pincode" />
                </View>
            </View>
        );
    }

    _renderFooterContainer() {
        return (
            <View style={styles.footer}>
                <View style={styles.note}>
                    <Text style={styles.textNote}>
                        *Lưu ý: Tất cả các phiếu mua hàng đều không áp dụng cho
                        Sản phẩm đặt trước, Sản phẩm xả kho giá sốc, Hàng qua
                        ngày
                    </Text>
                </View>
                <TouchableOpacity>
                    <View style={styles.closeButton}>
                        <Text style={styles.closeButtonText}>Đóng</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                {this._renderHeader()}
                {this._renderInputContainer()}
                {this._renderFooterContainer()}
            </View>
        );
    }
}

export default UseVoucher;
