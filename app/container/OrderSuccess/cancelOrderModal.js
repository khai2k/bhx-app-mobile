import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Modal,
    Text,
    TouchableWithoutFeedback,
    TextInput
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import styles from './style';

class CancelOrderModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkBox1: false,
            checkBox2: false,
            checkBox3: false,
            modalVisible: false
        };
    }

    render() {
        return (
            <Modal
                animationType="slide"
                transparent
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
                                <Text>Tôi không còn nhu cầu</Text>
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
                                <Text>Tôi muốn mua đơn hàng khác</Text>
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
                                <Text>Tôi tìm chỗ khác giá tốt hơn</Text>
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
        );
    }
}

export default CancelOrderModal;
