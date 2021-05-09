import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
import { translate } from '@app/translate';
import { Header } from '@app/components';

import ListCategory from './ListCategory';

const styles = StyleSheet.create({
    container: {
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
                <Header></Header>
                <ListCategory />
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
