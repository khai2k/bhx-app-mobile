import React, { useEffect, useState } from 'react';
import { View, Text, PermissionsAndroid } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

const LocationModal = () => {
    const [sPermission, setSPermission] = useState('');
    const [lat, setLat] = useState(0);
    const [long, setLong] = useState(0);

    useEffect(() => {
        const hasLocationPermission = PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );

        if (hasLocationPermission) {
            setSPermission('Granted');
            Geolocation.getCurrentPosition(
                (position) => {
                    setLat(position.coords.latitude);
                    setLong(position.coords.longitude);

                    console.log(lat);
                    console.log(long);
                },
                (error) => {
                    setSPermission(
                        `error.code: ${error.code} - error.message: ${error.message}`
                    );
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            );
        } else {
            setSPermission('Denied');
        }
    });

    return <View />;
};

export default LocationModal;
