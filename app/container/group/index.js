import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { SafeAreaView, ActivityIndicator, View } from 'react-native';
import { bindActionCreators } from 'redux';
import { Header } from '@app/components';
import { Colors } from '@app/styles';
import * as categoryCreator from '@app/redux/actions/groupAction';
import { helper } from '@app/common';
import Filter from './Filter';
import Product from './Product';
import { styles } from './style';

class Group extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        };
        this.refreshGroup = this.refreshGroup.bind(this);
    }

    async componentDidMount() {
        const option = {
            params: {
                categoryUrl: this.props.route.params.url,
                provinceId: !helper.isEmptyOrNull(this.locationInfo)
                    ? this.locationInfo.ProvinceId
                    : 3,
                storeId: !helper.isEmptyOrNull(this.locationInfo)
                    ? this.locationInfo.StoreId
                    : 6463,
                phone: 0,
                isMobile: 'true',
                clearcache: ''
            }
        };
        await this.props.actionCategory.category_get(option);
        this.setState({ isLoading: false });
    }

    refreshGroup() {
        this.setState({ isLoading: true }, async () => {
            const option = {
                params: {
                    categoryUrl: this.props.route.params.url,
                    provinceId: !helper.isEmptyOrNull(this.locationInfo)
                        ? this.locationInfo.ProvinceId
                        : 3,
                    storeId: !helper.isEmptyOrNull(this.locationInfo)
                        ? this.locationInfo.StoreId
                        : 6463,
                    phone: 0,
                    isMobile: 'true',
                    clearcache: ''
                }
            };
            await this.props.actionCategory
                .category_get(option)
                .then((res) => {
                    this.setState({ isLoading: false });
                })
                .catch(() => {
                    this.setState({ isLoading: false });
                });
        });
    }

    render() {
        return this.state.isLoading ? (
            <SafeAreaView style={{ flex: 1 }}>
                <Header />
                <ActivityIndicator
                    style={[
                        styles.loading,
                        this.state.isLoading && styles.loadingActive
                    ]}
                    size="large"
                    color={Colors.GREEN_KEY}
                />
            </SafeAreaView>
        ) : (
            <SafeAreaView style={{ flex: 1 }}>
                <Header />
                <Filter
                    brands={this.props.categoryInfo.Brands}
                    properties={this.props.categoryInfo.Filters}
                    info={this.props.categoryInfo.Info}
                    selectedBrand={this.props.categoryInfo.SelectedBrand}
                    selectedProps={this.props.categoryInfo.SelectedProps}
                    selectedSort={this.props.categoryInfo.SelectedSort}
                />
                <Product
                    currentData={this.props.categoryInfo.CurrentData}
                    include={this.props.categoryInfo.Query}
                    info={this.props.categoryInfo.Info}
                    selectedBrand={this.props.categoryInfo.SelectedBrand}
                    selectedProps={this.props.categoryInfo.SelectedProps}
                    selectedSort={this.props.categoryInfo.SelectedSort}
                    onRefresh={this.refreshGroup}
                    isLoading={this.state.isLoading}
                />
            </SafeAreaView>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        categoryInfo: state.categoryReducer,
        locationInfo: state.locationReducer.Location.LocationInfo
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actionCategory: bindActionCreators(categoryCreator, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Group);
