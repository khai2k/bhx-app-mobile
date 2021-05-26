import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SafeAreaView, ActivityIndicator, View } from 'react-native';
import { bindActionCreators } from 'redux';
import { Header } from '@app/components';
import { Colors } from '@app/styles';
import Filter from './Filter';
import Product from './Product';
import * as searchCreator from './action';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        };
    }

    async componentDidMount() {
        const option = {
            key: this.props.route.params.url,
            provinceId: 3,
            storeId: 6463,
            phone: '',
            checkpromotion: true
        };
        await this.props.actionSearch.search_get(option);
        this.setState({ isLoading: false });
    }

    render() {
        return this.state.isLoading ? (
            <SafeAreaView style={{ flex: 1 }}>
                <Header />
                <ActivityIndicator
                    style={{ marginTop: 50 }}
                    size="large"
                    color={Colors.GREEN_KEY}
                />
            </SafeAreaView>
        ) : (
            <SafeAreaView style={{ flex: 1 }}>
                <Header />
                <Filter
                    brands={this.props.searchInfo.Filter.Manufactures}
                    properties={this.props.searchInfo.Filter.Categories}
                    sort={this.props.searchInfo.Filter.FilterSorts}
                    info={this.props.searchInfo.Filter.Query}
                    selectedBrand={this.props.searchInfo.SelectedBrand}
                    selectedProps={this.props.searchInfo.SelectedProps}
                    selectedSort={this.props.searchInfo.SelectedSort}
                />
            </SafeAreaView>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        searchInfo: state.searchReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actionSearch: bindActionCreators(searchCreator, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
