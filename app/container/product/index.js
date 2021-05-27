import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, ActivityIndicator } from 'react-native';
import { bindActionCreators } from 'redux';
import { apiBase, METHOD, API_CONST } from '@app/api';
import { Header } from '@app/components';
import * as homeCreator from './action';
import ListCategories from './ListCategories';
import SliderTitle from './SliderTitle';
import RenderLine from './RenderLine';
import styles from './style';

class Product extends Component {
    listTitle = [
        {
            titleId: 1,
            name: '5 lần free ship cho khách hàng mới'
        },
        {
            titleId: 2,
            name: 'THỊT, CÁ, TRỨNG, RAU CỦ'
        },
        {
            titleId: 3,
            name: 'Hơn 10k sản phẩm đang kinh doanh'
        }
    ];

    constructor(props) {
        super(props);
        this.state = {
            loadingLine: true, // Check xem còn line nào cần load ra nữa hay ko. dựa vô field IsNextGroup api trả ra
            pageIndexLine: 0,
            maxPageLine: 0, // Truyền vô hàm loadmore line, lấy từ hàm GetHomeData -> MaxPage
            homeData: [],
            listCategories: [],
            isLoading: true, // Check xem đang đợi gọi api hay ko, tránh bị loop,
            showLoading: true
        };
    }

    componentDidMount() {
        // Hàm gọi lấy 3 line đầu tiên
        const bodyApi = {
            provinceId: 3,
            storeId: 6463,
            userId: 0,
            phone: '',
            clearcache: 'null',
            IsMobile: true
        };
        const self = this;

        apiBase(API_CONST.GET_LIST_PRODUCT, METHOD.GET, {}, { params: bodyApi })
            .then((response) => {
                self.setState({
                    homeData: response.Value,
                    maxPageLine: response.OtherData?.MaxPage,
                    showLoading: false
                });
            })
            .catch((error) => {
                console.log(error);
            });

        // Lấy danh sách cate
        const queryCate = {
            phone: '',
            isMobile: true,
            storeId: 6463,
            clearcache: ''
        };
        apiBase(
            API_CONST.GET_LIST_CATEGORIES,
            METHOD.GET,
            {},
            { params: queryCate }
        )
            .then((response) => {
                console.log('GET_LIST_CATEGORIES Data:', response);
                self.setState({ listCategories: response.Value });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    handleScroll = () => {
        // Lúc scroll thì lấy tiếp các line sau
        if (this.state.loadingLine) {
            const self = this;
            const bodyApi = {
                phone: '',
                isMobile: true,
                storeId: 6463,
                pageIndex: self.state.pageIndexLine,
                pageSize: 3,
                provinceId: 3,
                maxPage: self.state.maxPageLine,
                clearcache: ''
            };
            if (self.state.isLoading) {
                self.setState({ isLoading: false, showLoading: true });
                apiBase(
                    API_CONST.GET_MORE_LINE,
                    METHOD.GET,
                    {},
                    { params: bodyApi }
                )
                    .then((response) => {
                        response !== null &&
                            response.Value !== null &&
                            self.setState({
                                homeData: [
                                    ...self.state.homeData,
                                    ...response.Value
                                ],
                                loadingLine: response.OtherData?.IsNextGroup,
                                pageIndexLine: self.state.pageIndexLine + 1,
                                isLoading: true,
                                showLoading: false
                            });
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        }
    };

    render() {
        return (
            <ScrollView style={styles.body} onScroll={this.handleScroll}>
                <Header navigation={this.props.navigation} />

                <ListCategories listCate={this.state.listCategories} />

                <SliderTitle listTitle={this.listTitle} />

                {/* Render line */}
                {this.state.homeData?.map((lineItem) => {
                    return (
                        <RenderLine lineItem={lineItem} action={this.props} />
                    );
                })}
                <ActivityIndicator
                    animating={this.state.showLoading}
                    size="large"
                    color="#008848"
                />
            </ScrollView>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        HomeReducer: state.homeReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actionHome: bindActionCreators(homeCreator, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
