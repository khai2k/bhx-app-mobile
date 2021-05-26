/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/sort-styles */
import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Modal,
    Dimensions
} from 'react-native';
import { Colors } from '@app/styles';

const win = Dimensions.get('window');

const RemiderLocation = (props) => {
    return (
        <View style={styles.centerModal}>
            <Modal
                visible={props.isShowReminder}
                index
                animationType="none"
                transparent>
                <View style={styles.centerModal}>
                    <View style={styles.modalReminder}>
                        <Text style={styles.modalReminderText}>
                            Quý khách vui lòng cho biết thêm ĐỊA CHỈ NHẬN HÀNG
                            để BachhoaXANH.com chuẩn bị đủ hàng và giao nhanh
                            chóng!
                        </Text>
                        <TouchableOpacity
                            onPress={() => props.showModalLocationCallback()}
                            style={styles.submit}>
                            <Text style={styles.submitText}>CHỌN KHU VỰC</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    centerModal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000000D9'
    },
    modalReminder: {
        margin: 20,
        marginTop: 50,
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        maxWidth: win.width * (9 / 10)
    },
    modalReminderText: {
        color: Colors.MINE_SHAFT,
        fontSize: 14,
        width: 'auto'
    },
    submit: {
        width: win.width * (7 / 10),
        backgroundColor: Colors.FUN_GREEN,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        marginBottom: 0,
        height: 35
    },
    submitText: {
        color: Colors.WHITE,
        fontSize: 14
    }
});

export default React.memo(RemiderLocation);
