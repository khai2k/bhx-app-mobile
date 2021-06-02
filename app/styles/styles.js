import { Colors, Typography } from '@app/styles';
import { StyleSheet } from 'react-native';

export const styleAlert = StyleSheet.create({
    btnAlert: {
        backgroundColor: Colors.GREEN_KEY
    },
    btnAlertClose: {
        ...Typography.FONT_BOLD_16,
        color: Colors.GRAY_ALERT_CLOSE
    },
    btnAlertText: {
        ...Typography.FONT_BOLD_16,
        color: Colors.WHITE
    }
});
