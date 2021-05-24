import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TextInput,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import styles from './style';

const test = 12345;
class UseVoucher extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isChange: false
        };
    }

    cancelVoucher = () => {
        this.setState({ isChange: false });
    };

    useVoucher = () => {
        this.setState({ isChange: true });
    };

    _renderHeader() {
        return (
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Dùng Phiếu mua hàng</Text>
                <View style={styles.closeHeader}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.goBack()}>
                        <Image
                            style={styles.closeImage}
                            source={require('../../../assets/images/close.png')}></Image>
                    </TouchableOpacity>
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
                    <TouchableOpacity
                        onPress={
                            (() => this.setState(this.useVoucher()),
                            () => console.log(this.state.isChange))
                        }>
                        <View style={styles.submitPhone}>
                            <Text style={styles.textSubmitPhone}>Sử dụng</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.pinCode}>
                    <TextInput
                        placeholder="Nhập Pincode"
                        keyboardType="numeric"
                    />
                </View>
            </View>
        );
    }

    _renderVoucherList() {
        return (
            <ScrollView style={styles.voucherContainer}>
                <View style={styles.voucherBox}>
                    <View style={styles.voucherPriceBox}>
                        <Image
                            source={require('../../../assets/images/50K.png')}
                            style={styles.imageVoucher}
                        />
                    </View>
                    <View style={styles.voucherInfoBox}>
                        <Text style={styles.voucherLabel}>
                            Giảm 100.000đ trên hóa đơn 300.000đ
                        </Text>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between'
                            }}>
                            <Text style={styles.voucherDate}>
                                Hạn sử dụng đến: 31/12/2020
                            </Text>
                            <TouchableOpacity
                                onPress={
                                    (() => this.setState(this.cancelVoucher()),
                                    () => console.log(this.state.isChange))
                                }>
                                <Text style={styles.voucherCancelText}>
                                    Hủy dùng
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        );
    }

    _renderSubmitContainer() {
        return (
            <>
                <View style={styles.calVoucher}>
                    <Text style={{ color: '#8F9BB3' }}>
                        Phiếu mua hàng(...821):
                    </Text>
                    <Text style={{ right: -20 }}>×</Text>
                    <Text>-100.000đ</Text>
                </View>
                <TouchableOpacity>
                    <View style={styles.submitButton}>
                        <Text style={styles.submitButtonText}>Áp dụng</Text>
                        <View style={styles.submitPrice}>
                            <Text style={styles.oldPrice}>1.300.000đ</Text>
                            <Text style={styles.newPrice}>1.200.000đ</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </>
        );
    }

    _renderCloseContainer() {
        return (
            <TouchableOpacity onPress={() => console.log('test')}>
                <View style={styles.closeButton}>
                    <Text style={styles.closeButtonText}>Đóng</Text>
                </View>
            </TouchableOpacity>
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
                {this.state.isShowSubmit === 2
                    ? this._renderCloseContainer()
                    : this._renderSubmitContainer()}
            </View>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                {this._renderHeader()}
                {this._renderInputContainer()}
                {this._renderVoucherList()}
                {this._renderFooterContainer()}
            </View>
        );
    }
}

export default UseVoucher;
