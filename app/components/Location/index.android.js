import { useDispatch } from 'react-redux';
import { PermissionsAndroid } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { Storage } from '@app/common';
import { CONST_STORAGE } from '@app/constants';
import { location_SaveChooseLocation, location_getCurrent } from './action';

const loadLocation = async () => {
    const dispatch = useDispatch();

    const dispatchlocation_SaveChooseLocation = (model) =>
        dispatch(location_SaveChooseLocation(model));

    const dispatchlocation_getCurrent = (model) =>
        dispatch(location_getCurrent(model));

    const _crrLocationString = await Storage.getItem(
        CONST_STORAGE.SESSION_LOCATION_CURRENT
    );

    const _crrLocation =
        _crrLocationString !== '' ? JSON.parse(_crrLocationString) : null;

    if (_crrLocation === null) {
        const hasLocationPermission = PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );

        if (hasLocationPermission) {
            Geolocation.getCurrentPosition(
                (position) => {
                    const crrLat = position.coords.latitude;
                    const crrLong = position.coords.longitude;

                    return dispatchlocation_getCurrent(crrLat, crrLong);
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
            return this.props.locationAction.location_getCurrent(0, 0);
        }
    } else {
        return dispatchlocation_SaveChooseLocation(_crrLocation);
    }

    return new Promise((resolve) => {
        resolve('result');
    });
};

module.exports = {
    loadLocation
};
