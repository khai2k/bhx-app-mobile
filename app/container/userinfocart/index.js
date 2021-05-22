import React, { Component, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Header } from '@app/components';
import { Cart } from '@app/components';

import {
    SafeAreaView,
    Text,
    View,
    Picker,
    TextInput,
    Image,
    ScrollView
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

import { helper } from '@app/common';
import * as cartCreator from '@app/container/cart/action';
import styles from './style';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { apiBase, METHOD, API_CONST } from '@app/api';
import { useDispatch } from 'react-redux';

const UserInfo = (props) => {
    useEffect(() => {
        props.actionCart.cart_get();
    }, []);

    const [isSelectedDeliAtDoor, setSelectedDeliAtDoor] = useState(false);
    const [isSelectedCallOther, setSelectedCallOther] = useState(false);
    const [isSelectedXHD, setSelectedXHD] = useState(false);

    return (
        <SafeAreaView>
            <Header />
            <ScrollView style={[styles.container, { marginBottom: 60 }]}>
                <TouchableOpacity
                    style={styles.backTop}
                    onpress={() => props.navigation.navigate('Cart')}>
                    <Image
                        style={styles.logoback}
                        source={require('../../../assets/images/icon-back.png')}
                    />
                    <Text onclick={() => {}} style={styles.backTop}>
                        Xem lại giỏ hàng
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.btnGetHistoryAddress}>
                        <Image
                            style={styles.logohome}
                            source={require('../../../assets/images/icon-home.png')}
                        />
                        <Text style={styles.textHistoryAddress}>
                            LẤY ĐỊA CHỈ MUA HÀNG TRƯỚC ĐÂY
                        </Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.sectionInput}>
                    <Text style={styles.stepTitle}>1. Thông tin nhận hàng</Text>
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
                                props?.cart?.CustomerPhone !== '' &&
                                props?.cart?.CustomerPhone !== undefined
                                    ? props?.cart.CustomerPhone
                                    : ''
                            }
                        />
                    </View>
                    {SexRadio(props?.cart?.CustomerGender)}
                    <TextInput
                        style={[styles.inputBox]}
                        placeholder="Họ và tên *"
                        keyboardType="text"
                        value={
                            props?.cart?.CustomerName !== '' &&
                            props?.cart?.CustomerName !== undefined
                                ? props?.cart.CustomerName
                                : ''
                        }
                    />
                    <UserProvAndDis />
                    <TextInput
                        style={[styles.inputBox, styles.marginTop]}
                        placeholder="Địa chỉ nhận"
                        keyboardType="text"
                        value={
                            props?.cart?.CustomerAddress !== '' &&
                            props?.cart?.CustomerAddress !== undefined
                                ? props?.cart.CustomerAddress
                                : ''
                        }
                    />
                    <View style={{ marginBottom: 10, marginTop: 5 }}>
                        <View style={styles.checkboxContainer}>
                            <CheckBox
                                value={isSelectedDeliAtDoor}
                                onValueChange={setSelectedDeliAtDoor}
                                style={styles.checkbox}
                            />
                            <Text style={styles.label}>
                                Yêu cầu giao tận cửa chung cư, văn phòng
                            </Text>
                        </View>
                        <View style={styles.checkboxContainer}>
                            <CheckBox
                                value={isSelectedCallOther}
                                onValueChange={setSelectedCallOther}
                                style={styles.checkbox}
                            />
                            <Text style={styles.label}>
                                Gọi người khác nhận hàng (nếu có)
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.sectionInput}>
                    <Text style={styles.stepTitle}>
                        2. Chọn thời gian nhận hàng
                    </Text>
                    {chosenDeliDate(props)}
                    {chosenDeliTime(props)}
                    <View>
                        <Text style={{ fontSize: 14, fontWeight: 'bold' }}>
                            Mua thêm để miễn phí giao với đơn trên 100.000đ (còn
                            5 lần)
                            <Text
                                style={{
                                    fontSize: 14,
                                    fontWeight: 'normal',
                                    color: '#8F9BB3'
                                }}>
                                không tính hàng nặng, to: Bia, Nước các loại
                            </Text>
                        </Text>
                    </View>
                </View>
                <View style={styles.sectionInput}>
                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            value={isSelectedXHD}
                            onValueChange={setSelectedXHD}
                            style={styles.checkbox}
                        />
                        <Text style={styles.label}>Xuất hóa đơn công ty</Text>
                    </View>
                    <TextInput
                        style={styles.inputNote}
                        placeholder="Ghi chú thêm (nếu có)"
                        keyboardType="text"
                        numberOfLines={4}
                        multiline
                        editable
                        maxLength={150}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
