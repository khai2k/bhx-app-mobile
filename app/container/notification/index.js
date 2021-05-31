import React from 'react';
import { View, FlatList } from 'react-native';

const Notification = () => {
    const dataNotify = [
        {
            id: 1,
            subject: 'subject 1',
            content: 'Test 1',
            createTime: '28-05-2021 13:34:43',
            isSeen: '0'
        },
        {
            id: 2,
            subject: 'subject 2',
            content: 'Test 2',
            createTime: '28-05-2021 13:34:43',
            isSeen: '0'
        },
        {
            id: 3,
            subject: 'subject 3',
            content: 'Test 3',
            createTime: '28-05-2021 13:34:43',
            isSeen: '0'
        }
    ];

    function renderNotify() {}

    return (
        <View>
            <FlatList
                data={dataNotify}
                keyExtractor={(item) => item.id}
                renderItem={renderNotify}
            />
        </View>
    );
};

export default Notification;
