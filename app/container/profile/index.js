import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Button } from 'react-native';
import { Header } from '@app/components';

const white = 'red';
const styles = StyleSheet.create({
    container: {
        backgroundColor: white,
        flex: 1
    }
});

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View style={styles.container}>
                <Header></Header>
                <Button
                    onPress={() =>
                        this.props.navigation.navigate('ProductDetail')
                    }
                    title="Go to Product detail"
                />
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
