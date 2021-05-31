import React, { useEffect } from 'react';
import { Text, View, FlatList, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { styles } from './styles';
import { IconNotification } from '../../images';
import Header from '../../components/Header';
import * as notificationAction from '../../redux/actions/notificationAction';

const Notification = () => {
    const navigation = useNavigation();

    const dataNotify = [
        {
            id: 1,
            subject: 'Đặt hàng thành công',
            content: 'Test 1',
            createTime: '28-05-2021 13:34:43',
            isSeen: '0',
            type: 1
        },
        {
            id: 2,
            subject: 'Bắt đầu đi giao',
            content: 'Test 2',
            createTime: '28-05-2021 13:34:43',
            isSeen: '0',
            type: 2
        },
        {
            id: 3,
            subject: 'Hủy đơn hàng',
            content: 'Test 3',
            createTime: '28-05-2021 13:34:43',
            isSeen: '0',
            type: 3
        },
        {
            id: 4,
            subject: 'Đổi giờ giao thành công',
            content: 'Test 1',
            createTime: '28-05-2021 13:34:43',
            isSeen: '0',
            type: 4
        },
        {
            id: 5,
            subject: 'Hủy giao hàng',
            content: 'Test 2',
            createTime: '28-05-2021 13:34:43',
            isSeen: '0',
            type: 5
        },
        {
            id: 6,
            subject: 'Giao thành công',
            content:
                'Bạn Huấn (0965432567) bắt đầu đi giao đơn hàng dự kiến 60 phút đến anh LINH...',
            createTime: '28-05-2021 13:34:43',
            isSeen: '0',
            type: 6
        }
    ];

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(notificationAction.notification_get());
    }, []);

    function renderNotify(item) {
        return (
            <View>
                <TouchableOpacity
                    onPress={() => {
                        handleSeenNotify(item.item.type);
                    }}>
                    <View style={styles.contentNotification}>
                        <Image
                            style={styles.iconNotify}
                            source={displayIconNotify(item.item.type)}
                        />
                        <View style={styles.contentRight}>
                            <View style={styles.contentTop}>
                                <Text style={styles.txtTitle}>
                                    {item.item.subject}
                                </Text>
                                <Text>2 tuần trước</Text>
                            </View>
                            <View style={styles.contentBottom}>
                                <Text>{item.item.content}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    function displayIconNotify(type) {
        switch (type) {
            case 1:
                return IconNotification.iconOrderSuccess;
            case 2:
                return IconNotification.iconDeliveryStart;
            case 3:
                return IconNotification.iconOrderCancel;
            case 4:
                return IconNotification.iconChangeTimeDelivery;
            case 5:
                return IconNotification.iconDeliveryCancel;
            case 6:
                return IconNotification.iconDeliverySuccess;
            default:
                return IconNotification.iconOrderSuccess;
        }
    }
    function handleSeenNotify(type) {
        switch (type) {
            case 1:
                navigation.navigate('OrderSuccess');
                break;

            default:
                navigation.navigate('UnderConstruction');
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <Header />
            <FlatList
                style={styles.container}
                windowSize={60}
                data={dataNotify}
                keyExtractor={(item) => item.id}
                renderItem={renderNotify}
            />
        </View>
    );
};

export default Notification;
