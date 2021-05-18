import { Platform } from 'react-native';

import LocationAndroid from './index.android';
import LocationIOS from './index.ios';

export const LocationFunction = Platform.select({
    ios: LocationIOS,
    android: LocationAndroid
});
