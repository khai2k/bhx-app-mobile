import { StyleSheet } from 'react-native';
import { Colors, Typography } from '@app/styles';

export const styles = StyleSheet.create({
    loading: {
        height: '90%',
        position: 'absolute',
        width: '100%'
    },
    loadingActive: {
        backgroundColor: Colors.GRAY_F8FBFF,
        opacity: 0.3,
        zIndex: 1
    }
});
