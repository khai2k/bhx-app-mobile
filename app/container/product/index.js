import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native';
import { bindActionCreators } from 'redux';
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
            // loadingLine: true
        };
    }

    componentDidMount() {
        this.props.actionHome.get_listproducts();
        this.props.actionHome.get_listcategories();
    }

    handleScroll = (event) => {
        const positionX = event.nativeEvent.contentOffset.x;
        const positionY = event.nativeEvent.contentOffset.y;
        console.log('X: ', positionX);
        console.log('Y: ', positionY);
        console.log('--------------');
    };

    render() {
        return (
            <ScrollView style={styles.body}>
                <Header navigation={this.props.navigation} />

                <ListCategories
                    listCate={this.props.HomeReducer?.ListCategories}
                />
                <SliderTitle listTitle={this.listTitle} />

                {/* Render line */}
                {this.props.HomeReducer.HomeData?.map((lineItem) => {
                    return (
                        <RenderLine lineItem={lineItem} action={this.props} />
                    );
                })}
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
