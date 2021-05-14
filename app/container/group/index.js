import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-native';
import { Header } from '@app/components';
import Filter from './Filter';

class Group extends Component {
    render() {
        return (
            <SafeAreaView>
                <Header />
                <Filter />
            </SafeAreaView>
        );
    }
}

const mapStateToProps = function () {
    return {};
};

const mapDispatchToProps = function () {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Group);
