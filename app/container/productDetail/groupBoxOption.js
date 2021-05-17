import React, { Component } from 'react';
import { connect } from 'react-redux';

import { View, StyleSheet, Text } from 'react-native';
import BoxSelect from './boxOption';

const styles = StyleSheet.create({
    productList: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
});

class GroupBoxOption extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.productList}>
                    {this.props.exchangeProducts.map((product) => {
                        return <BoxSelect exchangeProduct={product} />;
                    })}
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

export default connect(mapStateToProps, mapDispatchToProps)(GroupBoxOption);
