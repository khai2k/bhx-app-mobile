import React, { Component, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Header } from '@app/components';
import {
    SafeAreaView,
    Text,
    View,
    Picker,
    TextInput,
    Image
} from 'react-native';
import { helper } from '@app/common';
import * as cartCreator from '@app/container/cart/action';
import styles from './style';
import { TouchableOpacity } from 'react-native-gesture-handler';

class UserInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.actionCart.cart_get();
    }

    render() {
        return (
            <SafeAreaView>
                <Header />
                <View style={styles.container}>
                    <TouchableOpacity
                        style={styles.backTop}
                        onpress={() => navigation.navigate('Cart')}>
                        <Image
                            style={styles.logoback}
                            source={require('../../../assets/images/icon-back.png')}
                        />
                        <Text
                            onclick={() => navigation.navigate('Cart')}
                            style={styles.backTop}>
                            Xem lại giỏ hàng
                        </Text>
                    </TouchableOpacity>
                    <View style={styles.btnGetHistoryAddress}>
                        <Image
                            style={styles.logohome}
                            source={require('../../../assets/images/icon-home.png')}
                        />
                        <Text style={styles.textHistoryAddress}>
                            LẤY ĐỊA CHỈ MUA HÀNG TRƯỚC ĐÂY
                        </Text>
                    </View>
                    <View style={styles.sectionInput}>
                        <Text style={styles.stepTitle}>
                            1. Thông tin nhận hàng
                        </Text>
                        <View style={styles.inputAndTit}>
                            <Text style={styles.absTit}>Số điện thoại *</Text>
                            <TextInput
                                style={[
                                    styles.inputBox,
                                    styles.noBorder,
                                    styles.hasAbsTit
                                ]}
                                placeholder="Vui lòng nhập số điện thoại"
                                keyboardType="numeric"
                                value={
                                    this.props.cart?.CustomerPhone !== '' &&
                                    this.props.cart?.CustomerPhone !== undefined
                                        ? this.props.cart.CustomerPhone
                                        : ''
                                }
                            />
                        </View>
                        <SexRadio />
                        <TextInput
                            style={[styles.inputBox]}
                            placeholder="Họ và tên *"
                            keyboardType="text"
                            value={
                                this.props.cart?.CustomerName !== '' &&
                                this.props.cart?.CustomerName !== undefined
                                    ? this.props.cart.CustomerName
                                    : ''
                            }
                        />
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}
const RadioButton = ({ onPress, selected, children }) => {
    return (
        <View style={styles.radioButtonContainer}>
            <TouchableOpacity onPress={onPress} style={styles.radioButton}>
                {selected ? <View style={styles.radioButtonIcon} /> : null}
            </TouchableOpacity>
            <TouchableOpacity onPress={onPress}>
                <Text style={styles.radioButtonText}>{children}</Text>
            </TouchableOpacity>
        </View>
    );
};
const SexRadio = (props) => {
    const [sex, setSex] = useState([
        { id: 1, value: true, name: 'Anh', selected: true },
        { id: 2, value: false, name: 'Chị', selected: false }
    ]);

    const onRadioBtnClick = (item) => {
        let updatedState = sex.map((setSex) =>
            setSex.id == item.id
                ? { ...setSex, selected: true }
                : { ...setSex, selected: false }
        );
        setSex(updatedState);
    };

    return (
        <View style={styles.radioButtonContainer}>
            {sex.map((item) => (
                <RadioButton
                    onPress={() => onRadioBtnClick(item)}
                    selected={item.selected}
                    key={item.id}>
                    {item.name}
                </RadioButton>
            ))}
        </View>
    );
};
const UserProvAndDis = (props) => {
    return (
        <View>
            <Picker
                selectedValue={this.state.selectedProv}
                onValueChange={(itemValue, itemIndex) => {
                    this.setState({
                        selectedProv: itemValue,
                        selectedProvinceId: itemIndex
                    });
                }}>
                {this.state.cities.map((city) => {
                    return (
                        <Picker.Item
                            label={city.city}
                            value={city.city}
                            key={city.plaka}
                        />
                    );
                })}
            </Picker>
            <Picker
                selectedValue={this.state.selectedDistrict}
                onValueChange={(itemValue, itemIndex) => {
                    this.setState({
                        selectedDistrict: itemValue
                    });
                }}>
                //render district list based on selected city
                {this.props.cities.length > 0 &&
                    this.props.cities[
                        this.state.selectedProvinceId
                    ].districts.map((district) => {
                        return (
                            <Picker.Item
                                label={district}
                                value={district}
                                key={district}
                            />
                        );
                    })}
            </Picker>
        </View>
    );
};
const mapStateToProps = (state) => {
    return {
        actioncart: state.cartReducer.Cart
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actionCart: bindActionCreators(cartCreator, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
