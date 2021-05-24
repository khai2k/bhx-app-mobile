import React from 'react';
import { View } from 'react-native';
import ManufactureFilter from './ManufactureFilter';
import PropertyFilter from './PropertyFilter';

const Filter = (props) => {
    return (
        <View>
            <ManufactureFilter
                brands={props.brands}
                properties={props.properties}
                infoCate={props.info}
                selectedBrand={props.selectedBrand}
                selectedProps={props.selectedProps}
                selectedSort={props.selectedSort}
            />
            <PropertyFilter
                brands={props.brands}
                properties={props.properties}
                infoCate={props.info}
                selectedBrand={props.selectedBrand}
                selectedProps={props.selectedProps}
                selectedSort={props.selectedSort}
            />
        </View>
    );
};
export default React.memo(Filter);
