import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Platform } from 'react-native';
import { bindActionCreators } from 'redux';
import { MyText } from '@app/components';
import { setI18nConfig } from '@app/translate';
import { CONST_STORAGE } from '@app/constants';
import messaging from '@react-native-firebase/messaging';
import { Storage } from '@app/common';
import * as cartCreator from '@app/redux/actions/cartAction';
import { getUniqueId } from 'react-native-device-info';
import { apiBase, METHOD, API_CONST } from '@app/api';
//  import * as actionMenuCreator from '@app/redux/actions/generalAction';
import styles from './style';
import * as actionAuthenCreator from './action';
import * as actionMenuCreator from '../../components/NavMenu/action';

class Splash extends Component {
    constructor(props) {
        super(props);
        setI18nConfig();
        this.state = {};
    }

    componentDidMount() {
        // Lấy dữ liệu menu
        this.props.actionGetMenu.menu_get();
        this.props.actionCart.cart_get_simple();
        const { isShowSplash } = this.props;
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
                return saveTokenToDatabase(token);
            });

        if (isShowSplash) {
            const delay = 1000 * 5;
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

const saveTokenToDatabase = (token) => {
    Storage.setItem(CONST_STORAGE.SESSION_TOKEN_NOTIFICATION, token);
};

const mapStateToProps = (state) => {
    return {
        isShowSplash: state.authenReducer.isShowSplash
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actionAuthen: bindActionCreators(actionAuthenCreator, dispatch),
        actionGetMenu: bindActionCreators(actionMenuCreator, dispatch),
        actionCart: bindActionCreators(cartCreator, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Splash);
