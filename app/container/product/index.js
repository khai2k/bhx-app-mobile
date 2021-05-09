import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
import { translate } from '@app/translate';
import { Header } from '@app/components';
import ProductBox from '../../components/ProductBox/ProductBox';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    productList: {
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
                <Header />
                <View style={styles.productList}>
                    <ProductBox />
                    <ProductBox />
                </View>
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
