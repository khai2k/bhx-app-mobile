import React, { Component, useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { Header, CartTotal, Cart } from '@app/components';
import { CONST_STRINGERR } from '@app/constants';
import HTML from 'react-native-render-html';

import {
    Text,
    View,
    TextInput,
    StatusBar,
    Image,
    ScrollView,
    Alert,
    Dimensions,
    ActivityIndicator,
    Modal,
    Picker
} from 'react-native';
import { Colors } from '@app/styles';
import CheckBox from '@react-native-community/checkbox';
import { SafeAreaView } from 'react-native-safe-area-context';

import { helper } from '@app/common';
//  import * as cartCreator from '@app/container/cart/action';
import * as cartCreator from '@app/redux/actions/cartAction';
import styles from './style';
import { StyleGeneral } from '@app/styles';

import { TouchableOpacity } from 'react-native-gesture-handler';

import { apiBase, METHOD, API_CONST } from '@app/api';
import { useSelector, useDispatch } from 'react-redux';
import { FloatingLabelInput } from 'react-native-floating-label-input';
import DropDownPicker from 'react-native-custom-dropdown';
import DropDownPicker2 from 'react-native-dropdown-picker';

import {
    ModalContent,
    ModalPortal,
    ModalFooter,
    ModalTitle,
    ModalButton
} from 'react-native-modals';

const UserInfoCart = (props) => {
    useEffect(() => {
        getCart(location.ProvinceId > 0 ? location.ProvinceId : 0);
        getLstProv();
    }, []);

    useEffect(() => {}, isLoading);
    useEffect(() => {}, cartmodel);
    useEffect(() => {}, shipdatetime);
    useEffect(() => {
        console.log(curDateDeli);
    }, curDateDeli);
    useEffect(() => {}, timeSelected);
    useEffect(() => {}, dateSelected);

    const windowWidth = Math.round(Dimensions.get('window').width);
    const windowHeight = Math.round(Dimensions.get('window').height);

    const [isLoading, setisLoading] = useState(true);

    const dispatch = useDispatch();

    const actionCart = bindActionCreators(cartCreator, dispatch);

    const [cartmodel, setCartModel] = useState(null);
    const cart = useSelector((state) => state.cartReducer.Cart);
    const cartTotal = useSelector((state) => state.cartReducer.CartTotal);
    const [shipdatetime, setshipdatetime] = useState(null);
    const location = useSelector(
        (state) => state.locationReducer.Location.LocationInfo
    );

    const getCart = (prov, dis, ward) => {
        setisLoading(true);
        setshipdatetime(null);
        setdateSelectedValue('-1');
        settimeSelected('-1');
        actionCart.cart_get(prov, dis, ward).then((res) => {
            setisLoading(false);
            setCartModel(res.Value);
            if (res.Value.ShiptimeGroupList != null) {
                setshipdatetime(res.Value.ShiptimeGroupList);
            }
        });
        console.log(shipdatetime);
    };

    const [cartUserInfo, setCartUserInfo] = useState({
        CustomerName: '',
        CustomerGender: 1,
        CustomerPhone: '',
        ShipProvince: 0,
        ShipDistrict: 0,
        ShipWard: 0,
        ShipAddress: '',
        IsCallOthers: false,
        OthersGenderCall: '1',
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

    //Delivery Date and Time State
    const [curDateDeli, setcurDateDeli] = useState(null);

    const [dateSelected, setdateSelected] = useState('');
    const [dateSelectedValue, setdateSelectedValue] = useState('-1');
    const [timeSelected, settimeSelected] = useState('-1');

    // Xu???t H??a ????n
    const [isSelectedXHD, setSelectedXHD] = useState(false);
    const [companyName, setcompanyName] = useState('');
    const [companyAddress, setcompanyAddress] = useState('');
    const [companyTax, setcompanyTax] = useState('');

    // Validate Error
    const [phoneErrMessage, setphoneErrMessage] = useState(
        // CONST_STRINGERR.EMPTY_PHONE
        ''
    );
    const [phoneOtherErrMessage, setphoneOtherErrMessage] = useState(
        CONST_STRINGERR.EMPTY_PHONE_OTHER
    );
    const [cusNameErrMessage, setcusNameErrMessage] = useState(
        // CONST_STRINGERR.EMPTY_CUSNAME
        ''
    );
    const [cusNameOtherErrMessage, setcusNameOtherErrMessage] = useState(
        CONST_STRINGERR.EMPTY_CUSNAME_OTHER
    );
    const [cusAddressErrMessage, setcusAddressErrMessage] = useState(
        // CONST_STRINGERR.EMPTY_SHIPADDRESS
        ''
    );
    // Province District Ward
    const [provinceSelected, setprovinceSelected] = useState(-1);
    const [districtSelected, setdistrictSelected] = useState(-1);
    const [wardSelected, setwardSelected] = useState(-1);
    const [enableDis, setEnableDis] = useState(false);
    const [enableWard, setEnableWard] = useState(false);
    const [lstProv, setLstProv] = useState(null);
    const [lstDis, setLstDis] = useState(null);
    const [lstWard, setLstWard] = useState(null);
    const [isVisibleProvincePicker, setisVisibleProvincePicker] =
        useState(false);
    const [isVisibleDistrictPicker, setisVisibleDistrictPicker] =
        useState(false);
    const [isVisibleWardPicker, setisVisibleWardPicker] = useState(false);

    const alert = (message) => {
        const html = (
            <HTML
                style={styles.error}
                tagsStyles={{ b: styles.errorbold }}
                source={{ html: '<section>' + message + '</section>' }}
                contentWidth={200}
            />
        );
        const modalPortalId = ModalPortal.show(
            <View>
                <ModalContent>{html}</ModalContent>
                <ModalFooter>
                    <ModalButton
                        style={[
                            StyleGeneral.styleAlert.btnAlert,
                            { paddingTop: 10, paddingBottom: 10 }
                        ]}
                        textStyle={StyleGeneral.styleAlert.btnAlertText}
                        text="?????ng ??"
                        onPress={() => {
                            ModalPortal.dismiss(modalPortalId);
                        }}
                    />
                </ModalFooter>
            </View>,
            {
                animationDuration: 0,
                width: 0.8,
                onHardwareBackPress: () => {
                    return true;
                }
            }
        );
    };

    const onSubmitForm = () => {
        const formError = validateForm();
        if (formError === '') {
            setisLoading(true);
            actionCart.cart_submit(cartmodel).then((res) => {
                setisLoading(false);
                if (res.HttpCode == 200) {
                    return props.navigation
                        .navigate('OrderSuccess', {
                            orderId: res.Value.OrderId
                        });
                } else alert(res.Message);
            })
            .catch((error) => {
                console.log(error);
                alert(error);
            });
            return;
        } else alert(formError);
    };

    const validateForm = () => {
        if (helper.isEmptyOrNull(cartmodel)) {
            return 'Data kh??ng ch??nh x??c!';
        }
        cartmodel.Cart.CustomerGender = cartUserInfo.CustomerGender;
        cartmodel.Cart.Note = cartUserInfo.Note;

        if (isSelectedCallOther) {
            cartmodel.Cart.IsCallOthers = isSelectedCallOther;
            cartmodel.Cart.OthersGenderCall = cartUserInfo.OthersGenderCall;
            if (helper.isEmptyOrNull(phoneOtherErrMessage) == false) {
                return phoneOtherErrMessage;
            }
            cartmodel.Cart.OthersPhone = cartUserInfo.OthersPhone;
            if (helper.isEmptyOrNull(cusNameOtherErrMessage) == false) {
                return cusNameOtherErrMessage;
            }
            cartmodel.Cart.OthersName = cartUserInfo.OthersName;
        } else {
            cartmodel.Cart.IsCallOthers = false;
            cartmodel.Cart.OthersGenderCall = -1;
            cartmodel.Cart.OthersPhone = '';
            cartmodel.Cart.OthersName = '';
        }

        if (helper.isEmptyOrNull(phoneErrMessage) == false) {
            return phoneErrMessage;
        }
        if (helper.isEmptyOrNull(cartUserInfo.CustomerPhone)) {
            handleErrorPhone(cartUserInfo.CustomerPhone);
            return CONST_STRINGERR.EMPTY_PHONE;
        }
        cartmodel.Cart.CustomerPhone = cartUserInfo.CustomerPhone;

        if (helper.isEmptyOrNull(cusNameErrMessage) == false) {
            return cusNameErrMessage;
        }
        if (helper.isEmptyOrNull(cartUserInfo.CustomerName)) {
            handleErrorCusName(cartUserInfo.CustomerName);
            return CONST_STRINGERR.EMPTY_CUSNAME;
        }
        cartmodel.Cart.CustomerName = cartUserInfo.CustomerName;
        if (provinceSelected <= 0) {
            return CONST_STRINGERR.ERR_PROVINCE;
        }
        cartmodel.Cart.ShipProvince = cartUserInfo.ShipProvince;
        if (districtSelected <= 0) {
            return CONST_STRINGERR.ERR_DISTRICT;
        }
        cartmodel.Cart.ShipDistrict = cartUserInfo.ShipDistrict;
        if (wardSelected <= 0) {
            return CONST_STRINGERR.ERR_WARD;
        }
        cartmodel.Cart.ShipWard = cartUserInfo.ShipWard;
        if (helper.isEmptyOrNull(cusAddressErrMessage) == false) {
            return cusAddressErrMessage;
        }
        if (helper.isEmptyOrNull(cartUserInfo.ShipAddress)) {
            handleErrorCusAddress(cartUserInfo.ShipAddress);
            return CONST_STRINGERR.EMPTY_SHIPADDRESS;
        }
        cartmodel.Cart.ShipAddress = cartUserInfo.ShipAddress;
        if (
            dateSelected == '' ||
            dateSelected == null ||
            dateSelected == '-1'
        ) {
            return 'Vui l??ng ch???n ng??y nh???n h??ng';
        }
        cartmodel.SelectedShipTimeList[0].DateSelected = dateSelected;
        cartmodel.SelectedShipTimeList[0].IsDateSelectedByCus = true;
        if (
            timeSelected == '' ||
            timeSelected == null ||
            timeSelected == '-1'
        ) {
            return 'Vui l??ng ch???n th???i gian nh???n h??ng';
        }
        //cartmodel.SelectedShipTimeList[0].TimeSelected = timeSelected;
        let errSelectTime = SelectTime(0, timeSelected);
        if (errSelectTime !== '') {
            return errSelectTime;
        }
        if (isSelectedXHD) {
            cartmodel.Cart.IsGetBill = isSelectedXHD;
            if (helper.isEmptyOrNull(companyName)) {
                return 'Vui l??ng nh???p t??n C??ng ty!';
            }
            cartmodel.Cart.CompanyName = companyName;
            if (helper.isEmptyOrNull(companyAddress)) {
                return 'Vui l??ng nh???p ?????a ch??? C??ng ty!';
            }
            cartmodel.Cart.CompanyAddress = companyAddress;
            if (helper.isEmptyOrNull(companyTax)) {
                return 'Vui l??ng nh???p M?? s??? thu???!';
            }
            cartmodel.Cart.CompanyTaxNumber = companyTax;
        } else {
            cartmodel.Cart.IsGetBill = false;
            cartmodel.Cart.CompanyName = '';
            cartmodel.Cart.CompanyAddress = '';
            cartmodel.Cart.CompanyTaxNumber = '';
        }
        return '';
    };

    const DeliveryType = {
        NORMAL_4_HOURS: 141,
        NORMAL: -1,
        FAST_2_HOURS: 261,
        ONLINE_FIVE_BILLION: 301
    };

    const SelectTime = (index, timevalue) => {
        //debugger;

        if (
            cartmodel == null ||
            cartmodel.ProfileItems.Count == 0 ||
            cartmodel.Cart === null
        )
            return 'Gi??? h??ng c???a b???n ???? h???t th???i gian hi???u l???c, m???i b???n ch???n l???i s???n ph???m';
        if (
            index >= cartmodel.SelectedShipTimeList.length ||
            helper.isEmptyOrNull(timevalue)
        ) {
            return 'Kh??ng th??? c???p nh???t gi??? giao h??ng, vui l??ng th??? l???i';
        }

        var deliveryTypeId = DeliveryType.NORMAL_4_HOURS;
        var timeselect = '';
        var isApartment = 1;
        //ki???m tra n???u value c?? g???n delivery th?? x??? l??
        if (timevalue.length > 3) {
            deliveryTypeId = parseInt(timevalue.substr(0, 3));
            if (deliveryTypeId <= 0)
                deliveryTypeId = parseInt(DeliveryType.NORMAL_4_HOURS);
            timeselect = timevalue.substr(3, 2);
            if (timevalue.Length > 5) {
                isApartment = parseInt(timevalue.substr(5, 1));
            }
        }

        cartmodel.Cart.DeliveryTypeId = deliveryTypeId;
        cartmodel.SelectedShipTimeList[index].TimeSelected = timeselect;
        cartmodel.SelectedShipTimeList[index].DeliveryTypeSelected =
            deliveryTypeId;
        cartmodel.SelectedShipTimeList[index].IsApartmentSelected = isApartment;
        if (isApartment == 0 && cartmodel.Cart.IsApartment) {
            return 'R???t ti???c, khung gi??? giao hi???n t???i, kh??ng ?????m b???o cho vi???c giao chung c??. Qu?? kh??ch vui l??ng B??? ch???n giao chung c?? ho???c Ch???n l???i khung gi??? kh??c';
        }
        return '';
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
            setphoneOtherErrMessage(CONST_STRINGERR.EMPTY_PHONE_OTHER);
        } else if (helper.isPhoneNumber(value) == false) {
            setphoneOtherErrMessage(CONST_STRINGERR.INVALID_PHONE_OTHER);
        } else setphoneOtherErrMessage('');
    };
    const handleErrorCusName = (value, maxlength = 50) => {
        if (helper.isEmptyOrNull(value)) {
            setcusNameErrMessage(CONST_STRINGERR.EMPTY_CUSNAME);
        } else if (value.length > maxlength) {
            setcusNameErrMessage(CONST_STRINGERR.OUTOFRANGE_CUSNAME);
        } else setcusNameErrMessage('');
    };
    const handleErrorCusNameOther = (value, maxlength = 50) => {
        if (helper.isEmptyOrNull(value)) {
            setcusNameOtherErrMessage(CONST_STRINGERR.EMPTY_CUSNAME_OTHER);
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

    const [isVisibleDatePicker, setisVisibleDatePicker] = useState(false);
    const [isVisibleTimePicker, setisVisibleTimePicker] = useState(false);
    useEffect(() => {}, isVisibleDatePicker);
    useEffect(() => {}, isVisibleTimePicker);

    const chosenDeliDate = () => {
        const isActive =
            shipdatetime !== undefined &&
            shipdatetime !== null &&
            shipdatetime[0]?.DateList !== null &&
            shipdatetime[0]?.DateList?.length > 0;
        const listDeliDate = [
            {
                label: 'Ng??y nh???n',
                value: '-1',
                selected:
                    dateSelected === null ||
                    dateSelected === '' ||
                    dateSelected == '-1',
                disabled: true
            }
        ];
        if (isActive) {
            shipdatetime[0]?.DateList.forEach((element) => {
                var temp =
                    '{"label":"' +
                    element.text +
                    '","value": "' +
                    element.timeid +
                    '"}';
                listDeliDate.push(JSON.parse(temp));
            });
        }
        return (
            <DropDownPicker2
                open={isVisibleDatePicker}
                value={dateSelectedValue}
                defaultValue={dateSelected}
                listMode="SCROLLVIEW"
                containerStyle={{
                    // width: '95%',
                    // marginHorizontal: 10,
                    zIndex: 50,
                    marginBottom: 10
                }}
                dropDownContainerStyle={{
                    borderColor: '#8F9BB3',
                    borderColor:
                        dateSelectedValue == '' ||
                        dateSelectedValue == null ||
                        dateSelectedValue == '-1'
                            ? '#ff001f'
                            : '#8F9BB3'
                }}
                labelStyle={{
                    color: isActive ? '#000' : '#8F9BB3'
                }}
                selectedItemLabelStyle={{
                    color: '#1B6EAA'
                }}
                listItemLabelStyle={{
                    fontSize: 12
                }}
                disabledItemLabelStyle={{
                    color: '#8F9BB3'
                }}
                items={listDeliDate}
                style={[
                    styles.borderRadius,
                    {
                        zIndex: 30,
                        borderColor:
                            dateSelectedValue == '' ||
                            dateSelectedValue == null ||
                            dateSelectedValue == '-1'
                                ? '#ff001f'
                                : '#8F9BB3'
                    }
                ]}
                setOpen={setisVisibleDatePicker}
                disabled={isActive == false}
                setValue={setdateSelectedValue}
                onOpen={() => {
                    setisVisibleDatePicker(true);
                    setisVisibleTimePicker(false);
                }}
                onClose={() => {
                    setisVisibleDatePicker(false);
                    setisVisibleTimePicker(false);
                }}
                onChangeValue={(value) => {
                    setdateSelectedValue(value);
                    if (shipdatetime != null) {
                        var temp = shipdatetime[0]?.DateList.find(
                            (x) => x.timeid == value
                        );
                        if (value == -1 || temp !== undefined) {
                            console.log(temp);

                            if (value !== '' && value !== '-1') {
                                if (temp !== undefined) {
                                    setdateSelected(temp.id);
                                    setcurDateDeli(temp);
                                    let getTimeFirst = temp?.TimeList?.find(
                                        (x) => x.disabled == false
                                    );
                                    if (
                                        getTimeFirst !== undefined &&
                                        getTimeFirst.id !== ''
                                    ) {
                                        settimeSelected(getTimeFirst.id);
                                    }
                                }
                            } else {
                                setcurDateDeli(null);
                                setdateSelected('-1');
                                settimeSelected('-1');
                            }
                            //controllerTime.reset();
                        }
                    }
                }}
            />
        );
    };

    const buildMessageDeliveryTime = (element) => {
        let statusDeli = element.deliverytext;
        if (helper.isEmptyOrNull(statusDeli)) {
            statusDeli = '';
        } else statusDeli = ' (' + statusDeli + ')';
        let typeDeli = '';
        if (element.deliverytypeid == 261) {
            typeDeli = ' (khung giao 2h)';
        } else if (element.deliverytypeid == 141) {
            typeDeli = ' (khung giao 4h)';
        }
        return statusDeli + typeDeli;
    };
    const chosenDeliTime = () => {
        const isActive = curDateDeli?.TimeList?.length > 0;
        const listDeliTime = [
            {
                label: 'Th???i gian nh???n',
                value: '-1',
                selected:
                    timeSelected == '' ||
                    timeSelected == null ||
                    timeSelected == '-1',
                disabled: true
            }
        ];
        if (isActive)
            curDateDeli?.TimeList.forEach((element) => {
                let statusTime = buildMessageDeliveryTime(element);
                var temp =
                    '{"label":"' +
                    element.timetext +
                    ' - Ph??: ' +
                    helper.formatMoney(element.shippingcost) +
                    statusTime +
                    '","value": "' +
                    element.id +
                    '","disabled": ' +
                    element.disabled +
                    ',"selected": ' +
                    (element.id == timeSelected) +
                    '}';
                listDeliTime.push(JSON.parse(temp));
            });
        return (
            <DropDownPicker2
                open={isVisibleTimePicker}
                value={timeSelected}
                defaultValue={timeSelected}
                items={listDeliTime}
                containerStyle={{
                    // width: '95%',
                    // marginHorizontal: 10,
                    zIndex: 40,
                    marginBottom: 10
                }}
                listMode="SCROLLVIEW"
                maxHeight={300}
                scrollViewProps={{
                    scrollEnabled: true
                }}
                showBadgeDot={true}
                listItemLabelStyle={{
                    fontSize: 12
                }}
                disabledItemLabelStyle={{
                    color: '#8F9BB3'
                }}
                dropDownContainerStyle={{
                    borderColor: '#8F9BB3',
                    borderColor:
                        timeSelected == '' ||
                        timeSelected == null ||
                        timeSelected == '-1'
                            ? '#ff001f'
                            : '#8F9BB3'
                }}
                dropDownDirection={'BOTTOM'}
                labelStyle={{
                    color:
                        helper.isEmptyOrNull(timeSelected) == false &&
                        timeSelected !== '-1'
                            ? '#000'
                            : '#8F9BB3'
                }}
                selectedItemLabelStyle={{
                    color: '#1B6EAA'
                }}
                style={[
                    styles.borderRadius,
                    {
                        zIndex: 20,
                        backgroundColor: '#fff',
                        fontSize: 13,
                        borderColor:
                            timeSelected == '' ||
                            timeSelected == null ||
                            timeSelected == '-1'
                                ? '#ff001f'
                                : '#8F9BB3'
                    }
                ]}
                setOpen={setisVisibleTimePicker}
                disabled={
                    isActive == false ||
                    dateSelectedValue == '' ||
                    dateSelectedValue == null ||
                    dateSelectedValue == '-1'
                }
                setValue={settimeSelected}
                onOpen={() => {
                    setisVisibleTimePicker(true);
                    setisVisibleDatePicker(false);
                }}
                onClose={() => {
                    setisVisibleTimePicker(false);
                    setisVisibleDatePicker(false);
                }}
                onChangeValue={(value) => {
                    settimeSelected(value);
                    console.log(
                        'timeSelected ' +
                            timeSelected +
                            'dateSelected ' +
                            dateSelected
                    );
                }}
            />
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
                                T??n C??ng Ty{' '}
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
                                ?????a ch??? c??ng Ty{' '}
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
                                M?? s??? thu???{' '}
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
                id: 0,
                value: false,
                name: 'Ch???',
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
            setCartUserInfo((previousState) => ({
                ...previousState,
                OthersGenderCall: item.id
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
                            fontSizeFocused: 10
                        }}
                        containerStyles={
                            helper.isEmptyOrNull(phoneOtherErrMessage) == false
                                ? styles.floatingBoxErrNoMargin
                                : styles.floatingBoxNoMargin
                        }
                        keyboardType="numeric"
                        label={<Text>S??? ??i???n tho???i (b???t bu???c)</Text>}
                        value={cartUserInfo?.OthersPhone}
                        onChangeText={(value) => {
                            setCartUserInfo((previousState) => ({
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
                        label={<Text>H??? v?? t??n (b???t bu???c)</Text>}
                        value={cartUserInfo?.OthersName}
                        onChangeText={(value) => {
                            setCartUserInfo((previousState) => ({
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

    const SexRadio = (props) => {
        const [sex, setSex] = useState([
            {
                id: 1,
                value: true,
                name: 'Anh',
                selected: props == -1 || props == 1 ? true : false
            },
            {
                id: 0,
                value: false,
                name: 'Ch???',
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
            setCartUserInfo((previousState) => ({
                ...previousState,
                CustomerGender: item.id
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

    const provincePicker = (provinceID) => {
        const lstProvinceData = [
            {
                label: 'T???nh th??nh',
                value: -1,
                selected: provinceSelected <= 0,
                disabled: true
            }
        ];
        if (lstProv !== null && lstProv.length > 0) {
            lstProv.forEach((element) => {
                var temp =
                    '{"label":"' +
                    element.ProvinceFullName +
                    '","value": ' +
                    element.ProvinceId +
                    '}';
                lstProvinceData.push(JSON.parse(temp));
            });
            console.log(lstProvinceData);
        }
        return (
            <DropDownPicker2
                value={provinceSelected}
                defaultValue={provinceSelected}
                listMode="SCROLLVIEW"
                containerStyle={{
                    width: 150,
                    marginBottom: 10
                }}
                dropDownContainerStyle={{
                    borderColor: provinceSelected <= 0 ? '#ff001f' : '#D6E0F5'
                }}
                listParentContainerStyle={{
                    zIndex: 99
                }}
                labelStyle={{
                    fontSize: 12,
                    color: provinceSelected > 0 ? '#000' : '#8F9BB3'
                }}
                selectedItemLabelStyle={{
                    color: '#1B6EAA'
                }}
                listItemLabelStyle={{
                    fontSize: 12
                }}
                disabledItemLabelStyle={{
                    color: '#8F9BB3'
                }}
                zIndex={30}
                items={lstProvinceData}
                style={[
                    styles.provBox,
                    {
                        height: 50,
                        color: '#000',
                        borderColor:
                            provinceSelected <= 0 ? '#ff001f' : '#D6E0F5'
                    }
                ]}
                disabled={false}
                setValue={setprovinceSelected}
                open={isVisibleProvincePicker}
                setOpen={setisVisibleProvincePicker}
                onChangeValue={(itemValue) => {
                    setprovinceSelected(itemValue);

                    // reset ward
                    setLstWard(null);
                    setwardSelected(-1);
                    setEnableWard(false);

                    //reset district
                    setEnableDis(false);
                    getLstDis(itemValue, true);
                    setdistrictSelected(-1);
                    setCartUserInfo((previousState) => ({
                        ...previousState,
                        ShipProvince: itemValue > 0 ? itemValue : 0
                    }));
                    getCart(itemValue);
                }}
            />
        );
    };
    const districtPicker = () => {
        const lstDistrictData = [
            {
                label: 'Qu???n huy???n',
                value: -1,
                selected: districtSelected <= 0,
                disabled: true
            }
        ];
        if (lstDis !== null && lstDis.length > 0) {
            lstDis.forEach((element) => {
                var temp =
                    '{"label":"' +
                    element.Item2 +
                    '","value": ' +
                    element.Item1 +
                    '}';
                lstDistrictData.push(JSON.parse(temp));
            });
            console.log(lstDistrictData);
        }
        return (
            <DropDownPicker2
                value={districtSelected}
                defaultValue={districtSelected}
                listMode="SCROLLVIEW"
                containerStyle={{
                    width: 150,
                    marginBottom: 10
                }}
                dropDownContainerStyle={{
                    borderColor: '#8F9BB3',
                    borderColor: districtSelected <= 0 ? '#ff001f' : '#D6E0F5'
                }}
                listParentContainerStyle={{
                    zIndex: 99
                }}
                labelProps={{
                    numberOfLines: 2
                }}
                labelStyle={{
                    fontSize: 12,
                    color:
                        districtSelected > 0 ||
                        (lstDis !== null && lstDis.length > 0)
                            ? '#000'
                            : '#8F9BB3'
                }}
                selectedItemLabelStyle={{
                    color: '#1B6EAA'
                }}
                listItemLabelStyle={{
                    fontSize: 12
                }}
                disabledItemLabelStyle={{
                    color: '#8F9BB3'
                }}
                zIndex={30}
                items={lstDistrictData}
                style={[
                    styles.disBox,
                    {
                        height: 50,
                        color: '#000',
                        borderColor:
                            districtSelected <= 0 ? '#ff001f' : '#D6E0F5'
                    }
                ]}
                disabled={false}
                setValue={setdistrictSelected}
                open={isVisibleDistrictPicker}
                setOpen={setisVisibleDistrictPicker}
                onChangeValue={(itemValue) => {
                    getLstWard(provinceSelected, itemValue, true);
                    setdistrictSelected(itemValue);
                    setCartUserInfo((previousState) => ({
                        ...previousState,
                        ShipDistrict: itemValue > 0 ? itemValue : 0
                    }));
                    getCart(provinceSelected, itemValue);
                }}
            />
        );
    };
    const wardPicker = () => {
        const lstWardData = [
            {
                label: 'Ph?????ng, x??',
                value: -1,
                selected: wardSelected <= 0,
                disabled: true
            }
        ];
        if (lstWard !== null && lstWard.length > 0) {
            lstWard.forEach((element) => {
                var temp =
                    '{"label":"' +
                    element.Item2 +
                    '","value": ' +
                    element.Item1 +
                    '}';
                lstWardData.push(JSON.parse(temp));
            });
            console.log(lstWardData);
        }
        return (
            <DropDownPicker2
                value={wardSelected}
                defaultValue={wardSelected}
                listMode="MODAL"
                containerStyle={{
                    width: '100%',
                    marginBottom: 10
                }}
                label="Ph?????ng, x??"
                dropDownContainerStyle={{
                    borderColor: '#8F9BB3',
                    borderColor: wardSelected <= 0 ? '#ff001f' : '#D6E0F5'
                }}
                dropDownDirection={'BOTTOM'}
                listParentContainerStyle={{
                    zIndex: 99
                }}
                labelStyle={{
                    fontSize: 12,
                    color:
                        wardSelected > 0 ||
                        (lstWard !== null && lstWard.length > 0)
                            ? '#000'
                            : '#8F9BB3'
                }}
                selectedItemLabelStyle={{
                    color: '#1B6EAA'
                }}
                listItemLabelStyle={{
                    fontSize: 12
                }}
                disabledItemLabelStyle={{
                    color: '#8F9BB3'
                }}
                zIndex={20}
                items={lstWardData}
                style={[
                    styles.wardBox,
                    {
                        height: 50,
                        color: '#000',
                        borderColor: wardSelected <= 0 ? '#ff001f' : '#D6E0F5'
                    }
                ]}
                disabled={enableWard == false}
                setValue={setwardSelected}
                open={isVisibleWardPicker}
                setOpen={setisVisibleWardPicker}
                onChangeValue={(itemValue) => {
                    setwardSelected(itemValue);
                    setCartUserInfo((previousState) => ({
                        ...previousState,
                        ShipWard: itemValue > 0 ? itemValue : 0
                    }));
                    getCart(provinceSelected, districtSelected, wardSelected);
                }}
            />
        );
    };
    const getLstProv = function () {
        apiBase(API_CONST.API_LOCATION_GETALLPROVINCE, METHOD.GET, {})
            .then((response) => {
                setLstProv(response.Value);
                if (location !== null && location.ProvinceId > 0) {
                    setprovinceSelected(location.ProvinceId);
                    getLstDis(location.ProvinceId);
                    setCartUserInfo((previousState) => ({
                        ...previousState,
                        ShipProvince: location.ProvinceId
                    }));
                }
                setEnableWard(false);
                setwardSelected(-1);
            })
            .catch((err) => {});
    };

    const getLstDis = (provinceId, onManualSelect = false) => {
        apiBase(
            API_CONST.API_LOCATION_GETDICTRICTBYPROVINCE,
            METHOD.GET,
            {},
            { params: { provinceId, clearcache: '' } }
        )
            .then((response) => {
                setLstDis(response.Value);
                setprovinceSelected(provinceId);
                setEnableDis(provinceId > 0);
                // if (provinceId > 0 && location?.DistrictId > 0 && !onManualSelect) {
                //     setdistrictSelected(location.DistrictId);
                //     getLstWard(provinceId, location.DistrictId);
                //     setCartUserInfo((previousState) => ({
                //         ...previousState,
                //         ShipDistrict: location.DistrictId
                //     }));
                // } else setEnableWard(false);
                setEnableWard(false);
                setwardSelected(-1);
            })
            .catch(() => {});
    };
    const getLstWard = (ProvinceId, DistrictId, onManualSelect = false) => {
        apiBase(
            API_CONST.API_LOCATION_GETWARDBYDICANDPROVINCE,
            METHOD.GET,
            {},
            { params: { ProvinceId, DistrictId, clearcache: 'empty' } }
        )
            .then((response) => {
                setLstWard(response.Value);
                setEnableWard(true);
                setwardSelected(-1);
                // if (location?.WardId > 0 && !onManualSelect) {
                //     setwardSelected(location?.WardId);
                //     setCartUserInfo((previousState) => ({
                //         ...previousState,
                //         ShipWard: location.WardId
                //     }));
                // }
            })
            .catch(() => {});
    };
    return (
        <View>
            <Header />
            <Modal
                visible={isLoading}
                transparent={true}
                index
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                animationType="fade"
                onRequestClose={() => {}}>
                <ActivityIndicator
                    style={{ marginTop: 150 }}
                    size="large"
                    color={Colors.GREEN_KEY}
                />
            </Modal>
            <ScrollView
                style={[
                    styles.container,
                    isLoading
                        ? {
                              width: windowWidth,
                              height: windowHeight,
                              backgroundColor: '#999',
                              opacity: 0.2
                          }
                        : ''
                ]}
                nestedScrollEnabled={false}>
                <TouchableOpacity
                    style={styles.backTop}
                    onPress={() => props.navigation.goBack()}>
                    <Image
                        style={styles.logoback}
                        source={require('../../../assets/images/icon-back.png')}
                    />
                    <Text onclick={() => {}} style={styles.backTop}>
                        {' '}
                        Xem l???i gi??? h??ng
                    </Text>
                </TouchableOpacity>
                {/* <TouchableOpacity>
                    <View style={styles.btnGetHistoryAddress}>
                        <Image
                            style={styles.logohome}
                            source={require('../../../assets/images/icon-home.png')}
                        />
                        <Text style={styles.textHistoryAddress}>
                            L???Y ?????A CH??? MUA H??NG TR?????C ????Y
                        </Text>
                    </View>
                </TouchableOpacity> */}
                <View style={styles.sectionInputTop}>
                    <Text style={styles.stepTitle}>1. Th??ng tin nh???n h??ng</Text>
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
                                S??? ??i???n tho???i{' '}
                                <Text style={{ color: '#ff001f' }}>*</Text>
                            </Text>
                        }
                        value={cartUserInfo?.CustomerPhone}
                        onChangeText={(value) => {
                            setCartUserInfo((previousState) => ({
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

                    {SexRadio(1)}

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
                                H??? v?? t??n{' '}
                                <Text style={{ color: '#ff001f' }}>*</Text>
                            </Text>
                        }
                        // staticLabel={helper.isEmptyOrNull(cartUserInfo?.CustomerPhone) == false}
                        value={cartUserInfo?.CustomerName}
                        onChangeText={(value) => {
                            setCartUserInfo((previousState) => ({
                                ...previousState,
                                CustomerName: value
                            }));
                            handleErrorCusName(value);
                        }}
                    />
                    {helper.isEmptyOrNull(cusNameErrMessage) == false && (
                        <Text style={styles.textErr}>{cusNameErrMessage}</Text>
                    )}

                    <View style={styles.provAndDic}>
                        {provincePicker(location?.provinceId)}
                        {/* {provinceSelected <= 0 && (
                            <Text style={[styles.textErr, styles.textErrAbs]}>
                                {CONST_STRINGERR.ERR_PROVINCE}
                            </Text>
                        )} */}

                        {districtPicker()}
                        {/* {districtSelected <= 0 && (
                            <Text style={[styles.textErr, styles.textErrAbs]}>
                                {CONST_STRINGERR.ERR_DISTRICT}
                            </Text>
                        )} */}
                    </View>

                    {wardPicker()}
                    {/* {wardSelected <= 0 && (
                        <Text style={[styles.textErr, styles.textErrAbs]}>
                            {CONST_STRINGERR.ERR_WARD}
                        </Text>
                    )} */}
                    <TextInput
                        style={[styles.inputBox, styles.marginTop]}
                        placeholder="S??? nh??, t??n ???????ng"
                        placeholderTextColor="#999"
                        value={cartUserInfo?.ShipAddress}
                        onChangeText={(value) => {
                            setCartUserInfo((previousState) => ({
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
                                tintColors={{
                                    true: '#008848',
                                    false: '#008848'
                                }}
                            />
                            <Text style={styles.label}>
                                Y??u c???u giao t???n c???a chung c??, v??n ph??ng
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
                                tintColors={{
                                    true: '#008848',
                                    false: '#008848'
                                }}
                                style={styles.checkbox}
                            />
                            <Text style={styles.label}>
                                G???i ng?????i kh??c nh???n h??ng (n???u c??)
                            </Text>
                        </View>
                        {boxCallOther()}
                    </View>
                </View>
                <View style={styles.blockPadding}></View>
                <View style={styles.sectionInput}>
                    <Text style={styles.stepTitle}>
                        2. Ch???n th???i gian nh???n h??ng
                    </Text>
                </View>

                <View
                    style={{
                        backgroundColor: '#fff',
                        zIndex: 30,
                        paddingHorizontal: 10
                    }}>
                    {chosenDeliDate()}
                    {chosenDeliTime()}
                </View>

                <View style={[styles.sectionInput, { zIndex: 10 }]}>
                    <Text
                        style={{
                            fontSize: 14,
                            fontWeight: 'bold',
                            marginVertical: 10
                        }}>
                        Mua th??m ????? mi???n ph?? giao v???i ????n tr??n 100.000?? (c??n 5
                        l???n)
                        <Text
                            style={{
                                fontSize: 14,
                                fontWeight: 'normal',
                                color: '#8F9BB3'
                            }}>
                            &nbsp;kh??ng t??nh h??ng n???ng, to: Bia, N?????c c??c lo???i
                        </Text>
                    </Text>
                </View>
                <View style={styles.blockPadding}></View>
                <View style={styles.sectionInput}>
                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            value={isSelectedXHD}
                            onValueChange={setSelectedXHD}
                            style={styles.checkbox}
                            tintColors={{ true: '#008848', false: '#008848' }}
                        />
                        <Text style={styles.label}>Xu???t h??a ????n c??ng ty</Text>
                    </View>
                    {boxXHD()}

                    <TextInput
                        style={styles.inputNote}
                        placeholder="Ghi ch?? th??m (n???u c??)"
                        numberOfLines={4}
                        multiline
                        editable
                        maxLength={150}
                        onChangeText={(value) => {
                            setCartUserInfo((previousState) => ({
                                ...previousState,
                                Note: value
                            }));
                        }}
                        placeholderTextColor="#999"
                    />
                </View>
                <View style={styles.blockPadding}></View>
                <View style={styles.sectionInput}>
                    <CartTotal cartInfo={cartTotal} />
                    <View style={styles.boxbtn}>
                        <View style={styles.btn}>
                            <TouchableOpacity onPress={() => {}}>
                                <Text style={styles.textbtn}>
                                    X??a h???t gi??? h??ng
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.btn}>
                            <TouchableOpacity
                                onPress={() => {
                                    props.navigation.navigate('UseVoucher');
                                }}>
                                <View>
                                    <Text style={styles.textbtn}>
                                        D??ng phi???u mua h??ng
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.btnbuy}>
                            <TouchableOpacity
                                onPress={() => {
                                    onSubmitForm();
                                }}>
                                <View>
                                    <Text style={styles.textbtnbuy}>
                                        Ho??n t???t mua
                                    </Text>
                                    <Text style={styles.textPriceTotal}>
                                        {cartTotal?.SumTotal > 0 &&
                                            helper.formatMoney(
                                                cartTotal.SumTotal
                                            )}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default UserInfoCart;
