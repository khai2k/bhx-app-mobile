import React, { useState, useEffect } from 'react';
import { Colors, Typography } from '@app/styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { translate } from '@app/translate';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import messaging from '@react-native-firebase/messaging';
import {
    Text,
    View,
    StyleSheet,
    Image,
    Alert,
    TouchableOpacity
} from 'react-native';

import * as locationCreator from '@app/redux/actions/generalAction';
// eslint-disable-next-line import/default
import locationAction from './Location/index.android';
import LocationModal from './Location/ModalLocation';
import RemiderLocation from './Location/RemiderLocation';

const Header = () => {
    locationAction.loadLocation();
    const navigation = useNavigation();
    const [isModalVisible, setIsModalVisible] = useState(false);

    const dispatch = useDispatch();
    const actionLocation = bindActionCreators(locationCreator, dispatch);

    const locationinfo = useSelector((state) => state.generalReducer.Location);
    const cartSimpleInfo = useSelector((state) => state.cartReducer.CartSimple);

    useEffect(async () => {
        const unsubscribe = messaging().onMessage(async (remoteMessage) => {
            console.log(remoteMessage);
            Alert.alert(
                remoteMessage.notification.title,
                remoteMessage.notification.body
            );
        });
        return unsubscribe;
    }, []);

    const [isShowReminder, setIsShowReminder] = useState(
        locationinfo?.IsReminderLocation
    );
    useEffect(() => {
        setIsShowReminder(locationinfo?.IsReminderLocation);
    }, [locationinfo?.IsReminderLocation]);

    const showModalLocationCallback = () => {
        setIsModalVisible(true);
        setIsShowReminder(false);
        actionLocation.showReminderLocation(false);
    };

    return (
        <SafeAreaView>
            <View style={styles.headerContainer}>
                <TouchableOpacity
                    style={styles.boxlogo}
                    onPress={() => navigation.navigate('NavMenu')}>
                    <Image
                        style={styles.logo}
                        source={require('../../assets/images/icon-menu.png')}
                    />
                </TouchableOpacity>

                <View style={styles.boxsearch}>
                    <TouchableOpacity
                        style={styles.input}
                        onPress={() => navigation.navigate('SuggestSearch')}>
                        <Text style={styles.inputText}>Bạn tìm gì</Text>
                    </TouchableOpacity>
                    <Image
                        style={styles.iconsearch}
                        source={require('../../assets/images/icon-search.png')}
                    />
                </View>
                <View style={styles.boxinfo}>
                    <TouchableOpacity
                        onPress={() => setIsModalVisible(true)}
                        style={styles.boxdelivery}>
                        <Text style={styles.textcolor}>
                            {translate('Header_DeliveryAddress')}
                        </Text>
                        <Text style={styles.textcolor} numberOfLines={1}>
                            {locationinfo?.LocationInfo.FullAddress}
                        </Text>
                    </TouchableOpacity>
                    <View style={styles.boxhistory}>
                        <Text style={styles.historyorder}>
                            {translate('Header_HistoryAccount')}
                        </Text>
                    </View>
                    <TouchableOpacity
                        style={styles.boxcart}
                        onPress={() => navigation.navigate('Cart')}>
                        <View style={styles.boxcartprice}>
                            <Text style={styles.textcolor}>
                                {translate('Header_Cart')}
                            </Text>
                            <Text style={styles.textcolor}>
                                {cartSimpleInfo?.TotalStr}
                            </Text>
                        </View>
                        <View style={styles.boxnumber}>
                            <Text style={styles.number}>
                                {cartSimpleInfo?.Item}
                            </Text>
                            <Image
                                style={styles.iconcart}
                                source={require('../../assets/images/icon-shopping-cart.png')}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            <LocationModal
                isModalVisible={isModalVisible}
                changeModalVisibleCallback={(isVisible) =>
                    setIsModalVisible(isVisible)
                }
            />
            <RemiderLocation
                isShowReminder={isShowReminder}
                showModalLocationCallback={showModalLocationCallback}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    boxcart: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '43%'
    },
    boxcartprice: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingRight: 2,
        width: '75%'
    },
    boxdelivery: {
        borderRightColor: Colors.BORDER,
        borderRightWidth: 1,
        fontSize: Typography.FONT_SIZE_12,
        justifyContent: 'center',
        marginLeft: 1,
        width: '27%'
    },
    boxhistory: {
        borderRightColor: Colors.BORDER,
        borderRightWidth: 1,
        justifyContent: 'center',
        width: '26%'
    },
    boxinfo: {
        flex: 9,
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        paddingTop: 5,
        paddingBottom: 5
    },
    boxlogo: {
        flex: 1,
        flexWrap: 'wrap',
        alignItems: 'center'
    },
    boxnumber: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        position: 'relative',
        width: '20%'
    },
    boxsearch: {
        flex: 4,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.WHITE,
        borderWidth: 0.5,
        borderColor: Colors.BLACK,
        fontSize: Typography.FONT_SIZE_10,
        borderRadius: 10,
        marginLeft: 5,
        marginRight: 5
    },
    headerContainer: {
        alignItems: 'center',
        backgroundColor: Colors.GREEN_KEY,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    historyorder: {
        color: Colors.WHITE,
        fontSize: Typography.FONT_SIZE_12,
        textAlign: 'center'
    },
    iconcart: {
        height: 20,
        resizeMode: 'stretch',
        width: 20
    },
    iconsearch: {
        alignItems: 'center',
        height: 12,
        margin: 5,
        padding: 5,
        resizeMode: 'stretch',
        width: 12
    },
    input: {
        paddingLeft: 5
    },
    // eslint-disable-next-line react-native/no-color-literals
    inputText: {
        color: '#757575',
        paddingVertical: 5
    },
    logo: {
        height: 40,
        marginLeft: 5,
        resizeMode: 'contain',
        width: '96%'
    },
    number: {
        backgroundColor: Colors.RED,
        borderRadius: 10,
        color: Colors.HEADER_CART,
        fontSize: Typography.FONT_SIZE_9,
        height: 15,
        paddingLeft: 4,
        paddingTop: 1,
        position: 'absolute',
        right: 0,
        top: '5%',
        width: 15,
        zIndex: 1
    },
    textcolor: {
        color: Colors.WHITE,
        fontSize: Typography.FONT_SIZE_12
    }
});

export default React.memo(Header);
