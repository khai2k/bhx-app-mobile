import React, { Component } from 'react';
import { View } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as locationCreator from '@app/redux/actions/generalAction';

// create a component
class Location extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        Geolocation.getCurrentPosition(
            (position) => {
                const crrLat = position.coords.latitude;
                const crrLong = position.coords.longitude;

                if (crrLat > 0 && crrLong > 0) {
                    this.props.locationAction.location_getCurrent(
                        crrLat,
                        crrLong
                    );
                }
            },
            (error) => {
                console.log(error);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    }

    render() {
        return <View />;
    }
}

const mapStateToProps = (state) => {
    return {
        crrLocationRs: state.generalReducer.Location.LocationInfo
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        locationAction: bindActionCreators(locationCreator, dispatch)
    };
};
// make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(Location);
