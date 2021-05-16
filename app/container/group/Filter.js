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
            />
            <PropertyFilter
                brands={props.brands}
                properties={props.properties}
            />
        </View>
    );
};
export default Filter;
