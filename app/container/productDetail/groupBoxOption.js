import React, { Component } from 'react';
import { connect } from 'react-redux';

import { View } from 'react-native';
import styles from './style';
import BoxSelect from './boxOption';

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
