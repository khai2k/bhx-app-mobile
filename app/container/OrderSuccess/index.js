import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import axios from 'axios';
import {
    View,
    Modal,
    Text,
    TouchableWithoutFeedback,
    Image,
    TextInput,
    TouchableOpacity
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
            doneIcon: false,
            checkBox1: false,
            checkBox2: false,
            checkBox3: false,
            modalVisible: false,
            infoOrder: {},
            productList: []
        };
    }

    componentDidMount() {
        axios({
            method: 'post',
            url: 'https://staging.bachhoaxanh.com/apiapp/api/Order/OrderResult?provinceId=3&districtId=2087&wardId=27125&storeId=6463&orderid=43225473&sc=E214C53EC0384610FE95151117020DA6'
        })
            .then((res) => {
                const { data } = res;
                console.log('data', data);
                const orderInfo = data.Value;
                this.setState({
                    totalPrice: orderInfo.Total,
                    infoOrder: orderInfo.Detail,
                    productList: orderInfo.Detail.DeliveryList
                });
            })
            .catch((err) => console.log('err', err));
    }

    choosePurchaseMethod = () => {
        this.setState({ doneIcon: true });
    };

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
                <Text>
                    Giao tại: {this.state.infoOrder.Address} {'  '}
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
                    <Text>
                        Xem {this.state.productList.length} sản phẩm đã đặt:{' '}
                    </Text>
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
                        {this.state.totalPrice}đ
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

    _renderDoneIcon() {
        if (this.state.doneIcon) {
            return (
                <Image
                    style={styles.imageDone}
                    source={require('../../../assets/images/done.png')}
                />
            );
        }
    }

    _renderPurchaseMethod() {
        return (
            <View style={styles.buttonContainer}>
                <Text>Thanh toán khi nhận hàng bằng cách:</Text>
                <View style={styles.buttonRow}>
                    <View style={styles.boxRow}>
                        <TouchableOpacity
                            onPress={() =>
                                this.setState(this.choosePurchaseMethod())
                            }>
                            {this._renderDoneIcon()}
                            <Text style={styles.textButton}>Tiền mặt</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.box}>
                        <TouchableOpacity>
                            <Text style={styles.textButton}>Cà thẻ</Text>
                        </TouchableOpacity>
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
                    <View style={styles.editBox}>
                        <TouchableOpacity
                            onPress={() =>
                                this.setState({
                                    modalVisible: !this.state.modalVisible
                                })
                            }>
                            <Text style={styles.editTextButton}>
                                × Hủy đơn hàng
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.editBox}>
                        <TouchableOpacity>
                            <Image
                                style={styles.iconEdit}
                                source={require('../../../assets/images/edit-circle.png')}
                            />
                            <Text style={styles.editTextButton}>
                                Sửa đơn hàng
                            </Text>
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
                                <TouchableOpacity>
                                    <Text style={styles.confirmText}>
                                        XÁC NHẬN HỦY ĐƠN HÀNG
                                    </Text>
                                </TouchableOpacity>
                            </View>
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
                {this._renderCancelOrderModal()}
                <TouchableOpacity
                    onPress={() => this.props.navigation.goBack()}>
                    <Text style={styles.backToHomeText}>Về trang chủ</Text>
                </TouchableOpacity>
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
