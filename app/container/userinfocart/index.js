import React, { Component, useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { Header, CartTotal, Cart } from '@app/components';
import { CONST_STRINGERR } from '@app/constants';
import HTML from 'react-native-render-html';

import {
    Text,
    View,
    Picker,
    TextInput,
    StatusBar,
    Image,
    ScrollView,
    Alert,
    Dimensions
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { SafeAreaView } from 'react-native-safe-area-context';

import { helper } from '@app/common';
//  import * as cartCreator from '@app/container/cart/action';
import * as cartCreator from '@app/redux/actions/cartAction';
import styles from './style';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { apiBase, METHOD, API_CONST } from '@app/api';
import { useSelector, useDispatch } from 'react-redux';
import * as locationCreator from '@app/components/Location/action';
import { FloatingLabelInput } from 'react-native-floating-label-input';

const { width: WIDTH } = Dimensions.get('window');

const UserInfoCart = (props) => {
    useEffect(() => {
        actionCart.cart_get();
        console.log(cartState);
        console.log(shipdatetime);
    }, []);

    useEffect(() => {
        console.log(curDateDeli);
    }, curDateDeli);

    const dispatch = useDispatch();

    const actionCart = bindActionCreators(cartCreator, dispatch);
    const actionLocation = bindActionCreators(locationCreator, dispatch);

    const cart = useSelector((state) => state.cartReducer.Cart);
    const cartTotal = useSelector((state) => state.cartReducer.CartTotal);
    const shipdatetime = useSelector(
        (state) => state.cartReducer.ShiptimeGroupList
    );
    const location = useSelector(
        (state) => state.locationReducer.crrLocationRs
    );
    
    const [cartState, setCartState] = useState(cart);
    const [cartUserInfo, setCartUserInfo] = useState({
        CustomerName: '',
        CustomerGender: 1,
        CustomerPhone: '',
        ShipProvince: 0,
        ShipDistrict: 0,
        ShipWard: 0,
        ShipAddress: '',
        IsCallOthers: false,
        OthersGenderCall: '',
        OthersPhone: '',
        OthersName: '',
        IsGetBill: false,
        CompanyName: '',
        CompanyAddress: '',
        CompanyTaxNumber: '',
        Note: ''
    });

    const [isSelectedDeliAtDoor, setSelectedDeliAtDoor] = useState(false);
    const [isSelectedCallOther, setSelectedCallOther] = useState(false);
    const [curDateDeli, setcurDateDeli] = useState(null);

    const [dateDeliID, setdateDeliID] = useState('');
    const [timeDeliID, settimeDeliID] = useState('');

    // Xuất Hóa Đơn
    const [isSelectedXHD, setSelectedXHD] = useState(false);
    const [companyName, setcompanyName] = useState('');
    const [companyAddress, setcompanyAddress] = useState('');
    const [companyTax, setcompanyTax] = useState('');

    // Validate Error
    const [phoneErrMessage, setphoneErrMessage] = useState(
        CONST_STRINGERR.EMPTY_PHONE
    );
    const [phoneOtherErrMessage, setphoneOtherErrMessage] = useState(
        CONST_STRINGERR.EMPTY_PHONE
    );
    const [cusNameErrMessage, setcusNameErrMessage] = useState(
        CONST_STRINGERR.EMPTY_CUSNAME
    );
    const [cusNameOtherErrMessage, setcusNameOtherErrMessage] = useState(
        CONST_STRINGERR.EMPTY_CUSNAME
    );
    const [cusAddressErrMessage, setcusAddressErrMessage] = useState(
        CONST_STRINGERR.EMPTY_SHIPADDRESS
    );
    // Province District Ward
    const [provinceSelected, setprovinceSelected] = useState(-1);
    const [districtSelected, setdistrictSelected] = useState(-1);
    const [wardSelected, setwardSelected] = useState(-1);

    const onSubmitForm = () => {
        const isValidForm = () => {};
    };

    const handleErrorPhone = (value) => {
        if (helper.isEmptyOrNull(value)) {
            setphoneErrMessage(CONST_STRINGERR.EMPTY_PHONE);
        } else if (helper.isPhoneNumber(value) == false) {
            setphoneErrMessage(CONST_STRINGERR.INVALID_PHONE);
        } else setphoneErrMessage('');
    };
    const handleErrorPhoneOther = (value) => {
        if (helper.isEmptyOrNull(value)) {
            setphoneOtherErrMessage(CONST_STRINGERR.EMPTY_PHONE);
        } else if (helper.isPhoneNumber(value) == false) {
            setphoneOtherErrMessage(CONST_STRINGERR.INVALID_PHONE);
        } else setphoneOtherErrMessage('');
    };
    const handleErrorCusName = (value, maxlength) => {
        if (helper.isEmptyOrNull(value)) {
            setcusNameErrMessage(CONST_STRINGERR.EMPTY_CUSNAME);
        } else if (value.length > maxlength) {
            setcusNameErrMessage(CONST_STRINGERR.OUTOFRANGE_CUSNAME);
        } else setcusNameErrMessage('');
    };
    const handleErrorCusNameOther = (value, maxlength) => {
        if (helper.isEmptyOrNull(value)) {
            setcusNameOtherErrMessage(CONST_STRINGERR.EMPTY_CUSNAME);
        } else if (value.length > maxlength) {
            setcusNameOtherErrMessage(CONST_STRINGERR.OUTOFRANGE_CUSNAME);
        } else setcusNameOtherErrMessage('');
    };
    const handleErrorCusAddress = (value, maxlength) => {
        if (helper.isEmptyOrNull(value)) {
            setcusAddressErrMessage(CONST_STRINGERR.EMPTY_SHIPADDRESS);
        } else if (value.length > maxlength) {
            setcusAddressErrMessage(CONST_STRINGERR.OUTOFRANGE_SHIPADDRESS);
        } else setcusAddressErrMessage('');
    };
    const chosenDeliDate = () => {
        const isActive =
            shipdatetime !== undefined &&
            shipdatetime[0]?.DateList !== null &&
            shipdatetime[0]?.DateList?.length > 0;
        return (
            <View style={[styles.delichoose]}>
                <Picker
                    selectedValue={dateDeliID > 0 ? 0 : dateDeliID}
                    style={{
                        height: 50,
                        width: '100%',
                        color: isActive ? '#000' : '#C2C2C2'
                    }}
                    enabled={isActive}
                    mode={'dropdown'}
                    onValueChange={(itemValue, itemIndex) => {
                        if (itemValue > 0) {
                            setcurDateDeli(
                                shipdatetime[0]?.DateList[itemIndex]
                            );
                            setdateDeliID(itemValue);
                        } else {
                            setcurDateDeli(null);
                        }
                    }}>
                    <Picker.Item label="Ngày nhận" value="-1" color="#C2C2C2" />
                    {isActive &&
                        shipdatetime[0]?.DateList.map((item) => {
                            return (
                                <Picker.Item
                                    label={item.text}
                                    value={item.timeid}
                                    key={item.timeid}
                                />
                            );
                        })}
                </Picker>
            </View>
        );
    };
    const chosenDeliTime = (datelist) => {
        const isActive =
            datelist?.curDateDeli?.TimeList !== null &&
            datelist?.curDateDeli?.TimeList?.length > 0;
        return (
            <View
                style={[
                    styles.delichoose,
                    { marginTop: 10, marginBottom: 10 }
                ]}>
                <Picker
                    selectedValue={0}
                    style={{
                        height: 50,
                        width: '100%',
                        color: isActive ? '#000' : '#C2C2C2'
                    }}
                    enabled={isActive}
                    mode={'dropdown'}
                    onValueChange={(itemValue, itemIndex) => {
                        settimeDeliID(itemValue);
                        setCartUserInfo(previousState => ({
                            ...previousState,
                            OthersGenderCall: itemValue
                        }));
                    }}>
                    <Picker.Item
                        label="Thời gian nhận"
                        value="-1"
                        color="#C2C2C2"
                    />
                    {isActive &&
                        datelist?.curDateDeli?.TimeList.map((item) => {
                            return (
                                <Picker.Item
                                    label={item.text}
                                    displayName={<HTML source={item.text} />}
                                    value={item.id}
                                    key={item.id}
                                />
                            );
                        })}
                </Picker>
            </View>
        );
    };

    const boxXHD = () => {
        if (isSelectedXHD) {
            return (
                <View style={styles.floatingLabel}>
                    <FloatingLabelInput
                        customLabelStyles={{
                            colorFocused: '#000',
                            colorBlurred: '#000',
                            topFocused: -15,
                            fontSizeFocused: 11
                        }}
                        containerStyles={
                            helper.isEmptyOrNull(companyName)
                                ? styles.floatingBoxErr
                                : styles.floatingBox
                        }
                        label={
                            <Text>
                                Tên Công Ty{' '}
                                <Text style={{ color: '#ff001f' }}>*</Text>
                            </Text>
                        }
                        value={companyName}
                        onChangeText={(value) => setcompanyName(value)}
                    />
                    <FloatingLabelInput
                        customLabelStyles={{
                            colorFocused: '#000',
                            colorBlurred: '#000',
                            topFocused: -15,
                            fontSizeFocused: 11
                        }}
                        containerStyles={
                            helper.isEmptyOrNull(companyAddress)
                                ? styles.floatingBoxErr
                                : styles.floatingBox
                        }
                        label={
                            <Text>
                                Địa chỉ công Ty{' '}
                                <Text style={{ color: '#ff001f' }}>*</Text>
                            </Text>
                        }
                        value={companyAddress}
                        onChangeText={(value) => setcompanyAddress(value)}
                    />
                    <FloatingLabelInput
                        customLabelStyles={{
                            colorFocused: '#000',
                            colorBlurred: '#000',
                            topFocused: -15,
                            fontSizeFocused: 11
                        }}
                        containerStyles={
                            helper.isEmptyOrNull(companyTax)
                                ? styles.floatingBoxErr
                                : styles.floatingBox
                        }
                        keyboardType="numeric"
                        label={
                            <Text>
                                Mã số thuế{' '}
                                <Text style={{ color: '#ff001f' }}>*</Text>
                            </Text>
                        }
                        value={companyTax}
                        onChangeText={(value) => setcompanyTax(value)}
                    />
                </View>
            );
        }
    };

    const boxCallOther = (props, sex = 1) => {
        const [sexOther, setSexOther] = useState([
            {
                id: 1,
                value: true,
                name: 'Anh',
                selected: true
            },
            {
                id: 2,
                value: false,
                name: 'Chị',
                selected: false
            }
        ]);
        const onRadioBtnClick = (item) => {
            let updatedState = sexOther.map((setSexOther) =>
                setSexOther.id == item.id
                    ? { ...setSexOther, selected: true }
                    : { ...setSexOther, selected: false }
            );
            setSexOther(updatedState);
            setCartUserInfo(previousState => ({
                ...previousState,
                OthersGenderCall: updatedState
            }));
        };
        if (isSelectedCallOther) {
            return (
                <View style={styles.boxCallOther}>
                    <View style={styles.radioButtonContainer}>
                        {sexOther.map((item) => (
                            <RadioButton
                                onPress={() => onRadioBtnClick(item)}
                                selected={item.selected}
                                key={item.id}>
                                {item.name}
                            </RadioButton>
                        ))}
                    </View>
                    <FloatingLabelInput
                        customLabelStyles={{
                            colorFocused: '#000',
                            colorBlurred: '#000',
                            topFocused: -15,
                            fontSizeFocused: 11
                        }}
                        containerStyles={
                            helper.isEmptyOrNull(phoneOtherErrMessage) == false
                                ? styles.floatingBoxErrNoMargin
                                : styles.floatingBoxNoMargin
                        }
                        keyboardType="numeric"
                        label={<Text>Số điện thoại (bắt buộc)</Text>}
                        value={cartUserInfo?.OthersPhone}
                        onChangeText={(value) => {
                            setCartUserInfo(previousState => ({
                                ...previousState,
                                OthersPhone: value
                            }));
                            handleErrorPhoneOther(value);
                        }}
                    />
                    {helper.isEmptyOrNull(phoneOtherErrMessage) == false && (
                        <Text style={styles.textErr}>
                            {phoneOtherErrMessage}
                        </Text>
                    )}
                    <Text></Text>
                    <FloatingLabelInput
                        customLabelStyles={{
                            colorFocused: '#000',
                            colorBlurred: '#000',
                            topFocused: -15,
                            fontSizeFocused: 11
                        }}
                        containerStyles={
                            helper.isEmptyOrNull(cusNameOtherErrMessage) ==
                            false
                                ? styles.floatingBoxErrNoMargin
                                : styles.floatingBoxNoMargin
                        }
                        label={<Text>Họ và tên (bắt buộc)</Text>}
                        value={cartUserInfo?.OthersName}
                        onChangeText={(value) => {
                            setCartUserInfo(previousState => ({
                                ...previousState,
                                OthersName: value
                            }));
                            handleErrorCusNameOther(value);
                        }}
                    />
                    {helper.isEmptyOrNull(cusNameOtherErrMessage) == false && (
                        <Text style={styles.textErr}>
                            {cusNameOtherErrMessage}
                        </Text>
                    )}
                </View>
            );
        }
    };

    const UserProvAndDis = (location) => {
        useEffect(() => {
            getLstProv();
        }, []);

        const [enableDis, setEnableDis] = useState(false);
        const [enableWard, setEnableWard] = useState(false);

        const [lstProv, setLstProv] = useState(null);
        const [lstDis, setLstDis] = useState(null);
        const [lstWard, setLstWard] = useState(null);

        const getLstProv = function () {
            apiBase(API_CONST.API_LOCATION_GETALLPROVINCE, METHOD.GET, {})
                .then((response) => {
                    setLstProv(response.Value);
                    if (location !== null && location.ProvinceId > 0) {
                        setprovinceSelected(location.ProvinceId);
                        getLstDis(location.ProvinceId);
                    }
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
                    if (provinceId > 0 && location?.DistrictId > 0) {
                        setdistrictSelected(location.DistrictId);
                        getLstWard(provinceId, location.DistrictId);
                    } else setEnableWard(false);
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
                    if (location?.WardId > 0) {
                        setwardSelected(location?.WardId);
                    }
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

                                // reset ward
                                setLstWard(null);
                                setwardSelected(false);
                                setEnableWard(false);

                                //reset district
                                setEnableDis(false);
                                getLstDis(itemValue);
                                setdistrictSelected(false);
                            }}>
                            <Picker.Item
                                label="Tỉnh thành"
                                value="-1"
                                color="#C2C2C2"
                            />
                            {lstProv !== null &&
                                lstProv.length > 0 &&
                                lstProv.map((prov) => {
                                    return (
                                        <Picker.Item
                                            label={prov.ProvinceFullName}
                                            value={prov.ProvinceId}
                                            key={prov.ProvinceId}
                                        />
                                    );
                                })}
                        </Picker>
                        {provinceSelected <= 0 && (
                            <Text style={[styles.textErr, styles.textErrAbs]}>
                                {CONST_STRINGERR.ERR_PROVINCE}
                            </Text>
                        )}
                    </View>
                    <View style={styles.disBox}>
                        <Picker
                            selectedValue={districtSelected}
                            enabled={enableDis}
                            style={{
                                height: 50,
                                width: 150,
                                color: enableDis ? '#000' : '#C2C2C2'
                            }}
                            onValueChange={(itemValue, itemIndex) => {
                                getLstWard(provinceSelected, itemValue);
                                setdistrictSelected(itemValue);
                            }}>
                            <Picker.Item
                                label="Quận, huyện"
                                value="-1"
                                color="#C2C2C2"
                            />
                            {lstDis !== null &&
                                lstDis.length > 0 &&
                                lstDis.map((dis) => {
                                    return (
                                        <Picker.Item
                                            label={dis.Item2}
                                            value={dis.Item1}
                                            key={dis.Item1}
                                        />
                                    );
                                })}
                        </Picker>

                        {districtSelected <= 0 && (
                            <Text style={[styles.textErr, styles.textErrAbs]}>
                                {CONST_STRINGERR.ERR_DISTRICT}
                            </Text>
                        )}
                    </View>
                </View>
                <View style={styles.wardBox}>
                    <Picker
                        selectedValue={wardSelected}
                        enabled={enableWard}
                        onValueChange={(itemValue, itemIndex) => {
                            setwardSelected(itemValue);
                        }}
                        style={{
                            height: 50,
                            width: '100%',
                            color: enableWard ? '#000' : '#C2C2C2'
                        }}>
                        <Picker.Item
                            label="Phường, Xã"
                            value="-1"
                            color="#C2C2C2"
                        />
                        {lstWard !== null &&
                            lstWard.length > 0 &&
                            lstWard.map((ward) => {
                                return (
                                    <Picker.Item
                                        label={ward.Item2}
                                        value={ward.Item1}
                                        key={ward.Item1}
                                    />
                                );
                            })}
                    </Picker>
                    {wardSelected <= 0 && (
                        <Text style={[styles.textErr, styles.textErrAbs]}>
                            {CONST_STRINGERR.ERR_WARD}
                        </Text>
                    )}
                </View>
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
            setCartUserInfo(previousState => ({
                ...previousState,
                CustomerGender: updatedState
            }));
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
        <View>
            <Header />
            <ScrollView
                style={[styles.container]}
                contentContainerStyle={{
                    paddingBottom: 60
                }}>
                <TouchableOpacity
                    style={styles.backTop}
                    onPress={() => props.navigation.goBack()}>
                    <Image
                        style={styles.logoback}
                        source={require('../../../assets/images/icon-back.png')}
                    />
                    <Text onclick={() => {}} style={styles.backTop}>
                        Xem lại giỏ hàng
                    </Text>
                </TouchableOpacity>
                {/* <TouchableOpacity>
                    <View style={styles.btnGetHistoryAddress}>
                        <Image
                            style={styles.logohome}
                            source={require('../../../assets/images/icon-home.png')}
                        />
                        <Text style={styles.textHistoryAddress}>
                            LẤY ĐỊA CHỈ MUA HÀNG TRƯỚC ĐÂY
                        </Text>
                    </View>
                </TouchableOpacity> */}
                <View style={styles.sectionInputTop}>
                    <Text style={styles.stepTitle}>1. Thông tin nhận hàng</Text>

                    <FloatingLabelInput
                        customLabelStyles={{
                            colorFocused: '#000',
                            colorBlurred: '#000',
                            topFocused: -15,
                            fontSizeFocused: 11
                        }}
                        containerStyles={
                            helper.isEmptyOrNull(phoneErrMessage) == false
                                ? styles.floatingBoxErrNoMargin
                                : styles.floatingBoxNoMargin
                        }
                        keyboardType="numeric"
                        label={
                            <Text>
                                Số điện thoại{' '}
                                <Text style={{ color: '#ff001f' }}>*</Text>
                            </Text>
                        }
                        value={cartUserInfo?.CustomerPhone}
                        onChangeText={(value) => {                            
                            setCartUserInfo(previousState => ({
                                ...previousState,
                                CustomerPhone: value
                            }));
                            handleErrorPhone(value);
                            console.log(cartUserInfo);
                        }}
                    />
                    {helper.isEmptyOrNull(phoneErrMessage) == false && (
                        <Text style={styles.textErr}>{phoneErrMessage}</Text>
                    )}

                    {SexRadio(
                        cart?.CustomerGender > 0 ? cart?.CustomerGender : 1
                    )}

                    <FloatingLabelInput
                        customLabelStyles={{
                            colorFocused: '#000',
                            colorBlurred: '#000',
                            topFocused: -15,
                            fontSizeFocused: 11
                        }}
                        containerStyles={
                            helper.isEmptyOrNull(cusNameErrMessage) == false
                                ? styles.floatingBoxErrNoMargin
                                : styles.floatingBoxNoMargin
                        }
                        label={
                            <Text>
                                Họ và tên{' '}
                                <Text style={{ color: '#ff001f' }}>*</Text>
                            </Text>
                        }
                        value={cartUserInfo?.CustomerName}
                        onChangeText={(value) => {
                            setCartUserInfo(previousState => ({
                                ...previousState,
                                CustomerName: value
                            }));
                            handleErrorCusName(value);
                        }}
                    />
                    {helper.isEmptyOrNull(cusNameErrMessage) == false && (
                        <Text style={styles.textErr}>{cusNameErrMessage}</Text>
                    )}
                    {UserProvAndDis(location)}
                    <TextInput
                        style={[styles.inputBox, styles.marginTop]}
                        placeholder="Số nhà, tên đường"
                        value={cartUserInfo?.ShipAddress}
                        onChangeText={(value) => {
                            setCartUserInfo(previousState => ({
                                ...previousState,
                                ShipAddress: value
                            }));
                            handleErrorCusAddress(value, 60);
                        }}
                    />
                    {helper.isEmptyOrNull(cusAddressErrMessage) == false && (
                        <Text style={styles.textErr}>
                            {cusAddressErrMessage}
                        </Text>
                    )}
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
                                onValueChange={(value) => {
                                    setSelectedCallOther(value);
                                    if (isSelectedCallOther == false) {
                                        cartUserInfo.OthersPhone = '';
                                        handleErrorPhoneOther('');
                                        cartUserInfo.OthersName = '';
                                        handleErrorCusNameOther('');
                                    }
                                }}
                                style={styles.checkbox}
                            />
                            <Text style={styles.label}>
                                Gọi người khác nhận hàng (nếu có)
                            </Text>
                        </View>
                        {boxCallOther()}
                    </View>
                </View>
                <View style={styles.sectionInput}>
                    <Text style={styles.stepTitle}>
                        2. Chọn thời gian nhận hàng
                    </Text>
                    {chosenDeliDate()}

                    {chosenDeliTime({ curDateDeli })}

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
                                &nbsp;không tính hàng nặng, to: Bia, Nước các
                                loại
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
                    {boxXHD()}

                    <TextInput
                        style={styles.inputNote}
                        placeholder="Ghi chú thêm (nếu có)"
                        numberOfLines={4}
                        multiline
                        editable
                        maxLength={150}
                    />
                </View>
                <CartTotal cartInfo={cartTotal} />
                <View style={styles.boxbtn}>
                    <View style={styles.btn}>
                        <TouchableOpacity onPress={() => {}}>
                            <Text style={styles.textbtn}>Xóa hết giỏ hàng</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.btn}>
                        <TouchableOpacity
                            onPress={() =>
                                this.props.navigation.navigate('Cart')
                            }>
                            <View>
                                <Text style={styles.textbtn}>
                                    Dùng phiếu mua hàng
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.btnbuy}>
                        <TouchableOpacity
                            onPress={() =>
                                props.navigation.navigate('UserInfo')
                            }>
                            <View>
                                <Text style={styles.textbtnbuy}>
                                    Hoàn tất mua
                                </Text>
                                <Text style={styles.textPriceTotal}>
                                    {cartTotal?.SumTotal > 0 &&
                                        helper.formatMoney(cartTotal.SumTotal)}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default UserInfoCart;
