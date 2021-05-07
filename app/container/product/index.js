import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
import { translate } from '@app/translate';
import ProductBox from '../../components/ProductBox/ProductBox';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.WHITE,
        flexWrap: 'wrap',
        flexDirection: 'row'
    }
});

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        // return (
        //     <View style={styles.container}>
        //         <Text style={{fontSize: 30}}>{translate('Product')}</Text>
        //     </View>
        // );
        return (
            <View style={styles.container}>
                <ProductBox />
                <ProductBox />
                <ProductBox />
                <ProductBox />
                <ProductBox />
            </View>
        );
    }
}

const mapStateToProps = function () {
    return {};
};

const mapDispatchToProps = function () {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
