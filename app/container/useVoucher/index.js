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
import * as voucherCreator from '@app/redux/actions/useVoucherAction';
import { TouchableWithoutFeedback } from 'react-native';

class UseVoucher extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phoneInput: '',
            voucherCodeInput: '',
            pinCodeInput: '',
            isFocusVoucherInput: false,
            isFocusPhoneInput: false,
            isFocusPinCodeInput: false
        };
    }

    componentDidMount() {
        this.fetchVoucher();
    }

    handleAlert(res) {
        if (res.HttpCode == 400 || res.HttpCode == 404) {
            showMessage({
                message: res.Message,
                type: 'default',
                backgroundColor: '#222B45',
                icon: 'danger'
            });
        }
        if (res.HttpCode == 200) {
            showMessage({
                message: 'Áp dụng phiếu mua hàng thành công!',
                type: 'default',
                backgroundColor: '#222B45',
                icon: 'success'
            });
        }
        if (res.HttpCode == 100) {
            showMessage({
                message: res.Message,
                type: 'default',
                backgroundColor: '#222B45',
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

    handlePinCodeInput() {
        if (
            this.state.isPinCodeInput == 100 ||
            this.state.message == 'Mã PINCode không đúng. Vui lòng kiểm tra lại'
        ) {
            return this._renderPincodeInput();
        }
    }

    formatDate(value) {
        let newValue = value.substring(0, 10);
        let p = newValue.split(/\D/g);
        return [p[2], p[1], p[0]].join('/');
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
                console.log('add', res);
                this.setState({ isPinCodeInput: res.HttpCode });
                this.setState({ message: res.Message });
                this.fetchVoucher();
                this.handleAlert(res);
            })
            .catch((err) => {
                showMessage({
                    message: err.Message,
                    type: 'default',
                    backgroundColor: '#222B45',
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
                    backgroundColor: '#222B45',
                    icon: 'success'
                });
            })
            .catch((err) => {
                showMessage({
                    message: err.Message,
                    type: 'default',
                    backgroundColor: '#222B45',
                    icon: 'danger'
                });
            });
    }

    _renderHeader() {
        return (
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Dùng phiếu mua hàng</Text>
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
                    <Text
                        style={
                            this.state.isFocusVoucherInput == true
                                ? styles.onfocusLabel
                                : styles.onBlurLabel
                        }>
                        Mã phiếu mua hàng:
                    </Text>
                    <TextInput
                        style={
                            this.state.isFocusVoucherInput == true
                                ? styles.onfocusInput
                                : styles.onBlurInput
                        }
                        placeholder={
                            this.state.isFocusVoucherInput == true
                                ? ''
                                : 'Nhập mã phiếu mua hàng'
                        }
                        onChangeText={(voucherCodeInput) =>
                            this.setState({ voucherCodeInput })
                        }
                        onFocus={() =>
                            this.setState({ isFocusVoucherInput: true })
                        }
                        onBlur={() =>
                            this.state.voucherCodeInput
                                ? this.setState({ isFocusVoucherInput: true })
                                : this.setState({
                                      isFocusVoucherInput: false
                                  })
                        }
                    />
                </View>
                <View style={styles.phoneInput}>
                    <View style={{ width: '70%' }}>
                        <Text
                            style={
                                this.state.isFocusPhoneInput == true
                                    ? styles.onfocusPhoneLabel
                                    : styles.onBlurLabel
                            }>
                            Số điện thoại:
                        </Text>
                        <TextInput
                            value={this.state.phoneInput}
                            maxLength={10}
                            placeholder={
                                this.state.isFocusPhoneInput == true
                                    ? ''
                                    : 'Nhập số điện thoại'
                            }
                            keyboardType="numeric"
                            style={
                                this.state.isFocusPhoneInput == true
                                    ? styles.onfocusPhoneInput
                                    : styles.onBlurInput
                            }
                            onChangeText={(phoneInput) =>
                                this.setState({ phoneInput })
                            }
                            onFocus={() =>
                                this.setState({ isFocusPhoneInput: true })
                            }
                            onBlur={() =>
                                this.state.phoneInput
                                    ? this.setState({
                                          isFocusPhoneInput: true
                                      })
                                    : this.setState({
                                          isFocusPhoneInput: false
                                      })
                            }
                            onEndEditing={() =>
                                this.validatePhone(this.state.phoneInput)
                            }
                        />
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            this.addVoucher();
                        }}>
                        <View style={styles.submitPhone}>
                            <Text style={styles.textSubmitPhone}>Sử dụng</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                {this.handlePinCodeInput()}
            </View>
        );
    }

    validatePhone(phone) {
        console.log('dmmmmm', phone);
        if (helper.isPhoneNumber(phone) == false) {
            showMessage({
                message: 'Số điện thoại không hợp lệ',
                type: 'default',
                backgroundColor: '#222B45',
                icon: 'danger'
            });
        }
    }

    _renderPincodeInput() {
        return (
            <View style={styles.pinCode}>
                <Text
                    style={
                        this.state.isFocusPinCodeInput == true
                            ? styles.onfocusLabel
                            : styles.onBlurLabel
                    }>
                    Nhập Pincode:
                </Text>
                <TextInput
                    style={
                        this.state.isFocusPinCodeInput == true
                            ? styles.onfocusInput
                            : styles.onBlurInput
                    }
                    placeholder={
                        this.state.isFocusPinCodeInput == true
                            ? ''
                            : 'Nhập mã Pincode'
                    }
                    onChangeText={(pinCodeInput) =>
                        this.setState({ pinCodeInput })
                    }
                    onFocus={() => this.setState({ isFocusPinCodeInput: true })}
                    onBlur={() =>
                        this.state.pinCodeInput
                            ? this.setState({ isFocusPinCodeInput: true })
                            : this.setState({
                                  isFocusPinCodeInput: false
                              })
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
                            <TouchableWithoutFeedback
                                onPress={() =>
                                    this.handleDeleteVoucher(itemVoucher)
                                }>
                                <View style={styles.voucherBox}>
                                    <View style={styles.voucherLeft}>
                                        <View style={styles.voucherPriceBox}>
                                            <Text
                                                style={
                                                    styles.labelPriceVoucher
                                                }>
                                                {itemVoucher.VoucherCode
                                                    ? itemVoucher.VoucherAmount /
                                                          1000 +
                                                      'K'
                                                    : itemVoucher.VoucherAmount +
                                                      '%'}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.voucherMid}>
                                        <View style={styles.voucherMidTop} />
                                        <View style={styles.voucherMidBottom} />
                                    </View>
                                    <View style={styles.voucherRight}>
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
                                                flexDirection: 'row',
                                                justifyContent: 'space-between'
                                            }}>
                                            <Text style={styles.voucherDate}>
                                                Hạn sử dụng đến:{' '}
                                                {this.formatDate(
                                                    itemVoucher.VoucherExpiredDate
                                                )}
                                            </Text>
                                            <Text
                                                style={
                                                    styles.voucherCancelText
                                                }>
                                                Hủy dùng
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
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

export default connect(mapStateToProps, mapDispatchToProps)(UseVoucher);
