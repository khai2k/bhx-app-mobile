import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@app/styles';
import HTML from 'react-native-render-html';
import ManufactureFilter from './ManufactureFilter';
import PropertyFilter from './PropertyFilter';

const Filter = (props) => {
    const htmlResult = `<span>Tìm thấy <b>${props.info.TotalRecord}</b> kết quả phù hợp với từ khoá <b>${props.info.Key}</b></span>`;
    return (
        <View>
            <View style={styles.resultSearch}>
                <HTML
                    style={styles.resultSearchText}
                    source={{ html: htmlResult }}
                />
            </View>
            <PropertyFilter
                brands={props.brands}
                properties={props.properties}
                sort={props.sort}
                infoCate={props.info}
                selectedBrand={props.selectedBrand}
                selectedProps={props.selectedProps}
                selectedSort={props.selectedSort}
            />
            <ManufactureFilter
                brands={props.brands}
                properties={props.properties}
                sort={props.sort}
                infoCate={props.info}
                selectedBrand={props.selectedBrand}
                selectedProps={props.selectedProps}
                selectedSort={props.selectedSort}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    resultSearch: {
        backgroundColor: Colors.LINK_WATER_2,
        paddingBottom: 15,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 15
    }
});
export default React.memo(Filter);
