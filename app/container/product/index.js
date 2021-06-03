import React, { createRef, PureComponent } from 'react';
import { connect } from 'react-redux';
import {
    View,
    ActivityIndicator,
    ScrollView,
    SafeAreaView
} from 'react-native';
import { bindActionCreators } from 'redux';
import { Header, LoadingCart } from '@app/components';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import * as homeCreator from '@app/redux/actions/homeAction';
import ListCategories from './ListCategories';
import SliderTitle from './SliderTitle';
import RenderLine from './RenderLine';
import styles from './style';

class Product extends PureComponent {
    ref = createRef();

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
            isLoadingAPI: false,
            firstLoading: true,
            lineLocations: [],
            cateIndexSelected: 0
        };
    }

    async componentDidMount() {
        // Hàm gọi lấy 3 line đầu tiên
        await this.props.actionHome.getHomeData();
        // Lấy danh sách cate
        await this.props.actionHome.getListCategories();
        this.setState({ firstLoading: false });
    }

    handleScroll = () => {
        // Lúc scroll thì lấy tiếp các line sau
        if (this.props.homeData.IsNextGroup && !this.state.isLoadingAPI) {
            this.setState({
                isLoadingAPI: true
            });
            this.props.actionHome
                .loadMoreHomeData(this.props.homeData.PageIndexLine)
                .then((response) => {
                    this.setState({
                        isLoadingAPI: false
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    scrollToLine = (lineIndex) => {
        this.ref.scrollTo({
            x: 0,
            y: this.state.lineLocations[lineIndex],
            animated: true
        });
        this.setState({ cateIndexSelected: lineIndex });
    };

    render() {
        if (this.state.firstLoading) {
            return (
                <View
                    style={{
                        backgroundColor: Colors.WHITE
                    }}>
                    <Header navigation={this.props.navigation} />
                    <LoadingCart />
                    <LoadingCart />
                    <LoadingCart />
                    <LoadingCart />
                </View>
            );
        } else {
            return (
                <SafeAreaView>
                    <Header navigation={this.props.navigation} />
                    <ListCategories
                        listCate={this.props.homeData.ListCategories}
                        scrollToLine={this.scrollToLine}
                        selectedIndex={this.state.cateIndexSelected}
                    />
                    <ScrollView
                        ref={(scroll) => {
                            this.ref = scroll;
                        }}
                        style={styles.body}
                        onScroll={this.handleScroll}>
                        <SliderTitle listTitle={this.listTitle} />

                        {/* Render line */}
                        {this.props.homeData.ListLineProducts?.map(
                            (lineItem) => {
                                return (
                                    <View
                                        onLayout={(event) => {
                                            const { layout } =
                                                event.nativeEvent;
                                            this.setState({
                                                lineLocations: [
                                                    ...this.state.lineLocations,
                                                    layout.y
                                                ]
                                            });
                                        }}>
                                        <RenderLine
                                            key={`line_${lineItem.CategoryId}`}
                                            lineItem={lineItem}
                                            action={this.props}
                                        />
                                    </View>
                                );
                            }
                        )}
                        <ActivityIndicator
                            animating={this.state.showLoading}
                            size="large"
                            color="#008848"
                        />
                    </ScrollView>
                </SafeAreaView>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {
        homeData: state.homeReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actionHome: bindActionCreators(homeCreator, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
