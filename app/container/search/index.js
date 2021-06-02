import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { SafeAreaView, ActivityIndicator, View, Alert } from 'react-native';
import { bindActionCreators } from 'redux';
import { Header } from '@app/components';
import { Colors } from '@app/styles';
import * as searchCreator from '@app/redux/actions/searchAction';
import { helper } from '@app/common';
import { useNavigation } from '@react-navigation/native';
import Product from './Product';

class Search extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        };
    }

    async componentDidMount() {
        const navigation = useNavigation();
        const option = {
            key: this.props.route.params.url,
            provinceId: !helper.isEmptyOrNull(this.locationInfo)
                ? this.locationInfo.ProvinceId
                : 3,
            storeId: !helper.isEmptyOrNull(this.locationInfo)
                ? this.locationInfo.StoreId
                : 6463,
            phone: '',
            checkpromotion: true
        };
        await this.props.actionSearch.search_get(option).then((res) => {
            if (res.HttpCode !== 200) {
                if (res.HttpCode === 302) {
                    navigation.navigate('Group', { url: res.Message });
                } else {
                    Alert(res.Message);
                }
            }
        });
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
                <Product
                    brands={this.props.searchInfo.Filter.Manufactures}
                    properties={this.props.searchInfo.Filter.Categories}
                    sort={this.props.searchInfo.Filter.FilterSorts}
                    products={this.props.searchInfo.Products}
                    info={this.props.searchInfo.Filter.Query}
                    otherData={this.props.searchInfo.OtherData}
                    otherDataAjax={this.props.searchInfo.OtherDataAjax}
                    selectedBrand={this.props.searchInfo.SelectedBrand}
                    selectedProps={this.props.searchInfo.SelectedProps}
                    selectedSort={this.props.searchInfo.SelectedSort}
                    oemProducts={this.props.searchInfo.OEMProducts}
                />
            </SafeAreaView>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        searchInfo: state.searchReducer,
        locationInfo: state.locationReducer.Location.LocationInfo
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actionSearch: bindActionCreators(searchCreator, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
