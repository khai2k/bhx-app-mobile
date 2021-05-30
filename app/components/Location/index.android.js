import React, { Component } from 'react';
import { View, PermissionsAndroid } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as locationCreator from './action';
import { Storage } from '@app/common';
import { CONST_STORAGE } from '@app/constants';

// create a component
class Location extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    async componentDidMount() {
        const _crrLocationString = await Storage.getItem(
            CONST_STORAGE.SESSION_LOCATION_CURRENT
        );

        const _crrLocation =
            _crrLocationString != '' ? JSON.parse(_crrLocationString) : null;

        if (_crrLocation === null) {
            const hasLocationPermission = await PermissionsAndroid.check(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            );

            if (hasLocationPermission) {
                Geolocation.getCurrentPosition(
                    (position) => {
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
                    {
                        enableHighAccuracy: true,
                        timeout: 15000,
                        maximumAge: 10000
                    }
                );
            } else {
                this.props.locationAction.location_getCurrent(0, 0);
            }
        } else {
            this.props.locationAction.location_SaveChooseLocation(_crrLocation);
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
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(React.memo(Location));
