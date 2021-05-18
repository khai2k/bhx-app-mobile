import React, { useEffect } from 'react';
import { View, PermissionsAndroid } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Geolocation from 'react-native-geolocation-service';

const LocationModal = () => {
    const value = useSelector((state) => state.value);
    const dispatch = useDispatch();

    useEffect(() => {
        const hasLocationPermission = PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );

        if (hasLocationPermission) {
            Geolocation.getCurrentPosition(
                (position) => {
                    const crrLat = position.coords.latitude;
                    const crrLong = position.coords.longitude;

                    if (crrLat > 0 && crrLong > 0) {
                        dispatch({ type: 'LOCATION_GETCURRENT', payload: {} });
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
    });

    return <View />;
};

export default LocationModal;
