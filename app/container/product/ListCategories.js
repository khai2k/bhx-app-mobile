import React from 'react';
import {
    Text,
    View,
    SafeAreaView,
    FlatList,
    TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './style';

const ListCategories = (props) => {
    if (props.listCate != null && props.listCate.length > 0) {
        const navigation = useNavigation();
        const handleSelectCateChild = (groupUrl) => {
            navigation.navigate('Group', { url: groupUrl });
        };
        return (
            <SafeAreaView style={styles.boxCategory}>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    data={props.listCate}
                    keyExtractor={(item) => item.Id}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => handleSelectCateChild(item.Url)}>
                            <View>
                                <Text style={styles.categoryItem}>
                                    {item.Name}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </SafeAreaView>
        );
    } else {
        return null;
    }
};

export default React.memo(ListCategories);