const chosenDeliDate = (props) => {
    return (
        <View style={[styles.delichoose]}>
            <Picker
                selectedValue={0}
                style={{ height: 50, width: '100%' }}
                onValueChange={(itemValue, itemIndex) =>
                    props?.cart?.ShiptimeGroupList?.DateList
                }>
                {props?.cart?.ShiptimeGroupList?.DateList !== null &&
                props?.cart?.ShiptimeGroupList?.DateList.length > 0 ? (
                    props?.cart?.ShiptimeGroupList?.DateList.map((item) => {
                        return <Picker.Item label={item} value={item} />;
                    })
                ) : (
                    <Picker.Item label="Chọn ngày nhận hàng" value="-1" />
                )}
            </Picker>
        </View>
    );
};
const chosenDeliTime = (props) => {
    return (
        <View style={[styles.delichoose, { marginTop: 10, marginBottom: 10 }]}>
            <Picker
                selectedValue={0}
                style={{ height: 50, width: '100%' }}
                onValueChange={(itemValue, itemIndex) =>
                    props?.cart?.ShiptimeGroupList?.TimeList
                }>
                {props?.cart?.ShiptimeGroupList?.TimeList !== null &&
                props?.cart?.ShiptimeGroupList?.TimeList.length > 0 ? (
                    props?.cart?.ShiptimeGroupList?.TimeList.map((item) => {
                        return <Picker.Item label={item} value={item} />;
                    })
                ) : (
                    <Picker.Item label="Chọn thời gian nhận hàng" value="-1" />
                )}
            </Picker>
        </View>
    );
};
const SexRadio = (props) => {
    const [sex, setSex] = useState([
        {
            id: 1,
            value: true,
            name: 'Anh',
            selected: props == -1 || props == 1 ? true : false
        },
        {
            id: 2,
            value: false,
            name: 'Chị',
            selected: props == 2 ? true : false
        }
    ]);

    const onRadioBtnClick = (item) => {
        let updatedState = sex.map((setSex) =>
            setSex.id == item.id
                ? { ...setSex, selected: true }
                : { ...setSex, selected: false }
        );
        setSex(updatedState);
    };

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
    useEffect(() => {
        getLstProv();
    }, []);
    const [provinceSelected, setprovinceSelected] = useState(-1);
    const [enableDis, setEnableDis] = useState(false);
    const [enableWard, setEnableWard] = useState(false);

    const [lstProv, setLstProv] = useState(null);
    const [lstDis, setLstDis] = useState(null);
    const [lstWard, setLstWard] = useState(null);

    const getLstProv = function () {
        apiBase(API_CONST.API_LOCATION_GETALLPROVINCE, METHOD.GET, {})
            .then((response) => {
                setLstProv(response.Value);
            })
            .catch((err) => {});
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
                setprovinceSelected(provinceId);
                setEnableDis(true);
            })
            .catch(() => {});
    };
    const getLstWard = (ProvinceId, DistrictId) => {
        apiBase(
            API_CONST.API_LOCATION_GETWARDBYDICANDPROVINCE,
            METHOD.GET,
            {},
            { params: { ProvinceId, DistrictId, clearcache: 'empty' } }
        )
            .then((response) => {
                setLstWard(response.Value);
                setEnableWard(true);
            })
            .catch(() => {
                setIsLoadingWard(false);
            });
    };

    return (
        <View>
            <View style={styles.provAndDic}>
                <View style={[styles.provBox]}>
                    <Picker
                        selectedValue={provinceSelected}
                        style={{ height: 50, width: 150 }}
                        onValueChange={(itemValue, itemIndex) => {
                            setprovinceSelected(itemValue);
                            setLstWard(null);
                            setEnableWard(false);
                            setEnableDis(false);
                            getLstDis(itemValue);
                        }}>
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
                        enabled={enableDis}
                        style={{
                            height: 50,
                            width: 150,
                            color: enableDis ? '#000' : '#C2C2C2'
                        }}
                        onValueChange={(itemValue, itemIndex) => {
                            getLstWard(provinceSelected, itemValue);
                        }}>
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
                    enabled={enableWard}
                    style={{
                        height: 50,
                        width: '100%',
                        color: enableWard ? '#000' : '#C2C2C2'
                    }}>
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
        cart: state.cartReducer.Cart
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actionCart: bindActionCreators(cartCreator, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
