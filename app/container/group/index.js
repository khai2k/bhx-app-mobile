import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView, ActivityIndicator, View } from 'react-native';
import { bindActionCreators } from 'redux';
import { Header } from '@app/components';
import { Colors } from '@app/styles';
import * as categoryCreator from '@app/redux/actions/groupAction';
import Filter from './Filter';
import Product from './Product';
import { styles } from './style';

const Group = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const actionCategory = bindActionCreators(categoryCreator, dispatch);

    const groupInfo = useSelector((state) => state.categoryReducer);
    const {
        Brands,
        Filters,
        Info,
        SelectedBrand,
        SelectedProps,
        SelectedSort,
        Query,
        CurrentData
    } = groupInfo;

    const locationInfo = useSelector(
        (state) => state.locationReducer.Location.LocationInfo
    );

    useEffect(async () => {
        setIsLoading(true);
        await actionCategory.category_get(props.route.params.url);
        setIsLoading(false);
    }, [locationInfo]);

    const refreshGroup = async () => {
        setIsLoading(true);
        await actionCategory.category_get(props.route.params.url);
        setIsLoading(false);
    };

    return isLoading ? (
        <SafeAreaView style={{ flex: 1 }}>
            <Header />
            <ActivityIndicator
                style={[styles.loading, isLoading && styles.loadingActive]}
                size="large"
                color={Colors.GREEN_KEY}
            />
        </SafeAreaView>
    ) : (
        <SafeAreaView style={{ flex: 1 }}>
            <Header />
            <Filter
                brands={Brands}
                properties={Filters}
                info={Info}
                selectedBrand={SelectedBrand}
                selectedProps={SelectedProps}
                selectedSort={SelectedSort}
            />
            <Product
                currentData={CurrentData}
                include={Query}
                info={Info}
                selectedBrand={SelectedBrand}
                selectedProps={SelectedProps}
                selectedSort={SelectedSort}
                onRefresh={refreshGroup}
                isLoading={isLoading}
            />
        </SafeAreaView>
    );
};

export default React.memo(Group);
