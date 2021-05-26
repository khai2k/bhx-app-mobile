import React from 'react';
import { View } from 'react-native';
import { helper } from '@app/common';
import ManufactureFilter from './ManufactureFilter';
import PropertyFilter from './PropertyFilter';

const Filter = (props) => {
    return (
        <View>
            {!helper.isEmptyOrNull(props.brands) && (
                <ManufactureFilter
                    brands={props.brands}
                    properties={props.properties}
                    infoCate={props.info}
                    selectedBrand={props.selectedBrand}
                    selectedProps={props.selectedProps}
                    selectedSort={props.selectedSort}
                    isLoading={props.isLoading}
                />
            )}
            <PropertyFilter
                brands={props.brands}
                properties={props.properties}
                infoCate={props.info}
                selectedBrand={props.selectedBrand}
                selectedProps={props.selectedProps}
                selectedSort={props.selectedSort}
                isLoading={props.isLoading}
            />
        </View>
    );
};
export default React.memo(Filter);
