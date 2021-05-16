import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-native';
import { bindActionCreators } from 'redux';
import { Header } from '@app/components';
import Filter from './Filter';
import Product from './Product';
import * as categoryCreator from './action';

class Group extends Component {
    componentDidMount() {
        this.props.actionCategory.category_get();
    }

    render() {
        return (
            <SafeAreaView>
                <Header />
                <Filter
                    brands={this.props.categoryInfo.Brands}
                    properties={this.props.categoryInfo.Filters}
                    info={this.props.categoryInfo.Info}
                />
                <Product
                    listProducts={this.props.categoryInfo.CurrentData.Products}
                />
            </SafeAreaView>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        categoryInfo: state.categoryReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actionCategory: bindActionCreators(categoryCreator, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Group);
