/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/sort-styles */
import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
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

const ModalLocation = (props) => {
    useEffect(() => {
        changeStep(1);
    }, []);

    // Init
    const refSlider = useRef(null);
    const windowWidth = Math.round(Dimensions.get('window').width);

    // Redux
    const locationinfo = useSelector((state) => state.locationReducer);

    // State
    const [txtTitleChoose, settxtTitleChoose] = useState(
        'Chọn tỉnh, thành phố'
    );
    const [step, setStep] = useState(1);
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
                console.log(response.Value);
            })
            .catch((err) => {
                setIsLoadingProvince(false);
                console.log(err);
            });
    };

    const location_getDistrictByProince = (provinceId) => {
        apiBase(
            API_CONST.API_LOCATION_GETDICTRICTBYPROVINCE,
            METHOD.GET,
            {},
            { params: { provinceId, clearcache: '' } }
        )
            .then((response) => {
                setIsLoadingDic(false);
                setLstDistrict(response.Value);
            })
            .catch(() => {
                setIsLoadingDic(false);
            });
    };

    const location_getWardByDictrictId = (disId) => {
        apiBase(
            API_CONST.API_LOCATION_GETDICTRICTBYPROVINCE,
            METHOD.GET,
            {},
            { params: { disId, clearcache: '' } }
        )
            .then((response) => {
                setIsLoadingWard(false);
                setLstWard(response.Value);
            })
            .catch(() => {
                setIsLoadingWard(false);
            });
    };

    const changeStep = (_step, locatonid?) => {
        setStep(_step);

        refSlider?.current?.scrollTo({
            x: (_step - 1) * windowWidth,
            y: 0,
            animated: true
        });

        if (_step === 1) {
            settxtTitleChoose('Chọn tỉnh, thành phố');
            if (lstProvince === null) {
                location_getAllProvince();
            } else {
                setIsLoadingProvince(false);
            }
        } else if (_step === 2) {
            setIsLoadingDic(true);
            settxtTitleChoose('Chọn quận, huyện');
            location_getDistrictByProince(locatonid);
        } else if (_step === 3) {
            setIsLoadingWard(true);
            settxtTitleChoose('Chọn phường, xã');
            location_getWardByDictrictId(locatonid);
        }
    };

    // Callback
    const changeModalVisibleCallback = (isVisible) => {
        props.changeModalVisibleCallback(isVisible);
    };

    return (
        <Modal
            visible={props.isModalVisible}
            animationType="slide"
            onRequestClose={() => changeModalVisibleCallback(false)}>
            <View>
                <Text style={styles.titleModal}>
                    Khu vực đã chọn: {locationinfo?.crrLocationRs.FullAddress}
                </Text>
                <View style={styles.chooseProvince}>
                    {step > 1 && (
                        <TouchableOpacity onPress={() => changeStep(step - 1)}>
                            <Icon name="chevron-left" size={20} color="#fff" />
                        </TouchableOpacity>
                    )}
                    <Text style={styles.chooseProvince_Text}>
                        {txtTitleChoose}
                    </Text>
                    <TouchableOpacity
                        style={styles.chooseProvince_Button}
                        onPress={() => changeModalVisibleCallback(false)}>
                        <Icon name="times" size={12} color="#fff" />
                    </TouchableOpacity>
                </View>
                <View>
                    <ScrollView
                        ref={refSlider}
                        scrollEnabled={false}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
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
                                        keyExtractor={(item) => item.ProvinceId}
                                        renderItem={({ item }) => (
                                            <TouchableOpacity
                                                style={
                                                    styles.chooseProvince_Item
                                                }
                                                onPress={() => {
                                                    changeStep(
                                                        2,
                                                        item.ProvinceId
                                                    );
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
                                        keyExtractor={(item) => item.Item1}
                                        renderItem={({ item }) => (
                                            <TouchableOpacity
                                                style={
                                                    styles.chooseProvince_Item
                                                }
                                                onPress={() => {
                                                    changeStep(
                                                        3,
                                                        item.DictrictId
                                                    );
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
                                        keyExtractor={(item) => item.Item1}
                                        renderItem={({ item }) => (
                                            <TouchableOpacity
                                                style={
                                                    styles.chooseProvince_Item
                                                }
                                                onPress={() => {}}>
                                                <Text>{item.Item2}</Text>
                                            </TouchableOpacity>
                                        )}
                                    />
                                )}
                        </View>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    chooseProvince: {
        backgroundColor: Colors.GREEN_KEY,
        padding: 15,
        flexDirection: 'row'
    },
    chooseProvince_Text: {
        color: 'white',
        flex: 1,
        textAlign: 'center'
    },
    chooseProvince_Button: {
        width: 22,
        height: 22,
        backgroundColor: '#b3d6c6',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 22
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
