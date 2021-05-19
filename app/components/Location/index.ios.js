import React, { Component } from 'react';
import { View, PermissionsAndroid } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as locationCreator from './action';

// create a component
class Location extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        const hasLocationPermission = PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );

        if (hasLocationPermission) {
            Geolocation.getCurrentPosition(
                (position) => {
                    const crrLat = position.coords.latitude;
                    const crrLong = position.coords.longitude;

                    if (crrLat > 0 && crrLong > 0) {
                        const value = this.props.locationAction.location_getCurrent();
                        console.log('value');
                        console.log(value);
                    }
                },
                (error) => {
                    console.log(error);
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            );
        } else {
            console.log('Denied');
        }
    }

    render() {
        return <View />;
    }
}

const mapStateToProps = (state) => {
    return {
        cartInfo: state.cartReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        locationAction: bindActionCreators(locationCreator, dispatch)
    };
};
// make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(Location);
