/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/sort-styles */
import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Modal,
    ActivityIndicator,
    FlatList,
    ScrollView,
    Dimensions
} from 'react-native';
import { Colors } from '@app/styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { apiBase, METHOD, API_CONST } from '@app/api';
import { SafeAreaView } from 'react-native-safe-area-context';
import { location_SaveChooseLocation } from './action';

const ModalLocation = (props) => {
    useEffect(() => {
        changeStep(0);
    }, []);

    const dispatch = useDispatch();
    const dispatchlocation_SaveChooseLocation = (model) =>
        dispatch(location_SaveChooseLocation(model));

    // Init
    const refSlider = useRef(null);
    const windowWidth = Math.round(Dimensions.get('window').width);

    // Redux
    const locationinfo = useSelector((state) => state.locationReducer);

    // State
    const [txtTitleChoose, settxtTitleChoose] = useState(
        'Chọn tỉnh, thành phố'
    );
    const [step, setStep] = useState(0);
    const [textAt, settextAt] = useState('');

    const [chooseProvinceId, setchooseProvinceId] = useState(0);
    const [chooseProvinceFullName, setchooseProvinceFullName] = useState('');
    const [chooseProvinceShortName, setchooseProvinceShortName] = useState('');

    const [chooseDistrictId, setchooseDistrictId] = useState(0);
    const [chooseDistrictName, setchooseDistrictName] = useState('');

    // eslint-disable-next-line no-unused-vars
    const [chooseWardId, setchooseWardId] = useState(0);
    // eslint-disable-next-line no-unused-vars
    const [chooseWardName, setchooseWardName] = useState('');

    const [lstProvince, setLstProvince] = useState(null);
    const [lstDistrict, setLstDistrict] = useState(null);
    const [lstWard, setLstWard] = useState(null);

    const [isLoadingProvince, setIsLoadingProvince] = useState(false);
    const [isLoadingDic, setIsLoadingDic] = useState(false);
    const [isLoadingWard, setIsLoadingWard] = useState(false);

    // Function
    const location_getAllProvince = function () {
        apiBase(API_CONST.API_LOCATION_GETALLPROVINCE, METHOD.GET, {})
            .then((response) => {
                setLstProvince(response.Value);
                setIsLoadingProvince(false);
            })
            .catch((err) => {
                setIsLoadingProvince(false);
                console.log(err);
            });
    };

    const location_getDistrictByProince = (ProvinceId) => {
        apiBase(
            API_CONST.API_LOCATION_GETDICTRICTBYPROVINCE,
            METHOD.GET,
            {},
            { params: { ProvinceId, clearcache: 'empty' } }
        )
            .then((response) => {
                setIsLoadingDic(false);
                setLstDistrict(response.Value);
            })
            .catch(() => {
                setIsLoadingDic(false);
            });
    };

    const location_getWardByDistrictId = (ProvinceId, DistrictId) => {
        apiBase(
            API_CONST.API_LOCATION_GETWARDBYDICANDPROVINCE,
            METHOD.GET,
            {},
            { params: { ProvinceId, DistrictId, clearcache: 'empty' } }
        )
            .then((response) => {
                setIsLoadingWard(false);
                setLstWard(response.Value);
            })
            .catch(() => {
                setIsLoadingWard(false);
            });
    };

    const SliderGotTo = (_step) => {
        setStep(_step);
        refSlider?.current?.scrollTo({
            x: _step * windowWidth,
            y: 0,
            animated: true
        });
        if (_step === 0) {
            settextAt('');
            settxtTitleChoose('Chọn tỉnh, thành phố');
        } else if (_step === 1) {
            settxtTitleChoose('Chọn quận, huyện');
        } else if (_step === 2) {
            settxtTitleChoose('Chọn phường, xã');
        }
    };

    const changeStep = (_step, objLocation) => {
        SliderGotTo(_step);
        if (_step === 0) {
            if (lstProvince === null) {
                location_getAllProvince();
            } else {
                setIsLoadingProvince(false);
            }
        } else if (_step === 1) {
            setIsLoadingDic(true);
            settextAt(`${objLocation.ProvinceShortName}`);
            location_getDistrictByProince(objLocation.ProvinceId);
        } else if (_step === 2) {
            setIsLoadingWard(true);
            settextAt(
                `${objLocation.DistrictName}, ${chooseProvinceShortName}`
            );
            location_getWardByDistrictId(
                chooseProvinceId,
                objLocation.DistrictId
            );
        } else if (_step === 3) {
            const tmpMdLocal = {
                ProvinceId: chooseProvinceId,
                ProvinceFullName: chooseProvinceFullName,
                ProvinceShortName: chooseProvinceShortName,

                DistrictId: chooseDistrictId,
                DistrictName: chooseDistrictName,

                WardId: objLocation.WardId,
                WardName: objLocation.WardName,

                FullAddress: `${objLocation.WardName}, ${chooseDistrictName}, ${chooseProvinceFullName}`
            };
            dispatchlocation_SaveChooseLocation(tmpMdLocal);
            changeModalVisibleCallback(false);
        }
    };

    const checkbackorclose = () => {
        if (step > 0) {
            SliderGotTo(step - 1);
        } else {
            changeModalVisibleCallback(false);
        }
    };

    // Callback
    const changeModalVisibleCallback = (isVisible) => {
        settextAt('');
        SliderGotTo(0);
        props.changeModalVisibleCallback(isVisible);
    };

    return (
        <Modal
            visible={props.isModalVisible}
            index
            animationType="slide"
            onRequestClose={() => {
                checkbackorclose();
            }}>
            <SafeAreaView>
                <Text style={styles.titleModal}>
                    Khu vực đã chọn: {locationinfo?.crrLocationRs.FullAddress}
                </Text>
                <View style={styles.chooseProvince}>
                    {step > 0 && (
                        <TouchableOpacity
                            style={{ paddingHorizontal: 10 }}
                            onPress={() => {
                                SliderGotTo(step - 1);
                            }}>
                            <Icon name="chevron-left" size={20} color="#fff" />
                        </TouchableOpacity>
                    )}
                    <View style={styles.chooseProvince_Gr}>
                        <Text style={styles.chooseProvince_Text}>
                            {txtTitleChoose}
                        </Text>
                        {textAt !== '' && (
                            <Text
                                style={
                                    styles.chooseProvince_Text
                                }>{`Tại ${textAt}`}</Text>
                        )}
                    </View>
                    <TouchableOpacity
                        style={styles.chooseProvince_Button}
                        onPress={() => changeModalVisibleCallback(false)}>
                        <Icon name="times" size={12} color="#fff" />
                    </TouchableOpacity>
                </View>
                <View>
                    <ScrollView
                        ref={refSlider}
                        horizontal
                        pagingEnabled
                        style={{
                            paddingBottom: 170
                        }}
                        showsHorizontalScrollIndicator={false}
                        scrollEnabled={false}
                        nestedScrollEnabled={false}>
                        <View style={{ width: windowWidth }}>
                            {isLoadingProvince && (
                                <ActivityIndicator
                                    style={{ marginTop: 20 }}
                                    size="large"
                                    color={Colors.GREEN_KEY}
                                />
                            )}
                            {!isLoadingProvince &&
                                lstProvince !== null &&
                                lstProvince.length && (
                                    <FlatList
                                        data={lstProvince}
                                        keyExtractor={(index) => {
                                            `prov_${index}`;
                                        }}
                                        renderItem={({ item }) => (
                                            <TouchableOpacity
                                                style={
                                                    styles.chooseProvince_Item
                                                }
                                                onPress={() => {
                                                    setchooseProvinceId(
                                                        item.ProvinceId
                                                    );
                                                    setchooseProvinceFullName(
                                                        item.ProvinceFullName
                                                    );
                                                    setchooseProvinceShortName(
                                                        item.ProvinceShortName
                                                    );
                                                    changeStep(1, {
                                                        ProvinceId:
                                                            item.ProvinceId,
                                                        ProvinceShortName:
                                                            item.ProvinceShortName,
                                                        DistrictId: 0,
                                                        WardId: 0
                                                    });
                                                }}>
                                                <Text>
                                                    {item.ProvinceFullName}
                                                </Text>
                                            </TouchableOpacity>
                                        )}
                                    />
                                )}
                        </View>
                        <View style={{ width: windowWidth }}>
                            {isLoadingDic && (
                                <ActivityIndicator
                                    style={{ marginTop: 20 }}
                                    size="large"
                                    color={Colors.GREEN_KEY}
                                />
                            )}
                            {!isLoadingDic &&
                                lstDistrict !== null &&
                                lstDistrict.length > 0 && (
                                    <FlatList
                                        data={lstDistrict}
                                        keyExtractor={(index) => {
                                            `dic_${index}`;
                                        }}
                                        renderItem={({ item }) => (
                                            <TouchableOpacity
                                                style={
                                                    styles.chooseProvince_Item
                                                }
                                                onPress={() => {
                                                    setchooseDistrictId(
                                                        item.Item1
                                                    );
                                                    setchooseDistrictName(
                                                        item.Item2
                                                    );
                                                    changeStep(2, {
                                                        ProvinceId: 0,
                                                        DistrictId: item.Item1,
                                                        DistrictName:
                                                            item.Item2,
                                                        WardId: 0
                                                    });
                                                }}>
                                                <Text>{item.Item2}</Text>
                                            </TouchableOpacity>
                                        )}
                                    />
                                )}
                        </View>
                        <View style={{ width: windowWidth }}>
                            {isLoadingWard && (
                                <ActivityIndicator
                                    style={{ marginTop: 20 }}
                                    size="large"
                                    color={Colors.GREEN_KEY}
                                />
                            )}
                            {!isLoadingWard &&
                                lstWard !== null &&
                                lstWard.length > 0 && (
                                    <FlatList
                                        data={lstWard}
                                        keyExtractor={(index) => {
                                            `ward_${index}`;
                                        }}
                                        renderItem={({ item }) => (
                                            <TouchableOpacity
                                                style={
                                                    styles.chooseProvince_Item
                                                }
                                                onPress={() => {
                                                    setchooseWardId(item.Item1);
                                                    setchooseWardName(
                                                        item.Item2
                                                    );
                                                    changeStep(3, {
                                                        ProvinceId: 0,
                                                        DistrictId: 0,
                                                        WardId: item.Item1,
                                                        WardName: item.Item2
                                                    });
                                                }}>
                                                <Text>{item.Item2}</Text>
                                            </TouchableOpacity>
                                        )}
                                    />
                                )}
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    chooseProvince: {
        backgroundColor: Colors.GREEN_KEY,
        height: 60,
        flexDirection: 'row',
        alignItems: 'center'
    },
    chooseProvince_Gr: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    chooseProvince_Text: {
        color: 'white',
        textAlign: 'center'
    },
    chooseProvince_Button: {
        width: 22,
        height: 22,
        backgroundColor: '#b3d6c6',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 22,
        marginRight: 10
    },
    titleModal: {
        backgroundColor: Colors.GREEN_KEY,
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        color: 'white',
        fontSize: 12,
        padding: 9
    },
    chooseProvince_Item: {
        paddingHorizontal: 10,
        paddingVertical: 17,
        borderBottomColor: Colors.CATSKILL_WHITE,
        borderBottomWidth: 1
    }
});

export default ModalLocation;
