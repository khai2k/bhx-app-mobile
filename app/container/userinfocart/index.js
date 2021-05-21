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
import { apiBase, METHOD, API_CONST } from '@app/api';
import { useDispatch } from 'react-redux';

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
                        <UserProvAndDis />
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
    // if(this.props == undefined || this.props.cart == undefined || this.props.cart == null){
    //     return null;
    // }
    useEffect(() => {
        getLstProv();
    }, []);
    const [provinceSelect, setprovinceSelect] = useState(-1);

    const [lstProv, setLstProv] = useState(null);
    const [lstDis, setLstDis] = useState(null);
    const [lstWard, setLstWard] = useState(null);

    const getLstProv = function () {
        apiBase(API_CONST.API_LOCATION_GETALLPROVINCE, METHOD.GET, {})
            .then((response) => {
                setLstProv(response.Value);
                console.log(response.Value);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const getLstDis = (provinceId) => {
        apiBase(
            API_CONST.API_LOCATION_GETDICTRICTBYPROVINCE,
            METHOD.GET,
            {},
            { params: { provinceId, clearcache: '' } }
        )
            .then((response) => {
                setLstDis(response.Value);
            })
            .catch(() => {});
    };
    const getLstWard = (disId) => {
        apiBase(
            API_CONST.API_LOCATION_GETDICTRICTBYPROVINCE,
            METHOD.GET,
            {},
            { params: { disId, clearcache: '' } }
        )
            .then((response) => {
                setLstWard(response.Value);
            })
            .catch(() => {});
    };
    return (
        <View>
            <View style={styles.provAndDic}>
                <View style={[styles.provBox]}>
                    <Picker
                        selectedValue={-1}
                        style={{ height: 50, width: 150 }}
                        onValueChange={(itemValue, itemIndex) =>
                            getLstDis(itemValue)
                        }>
                        {lstProv !== null && lstProv.length > 0 ? (
                            lstProv.map((prov) => {
                                return (
                                    <Picker.Item
                                        label={prov.ProvinceFullName}
                                        value={prov.ProvinceId}
                                    />
                                );
                            })
                        ) : (
                            <Picker.Item label="Tỉnh thành" value="-1" />
                        )}
                    </Picker>
                </View>
                <View style={styles.disBox}>
                    <Picker
                        selectedValue={-1}
                        style={{ height: 50, width: 150 }}
                        onValueChange={(itemValue, itemIndex) =>
                            getLstWard(itemValue)
                        }>
                        {lstDis !== null && lstDis.length > 0 ? (
                            lstDis.map((dis) => {
                                return (
                                    <Picker.Item
                                        label={dis.Item2}
                                        value={dis.Item1}
                                    />
                                );
                            })
                        ) : (
                            <Picker.Item label="Quận huyện" value="-1" />
                        )}
                    </Picker>
                </View>
            </View>
            <View style={styles.wardBox}>
                <Picker
                    selectedValue={-1}
                    style={{ height: 50, width: 150 }}>
                    {lstWard !== null && lstWard.length > 0 ? (
                        lstWard.map((ward) => {
                            return (
                                <Picker.Item
                                    label={ward.Item2}
                                    value={ward.Item1}
                                />
                            );
                        })
                    ) : (
                        <Picker.Item label="Phường, Xã" value="-1" />
                    )}
                </Picker>
            </View>
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
