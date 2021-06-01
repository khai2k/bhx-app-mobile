import { StyleSheet } from 'react-native';
import { Colors } from '../../styles';

export const styles = StyleSheet.create({
    container: { padding: 15 },
    contentNotification: {
        backgroundColor: Colors.WHITE_FFF,
        borderRadius: 8,
        flexDirection: 'row',
        height: 76,
        marginBottom: 10,
        overflow: 'hidden',
        padding: 10
    },
    contentRight: {
        flex: 1,
        paddingLeft: 10
    },
    contentTop: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    iconNotify: {
        alignSelf: 'center',
        resizeMode: 'contain',
        width: 58
    },
    txtTitle: {
        color: Colors.GRAY_222B45,
        fontSize: 16,
        fontWeight: '500',
        lineHeight: 16
    }
});
