import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, AsyncStorage } from 'react-native';
import { bindActionCreators } from 'redux';
import { MyText } from '@app/components';
import { setI18nConfig } from '@app/translate';
import { apiBase, METHOD, API_CONST } from '@app/api';
import styles from './style';
import * as actionAuthenCreator from './action';

class Splash extends Component {
    constructor(props) {
        super(props);
        setI18nConfig();
        this.state = {};
    }

    async componentDidMount() {
        const { isShowSplash } = this.props;
        if (isShowSplash) {
            const delay = 1000 * 3;
            setTimeout(() => {
                this.props.actionAuthen.show_splash(false);
            }, delay);
        }

        // Call api lấy dữ liệu danh sách catemenu
        // Param để lấy danh sách cate
        const categoryId = 0;
        const provinceId = 3;
        const storeId = 6463;
        const isCheckOnSales = true;
        const phone = 0;
        const isMobile = true;
        const clearcache = '@ok';
        // Nếu local có dữ liệu thì ko call API
        const data = await getListCateLocalStorage();
        data.length === 0 &&
            apiBase(
                API_CONST.API_GET_CATEGORY_NAVIGATION,
                METHOD.GET,
                {},
                {
                    params: {
                        categoryId,
                        provinceId,
                        storeId,
                        isCheckOnSales,
                        phone,
                        isMobile,
                        clearcache
                    }
                }
            )
                .then((response) => {
                    // Parse dữ liệu để dùng cho sectionList
                    console.log('call api Slash');
                    const res = response.Value.reduce(
                        (accum, item) => [
                            ...accum,
                            {
                                ...item,
                                data:
                                    item.Childrens != null ? item.Childrens : []
                            }
                        ],
                        []
                    );
                    AsyncStorage.setItem('listCates', res);
                })
                .catch((error) => {
                    console.log(error);
                });
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
    console.log(state);
    console.log('mapStateToProps authenReducer');
    return {
        isShowSplash: state.authenReducer.isShowSplash
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actionAuthen: bindActionCreators(actionAuthenCreator, dispatch)
    };
};

// Lấy dữ liệu ở localStorage
const getListCateLocalStorage = async () => {
    const value = await AsyncStorage.getItem('listCates');
    return value ? JSON.parse(value) : [];
};

export default connect(mapStateToProps, mapDispatchToProps)(Splash);
