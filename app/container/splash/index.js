import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Platform, PermissionsAndroid } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { bindActionCreators } from 'redux';
import { MyText } from '@app/components';
import { setI18nConfig } from '@app/translate';
import { CONST_STORAGE } from '@app/constants';
import messaging from '@react-native-firebase/messaging';
import { Storage } from '@app/common';
import * as cartCreator from '@app/redux/actions/cartAction';
import * as generalCreator from '@app/redux/actions/generalAction';
import { getUniqueId } from 'react-native-device-info';
import { apiBase, METHOD, API_CONST } from '@app/api';
//  import * as actionMenuCreator from '@app/redux/actions/generalAction';
import styles from './style';
import * as actionAuthenCreator from './action';
//  import * as actionMenuCreator from '../../components/NavMenu/action';

class Splash extends Component {
    constructor(props) {
        super(props);
        setI18nConfig();
        this.state = {
            IsLoadLocation: false
        };
    }

    getCurrentLocation = async () => {
        const _crrLocationString = await Storage.getItem(
            CONST_STORAGE.SESSION_LOCATION_CURRENT
        );

        const _crrLocation =
            _crrLocationString !== '' ? JSON.parse(_crrLocationString) : null;

        if (_crrLocation === null) {
            const hasLocationPermission = await PermissionsAndroid.check(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            );

            if (hasLocationPermission) {
                Geolocation.getCurrentPosition(
                    (position) => {
                        const crrLat = position.coords.latitude;
                        const crrLong = position.coords.longitude;
                        this.props.actionGeneral
                            .location_getCurrent(crrLat, crrLong)
                            .then((res) => {
                                this.setState({ IsLoadLocation: true });
                            });
                    },
                    (error) => {
                        console.log(error);
                    },
                    {
                        enableHighAccuracy: true,
                        timeout: 15000,
                        maximumAge: 10000
                    }
                );
            } else {
                this.props.actionGeneral
                    .location_getCurrent(0, 0)
                    .then((res) => {
                        this.setState({ IsLoadLocation: true });
                    });
            }
        } else {
            this.props.actionGeneral.location_SaveChooseLocation(_crrLocation);
            this.setState({ IsLoadLocation: true });
        }
    };

    notificationSubscriber = () => {
        messaging()
            .getToken()
            .then((token) => {
                const deviceid = getUniqueId();
                const deviceType = Platform.OS;
                const bodyApi = {
                    token: '',
                    us: '',
                    data: {
                        deviceid,
                        token,
                        deviceType
                    }
                };
                apiBase(
                    API_CONST.API_NOTIFICATION_SUBSCRIBER,
                    METHOD.POST,
                    bodyApi
                )
                    .then((response) => {
                        console.log(
                            'API_NOTIFICATION_SUBSCRIBER Data:',
                            response
                        );
                    })
                    .catch((error) => {
                        console.log('API_NOTIFICATION_SUBSCRIBER', error);
                    });

                Storage.setItem(
                    CONST_STORAGE.SESSION_TOKEN_NOTIFICATION,
                    token
                );
            });
    };

    componentDidUpdate() {
        if (this.state.IsLoadLocation) {
            this.props.actionGeneral.menu_get();
            this.props.actionCart.cart_get_simple();
        }
    }

    componentDidMount() {
        this.getCurrentLocation();
        this.notificationSubscriber();
        Storage.getItem(CONST_STORAGE.CARTID).then((res) => {
            console.log('CONST_STORAGE.CARTID', res);
            this.props.actionGeneral.setCartId(res);
        });
        const { isShowSplash } = this.props;
        if (isShowSplash) {
            const delay = 1000 * 6;
            setTimeout(() => {
                this.props.actionAuthen.show_splash(false);
            }, delay);
        }
    }

    render() {
        return (
            <View style={styles.conainer}>
                <MyText text="SPLASH" addSize={10} />
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isShowSplash: state.authenReducer.isShowSplash
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actionAuthen: bindActionCreators(actionAuthenCreator, dispatch),
        actionCart: bindActionCreators(cartCreator, dispatch),
        actionGeneral: bindActionCreators(generalCreator, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Splash);
