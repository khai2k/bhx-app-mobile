import React, { createRef, PureComponent } from 'react';
import { connect } from 'react-redux';
import {
    View,
    ActivityIndicator,
    ScrollView,
    SafeAreaView,
    FlatList
} from 'react-native';
import { bindActionCreators } from 'redux';
import { Header, LoadingCart } from '@app/components';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import * as homeCreator from '@app/redux/actions/homeAction';
import ListCategories from './ListCategories';
import ListLineTitle from './ListLineTitle';
import RenderLine from './RenderLine';
import styles from './style';

class Product extends PureComponent {
    scrollList = createRef();

    constructor(props) {
        super(props);
        this.state = {
            isLoadingAPI: false,
            firstLoading: true,
            cateIndexSelected: 0,
            isShowCatelines: false
        };
    }

    async componentDidMount() {
        // Lấy danh sách cate
        this.props.actionHome.getListCategories();
        // lấy danh sách tên cate line
        this.props.actionHome.getCateLines();
        // Hàm gọi lấy 3 line đầu tiên
        await this.props.actionHome.getHomeData();
        this.setState({ firstLoading: false });
    }

    handleScroll = (event) => {
        const scrollY = event.nativeEvent.contentOffset.y;
        // Show list cate thường mua khi scroll top
        if (scrollY === 0) {
            this.setState({ isShowCatelines: false });
        } else if (!this.state.isShowCatelines) {
            this.setState({ isShowCatelines: true });
        }

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
        this.scrollList.current.scrollToIndex({
            animated: true,
            index: lineIndex
        });
        this.setState({ cateIndexSelected: lineIndex });
    };

    onViewableItemsChanged = ({ viewableItems, changed }) => {
        this.setState({
            cateIndexSelected: viewableItems[0].index
        });
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
                    {!this.state.isShowCatelines && (
                        <ListCategories
                            listCate={this.props.homeData.ListCategories}
                        />
                    )}
                    {this.state.isShowCatelines && (
                        <ListLineTitle
                            listCate={this.props.homeData.CateLines}
                            scrollToLine={this.scrollToLine}
                            selectedIndex={this.state.cateIndexSelected}
                        />
                    )}
                    <FlatList
                        ref={this.scrollList}
                        style={styles.body}
                        onScroll={this.handleScroll}
                        data={this.props.homeData.ListLineProducts}
                        keyExtractor={(item) => item.CategoryId}
                        onViewableItemsChanged={this.onViewableItemsChanged}
                        renderItem={({ item, index }) => (
                            <RenderLine
                                key={`line_${item.CategoryId}`}
                                lineItem={item}
                                action={this.props}
                            />
                        )}>
                        <ActivityIndicator
                            animating={this.state.showLoading}
                            size="large"
                            color="#008848"
                        />
                    </FlatList>
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
