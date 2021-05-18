import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { Header } from '@app/components';
import * as homeCreator from './action';
// import ProductBox from '../../components/ProductBox/ProductBox';
// import ProductExpiredBox from '../../components/ProductBox/ProductExpiredBox';
// import ComboProductBox from '../../components/ProductBox/ComboProductBox';

import ListCategories from './ListCategories';
import SliderTitle from './SliderTitle';

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.actionHome.get_listproducts();
    }

    render() {
        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation} />
                {/* <ListCategories />
                <SliderTitle />
                <View>
                    {this.props.HomeReducer.ListProducts.map((product) => {
                        return <ProductBox bhxProduct={product} />;
                    })}
                </View> */}

                {/* <View style={styles.productList}>
                    {this.state.listProducts.map((product) => {
                        return <ProductBox bhxProduct={product} />;
                    })}
                    {this.state.listProducts.map((product) => {
                        return <ProductExpiredBox bhxProduct={product} />;
                    })}
                    {this.state.listProducts.map((product) => {
                        return <ComboProductBox bhxProduct={product} />;
                    })}
                </View> */}
            </View>
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
