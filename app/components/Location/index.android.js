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

    async componentDidMount() {
        const hasLocationPermission = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );

        if (hasLocationPermission) {
            Geolocation.getCurrentPosition(
                (position) => {
                    console.log(position);
                    const crrLat = position.coords.latitude;
                    const crrLong = position.coords.longitude;

                    this.props.locationAction.location_getCurrent(
                        crrLat,
                        crrLong
                    );
                },
                (error) => {
                    console.log(error);
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            );
        } else {
            this.props.locationAction.location_getCurrent(10.8516, 106.7975);
            console.log('Denied');
        }
    }

    render() {
        return <View />;
    }
}

const mapStateToProps = (state) => {
    return {
        crrLocationRs: state.locationReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        locationAction: bindActionCreators(locationCreator, dispatch)
    };
};
// make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(Location);
