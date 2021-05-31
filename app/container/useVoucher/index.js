import React, { Component } from 'react';
import { helper } from '@app/common';
import { bindActionCreators } from 'redux';
import {
    View,
    Text,
    Image,
    TextInput,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import { showMessage, hideMessage } from 'react-native-flash-message';
import styles from './style';
import * as voucherCreator from './action';

class UseVoucher extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: '',
            giftType: 0,
            isPinCodeInput: 0,
            voucherList: [],
            voucherCart: {},
            phoneInput: '0938727300',
            voucherCodeInput: '',
            pinCodeInput: ''
        };
    }

    componentDidMount() {
        this.fetchVoucher();
    }

    handleAlert(res) {
        if (res.HttpCode == 400) {
            showMessage({
                message: res.Message,
                type: 'default',
                backgroundColor: 'purple',
                icon: 'danger'
            });
        }
        if (res.HttpCode == 200) {
            showMessage({
                message: 'Áp dụng phiếu mua hàng thành công!',
                type: 'default',
                backgroundColor: 'purple',
                icon: 'success'
            });
        }
        if (res.HttpCode == 100) {
            showMessage({
                message: res.Message,
                type: 'default',
                backgroundColor: 'purple',
                icon: 'warning'
            });
        }
    }

    handleDeleteVoucher(item) {
        if (item.Type == 1) {
            this.setState({ code: item.CouponCode });
        }
        if (item.Type == 4) {
            this.setState({ code: item.VoucherCode });
        }
        this.setState({ giftType: item.Type }, () => {
            this.deleteVoucher();
        });
    }

    fetchVoucher() {
        this.props.actionVoucher
            .voucher_get()
            .then((res) => {
                this.setState({
                    voucherCart: res.OtherData,
                    voucherList: res.Value
                });
            })
            .catch((err) => {
                console.log('err', err);
            });
    }

    addVoucher() {
        this.props.actionVoucher
            .voucher_add(
                this.state.phoneInput,
                this.state.voucherCodeInput,
                this.state.pinCodeInput
            )
            .then((res) => {
                this.setState({ isPinCodeInput: res.HttpCode });
                this.fetchVoucher();
                this.handleAlert(res);
            })
            .catch((err) => {
                showMessage({
                    message: err.Message,
                    type: 'default',
                    backgroundColor: 'purple',
                    icon: 'danger'
                });
            });
    }

    deleteVoucher() {
        this.props.actionVoucher
            .voucher_delete(this.state.code, this.state.giftType)
            .then((res) => {
                this.fetchVoucher();
                showMessage({
                    message: res.Message,
                    type: 'default',
                    backgroundColor: 'purple',
                    icon: 'success'
                });
            })
            .catch((err) => {
                showMessage({
                    message: err.Message,
                    type: 'default',
                    backgroundColor: 'purple',
                    icon: 'danger'
                });
            });
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
                            source={require('../../../assets/images/close.png')}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    _renderInputContainer() {
        return (
            <View style={{ padding: 10 }}>
                <View style={styles.voucherInput}>
                    <TextInput
                        placeholder="Nhập mã phiếu mua hàng"
                        onChangeText={(voucherCodeInput) =>
                            this.setState({ voucherCodeInput })
                        }
                    />
                </View>
                <View style={styles.phoneInput}>
                    <TextInput
                        value={this.state.phoneInput}
                        placeholder="Nhập số điện thoại"
                        keyboardType="numeric"
                        onChangeText={(phoneInput) =>
                            this.setState({ phoneInput })
                        }
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
                {this.state.isPinCodeInput == 100 && this._renderPincodeInput()}
            </View>
        );
    }

    _renderPincodeInput() {
        return (
            <View style={styles.pinCode}>
                <TextInput
                    value={this.state.pinCodeInput}
                    placeholder="Nhập Pincode"
                    keyboardType="numeric"
                    onChangeText={(pinCodeInput) =>
                        this.setState({ pinCodeInput })
                    }
                />
            </View>
        );
    }

    _renderVoucherList() {
        return (
            <ScrollView style={styles.voucherContainer}>
                {this.state.voucherList &&
                    this.state.voucherList.map((itemVoucher) => {
                        return (
                            <View style={styles.voucherBox}>
                                <View style={styles.voucherPriceBox}>
                                    <Text style={styles.labelPriceVoucher}>
                                        {itemVoucher.VoucherCode
                                            ? itemVoucher.VoucherAmount / 1000 +
                                              'K'
                                            : itemVoucher.VoucherAmount + '%'}
                                    </Text>
                                </View>
                                <View style={styles.voucherInfoBox}>
                                    {itemVoucher.MinOrderAmount > 0 ? (
                                        <Text style={styles.voucherLabel}>
                                            Giảm{' '}
                                            {itemVoucher.VoucherCode
                                                ? helper.formatMoney(
                                                      itemVoucher.VoucherAmount
                                                  )
                                                : itemVoucher.VoucherAmount +
                                                  '%'}{' '}
                                            trên hóa đơn{' '}
                                            {helper.formatMoney(
                                                itemVoucher.MinOrderAmount
                                            )}
                                        </Text>
                                    ) : (
                                        <Text style={styles.voucherLabel}>
                                            Giảm{' '}
                                            {helper.formatMoney(
                                                itemVoucher.VoucherAmount
                                            )}
                                        </Text>
                                    )}

                                    <View
                                        style={{
                                            flexDirection: 'row'
                                        }}>
                                        <Text style={styles.voucherDate}>
                                            Hạn sử dụng đến:{' '}
                                            {itemVoucher.VoucherExpiredDate.substr(
                                                0,
                                                10
                                            )}
                                        </Text>
                                        <TouchableOpacity
                                            onPress={() =>
                                                this.handleDeleteVoucher(
                                                    itemVoucher
                                                )
                                            }
                                            style={{ left: 40 }}>
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
            <>
                {this.state.voucherList &&
                    this.state.voucherList.map((itemVoucher) => {
                        return (
                            <View style={styles.calVoucher}>
                                <View style={{ width: '60%' }}>
                                    <Text
                                        style={{ color: '#8F9BB3', left: 20 }}>
                                        Phiếu mua hàng(...
                                        {itemVoucher.CouponCode
                                            ? itemVoucher.CouponCode.slice(-3)
                                            : itemVoucher.VoucherCode.slice(-3)}
                                        ):
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        width: '35%'
                                    }}>
                                    <TouchableOpacity
                                        style={{ left: 25 }}
                                        onPress={() => {
                                            this.handleDeleteVoucher(
                                                itemVoucher
                                            );
                                        }}>
                                        <Text>×</Text>
                                    </TouchableOpacity>
                                    <Text style={{ color: '#8F9BB3' }}>
                                        -
                                        {itemVoucher.Type == 1 &&
                                            helper.formatMoney(
                                                this.state.voucherCart
                                                    .CouponDiscount
                                            )}
                                        {itemVoucher.Type == 4 &&
                                            itemVoucher.VoucherAmount &&
                                            helper.formatMoney(
                                                itemVoucher.VoucherAmount
                                            )}
                                    </Text>
                                </View>
                            </View>
                        );
                    })}
            </>
        );
    }

    _renderSubmitContainer() {
        if (this.state.voucherList) {
            return (
                <>
                    {this._renderVoucherLine()}
                    <TouchableOpacity>
                        <View style={styles.submitButton}>
                            <Text style={styles.submitButtonText}>Áp dụng</Text>
                            <View style={styles.submitPrice}>
                                <Text style={styles.oldPrice}>
                                    {this.state.voucherCart.Total &&
                                        helper.formatMoney(
                                            this.state.voucherCart.Total
                                        )}
                                </Text>
                                <Text style={styles.newPrice}>
                                    {this.state.voucherCart.Total &&
                                        helper.formatMoney(
                                            this.state.voucherCart.Total -
                                                this.state.voucherCart
                                                    .CouponDiscount -
                                                this.state.voucherCart
                                                    .VoucherDiscount
                                        )}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </>
            );
        }
    }

    _renderCloseContainer() {
        if (!this.state.voucherList) {
            return (
                <TouchableOpacity
                    onPress={() => this.props.navigation.goBack()}>
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
                <ActivityIndicator
                    style={[
                        styles.loading,
                        this.props.isLoading && styles.loadingActive
                    ]}
                    animating={this.props.isLoading}
                    size="large"
                    color="green"
                />
                {this._renderHeader()}
                {this._renderInputContainer()}
                {this._renderVoucherList()}
                {this._renderFooterContainer()}
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        voucherInfo: state.voucherReducer.VoucherInfo,
        isLoading: state.voucherReducer.IsLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actionVoucher: bindActionCreators(voucherCreator, dispatch)
    };
};
// make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(UseVoucher);
