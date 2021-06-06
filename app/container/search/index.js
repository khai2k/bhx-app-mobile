import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView, ActivityIndicator } from 'react-native';
import { bindActionCreators } from 'redux';
import { Header } from '@app/components';
import { Colors } from '@app/styles';
import * as searchCreator from '@app/redux/actions/searchAction';
import { useNavigation } from '@react-navigation/native';
import Product from './Product';

const Search = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const actionSearch = bindActionCreators(searchCreator, dispatch);

    const searchInfo = useSelector((state) => state.searchReducer);
    const {
        Filter,
        Products,
        OtherData,
        OtherDataAjax,
        SelectedBrand,
        SelectedProps,
        SelectedSort,
        OEMProducts
    } = searchInfo;

    const locationInfo = useSelector(
        (state) => state.locationReducer.Location.LocationInfo
    );

    useEffect(async () => {
        setIsLoading(true);
        await actionSearch.search_get(props.route.params.url).then((res) => {
            if (res.HttpCode === 302) {
                navigation.navigate('Group', { url: res.Message });
            } else {
                setIsLoading(false);
            }
        });
    }, [locationInfo]);

    return isLoading ? (
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
                brands={Filter.Manufactures}
                properties={Filter.Categories}
                sort={Filter.FilterSorts}
                products={Products}
                info={Filter.Query}
                otherData={OtherData}
                otherDataAjax={OtherDataAjax}
                selectedBrand={SelectedBrand}
                selectedProps={SelectedProps}
                selectedSort={SelectedSort}
                oemProducts={OEMProducts}
            />
        </SafeAreaView>
    );
};

export default React.memo(Search);
