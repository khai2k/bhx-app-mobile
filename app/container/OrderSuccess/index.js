import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback
} from 'react-native';
import Modal from 'react-native-modal';
import CheckBox from '@react-native-community/checkbox';
import { helper } from '@app/common';
import * as orderSuccessCreator from './action';
// import CancelOrderModal from './cancelOrderModal';
import Header from '../../components/Header';
import { showMessage, hideMessage } from 'react-native-flash-message';
import styles from './style';

class OrderSuccess extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doneIcon: true,
            checkBox1: false,
            checkBox2: false,
            checkBox3: false,
            modalVisible: false,
            infoOrder: {},
            purchaseMethodText: 'tiền mặt'
        };
    }

    componentDidMount() {
        this.get_order_success();
    }

    get_order_success() {
        this.props.actionOrderSuccess
            .orderSuccess_get()
            .then((res) => {
                // console.log('dataaaaaa', res);
                this.setState({
                    totalPrice: res.Value.Total,
                    deliveryTime: res.Value.DeliveryTextTime,
                    infoOrder: res.Value.Detail,
                    productList: res.Value.Detail.DeliveryList
                });
            })
            .catch((err) => {
                console.log('err', err);
            });
    }

    cancel_order() {
        this.props.actionOrderSuccess
            .orderSuccess_cancel()
            .then((res) => {
                showMessage({
                    message: res.Message,
                    type: 'default',
                    backgroundColor: '#222B45',
                    icon: 'success'
                });
                // this.props.navigation.goBack();
            })
            .catch((err) => {
                showMessage({
                    position: 'bottom',
                    message: 'Hủy đơn hàng thất bại, xin vui lòng thử lại!',
                    type: 'default',
                    backgroundColor: '#222B45',
                    icon: 'danger'
                });
            });
    }

    _renderUserInfo() {
        return (
            <View style={styles.infoLine}>
                <View style={styles.dot} />
                <Text>Người đặt: {this.state.infoOrder.CustomerName}, </Text>
                <Text style={{ fontWeight: 'bold' }}>
                    {this.state.infoOrder.ContactPhone}
                </Text>
            </View>
        );
    }

    _renderAddress() {
        return (
            <View style={styles.infoLine}>
                <View style={styles.dot} />
                <Text>
                    Giao tại: {this.state.infoOrder.Address} {'  '}
                    {/* <View style={styles.dotActive} />
                    <Text> Sửa</Text> */}
                </Text>
            </View>
        );
    }

    _renderTime() {
        return (
            <View style={styles.infoLine}>
                <View style={styles.dot} />
                <Text>
                    Giao vào:{' '}
                    <Text style={{ fontWeight: 'bold' }}>
                        {this.state.deliveryTime}
                    </Text>{' '}
                    {'  '}
                    {/* <View style={styles.dotActive} />
                    <Text> Sửa</Text> */}
                </Text>
            </View>
        );
    }

    _renderNote() {
        return (
            <TouchableOpacity>
                <View style={styles.infoLine}>
                    <View style={styles.dot} />
                    <Text style={{ textDecorationLine: 'underline' }}>
                        Thêm ghi chú:
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }

    _renderProducts() {
        return (
            <TouchableOpacity>
                <View style={styles.infoLine}>
                    <View style={styles.dot} />
                    <Text>Xem 3 sản phẩm đã đặt: </Text>
                </View>
            </TouchableOpacity>
        );
    }

    _renderPrice() {
        return (
            <>
                <View style={styles.infoLine}>
                    <View style={styles.dot} />
                    <Text>Tổng tiền: </Text>
                    <Text style={{ fontWeight: 'bold' }}>
                        {this.state.totalPrice &&
                            helper.formatMoney(this.state.totalPrice)}
                    </Text>
                    <TouchableOpacity
                        onPress={() =>
                            this.props.navigation.navigate('UseVoucher')
                        }>
                        <View style={styles.PMHbox}>
                            <Text style={styles.PHMText}>
                                + Dùng phiếu mua hàng
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </>
        );
    }

    _renderDoneIcon1() {
        if (this.state.doneIcon == true) {
            return (
                <Image
                    style={styles.imageDone}
                    source={require('../../../assets/images/done.png')}
                />
            );
        }
        return null;
    }

    _renderDoneIcon2() {
        if (this.state.doneIcon == false) {
            return (
                <Image
                    style={styles.imageDone}
                    source={require('../../../assets/images/done.png')}
                />
            );
        }
        return null;
    }

    _renderPurchaseMethod() {
        return (
            <View style={styles.buttonContainer}>
                <Text>Thanh toán khi nhận hàng bằng cách:</Text>
                <View style={styles.buttonRow}>
                    <TouchableWithoutFeedback
                        onPress={() =>
                            this.setState({
                                doneIcon: true,
                                purchaseMethodText: 'tiền mặt'
                            })
                        }>
                        <View style={styles.boxRow}>
                            {this._renderDoneIcon1()}
                            <Text style={styles.textButton}>Tiền mặt</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback
                        onPress={() =>
                            this.setState({
                                doneIcon: false,
                                purchaseMethodText: 'cà thẻ'
                            })
                        }>
                        <View style={styles.boxRow}>
                            {this._renderDoneIcon2()}
                            <Text style={styles.textButton}>Cà thẻ</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        );
    }

    _renderEPurchase() {
        return (
            <View style={styles.EPurchaseContainer}>
                <Text style={{ marginTop: 15 }}>
                    Hoặc Anh/chị có thể thanh toán trước bằng cách:
                </Text>
                <View style={styles.buttonRow}>
                    <View style={styles.box}>
                        <Text style={styles.textButton}>Thẻ ATM</Text>
                        <Text style={styles.textInternetbanking}>
                            có internet banking
                        </Text>
                    </View>
                    <View style={styles.box}>
                        <Text style={styles.textButton}>
                            Thẻ Visa, Master, JCB
                        </Text>
                    </View>
                </View>
                <View style={styles.buttonRow}>
                    <View style={styles.box}>
                        <Text style={styles.textButton}>Ví MoMo</Text>
                    </View>
                    <View style={styles.box}>
                        <Text style={styles.textButton}>Ví Zalo</Text>
                    </View>
                </View>
            </View>
        );
    }

    _renderEditButton() {
        return (
            <View style={styles.buttonContainer}>
                <View style={styles.buttonRow}>
                    <TouchableWithoutFeedback
                        onPress={() =>
                            this.setState({
                                modalVisible: !this.state.modalVisible
                            })
                        }>
                        <View style={styles.editBox}>
                            <Text style={styles.editTextButton}>
                                × Hủy đơn hàng
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>

                    <View style={styles.editBox}>
                        <TouchableOpacity>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'center'
                                }}>
                                <Image
                                    style={styles.iconEdit}
                                    source={require('../../../assets/images/edit-circle.png')}
                                />
                                <Text style={styles.editTextButton}>
                                    Sửa đơn hàng
                                </Text>
                            </View>

                            <Text style={styles.editText}>
                                (Thêm/bớt SP, đổi địa chỉ/giờ giao)
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }

    _renderCancelOrderModal() {
        return (
            <View style={styles.modalContainer}>
                <Modal
                    visible={this.state.modalVisible}
                    style={{
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        margin: 0
                    }}
                    onBackButtonPress={() => {
                        this.setState({ modalVisible: false });
                    }}
                    onBackdropPress={() => {
                        this.setState({ modalVisible: false });
                    }}>
                    <View style={styles.modalView}>
                        <Text style={{ lineHeight: 20 }}>
                            BachhoaXANH.com mong nhận được sự góp ý của anh để
                            cải thiện chất lượng dịch vụ được tốt hơn!
                        </Text>
                        <View style={{ marginTop: 15 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <CheckBox
                                    value={this.state.checkBox1}
                                    onValueChange={() =>
                                        this.setState({
                                            checkBox1: !this.state.checkBox1
                                        })
                                    }
                                />
                                <Text style={styles.checkBoxText}>
                                    Tôi không còn nhu cầu
                                </Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <CheckBox
                                    value={this.state.checkBox2}
                                    onValueChange={() =>
                                        this.setState({
                                            checkBox2: !this.state.checkBox2
                                        })
                                    }
                                />
                                <Text style={styles.checkBoxText}>
                                    Tôi muốn mua đơn hàng khác
                                </Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <CheckBox
                                    value={this.state.checkBox3}
                                    onValueChange={() =>
                                        this.setState({
                                            checkBox3: !this.state.checkBox3
                                        })
                                    }
                                />
                                <Text style={styles.checkBoxText}>
                                    Tôi tìm chỗ khác giá tốt hơn
                                </Text>
                            </View>
                        </View>
                        <View style={{ marginTop: 10 }}>
                            <Text>Hoặc nhập lí do khác:</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Nhập nội dung góp ý"
                            />
                        </View>
                        <View style={styles.modalButtonView}>
                            <View style={styles.cancelButton}>
                                <TouchableOpacity
                                    onPress={() =>
                                        this.setState({
                                            modalVisible:
                                                !this.state.modalVisible
                                        })
                                    }>
                                    <Text style={styles.canceltext}>ĐÓNG</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.confirmButton}>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.cancel_order();
                                    }}>
                                    <Text style={styles.confirmText}>
                                        XÁC NHẬN HỦY ĐƠN HÀNG
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
            // <CancelOrderModal
            //     isModalVisible={this.state.modalVisible}
            //     setModalVisible={setModalVisible}
            // />
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <Header />
                <View style={styles.infoContainer}>
                    <View style={{ width: '90%', margin: 15 }}>
                        <View style={styles.viewTitle}>
                            <Image
                                style={styles.doneIcon}
                                source={require('../../../assets/images/done.png')}
                            />
                            <Text style={styles.textTitle}>
                                ĐẶT HÀNG THÀNH CÔNG
                            </Text>
                        </View>

                        {this._renderUserInfo()}
                        {this._renderAddress()}
                        {this._renderTime()}
                        {this._renderNote()}
                        {this._renderProducts()}
                        {this._renderPrice()}
                        <Text style={{ marginLeft: 10 }}>
                            Thanh toán{' '}
                            <Text style={{ fontWeight: 'bold' }}>
                                {this.state.purchaseMethodText}
                            </Text>{' '}
                            khi nhận hàng
                        </Text>
                        <Text style={{ marginLeft: 10, marginTop: 5 }}>
                            Yêu cầu đồng kiểm tra sản phẩm khi nhận hàng
                        </Text>
                    </View>
                </View>
                <View style={styles.purchaseContainer}>
                    {this._renderPurchaseMethod()}
                    {this._renderEPurchase()}
                </View>
                {this._renderEditButton()}
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Product')}>
                    <Text style={styles.backToHomeText}>Về trang chủ</Text>
                </TouchableOpacity>
                {this._renderCancelOrderModal()}
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        orderInfo: state.orderSuccessReducer.OrderInfo
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actionOrderSuccess: bindActionCreators(orderSuccessCreator, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderSuccess);
