import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
import { translate } from '@app/translate';

const white = 'green';
const styles = StyleSheet.create({
    container: {
        backgroundColor: white,
        flex: 1
    }
});

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={{fontSize: 30}}>{translate('Product')}</Text>
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
