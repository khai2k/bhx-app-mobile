import React, { Component } from 'react';
import axios from 'axios';
import { helper } from '@app/common';
import {
    View,
    Text,
    Image,
    TextInput,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import styles from './style';
class UseVoucher extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isChange: false,
            voucherList: [],
            voucherInfo: [],
            cartInfo: {}
        };
    }

    componentDidMount() {
        axios({
            method: 'post',
            url: 'https://staging.bachhoaxanh.com/apiapp/api/VoucherCoupon/GetListVoucherCoupon',
            data: {
                PhoneNumber: '0938727300',
                ProvinceId: 3,
                DistrictId: 2087,
                WardId: 27125,
                StoreId: 6463,
                CartId: '93E9D79154B163C26FAA21C8E150B1289D4A1174E5E82DFA3A6E9E2994437430'
            }
        })
            .then((res) => {
                const { data } = res;
                this.setState({
                    voucherList: data.Value
                });
            })
            .catch((err) => console.log('err', err));
    }

    addVoucher() {
        axios({
            method: 'post',
            url: 'https://staging.bachhoaxanh.com/apiapp/api/VoucherCoupon/ApplyVoucher',
            data: {
                Code: 'JC26GTRG',
                PingCode: '',
                PhoneNumber: '0938727300',
                ProvinceId: 3,
                DistrictId: 2087,
                WardId: 27125,
                StoreId: 6463,
                CartId: '93E9D79154B163C26FAA21C8E150B1289D4A1174E5E82DFA3A6E9E2994437430'
            }
        })
            .then((res) => {
                const { data } = res;
                this.setState({
                    cartInfo: data.OtherData.CartTotal,
                    isChange: true
                });
                console.log(this.state.cartInfo);
            })
            .catch((err) => console.log('err', err));
    }

    deleteVoucher() {
        axios({
            method: 'post',
            url: 'https://staging.bachhoaxanh.com/apiapp/api/VoucherCoupon/ClearVoucherCoupon',
            data: {
                token: '',
                us: '',
                provinceId: 3,
                districtId: 2087,
                wardId: 27125,
                storeId: 6463,
                data: {
                    Code: 'JC26GTRG',
                    GiftType: 1,
                    CartId: '93E9D79154B163C26FAA21C8E150B1289D4A1174E5E82DFA3A6E9E2994437430'
                },
                IsMobile: true
            }
        })
            .then((res) => {
                const { data } = res;
                this.setState({
                    isChange: false
                });
                console.log(data);
            })
            .catch((err) => console.log('err', err));
    }

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
                        onPress={() => {
                            this.addVoucher();
                        }}>
                        <View style={styles.submitPhone}>
                            <Text style={styles.textSubmitPhone}>Sử dụng</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    _renderPincodeInput() {
        return (
            <View style={styles.pinCode}>
                <TextInput placeholder="Nhập Pincode" keyboardType="numeric" />
            </View>
        );
    }

    _renderVoucher() {
        return (
            <View style={{ marginHorizontal: 10 }}>
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
                                onPress={() => {
                                    this.deleteVoucher();
                                }}>
                                <Text style={styles.voucherCancelText}>
                                    Hủy dùng
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        );
    }

    _renderVoucherList() {
        return (
            <ScrollView style={styles.voucherContainer}>
                {this.state.voucherList.length > 0 &&
                    this.state.voucherList.map((itemVoucher) => {
                        return (
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
                                            onPress={() =>
                                                this.setState({
                                                    isChange: false
                                                })
                                            }>
                                            <Text
                                                style={
                                                    styles.voucherCancelText
                                                }>
                                                Hủy dùng
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        );
                    })}
            </ScrollView>
        );
    }

    _renderVoucherLine() {
        return (
            <View style={styles.calVoucher}>
                <Text style={{ color: '#8F9BB3' }}>
                    Phiếu mua hàng(...821):
                </Text>
                <Text style={{ right: -20 }}>×</Text>
                <Text>
                    -
                    {this.state.cartInfo &&
                        helper.formatMoney(this.state.cartInfo.VoucherDiscount)}
                </Text>
            </View>
        );
    }

    _renderSubmitContainer() {
        if (this.state.isChange == true) {
            return (
                <>
                    {this._renderVoucherLine()}
                    <TouchableOpacity>
                        <View style={styles.submitButton}>
                            <Text style={styles.submitButtonText}>Áp dụng</Text>
                            <View style={styles.submitPrice}>
                                <Text style={styles.oldPrice}>
                                    {this.state.cartInfo &&
                                        helper.formatMoney(
                                            this.state.cartInfo.Total
                                        )}
                                </Text>
                                <Text style={styles.newPrice}>
                                    {this.state.cartInfo &&
                                        helper.formatMoney(
                                            this.state.cartInfo.Total -
                                                this.state.cartInfo
                                                    .VoucherDiscount
                                        )}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </>
            );
        }
        return null;
    }

    _renderCloseContainer() {
        if (this.state.isChange == false) {
            return (
                <TouchableOpacity onPress={() => console.log('test')}>
                    <View style={styles.closeButton}>
                        <Text style={styles.closeButtonText}>Đóng</Text>
                    </View>
                </TouchableOpacity>
            );
        }
        return null;
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
                {this._renderCloseContainer()}
                {this._renderSubmitContainer()}
            </View>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                {this._renderHeader()}
                {this._renderInputContainer()}
                {this._renderVoucher()}
                {/* {this._renderVoucherList()} */}
                {this._renderFooterContainer()}
            </View>
        );
    }
}

export default UseVoucher;
