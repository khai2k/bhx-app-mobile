import { Colors, Typography } from '@app/styles';
import { StyleSheet } from 'react-native';

export const styleAlert = StyleSheet.create({
    btnAlert: {
        backgroundColor: Colors.GREEN_KEY
    },
    btnAlertClose: {
        color: Colors.GRAY_ALERT_CLOSE
    },
    btnAlertText: {
        color: Colors.WHITE
    }
});
