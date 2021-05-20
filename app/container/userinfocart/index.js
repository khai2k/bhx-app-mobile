import React, { Component } from 'react';
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

class userinfo extends Component {
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
                    <View style={styles.backTop}>
                        <Image
                            style={styles.logoback}
                            source={require('../../../assets/images/icon-back.png')}
                        />
                        <Text>Xem lại giỏ hàng</Text>
                    </View>
                    <View style={styles.btnGetHistoryAddress}>
                        <View style={styles.textHistoryAddress}>
                            <Image
                                style={styles.logoback}
                                source={require('../../../assets/images/icon-back.png')}
                            />
                            <Text>LẤY ĐỊA CHỈ MUA HÀNG TRƯỚC ĐÂY</Text>
                        </View>
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
                                    this.props.cart.CustomerPhone !== ''
                                        ? this.props.cart.CustomerPhone
                                        : ''
                                }
                            />
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}
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

export default connect(mapStateToProps, mapDispatchToProps)(userinfo);
