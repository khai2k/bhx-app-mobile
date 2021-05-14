import React from 'react';
import { View } from 'react-native';
import ManufactureFilter from './ManufactureFilter';
import PropertyFilter from './PropertyFilter';

const Filter = () => {
    return (
        <View>
            <ManufactureFilter />
            <PropertyFilter />
        </View>
    );
};
export default Filter;
