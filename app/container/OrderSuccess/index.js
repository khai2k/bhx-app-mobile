import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import axios from 'axios';
import { apiBase, METHOD, API_CONST } from '@app/api';
import {
    View,
    Modal,
    Text,
    TouchableWithoutFeedback,
    Image,
    TextInput
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
// import * as orderSuccessCreator from './action';
// import CancelOrderModal from './cancelOrderModal';
import Header from '../../components/Header';
import styles from './style';

class OrderSuccess extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkBox1: false,
            checkBox2: false,
            checkBox3: false,
            modalVisible: false,
            infoOrder: {}
        };
    }

    componentDidMount() {
        // this.props.actionOrderSuccess.order_success_get();
        axios({
            method: 'get',
            url: 'https://staging.bachhoaxanh.com/apiapp/api/Order/OrderResult?provinceId=3&districtId=2087&wardId=27125&storeId=6463&orderid=43225473&sc=E214C53EC0384610FE95151117020DA6'
        })
            .then((res) => {
                const { data } = res;
                console.log('data', data);
                const orderInfo = data.Value;
                this.setState({
                    infoOrder: orderInfo.Detail
                });
            })
            .catch((err) => console.log('err', err));
    }

    _renderUserInfo() {
        return (
            <View style={styles.infoLine}>
                <View style={styles.dot} />
                <Text>
                    Người đặt: Anh NGHIÊNG, 09115511148
                    {/* {this.state.infoOrder.ContactName} */}
                </Text>
            </View>
        );
    }

    _renderAddress() {
        return (
            <View style={styles.infoLine}>
                <Text>
                    Giao tại: Tòa nhà MWG, Phường Tân Phú, Quận 9, TP. Hồ Chí
                    Minh {'  '}
                    <View style={styles.dotActive} />
                    <Text> Sửa</Text>
                </Text>
            </View>
        );
    }

    _renderTime() {
        return (
            <View style={styles.infoLine}>
                <View style={styles.dot} />
                <Text>
                    Giao vào: 08h-12h-Ngày mai (16/11) {'  '}
                    <View style={styles.dotActive} />
                    <Text> Sửa</Text>
                </Text>
            </View>
        );
    }

    _renderNote() {
        return (
            <TouchableWithoutFeedback>
                <View style={styles.infoLine}>
                    <View style={styles.dot} />
                    <Text style={{ textDecorationLine: 'underline' }}>
                        Thêm ghi chú:
                    </Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }

    _renderProducts() {
        return (
            <TouchableWithoutFeedback>
                <View style={styles.infoLine}>
                    <View style={styles.dot} />
                    <Text>Xem các sản phẩm đã đặt:</Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }

    _renderPrice() {
        return (
            <>
                <View style={styles.infoLine}>
                    <View style={styles.dot} />
                    <Text>Tổng tiền: 113.000đ </Text>
                    <View style={styles.PMHbox}>
                        <Text style={styles.PHMText}>
                            + Dùng phiếu mua hàng
                        </Text>
                    </View>
                </View>
            </>
        );
    }

    _renderPurchaseMethod() {
        return (
            <View style={styles.buttonContainer}>
                <Text>Thanh toán khi nhận hàng bằng cách:</Text>
                <View style={styles.buttonRow}>
                    <View style={styles.boxRow}>
                        <Image
                            style={styles.imageDone}
                            source={require('../../../assets/images/done.png')}
                        />
                        <Text style={styles.textButton}>Tiền mặt</Text>
                    </View>
                    <View style={styles.box}>
                        <Text style={styles.textButton}>Cà thẻ</Text>
                    </View>
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
                        <Image
                            style={styles.iconEdit}
                            source={require('../../../assets/images/edit-circle.png')}
                        />
                        <Text style={styles.editTextButton}>Sửa đơn hàng</Text>
                        <Text style={styles.editText}>
                            (Thêm/bớt SP, đổi địa chỉ/giờ giao)
                        </Text>
                    </View>
                </View>
            </View>
        );
    }

    _renderCancelOrderModal() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.modalVisible}>
                <View style={styles.centeredView}>
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
                                            checkBox1: !this.state.checkBox1,
                                            checkBox2: false,
                                            checkBox3: false
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
                                            checkBox2: !this.state.checkBox2,
                                            checkBox1: false,
                                            checkBox3: false
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
                                            checkBox3: !this.state.checkBox3,
                                            checkBox2: false,
                                            checkBox1: false
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
                            <TouchableWithoutFeedback
                                onPress={() =>
                                    this.setState({
                                        modalVisible: !this.state.modalVisible
                                    })
                                }>
                                <View style={styles.cancelButton}>
                                    <Text style={styles.canceltext}>ĐÓNG</Text>
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback>
                                <View style={styles.confirmButton}>
                                    <Text style={styles.confirmText}>
                                        XÁC NHẬN HỦY ĐƠN HÀNG
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </View>
            </Modal>
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
                            Thanh toán tiền mặt khi nhận hàng
                        </Text>
                        <Text style={{ marginLeft: 10 }}>
                            Yêu cầu đồng kiểm tra sản phẩm khi nhận hàng
                        </Text>
                    </View>
                </View>
                <View style={styles.purchaseContainer}>
                    {this._renderPurchaseMethod()}
                    {this._renderEPurchase()}
                </View>
                {this._renderEditButton()}
                {this._renderCancelOrderModal()}
                <Text style={styles.backToHomeText}>Về trang chủ</Text>
            </View>
        );
    }
}

const mapStateToProps = function () {
    return {
        // orderSuccessInfo: state.orderSuccessReducer
    };
};

const mapDispatchToProps = function () {
    return {
        // action: bindActionCreators(orderSuccessCreator, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderSuccess);
